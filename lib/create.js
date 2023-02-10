// fs-extra 是对fs模块的扩展，支持promise
const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const Generator = require('./Generator');

module.exports = async function (name, options) {
  // 验证是否正常取到值
  console.log('>>> create.js', name, options);

  // 当前命令行选择的目录
  const cwd = process.cwd();
  // 需要创建的目录地址
  const targetDir = path.join(__dirname, name);

  console.log('targetDir', targetDir);
  console.log('exists', fs.existsSync(targetDir))

  // 目录是否已经存在
  if (fs.existsSync(targetDir)) {
    // 是否为强制创建
    if (options.force) {
      await fs.remove(targetDir);
    } else {
      // 询问用户是否确定要覆盖
      let { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists Pick an action:',
          choices: [
            {
              name: 'Overwrite',
              value: 'overwrite',
            },
            {
              name: 'Cancel',
              value: false,
            },
          ],
        },
      ]);

      if (!action) return;
      else if (action === 'overwrite') {
        // 移除已经存在的目录
        console.log(`\r\nRemoving...`);
        await fs.remove(targetDir);
      }
    }
  }

  // 创建项目
  const generator = new Generator(name, targetDir);

  // 开始创建项目
  generator.create()
};
