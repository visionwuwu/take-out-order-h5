<template>
  <div>
    <!-- 轮播图 -->
    <Banner :bannerList="bannerList" />
    <!-- 菜品种类 -->
    <Kind :kindList="kindList" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Banner from './components/Banner.vue'
import Kind from './components/KindList.vue'
import { useBannerEffect } from './hooks/useBannerEffect'
import { useKindEffect } from './hooks/useKindEffect'

export default defineComponent({
  name: 'Home',
  components: {
    Banner,
    Kind
  },
  setup() {
    const { getBannerList, bannerList } = useBannerEffect()
    const { getKindList, kindList } = useKindEffect()

    getBannerList()
    getKindList()

    return {
      bannerList,
      kindList
    }
  }
})
</script>

<style scoped></style>
