<template>
  <van-nav-bar
    class="layout-navbar"
    :title="data.title"
    :left-text="data.leftText"
    :right-text="data.rightText"
    :left-arrow="data.leftArrow"
    :fixed="data.fixed"
    :placeholder="data.placeholder"
    @click-left="handleClickLeft"
  />
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch } from 'vue'
import { Navbar } from 'src/@types/vue-router'
import { useRoute, useRouter } from 'vue-router'
import variables from 'styles/variables.module.less'

const defaultProps: Navbar = {
  title: '',
  leftText: '',
  rightText: '',
  leftArrow: false,
  fixed: true,
  placeholder: true,
  zIndex: 999,
  backPath: ''
}
export default defineComponent({
  name: 'LayoutNavbar',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const data = ref<Navbar>(defaultProps)

    const methods = reactive({
      handleClickLeft: () => {
        if (data.value.backPath) {
          return router.push(data.value.backPath)
        }
        router.back()
      }
    })

    // 监听路由变化设置navbar
    watch(
      () => route.path,
      () => {
        const navbar = route.meta && route.meta.navbar
        if (navbar && typeof navbar === 'object') {
          data.value = { ...defaultProps, ...navbar }
        }
      },
      {
        immediate: true
      }
    )

    return {
      data,
      ...toRefs(methods),
      themeColor: variables.themeColor
    }
  }
})
</script>

<style lang="less">
.layout-navbar {
  .van-nav-bar {
    background: v-bind(themeColor) !important;
    .van-icon,
    &__title {
      color: #fff !important;
    }
  }
}
</style>
