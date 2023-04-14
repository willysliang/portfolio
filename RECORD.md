---
 * @ Author: willysliang
 * @ Create Time: 2023-01-10 11:07:51
 * @ Modified by: willysliang
 * @ Modified time: 2023-04-14 09:51:14
 * @ Description: 提交日志
---

## 
## 提交日志规则
  - feat 增加新功能
  - fix 修复问题/BUG
  - style 代码风格相关无影响运行结果的
  - perf 优化/性能提升
  - refactor 重构
  - revert 撤销修改
  - test 测试相关
  - docs 文档/注释
  - chore 依赖更新/脚手架配置修改等
  - workflow 工作流改进
  - ci 持续集成
  - types 类型定义文件更改
  - wip 开发中
  - bug 已知错误但未修复
  - modules 添加子项目





## 2023年4月14日09:43:12
  - modules(@willy/mp): 添加 vue 的音乐播放器子项目
  - fix(@willy/lbk): 修复 Bill 模块的样式显示问题

## 2023年3月25日20:34:01
  - feat(@willy/lbk): 房屋详情 Houses
  - chore(@willy/lbk): 打包配置

## 2023年3月24日22:13:01
  -fix(@willy/lbk): 百度地图Map & 房屋通用组件HouseList

## 2023年3月24日20:12:21
  - feat(@willy/lbk): 百度地图 Map

## 2023年3月24日18:03:38
  - wip(@willy/lbk): 百度地图 Map
  <!-- - ci(pnpm i react-activation -F @willy/lbk): 缓存页面插件 -->
  - wip(@willy/lbk): 路由缓存 RouteBeforeEach
  - wip(@willy/lbk): 百度地图 Map

## 2023年3月24日10:49:22
  - feat(@willy/lbk): 找房模块FindHouse
  - refactor(@willy/lbk): 租房 components 整理

## 2023年3月23日17:55:39
  - wip(@willy/lbk): 找房模块FindHouse

## 2023年3月23日11:01:23、2023年3月23日13:51:16、2023年3月23日16:03:44
  - feat(@willy/lbk): 用户信息修改模块userInfo
  - refactor(@willy/lbk): 重构路由配置(router -> route)
  - feat(@willy/lbk): 联系咨询模块 Enquire
  - refactor(@willy/lbk): 重构个人中心模块 personal

## 2023年3月22日10:58:20
  - ci(pnpm i @icon-park/react -F @willy/lbk)：添加 IconPark 图标库
  - feat(@wily/lbk): IconPark 图标组件封装
  - feat(@willy/lbk): 发布房源模块publish(保存/取消操作区、弹出选择器)

## 2023年3月21日13:34:59
  - feat(@willy/lbk): 个人中心(我的收藏favorites、我的出租houses、个人中心样式调整)

## 2023年3月17日18:48:41
  - refactor(@willy/lbk): 重构路由配置(路由拦截、路由转换)

## 2023年3月16日19:17:32
  - ci(@willy/lbk): 个人中心页

## 2023年3月16日14:59:43
  - perf(@willy/lbk): 优化登录页

## 2023年3月15日18:28:09
  - feat(@willy/lbk): 案例 demo

## 2023年3月15日15:16:18、2023年3月15日16:54:21
  - wi(@willy/lbk): 统计
  - ci(pnpm i echarts -F @willy/lbk): 引入 echarts 图表
  - feat(@willy/lbk): 统计 
  - ci(pnpm i qs @types/qs -D -F @willy/lbk): 路由参数识别
  - feat(@willy/lbk): 账单排行 rank

## 2023年3月14日15:33:27
    - feat(@willy/wechat): 项目初始化构建

## 2023年3月14日11:58:27
  - feat(@willy/lbk): 账单详情页

## 2023年3月13日18:17:34
  - feat(@willy/lbk): 首页账单初始完成

## 2023年3月8日13:46:32
  - feat(NeteaseCloudMusicApi): 网易云后端接口服务

## 2023年2月13日15:27:24
  - fix(server): 修复后端服务器报错bug
  - bug(server): 1. 当中断请求时无法做到自动重启应用，仍需手动重启

## 2023年2月10日16:34:50
  - chore(-w): 引入文件解析插件（pnpm i -w  multiparty fs-extra）
  - feat(server): 后端服务器构建

## 2023年2月2日18:39:50、2023年2月3日17:43:33
  - chore(-w): 引入 dayjs
  - feat(@willy/lbk -> home): 首页初步实现

## 2023年2月2日13:41:25、2023年2月2日15:56:02
  - chore(@willy/lbk): 引入 classnames
  - feat(@willy/lbk -> system/login): 登录 & 注册功能实现
  - feat(@willy/lbk -> personal): 个人中心初步实现

## 2023年2月1日17:55:44、2023年2月1日18:30:58
  - chore(@willy/lbk): 引入预处理语言 sass 
  - feat(@willy/lbk): 完善 tsconfig.json 的提示信息
  - feat(@willy/lbk): 页面路由配置、页面大框基础页面创建
  - feat(@willy/lbk): 登录页实现

## 2023年2月1日10:21:13
  - chore(all): 引入模拟数据 mockjs
  - feat(@willy/utils): 配置通用的 http 请求

## 2023年1月24日19:53:50
  - ci(@willy/utils): 创建项目的通用工具包
  - refactor(@willy/lbk): 配置优化

## 2023年1月24日16:34:06
  - chore(all): 引入 stylelint、husky、commitlint

## 2023年1月10日18:19:30
  - chore(all): 引入 typescript、eslint、prettier
  - refactor(lazy-bookkeeping): 调整框架结构

## 2023年1月10日11:08:14
  - init(all): 项目初始化

## 2022年12月26日09:17:24
  - feat(lazy-bookkeeping): 项目初始化
  - chore(pnpm i -S mobx-react-lite mobx): 全局状态管理

