/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-21 11:53:11
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-24 10:39:45
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

/** 区域列表子集约束 */
export interface IAreaCommunityItem {
  id: string
  name: string
}

export interface IAreaItem {
  label: string | number
  value: string | number
}

/** 资讯信息列表子集 */
export interface INewsItem {
  id: string
  title: string
  imgSrc: string
  from: string
  date: string
}