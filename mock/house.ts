/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-21 11:58:13
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-23 13:31:51
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

const publish = [
  /** 获取区域列表 */
  {
    url: `/house/areaCommunity/list`,
    method: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        'data|1-100': [
          {
            id: '@id()',
            name: '@county(true)' + '@cname()' + '@cword(3, 5)' + '@zip()',
          },
        ],
      }
    },
  },

  /** 发布房源 */
  {
    url: `/house/houses`,
    method: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
      }
    },
  },
]

const enquire = [
  {
    url: `/house/news/list`,
    method: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        'data|1-100': [
          {
            id: '@id()',
            title: '@cname()' + '@cword(3, 5)',
            from: '@county(true)',
            imgSrc: 'vite.svg',
            date: '@date(yyyy-MM-dd hh:mm:ss)',
          },
        ],
      }
    },
  },
]


export default [
  ...favorites,
  ...houses,
  ...publish,
  ...enquire,
]
