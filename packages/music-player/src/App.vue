<!--
 * @ Author: willysliang
 * @ Create Time: 2023-03-21 23:34:10
 * @ Modified by: willysliang
 * @ Modified time: 2023-04-10 18:11:01
 * @ Description: 页面主入口
 -->

<script setup lang="ts">
import { usePlayerInit } from '@/store/player'
import { useLocaleHook } from '@/locales/useLocaleHook'
import { useRouteCache } from '@/hooks/useRouteCache'
import { Pages } from './router/constant'

/** 音乐播放初始化 */
usePlayerInit()

/** 路由缓存 */
const { getCache, addCache } = useRouteCache()
addCache(Pages.INDEX.name)

/** 获取 ElementUI 语言 */
const { getElLocale } = useLocaleHook()
</script>

<template>
  <el-config-provider :locale="getElLocale">
    <router-view v-slot="{ Component }">
      <keep-alive :include="getCache()">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </el-config-provider>
</template>
