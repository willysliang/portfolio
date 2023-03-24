# BUG 记录







## 2023年3月24日18:31:15 (wip)
  - wip(@willy/lbk): (FindHouseDrop.tsx) 找房下拉选择的地铁选择
  - wip(@willy/lbk): (Map/index.tsx) 地图的 RenderHouses 函数页面初始化加载没法生效
      - （只有打开当前页，并且在 Map/index.tsx 按保存该文件，才会触发显示）
  - wip(@willy/lbk): (MapPopup.tsx) 地图弹出层的列表布局（图片有时候会消失，猜测是 flex:1 导致） √
      - 解决：因为在样式中设置了只能一行显示（但父级没有设置溢出隐藏）

## 2023年3月24日18:31:15
  - bug(@willy/lbk): 2. 未完成路由懒加载
      - `import KeepAlive from 'react-activation'`

## 2023年3月17日19:29:51
  - bug(@willy/lbk): 1. 二级路由无法显示