/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-22 13:56:16
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-22 14:51:50
 * @ Description: 发布模块的对话框
 */

import React, { useEffect, useState } from 'react'
import { Dialog, Input } from 'antd-mobile'

interface IAction {
  visible: boolean
  title: string
  key: string
  value: string
}

interface IProps {
  /** 对话框配置项 */
  action: IAction
  /** 关闭 */
  onClose?: (val: IAction) => void
  /** 保存 */
  onSave?: (val: string) => void
}

const PublishDialog = ({ action, ...props }: IProps) => {
  const [inputVal, setInputVal] = useState('')

  useEffect(() => {
    if (action.visible) {
      setInputVal(action.value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action.visible])

  /** 取消对话框 */
  const handleCancel = () => {
    if (props.onClose) {
      props.onClose({ ...action, visible: false })
    }
  }

  /** 保存对话框信息 */
  const handleConfirm = () => {
    if (props.onSave) props.onSave(inputVal)
    handleCancel()
  }

  /** 对话框配置项 */
  const dialogAction = [
    {
      key: 'cancel',
      text: '取消',
      style: { color: '#999' },
      onClick: handleCancel,
    },
    {
      key: 'confirm',
      text: '确定',
      onClick: handleConfirm,
    },
  ]

  return (
    <Dialog
      visible={action.visible}
      title={action.title}
      onClose={handleCancel}
      content={
        <div style={{ border: '1px solid #eee', borderRadius: '3px' }}>
          <Input
            placeholder="请输入内容"
            style={{ '--text-align': 'center' }}
            value={inputVal}
            onChange={(val) => setInputVal(val)}
          />
        </div>
      }
      actions={dialogAction}
    />
  )
}

export default PublishDialog
