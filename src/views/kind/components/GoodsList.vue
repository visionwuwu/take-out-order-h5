<template>
  <div class="goods-list">
    <goods-item v-for="goods in goodsList" :key="goods.id" :item="goods"></goods-item>
  </div>
</template>

<script lang="ts">
import { GoodsItem as GoodsItemType } from 'src/store/modules/goods/state'
import { defineComponent, PropType } from 'vue'
import GoodsItem from './GoodsItem.vue'

export default defineComponent({
  name: 'GoodsList',
  components: {
    GoodsItem
  },
  props: {
    goodsList: {
      type: Array as PropType<GoodsItemType[]>,
      required: true,
      default: () => []
    }
  }
})
</script>

<style scoped></style>
