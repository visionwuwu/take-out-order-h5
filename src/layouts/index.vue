<template>
  <div class="layouts-container">
    <!-- 布局-导航条 -->
    <!-- <transition name="fade">
      <Navbar v-if="showNavbar" />
    </transition> -->
    <Navbar v-if="showNavbar" />
    <!-- 布局-主内容区域 -->
    <AppMain />
    <!-- 布局-底部标签栏 -->
    <Tabbar v-if="showTabbar" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './Navbar.vue'
import Tabbar from './Tabbar.vue'
import AppMain from './AppMain.vue'

export default defineComponent({
  components: {
    Navbar,
    Tabbar,
    AppMain
  },
  setup() {
    const route = useRoute()

    const showNavbar = computed(() => {
      const navbar = route.meta ? route.meta.navbar : false
      return navbar
    })

    const showTabbar = computed(() => {
      const showTab = route.meta ? route.meta.showTab : false
      return showTab
    })

    return {
      showNavbar,
      showTabbar
    }
  }
})
</script>

<style scoped lang="less"></style>
