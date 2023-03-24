/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-23 16:37:59
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-24 22:04:15
 * @ Description: 找房 - 下拉选择组件
 */

import React, { ForwardedRef, useEffect, useRef, useState } from 'react'
import { Button, Dropdown, DropdownRef, Selector, SideBar } from 'antd-mobile'
import houseParamsData from '@/pages/personal/constant/house'
import { getAreaChildList } from '@/api/house'
import { IAreaItem } from '#/house'
import s from '../styles/FindHouse.module.scss'

const DropdownItem = [
  { key: 'area', title: '区域' },
  { key: 'rentType', title: '方式' },
  { key: 'price', title: '租金' },
  // { key: 'subways', title: '地铁' },
] as const

interface IProps {
  onSearch: (
    params: Record<string, null | string | number | Array<number | string>>,
  ) => void
}

/** 找房 - 下拉选择组件 */
const FindHouseDrop = ({ onSearch }: IProps) => {
  /** 定义下拉菜单属性 */
  const dropRef = useRef<DropdownRef>()
  /** 定义预筛选的值 */
  const [paramFormText, setParamFormText] = useState({})
  /** 筛选栏活跃的标签 */
  const [activeKey, setActiveKey] = useState(houseParamsData.tabsList[0].key)

  /** 城市区域列表 */
  const [areaList, setAreaList] = useState<IAreaItem[]>([])
  const getAreaList = async () => {
    const res = await getAreaChildList({ id: '11' })
    setAreaList(res)
  }
  useEffect(() => {
    getAreaList()
  }, [])

  /** 搜索表单数据 */
  const [paramForm, setParamForm] = useState({
    cityId: 1, // 地区的id
    area: null, // 地区id
    community: '', // 地区名称
    subways: null, // 地铁
    rentType: 'LINE|0', // 合租和整租方式
    price: 'PRICE|null', // 价格
    roomType: 'ROOM|d4a692e4-a177-37fd', // 房屋类型
    oriented: 'ORIEN|141b98bf-1ad0-11e3', // 朝向
    characteristic: 'CHAR|1d9bf0be-284f-93dd', // 标签
    floor: 'FLOOR|1', // 楼层
    start: 1, // 开始项
    end: 20, // 结束项
  })

  /** 下拉筛选操作回调：保存预筛选的值 */
  const handlerDropdown = (key, val) => {
    const params = {}
    if (key === 'area') {
      params['community'] = areaList.filter(
        (area) => area.value === val[0],
      )[0].label
    }
    setParamFormText(
      Object.assign({}, paramForm, paramFormText, params, { [key]: val[0] }),
    )
  }

  /** 确认筛选：回调搜索事件 & 关闭下拉层 & 更新内容 */
  const handlerConfirm = () => {
    const data = Object.assign({}, paramForm, paramFormText, { start: 1 })
    onSearch(data)
    setParamForm(data)
    dropRef.current?.close()
  }

  /** 提交按钮组件 */
  const CDropBtn = () => (
    <div style={{ display: 'flex' }}>
      <Button
        block
        shape="rectangular"
        style={{ width: '50%' }}
        onClick={() => dropRef.current?.close()}
      >
        取消
      </Button>
      <Button
        block
        color="primary"
        shape="rectangular"
        style={{ width: '50%' }}
        onClick={handlerConfirm}
      >
        确认
      </Button>
    </div>
  )

  return (
    <div className={s['find']}>
      <Dropdown ref={dropRef as ForwardedRef<DropdownRef>}>
        {DropdownItem.map((item) => (
          <Dropdown.Item key={item.key} title={item.title}>
            <div
              style={{
                maxHeight: '21rem',
                overflowY: 'auto',
                boxSizing: 'border-box',
                padding: '.5rem',
              }}
            >
              <Selector
                options={houseParamsData?.[item.key] ?? areaList}
                columns={3}
                defaultValue={[houseParamsData[item.key]]}
                onChange={(arr) => handlerDropdown(item.key, arr)}
              />
            </div>
            <CDropBtn />
          </Dropdown.Item>
        ))}
        <Dropdown.Item key="subways" title="地铁">
          <div
            style={{
              maxHeight: '21rem',
              overflowY: 'auto',
              boxSizing: 'border-box',
              padding: '.5rem',
              display: 'flex',
            }}
          >
            {/* <SideBar
              activeKey={activeKey}
              onChange={setActiveKey}
              style={{ '--width': '5rem' }}
            >
              {houseParamsData.tabsList.map((item) => (
                <SideBar.Item key={item.key} title={item.title} />
              ))}
            </SideBar>
            <div style={{ flex: 1, overflowY: 'auto', margin: '.5rem' }}>
              <Selector
                options={houseParamsData['characteristic']}
                defaultValue={[paramForm['characteristic']]}
                columns={1}
                onChange={(arr) => handlerDropdown('characteristic', arr)}
              />
            </div> */}
          </div>
          <CDropBtn />
        </Dropdown.Item>
        <Dropdown.Item key="filter" title="筛选">
          <div
            style={{ maxHeight: '21rem', overflow: 'hidden', display: 'flex' }}
          >
            <SideBar
              activeKey={activeKey}
              onChange={setActiveKey}
              style={{ '--width': '5rem' }}
            >
              {houseParamsData.tabsList.map((item) => (
                <SideBar.Item key={item.key} title={item.title} />
              ))}
            </SideBar>
            <div style={{ flex: 1, overflowY: 'auto', margin: '.5rem' }}>
              {houseParamsData.tabsList.map((item) => (
                <Selector
                  key={item.key}
                  options={houseParamsData[item.key]}
                  defaultValue={[paramForm[item.key]]}
                  columns={item.key === 'characteristic' ? 2 : 3}
                  onChange={(arr) => handlerDropdown(item.key, arr)}
                  style={{
                    display: activeKey === item.key ? 'block' : 'none',
                  }}
                />
              ))}
            </div>
          </div>
          <CDropBtn />
        </Dropdown.Item>
      </Dropdown>
    </div>
  )
}

export default FindHouseDrop
