/**
 * @ Author: willy <willysliang@qq.com>
 * @ Create Time: 2023-06-25 11:30:02
 * @ Modifier by: willy <willysliang@qq.com>
 * @ Modifier time: 2023-06-25 17:37:21
 * @ Description: 弹层
 */

import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { cloneDeep } from 'lodash'
import { Input, Dialog, TextArea } from 'antd-mobile'
import { Action } from 'antd-mobile/es/components/dialog'
import { defer } from '@/visualEditor/utils/defer'

export enum DialogEdit {
  input = 'input',
  textarea = 'textarea',
}

interface DialogOption {
  title?: string
  message?: string | (() => any)
  confirmButton?: boolean
  cancelButton?: boolean
  editType?: DialogEdit
  editValue?: string
  editReadonly?: boolean
  width?: string
  onConfirm?: (editValue?: string) => void
  onCancel?: () => void
}

interface DialogInstance {
  show: (option?: DialogOption) => void
  close: () => void
}

/**
 * 弹层组件
 */
const DialogComponent: React.FC<{
  option?: DialogOption
  onRef?: (ins: DialogInstance) => void
}> = (props) => {
  const [option, setOption] = useState(props.option || {})
  const [showFlag, setShowFlag] = useState(false)
  const [editValue, setEditValue] = useState(option ? option.editValue : '')

  const methods = {
    show: (option?: DialogOption) => {
      setOption(cloneDeep(option || {}))
      setEditValue(!option ? '' : option.editValue || '')
      setShowFlag(true)
    },
    close: () => setShowFlag(false),
  }

  props.onRef && props.onRef(methods)

  const handler = {
    onConfirm: () => {
      option.onConfirm && option.onConfirm(editValue)
      methods.close()
    },
    onCancel: () => {
      option.onCancel && option.onCancel()
      methods.close()
    },
  }

  const inputProps = {
    value: editValue,
    onChange: (value: string) => setEditValue(value),
    readOnly: option.editReadonly === true,
  }

  const modalActions: Action[] = [
    {
      key: 'cancelButton',
      text: '取消',
      onClick: handler.onCancel,
    },
    {
      key: 'confirmButton',
      text: '确定',
      onClick: handler.onConfirm,
    },
  ]

  return (
    <Dialog
      closeOnMaskClick={true}
      closeOnAction={true}
      visible={showFlag}
      title={option.title || '系统提示'}
      onClose={handler.onCancel}
      actions={modalActions}
      content={
        <>
          {option.message}
          {option.editType === DialogEdit.input && <Input {...inputProps} />}
          {option.editType === DialogEdit.textarea && (
            <TextArea {...inputProps} rows={15} />
          )}
        </>
      }
    />
  )
}

const getInstance = (() => {
  let ins: null | DialogInstance = null
  return (option?: DialogOption) => {
    if (!ins) {
      const el = document.createElement('div')
      document.body.appendChild(el)
      ReactDOM.render(
        <DialogComponent option={option} onRef={(val) => (ins = val)} />,
        el,
      )
    }
    return ins
  }
})()

const DialogService = (option?: DialogOption) => {
  const instance = getInstance(option)
  instance?.show && instance.show(option)
}

export const $$dialog = Object.assign(DialogService, {
  textarea: (val?: string, option?: DialogOption) => {
    const dfd = defer<string | undefined>()
    option = option || {}
    option.editType = DialogEdit.textarea
    option.editValue = val
    if (option.editReadonly !== true) {
      option.confirmButton = true
      option.cancelButton = true
      option.onConfirm = dfd.resolve
    }
    DialogService(option)
    return dfd.promise
  },
  input: (val?: string, option?: DialogOption) => {
    // TODO
    const dfd = defer<string | undefined>()
    option = option || {}
    option.editType = DialogEdit.textarea
    option.editValue = val
    if (option.editReadonly !== true) {
      option.confirmButton = true
      option.cancelButton = true
      option.onConfirm = dfd.resolve
    }
    DialogService(option)
    return dfd.promise
  },
})
