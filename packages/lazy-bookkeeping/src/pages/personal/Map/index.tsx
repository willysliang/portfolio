/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-23 16:30:18
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-24 22:02:47
 * @ Description: 百度地图 Map
 */

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CompassOutline } from 'antd-mobile-icons'
import CTitle from '../components/CTitle'
import MapPopup from './MapPopup'
import { getAreaMap } from '@/api/house'
import { IAreaMapItem } from '#/house'
import s from '../styles/Map.module.scss'

const labelStyle = {
  cursor: 'pointer',
  border: '1px solid rgb(255, 0, 0)',
  padding: '0',
  whiteSpace: 'nowrap',
  fontSize: '1rem',
  color: 'rgb(255, 255, 255)',
  textAlign: 'center',
}

/** 百度地图模块 */
// 由于父组件 setState 值发生改变，从而使子组件重复无效渲染降低用户体验，React.memo 阻止子组件无效重复渲染
// 第二个参数 (prevProps, nextProps) => prevProps.nowTime === nextProps.nowTime，对比 新旧值 是否重新渲染，true 禁止重新渲染，false 将重新渲染
const Map = React.memo(() => {
  const [search] = useSearchParams()
  const locationData = { id: '222' }

  /** 定义地图对象 */
  const [map, setMap] = useState<any>(null)
  /** 位置坐标 */
  const [point, setPoint] = useState({ logitude: 0, latitude: 0 })
  /** 弹出层 */
  const [visible, setVisible] = useState<boolean>(false)

  /** 获取当前位置定位 */
  const getDefaultPoint = () => {
    let defaultPoint = { logitude: 0, latitude: 0 }
    const myCity = new (window as any).BMapGL.LocalCity()
    myCity.get((r) => {
      defaultPoint = {
        logitude: r.center.lng,
        latitude: r.center.lat,
      }
      setPoint(defaultPoint)
    })
  }

  /** 初始化地图 */
  const initMap = async () => {
    // 创建地图实例
    const mapSet = new (window as any).BMapGL.Map('baidu-map')
    // 添加缩放控件
    const zoomCtrl = new (window as any).BMapGL.ZoomControl()
    mapSet.addControl(zoomCtrl)
    // 设置中心点坐标
    const centerPoint = new (window as any).BMapGL.Point(
      point.logitude,
      point.latitude,
    )
    // 地图初始化，同时设置地图展示级别
    mapSet.centerAndZoom(centerPoint, 20)
    // 取消地图双击缩放
    mapSet.disableDoubleClickZoom()

    //监听地图缩放事件
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    mapSet.addEventListener('zoomend', () => {})

    setMap(mapSet)
  }

  useEffect(() => {
    getDefaultPoint()
    // 延时初始化，防止定位位置不准确，由于缓存页面卸载后再次初始化会出现定位位置不准确
    setTimeout(initMap, 500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * @desc 渲染覆盖物入口
   * @id 获取该区域下的房源数据
   * @size 获取房源类型以及下级地图缩放级别
   */
  const getAreaHomeList = async (id, size = null) => {
    try {
      const res = await getAreaMap({ id })
      setTimeout(() => {
        // 调用地图的 getZoom() 方法，来获取当前缩放级别
        const zoomSize = map.getZoom()
        // 遍历循环数据
        res.forEach((item) => {
          // 创建覆盖物
          createCover(item, size ? size : zoomSize)
        })
      }, 700)
    } catch {}
  }

  // 创建区、镇、市覆盖物
  const createCover = (home: IAreaMapItem, zoomSize) => {
    const {
      coord: { longitude, latitude },
      id,
      label,
      count,
    } = home

    // 创建坐标对象
    const areaPoint = new (window as any).BMapGL.Point(
      longitude ?? point.logitude,
      latitude ?? point.latitude,
    )

    /** 创建覆盖物 */
    const cover = new (window as any).BMapGL.Label('', {
      position: areaPoint,
      offset: new (window as any).BMapGL.Size(-35, -35),
    })
    // 给 cover 对象添加一个唯一标识
    cover.id = id

    // 判断缩放级别渲染覆盖物
    if (zoomSize < 14) {
      // 区或镇：设置房源覆盖物内容
      cover.setContent(
        `<div class="${s.bubble}">
          <p class="${s.name}">${label}</p>
          <p>${count}套</p>
        </div>`,
      )
    } else {
      /** 小区：设置房源覆盖物内容 */
      cover.setContent(
        `<div class="${s.rect}">
          <span class="${s.housename}">${label}</span>
          <span class="${s.housenum}">${count}套</span>
          <i class="${s.arrow}"></i>
        </div>`,
      )
    }

    // 设置覆盖物样式
    cover.setStyle(labelStyle)

    cover.addEventListener('click', async (e) => {
      // 根据市、镇、区 缩放地图
      if (zoomSize < 12) map.centerAndZoom(areaPoint, 13) // 镇
      else if (zoomSize >= 12 && zoomSize < 14) {
        // 地图缩放，区
        map.centerAndZoom(areaPoint, 15)
      }

      if (zoomSize > 14) {
        // 获取当前被点击项
        const target = e.domEvent

        map.panBy(
          window.innerWidth / 2 - target.clientX,
          (window.innerHeight - 330) / 2 - target.clientY,
        )

        // 打开弹层
        setVisible(true)
      } else {
        // 调用 getAreaHomeList 方法，获取该区域下的房源数据
        getAreaHomeList(id)

        // 清除当前覆盖物信息
        map.clearOverlays()
      }
    })

    // 添加覆盖物到地图中
    map!.addOverlay(cover)
  }

  /** 渲染覆盖物 */
  const RenderHouses = () => {
    /** 创建覆盖物 */
    const cover = new (window as any).BMapGL.Label('', {
      position: new (window as any).BMapGL.Point(
        point.logitude,
        point.latitude,
      ),
      offset: new (window as any).BMapGL.Size(-35, -35),
    })

    /** 设置房源覆盖物内容 */
    cover.setContent(
      `<div class="${s.rect}">
        <span >${'sshakshk'}</span>
        <i class="${s.arrow}"></i>
      </div>`,
    )

    cover.setStyle(labelStyle)

    // 添加覆盖物到地图中
    map!.addOverlay(cover)
  }

  useEffect(() => {
    /** 监听到 map 数据变化后再进行创建覆盖物 */
    if (map !== null) {
      getAreaHomeList(locationData.id)
      RenderHouses()
    } else {
      initMap()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map])

  /** 重置定位 */
  const handleResetPoint = async () => {
    // 设置中心点坐标
    const centerPoint = new (window as any).BMapGL.Point(
      point.logitude,
      point.latitude,
    )
    // 地图初始化，同时设置地图展示级别
    map.centerAndZoom(centerPoint, 20)
    // 清除当前覆盖物信息
    map.clearOverlays()
    // 关闭底部弹窗
    setVisible(false)
    // 初始化房源
    getAreaHomeList(locationData.id)
  }

  return (
    <div className={s.container}>
      <CTitle
        title="百度地图"
        right={<span onClick={handleResetPoint}>重置房源</span>}
      />
      <div className={s['nav']}>
        <span onClick={() => setVisible(true)}>
          <b>小区:</b>&nbsp;{search.get('community') || 'willysliang address'}
        </span>
        <CompassOutline
          fontSize={25}
          color="#cc5e56"
          onClick={handleResetPoint}
        />
      </div>

      {/* 地图 */}
      <div className={s['baidu-map']} id="baidu-map"></div>

      {/* 弹出层 */}
      <MapPopup visible={visible} changeVisible={setVisible} />
    </div>
  )
})

Map.displayName = 'Map'

export default Map
