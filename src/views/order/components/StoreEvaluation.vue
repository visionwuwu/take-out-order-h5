<template>
  <div class="store-evaluation van-hairline--bottom">
    <h2>商家评价</h2>
    <van-rate v-model="storeRate" :size="25" color="#ffd21e" void-icon="star" void-color="#eee" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'StoreEvaluation',
  setup() {
    const data = reactive({
      storeRate: 0
    })

    return {
      ...toRefs(data)
    }
  }
})
</script>

<style scoped lang="less">
.store-evaluation {
  padding: 10px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  h2 {
    font-size: 17px;
    margin-bottom: 15px;
  }
}
</style>
