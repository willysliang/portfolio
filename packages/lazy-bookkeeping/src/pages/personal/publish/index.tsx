/**
 * @ Author: willysliang
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-22 10:45:35
 * @ Modified time: 2023-03-23 16:07:36
 * @ Description: 发布房源 Publish
 */

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Dialog,
  ImageUploader,
  ImageUploadItem,
  List,
  NavBar,
  Picker,
  TextArea,
} from 'antd-mobile'
import HousesConfig from '@/components/house/HouseConfig'
import PublishController from './PublishController'
import PublishPopup from './PublishPopup'
import PublishDialog from './PublishDialog'
import houseParamsData from '@/pages/personal/constant/house'
import s from '../styles/Publish.module.scss'

const TextMsg = ({ msg }: { msg: string }) => (
  <span style={{ color: '#999' }}>{msg}</span>
)
// 过滤
const filter = (key, val) =>
  houseParamsData[key].filter((item) => item.value === val)[0].label

const Publish = () => {
  // 发布表单数据
  const [dataForm, setDataForm] = useState({
    title: '',
    description: '',
    houseImg: [],
    oriented: '',
    supporting: '',
    price: '',
    roomType: '',
    size: '',
    floor: '',
    community: '',
  })

  // 默认上传图片数据
  const [fileList, setFileList] = useState<Array<ImageUploadItem>>([])

  /** 图片上传操作 */
  const mockUpload = async (file: File) => ({ url: URL.createObjectURL(file) })
  const changeImg = (imgs) => {
    setFileList(imgs)
    setDataForm(Object.assign({}, dataForm, { houseImg: imgs }))
  }

  /**
   * 选择器/对话框
   */
  // 定义整合弹窗数据
  const [dialogAction, setDialogAction] = useState({
    visible: false,
    title: '小区名称',
    key: '',
    value: '',
  })
  // 定义底部弹窗筛选数据
  const [popupData, setPopupData] = useState({
    visible: false,
    title: '户型',
    key: '',
    value: '',
  })

  /** 对话框操作 */
  const handlerItem = (key, value, title, type = 1) => {
    if (type === 1) {
      setDialogAction({ visible: true, title, key, value })
    } else {
      setPopupData({ visible: true, title, key, value })
    }
  }

  // 下拉弹窗确认选择回调
  const popupConfirm = (val: null | string | undefined = '') => {
    // 更新表单数据
    const data = Object.assign({}, dataForm)
    data[popupData.key] = val ? val : popupData.value
    setDataForm(data)
    // 关闭弹窗
    setPopupData(Object.assign({}, popupData, { visible: false }))
  }

  const handleDialogSave = (val) => {
    const data = Object.assign({}, dataForm)
    data[dialogAction.key] = val
    setDataForm(data)
  }

  /**
   * 弹层
   */
  // 底部小区选择弹窗
  const [communityShow, setCommunityShow] = useState(false)
  // 小区名称
  const [communityName, setCommunityName] = useState('')
  const handleSelect = ([value, label]: [string, string]) => {
    setCommunityName(label)
    setDataForm(Object.assign({}, dataForm, { community: value }))
  }

  /**
   * 保存、返回
   */
  const navigate = useNavigate()
  /** 取消，返回上级 */
  const handleBack = () => {
    Dialog.confirm({
      title: '提示',
      content: '放弃发布房源？',
      confirmText: '继续编辑',
      cancelText: '放弃',
      onCancel: () => navigate(-1),
    })
  }

  return (
    <div className={s['container']}>
      <NavBar onBack={handleBack}>发布房源</NavBar>

      {/* 主内容表单 */}
      <div className={s['list-box']}>
        <List mode="card">
          <List.Item
            extra={
              communityName ? communityName : <TextMsg msg={'请输入小区名称'} />
            }
            onClick={() => setCommunityShow(true)}
          >
            <span className="list-span">小区名称</span>
          </List.Item>
          <List.Item
            extra={
              dataForm.price ? (
                dataForm.price + ' 元/月'
              ) : (
                <TextMsg msg={'请输入租金/月'} />
              )
            }
            onClick={() => handlerItem('price', dataForm.price, '租金')}
          >
            <span className="list-span">租金</span>
          </List.Item>
          <List.Item
            extra={
              dataForm.size ? (
                dataForm.size + '平米'
              ) : (
                <TextMsg msg={'请输入建筑面积'} />
              )
            }
            onClick={() => handlerItem('size', dataForm.size, '建筑面积')}
          >
            <span className="list-span">建筑面积</span>
          </List.Item>

          <List.Item
            extra={
              dataForm.roomType ? (
                filter('roomType', dataForm.roomType)
              ) : (
                <TextMsg msg={'请选择'} />
              )
            }
            onClick={() =>
              handlerItem('roomType', dataForm.roomType, '户型', 2)
            }
          >
            <span className="list-span">户型</span>
          </List.Item>
          <List.Item
            extra={
              dataForm.floor ? (
                filter('floor', dataForm.floor)
              ) : (
                <TextMsg msg={'请选择'} />
              )
            }
            onClick={() => handlerItem('floor', dataForm.floor, '所在楼层', 2)}
          >
            <span className="list-span">所在楼层</span>
          </List.Item>
          <List.Item
            extra={
              dataForm.oriented ? (
                filter('oriented', dataForm.oriented)
              ) : (
                <TextMsg msg={'请选择'} />
              )
            }
            onClick={() =>
              handlerItem('oriented', dataForm.oriented, '朝向', 2)
            }
          >
            <span className="list-span">朝向</span>
          </List.Item>

          <List.Item>
            <span className="list-span">房屋标题</span>
          </List.Item>
          <List.Item>
            <TextArea
              placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
              value={dataForm.title}
              style={{ '--font-size': '15px' }}
              onChange={(val) => {
                setDataForm(Object.assign({}, dataForm, { title: val }))
              }}
            />
          </List.Item>
          <List.Item>
            <span className="list-span">房屋图像</span>
          </List.Item>
          <List.Item>
            <ImageUploader
              value={fileList}
              onChange={changeImg}
              upload={mockUpload}
            />
          </List.Item>
          <List.Item>
            <span className="list-span">房屋配置</span>
          </List.Item>
          <List.Item>
            <HousesConfig
              configItem={dataForm.supporting}
              handConfig={(val) =>
                setDataForm(Object.assign({}, dataForm, { supporting: val }))
              }
            />
          </List.Item>
          <List.Item>
            <span className="list-span">房屋描述</span>
          </List.Item>
          <List.Item>
            <TextArea
              placeholder="请输入房屋的描述信息"
              rows={4}
              value={dataForm.description}
              style={{ '--font-size': '15px' }}
              onChange={(val) => {
                setDataForm(Object.assign({}, dataForm, { description: val }))
              }}
            />
          </List.Item>
        </List>
      </div>

      {/* 操作区 */}
      <div className={s['list-save']}>
        <PublishController dataForm={dataForm} />
      </div>

      {/* 选择器 */}
      <Picker
        title={popupData.title}
        columns={[houseParamsData[popupData.key]]}
        visible={popupData.visible}
        onClose={() =>
          setPopupData(Object.assign({}, popupData, { visible: false }))
        }
        value={[popupData.value]}
        onConfirm={(v) => popupConfirm(v[0])}
      />

      {/* 对话框 */}
      <PublishDialog
        action={dialogAction}
        onClose={(data) => setDialogAction(data)}
        onSave={handleDialogSave}
      />

      {/* 弹出层 */}
      <PublishPopup
        show={communityShow}
        handleClose={(val) => setCommunityShow(val)}
        handleSelect={handleSelect}
      />
    </div>
  )
}

export default Publish
