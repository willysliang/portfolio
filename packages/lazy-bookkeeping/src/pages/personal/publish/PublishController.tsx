/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-22 15:56:53
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-22 16:30:09
 * @ Description: 发布模块的操作区
 */

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Dialog, Toast } from 'antd-mobile'
import { upUserHouses } from '@/api/house'

const PublishController = ({ dataForm }: { dataForm: any }) => {
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

  /** 确认发布 */
  const handlerConfirm = () => {
    for (const key in dataForm) {
      if (!dataForm[key]) {
        return Toast.show({ content: '还有未填写的房源信息' })
      }
    }
    Dialog.confirm({
      title: '提示',
      content: '是否确认发布此房源信息？',
      onConfirm: async () => {
        try {
          await upUserHouses(dataForm)
          Toast.show({
            content: '发布成功',
            icon: 'success',
            duration: 1200,
            maskClickable: false,
            afterClose: () => navigate(-1),
          })
        } catch {
          Toast.show({
            content: '发布失败',
            icon: 'error',
            duration: 1200,
            maskClickable: false,
          })
        }
      },
    })
  }

  return (
    <>
      <Button block shape="rectangular" onClick={handleBack}>
        取 消
      </Button>
      <Button
        block
        color="primary"
        shape="rectangular"
        onClick={handlerConfirm}
      >
        提 交
      </Button>
    </>
  )
}

export default PublishController
