/**
 * @ Author: willy <willysliang@qq.com>
 * @ Create Time: 2023-05-29 10:01:44
 * @ Modifier by: willy <willysliang@qq.com>
 * @ Modifier time: 2023-05-30 09:49:54
 * @ Description: createVisualConfig - 创建编辑器的预设内容
 */

import { VisualEditorComponent } from "../types"

/**
 * 创建编辑器的预设内容
 */
export function createVisualConfig() {
  // 用于 block 数据，通过 componentKey 找到 component 对象，使用 component 对象的 render 属性渲染内容到 container 容器
  type ComponentMap = { [key: string]: VisualEditorComponent }
  const componentMap: ComponentMap = {}

  /** 用户在 menu 中预定义的组件列表 */
  const componentList: VisualEditorComponent[] = []

  /** 注册组件 */
  const registryComponent = (
    key: string,
    options: Omit<VisualEditorComponent, 'key'>,
  ) => {
    // 根据 Key 的唯一性来查找是否存在组件
    if (componentMap[key]) {
      const index = componentList.indexOf(componentMap[key])
      componentList.splice(index, 1)
    }

    const newComponent = {
      key,
      ...options,
    }

    componentList.push(newComponent)
    componentMap[key] = newComponent
  }

  return {
    componentList,
    componentMap,
    registryComponent,
  }
}

/** 创建编辑器的预设内容的返回值 */
export type visualEditorConfig = ReturnType<typeof createVisualConfig>
