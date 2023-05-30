/**
 * @ Author: willy <willysliang@qq.com>
 * @ Create Time: 2023-05-29 09:48:00
 * @ Modifier by: willy <willysliang@qq.com>
 * @ Modifier time: 2023-05-30 09:49:03
 * @ Description:  VisualEditor 类型约束
 */

/**
 * 容器中每个元素的数据类型
 */
export interface VisualEditorBlockData {
    /** --- 组件的自身配置项 ---- */
    /** component 对象的的 key，通过该值找到 visual config 中的对应的 component */
    componentKey: string
    /** 组件标识 */
    slotName?: string
  
    /** 控制器 */
    controller: {
      /** 添加组件到容器中时是否需要调整位置 */
      adjustPosition: boolean
      /** 组件是否是选中状态 */
      focus: boolean
      /** block 组件元素是否调整大小 */
      hasReasize: boolean
    }
  
    /** 组件的样式 */
    style: {
      top: number // block 在容器中的 top 位置
      left: number // block 在容器中的 left 位置
      width: number // block 组件自身的宽度
      height: number // block 组件自身的高度
      zIndex: number // block 组件元素的 z-index style 属性
    }
  
    /** --- 组件的扩展 ---- */
    /** block 组件元素右侧属性配置信息 */
    props?: Record<string, any>
    /** 组件元素右侧自定义配置属性信息（绑定值） */
    model?: Record<string, any>
  }
  
  /**
   * 编辑器编辑的数据类型
   */
  export interface VisualEditorValue {
    /** 画布容器 */
    container: {
      style: {
        width: number | string
        height: number | string
      }
      blocks: Array<VisualEditorBlockData>
    }
  }
  
  /**
   * 编辑器中自定义组件的类型
   */
  export interface VisualEditorComponent {
    /** key 组件唯一标识符 */
    key: string
    /** label 组件左侧显示名 */
    label: string
    /** render 组件渲染函数，拖拽后在容器区与呈现的函数 */
    render: (data: {
      block: VisualEditorBlockData
      size: { width?: string; height?: string }
    }) => JSX.Element
    /** preview 组件左侧预览函数 */
    preview: () => JSX.Element
  }
  