/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-23 16:37:59
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-23 17:53:43
 * @ Description: 下来选择组件
 */

import React, { ForwardedRef, useRef, useState } from 'react'
import { Button, Dropdown, DropdownRef, Selector, SideBar } from 'antd-mobile'
import houseParamsData from '@/pages/personal/constant/house'
import s from '../styles/FindHouse.module.scss'

const DropdownItem = [
  { key: 'area', title: '区域', option: 'area' },
  { key: 'rentType', title: '方式', option: 'line' },
  { key: 'price', title: '租金', option: 'price' },
] as const

const FindHouseDrop = () => {
  // 定义下拉菜单属性
  const dropRef = useRef<DropdownRef>()
  // 定义预筛选的值
  const [paramFormText, setParamFormText] = useState({})
  const [activeKey, setActiveKey] = useState('roomType')

  // 搜索表单数据
  const [paramForm, setParamForm] = useState({
    // cityId: Storage.get("location").value, // 地区的id
    cityId: 1, // 地区的id
    area: null, // 地区
    subway: null, // 地铁
    rentType: null, // 整租
    price: null, // 价格
    roomType: '', // 房屋类型
    oriented: '', // 朝向
    characteristic: '', // 标签
    floor: '', // 楼层
    start: 1, // 开始项
    end: 20, // 结束项
  })

  // 上拉加载是否还有更多内容
  const [hasMore, setHasMore] = useState(false)

  // 城市区域列表
  const [areaList, setAreaList] = useState([])

  // 下拉筛选操作回调
  const handlerDropdown = (e, val) => {
    const data = Object.assign({}, paramFormText, paramForm)
    data[e] = val[0]
    // 保存预筛选的值
    setParamFormText(data)
  }

  // 确认筛选
  const handlerConfirm = () => {
    const data = Object.assign({}, paramFormText, paramForm, { start: 1 })
    setHasMore(true)
    // 把预筛选的值更新到请求表单里
    setParamForm(data)
    // getSearchList(data);
    // 关闭下拉菜单
    dropRef.current?.close()
  }

  return (
    <div className={s['find']}>
      <Dropdown ref={dropRef as ForwardedRef<DropdownRef>}>
        {DropdownItem.map((item) => (
          <Dropdown.Item key={item.key} title={item.title}>
            <Selector
              options={item.option ? houseParamsData[item.option] : areaList}
              columns={3}
              defaultValue={[houseParamsData[item.key]]}
              onChange={(arr) => handlerDropdown(item.key, arr)}
            />
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
          </Dropdown.Item>
        ))}
        <Dropdown.Item key="activeKey" title="筛选">
          <div style={{ height: '21rem', overflow: 'hidden', display: 'flex' }}>
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
        </Dropdown.Item>
      </Dropdown>
    </div>
  )
}

export default FindHouseDrop
