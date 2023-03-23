/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-21 11:53:11
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-23 13:02:08
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

/** 资讯信息列表子集 */
export interface INewsItem {
  id: string
  title: string
  imgSrc: string
  from: string
  date: string
}