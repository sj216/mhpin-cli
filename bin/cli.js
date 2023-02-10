#! /usr/bin/env node

console.log('mhpin-cli working ~');

const program = require('commander');
const chalk = require('chalk')

// 配置config命令
program
  // 定义命令和参数
  .command('create <app-name>')
  .description('create a new project')
  // -f --force 为强制创建，如果创建的目录存在则直接覆盖
  .option('-f, --force', 'overwrite target directory if it exist')
  .option('-g, --get <path>', 'get value from option')
  .option('-s, --set <path> <value>')
  .option('-d, --delete <path>', 'delete option from config')
  .action((name, options) => {
    // 打印结果
    console.log('name:', name, 'options', options);
    // 在create.js 中执行创建任务
    require('../lib/create.js')(name, options);
  });

// 配置ui命令
program
  .command('ui')
  .description('start add open mhpin-cli ui')
  .option('-p, --port <port>', 'port used fro the UI Server')
  .action(option => {
    console.log(option);
  });

program
  // 监听 --help 执行
  .on('--help', () => {
    // 新增说明信息
    console.log(
      `\r\nRun ${chalk.cyan(
        `mhp <command> --help`
      )} for detailed usage if given command\r\n`
    );
  });

program
  // 配置版本号信息
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]');

// 解析用户追星命令传入参数
program.parse(process.argv);
