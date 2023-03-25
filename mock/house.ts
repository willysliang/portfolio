/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-21 11:58:13
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-25 19:59:06
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

  /** 查询房屋具体信息 */
  {
    url: `/house/houses/details`,
    method: 'get',
    response({ query }) {
      if (query.code) {
        const oriented = [
          '正东',
          '东南',
          '正南',
          '西南',
          '正西',
          '西北',
          '正北',
          '东北',
        ]
        const supporting = [
          '衣柜',
          '洗衣机',
          '空调',
          '天然气',
          '冰箱',
          '暖气',
          '电视',
          '热水器',
          '宽带',
          '沙发',
        ]

        return {
          code: 200,
          msg: 'success',
          data: {
            id: '@id()',
            'tags|1-4': ['@cword(3)'],
            price: '@float(0,1000,2, 2)',
            'oriented|1-4': [`@pick(${oriented})`],
            room: '普通住宅',
            floor: "@string('一二三四五六七八九十', 1) 楼",
            roomType: "@string('一二三四五六七八九十', 1) 室",
            size: `@integer(10, 200) x @integer(10, 200) 平方米`,
            'supporting|1-10': [`@pick(${supporting})`],
            userImg: 'avactor.jpg',
            nickname: '@cname()',
            gender: "@string('123', 1)",
            authorization: '@boolean(9, 1, true)',
            desc:
              '@county(true)' +
              '@cname()' +
              '@cword(3, 5)' +
              '@zip()' +
              '@cword(100, 500)',
          },
        }
      } else {
        return {
          code: 500,
          msg: '不存在该房屋信息！',
        }
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
