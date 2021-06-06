<template>
  <div class="my-container">
    <!-- 用户信息 -->
    <Info />
    <!-- 工具条 -->
    <Tools />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Info from './components/Info.vue'
import Tools from './components/Tools.vue'

export default defineComponent({
  name: 'My',
  components: {
    Info,
    Tools
  },
  setup() {
    console.log('My')
    return {}
  }
})
</script>

<style scoped></style>
