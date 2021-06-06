<template>
  <div class="layout-main-container">
    <router-view v-slot="{ Component, route }">
      <!-- <transition name="fade" mode="out-in">
        <keep-alive v-if="route.meta && !route.meta.noCache">
          <component :is="Component" :key="key" />
        </keep-alive>
        <component v-else :is="Component" :key="key" />
      </transition> -->
      <keep-alive v-if="route.meta && !route.meta.noCache">
        <component :is="Component" :key="key" />
      </keep-alive>
      <component v-else :is="Component" :key="key" />
    </router-view>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const key = computed(() => route.fullPath)
    return { key }
  }
})
</script>

<style scoped lang="less">
.layout-main-container {
  // min-height: calc(100vh - @tabbar-height - @nav-bar-height);
}
</style>
