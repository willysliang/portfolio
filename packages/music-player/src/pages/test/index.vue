<!-- eslint-disable prefer-const -->
<!-- eslint-disable n/no-callback-literal -->
<!-- eslint-disable no-unmodified-loop-condition -->
 * @ Modified by: willysliang
 * @ Modified time: 2023-04-10 16:32:05
<!-- eslint-disable @typescript-eslint/no-non-null-assertion -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!--
 * @ Modified by: willysliang
 * @ Modified time: 2023-02-15 17:30:11
 * @ Modified by: willysliang
 * @ Modified time: 2023-02-14 13:40:32
 * @ Description: 测试组件
 -->

<script setup lang="ts">
import { onMounted, ref, reactive, computed, watch, onBeforeMount, onActivated } from 'vue'
import { useRoute } from 'vue-router';
import { demoPages } from '../constant';
// import VirtualList from './VirtualList.vue'

// eslint-disable-next-line no-undef
defineOptions({
  name: demoPages.TEST.name,
  inheritAttrs: false
})

const add = () => {
  console.log('add')
}

/* const data = ref<Array<any>>([])
for (let i = 1; i <= 1000000; i++) {
  data.value.push({
    id: i,
    value: '字符内容'.repeat(Math.random() * 100),
  })
} */

onActivated(() => {
  console.log('aaa')
})
</script>

<script lang="ts">
// export default {
//   name: 'Test',
// }
</script>

<template>
  <div>按钮</div>

  <!--  <VirtualList :list-data="data">
    <template #default="{ listItem }">
      <div> <span class="text-red-600">{{ listItem.idx }}</span> {{ listItem.value }}</div>
    </template>
  </VirtualList> -->
</template>
