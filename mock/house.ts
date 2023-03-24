/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-21 11:58:13
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-24 19:55:54
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

/** 区域相关 */
const area = [
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

  /** 获取城市区域数据列表 */
  {
    url: `/house/area/city`,
    method: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        'data|1-100': [
          {
            value: '@id()',
            label: '@county(true)' + '@cname()' + '@cword(3, 5)' + '@zip()',
          },
        ],
      }
    },
  },

  /** 查询房源数据 */
  {
    url: `/house/area/map`,
    method: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        'data|1-100': [
          {
            id: '@id()',
            label: '@county(true)' + '@cname()' + '@cword(3, 5)' + '@zip()',
            count: '@integer(1, 100)',
            coord: {
              longitude: '@float(0,180, 6, 6)',
              latitude: '@float(0,90, 6, 6)',
            },
          },
        ],
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

export default [...favorites, ...houses, ...area, ...enquire]
