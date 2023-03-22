/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-22 13:08:36
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-22 16:18:18
 * @ Description: 发布弹层
 */

import React, { useEffect, useState } from 'react'
import { CheckList, Empty, NavBar, Popup, SearchBar } from 'antd-mobile'
import { getAreaCommunity } from '@/api/house'
import { IAreaCommunityItem } from '#/house'
import s from './styles/PublishPopup.module.scss'

interface IProps {
  /** 弹层显隐 */
  show: boolean
  handleClose: (val: boolean) => void
  /** 触发选择 */
  handleSelect?: (val: [string, string]) => void
}

const PublishPopup = ({ show, handleClose, ...props }: IProps) => {
  // 小区列表
  const [allAreaList, setAllAreaList] = useState<Array<IAreaCommunityItem>>([])
  const [communityList, setCommunityList] = useState<Array<IAreaCommunityItem>>(
    [],
  )
  // 小区关键字
  const [communityValue, setCommunityValue] = useState('')
  // 小区默认值
  const [defaultValue, setDefaultValue] = useState('')

  // 小区确认选择回调
  const communityConfirm = () => {
    const [value, label] = defaultValue.split(',')
    if (props.handleSelect) props.handleSelect([value, label])
    handleClose(false)
  }

  /** 获取当前定位城市小区列表 */
  const getCommunityList = async () => {
    try {
      const res = await getAreaCommunity()
      setCommunityList(res)
      setAllAreaList(res)
    } catch {}
  }

  useEffect(() => {
    getCommunityList()
  }, [])

  const filterCommunityList = () => {
    const filterData = allAreaList.filter(
      (item) => item.name.search(communityValue) !== -1,
    )
    setCommunityList(filterData)
  }

  const handleCheck = (val) => {
    setDefaultValue(val[0])
    communityConfirm()
  }

  return (
    <Popup visible={show} onMaskClick={() => handleClose(false)}>
      <div className={s['container']}>
        <NavBar
          back="取消"
          onBack={() => handleClose(false)}
          backArrow={false}
          right={
            <span style={{ fontSize: 15 }} onClick={communityConfirm}>
              确认
            </span>
          }
        >
          小区名称
        </NavBar>
        <div style={{ border: '1px solid #eee' }}>
          <SearchBar
            style={{ width: '100%' }}
            value={communityValue}
            onChange={(val) => setCommunityValue(val)}
            placeholder="请输入小区关键字"
            clearOnCancel={false}
            cancelText="搜索"
            showCancelButton={() => true}
            onCancel={filterCommunityList}
          />
        </div>
        <div className={s['list-box']}>
          {communityList.length <= 0 ? (
            <Empty description="暂无数据" />
          ) : (
            <CheckList onChange={handleCheck}>
              {communityList.map((item) => (
                <CheckList.Item key={item.id} value={item.id + ',' + item.name}>
                  {item.name}
                </CheckList.Item>
              ))}
            </CheckList>
          )}
        </div>
      </div>
    </Popup>
  )
}

export default PublishPopup
