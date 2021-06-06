<template>
  <div class="not-found-container">
    <van-empty description="抱歉，您访问的资源不存在！！！" :image="notFound">
      <van-button round type="primary" class="bottom-button" @click="$router.push('/')"
        >返回</van-button
      >
    </van-empty>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import notFound from 'assets/images/404.png'

export default defineComponent({
  setup() {
    return {
      notFound
    }
  }
})
</script>

<style>
.not-found-container {
  padding-top: 30px;
}
.not-found-container .van-empty__image {
  width: 150px;
  height: 150px;
}
.bottom-button {
  width: 160px;
  height: 40px;
}
</style>
