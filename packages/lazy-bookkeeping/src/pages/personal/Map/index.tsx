/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-23 16:30:18
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-24 18:03:24
 * @ Description: 百度地图 Map
 */

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CompassOutline } from 'antd-mobile-icons'
import CTitle from '../components/CTitle'
import s from '../styles/Map.module.scss'

/** 百度地图模块 */
const Map = () => {
  const [search] = useSearchParams()

  /** 定义地图对象 */
  const [map, setMap] = useState<any>(null)
  /** 位置坐标 */
  const [point, setPoint] = useState({ logitude: 0, latitude: 0 })

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
    mapSet.addEventListener('zoomend', () => {
      console.log('zoom')
    })

    setMap(mapSet)
  }

  useEffect(() => {
    getDefaultPoint()
    // 延时初始化，防止定位位置不准确，由于缓存页面卸载后再次初始化会出现定位位置不准确
    setTimeout(initMap, 500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

    // 设置覆盖物样式
    const labelStyle = {
      cursor: 'pointer',
      border: '1px solid rgb(255, 0, 0)',
      padding: '0',
      whiteSpace: 'nowrap',
      fontSize: '1rem',
      color: 'rgb(255, 255, 255)',
      textAlign: 'center',
    }

    cover.setStyle(labelStyle)

    // 添加覆盖物到地图中
    map!.addOverlay(cover)
  }

  useEffect(() => {
    /** 监听到 map 数据变化后再进行创建覆盖物 */
    if (map !== null) RenderHouses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map])

  /** 重置定位 */
  const handleResetPoint = async () => {
    const centerPoint = new (window as any).BMapGL.Point(
      point.logitude,
      point.latitude,
    )
    map.centerAndZoom(centerPoint, 20)
  }

  return (
    <div className={s.container}>
      <CTitle title="百度地图" />
      <div className={s['nav']}>
        <span>
          <b>小区:</b>&nbsp;{search.get('community') || 'willysliang address'}
        </span>
        <CompassOutline
          fontSize={25}
          color="#cc5e56"
          onClick={handleResetPoint}
        />
      </div>
      <div className={s['baidu-map']} id="baidu-map"></div>
    </div>
  )
}

export default Map
