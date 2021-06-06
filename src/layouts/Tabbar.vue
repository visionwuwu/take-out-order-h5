<template>
  <van-tabbar v-model="active" @change="handleChange" fixed placeholder border>
    <van-tabbar-item name="/home" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item name="/kind" icon="apps-o">分类</van-tabbar-item>
    <van-tabbar-item name="/order" icon="orders-o">订单</van-tabbar-item>
    <van-tabbar-item name="/my" icon="friends-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    const active = ref(route.path)

    const handleChange = (name: string) => {
      const query: any = {}
      router.replace({
        path: name,
        query
      })
    }

    return { active, handleChange }
  }
})
</script>

<style scoped></style>
