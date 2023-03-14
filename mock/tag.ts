/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-03 11:07:15
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-14 11:52:20
 * @ Description: 标签数据
 */

export default [
  {
    url: '/tag/list',
    method: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
        'data|10-30': [
          {
            id: '@id()',
            type: '@integer(1, 3)',
            name: '@cname',
            user_id: '@zip()',
            icon: /^1[0-9]{10}$/,
          },
        ],
      }
    },
  },
  {
    url: RegExp(`/tags/` + '.*'),
    method: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: {
          id: '@id()',
          type: '@integer(1, 3)',
            name: '@cname',
            user_id: '@zip()',
            icon: /^1[0-9]{10}$/,
        },
      }
    },
  },
]
