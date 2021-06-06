<template>
  <van-swipe class="banners-swipe" :autoplay="3000" indicator-color="white" lazy-render>
    <van-swipe-item v-for="banner in bannerList" :key="banner.id">
      <van-image width="100%" height="150" :src="banner.image" />
    </van-swipe-item>
  </van-swipe>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { BannerList } from 'src/apis/banner/model/bannerModel'

export default defineComponent({
  name: 'Banner',
  props: {
    bannerList: {
      type: Array as PropType<BannerList>,
      required: true,
      default: () => []
    }
  }
})
</script>
