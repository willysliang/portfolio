/**
 * @ Author: willysliang
 * @ Create Time: 2023-01-27 10:54:26
 * @ Modified by: willysliang
 * @ Modified time: 2023-02-02 15:27:51
 * @ Description: 用户登录和退出登录
 */

const accessTokens = {
  admin: 'admin',
  willy: 'willy',
  willysliang: 'willysliang',
}

export default [
  {
    url: '/user/login',
    method: 'post',
    response: (config) => {
      const { username } = config.body
      const accessToken = accessTokens[username]
      if (!accessToken) {
        return {
          code: 500,
          msg: '帐户或密码不正确。',
        }
      }
      return {
        code: 200,
        msg: 'success',
        data: {
          accessToken: `${accessToken}---token`,
        },
      }
    },
  },
  {
    url: '/user/logout',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
      }
    },
  },
]
