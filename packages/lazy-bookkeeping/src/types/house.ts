/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-21 11:53:11
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-25 19:51:25
 * @ Description: 房屋约束
 */

/** 房屋列表子集约束 */
export interface IHouseListItem {
  id: number | string
  houseCode: number | string
  title: string
  desc: string
  houseImg: string
  tags: Array<string>
  price: number
}

/** 房屋具体详情 */
export interface IHousesDetail {
  /** 租金 */
  price: number
  /** 房型 */
  roomType: string
  /** 面积 */
  size: number
  /** 朝向 */
  oriented: Array<string>
  /** 楼层 */
  floor: number | string
  /** 类型 */
  room: string
  /** 标签 */
  tags: Array<string>
  /** 房屋配置 */
  supporting: Array<string> | string
  /** 描述 */
  desc: string
  /** 用户头像 */
  userImg: string
  /** 用户昵称 */
  nickname: string
  /** 用户性别 */
  gender: '0' | '1' | '2' // 女 | 男 | 未知
  /** 是否认证 */
  authorization: boolean
}

/** 区域列表子集约束 */
export interface IAreaCommunityItem {
  id: string
  name: string
}

/** 区域子集约束 */
export interface IAreaItem {
  label: string
  value: string | number
}

/** 房源子集约束 */
export interface IAreaMapItem {
  id: string
  label: string
  count: number
  coord: {
    longitude: number
    latitude: number
  }
}

/** 资讯信息列表子集 */
export interface INewsItem {
  id: string
  title: string
  imgSrc: string
  from: string
  date: string
}
