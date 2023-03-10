// 通过 axios 处理请求
const axios = require('axios');

axios.interceptors.response.use(res => res.data);

/**
 * 获取模板列表
 * @returns Promise
 */
async function getRepoList() {
  return await axios.get('https://api.github.com/orgs/zhurong-cli/repos');
}

/**
 * 获取版本信息
 * @param {string} repo 模板名称
 * @returns Promise
 */
async function getTagList(repo) {
  return await axios.get(`https://api.github.com/repos/zhurong-cli/${repo}/tags`);
}

module.exports = {
  getRepoList,
  getTagList,
};
