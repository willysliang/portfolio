/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-21 11:58:13
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-21 13:34:07
 * @ Description: 租房模拟接口
 */

const favorites = [
  {
    url: `/house/favorites/list`,
    method: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        'data|1-100': [
          {
            id: '@id()',
            houseCode: '@zip()',
            title: '@cname()' + '@cword(3, 5)',
            desc: '@county(true)' + '@csentence(20,50)',
            houseImg: 'vite.svg',
            'tags|1-4': ['@cword(3)'],
            price: '@float(0,1000,2, 2)',
          },
        ],
      }
    },
  },
]

const houses = [
  {
    url: `/house/houses/list`,
    method: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        'data|1-100': [
          {
            id: '@id()',
            houseCode: '@zip()',
            title: '@cname()' + '@cword(3, 5)',
            desc: '@county(true)' + '@csentence(20,50)',
            houseImg: 'vite.svg',
            'tags|1-4': ['@cword(3)'],
            price: '@float(0,1000,2, 2)',
          },
        ],
      }
    },
  },
]


export default [
  ...favorites,
  ...houses,
]
