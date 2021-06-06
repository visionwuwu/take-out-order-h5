<template>
  <div class="card-goods-list">
    <van-card
      v-for="goods in goodsList"
      :key="goods.id"
      :num="goods.num"
      :price="goods.price"
      :desc="goods.desc"
      :title="goods.title"
      :thumb="goods.thumb"
    ></van-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export interface CardGoodsItem {
  id: number | string
  num: number | string
  price: number | string
  desc?: string
  title: string
  thumb: string
}

export type CardGoodsList = CardGoodsItem[]

export default defineComponent({
  name: 'CardGoodsList',
  props: {
    goodsList: {
      type: Array as PropType<CardGoodsList>,
      required: true,
      default: () => {}
    },
    thumbSize: {
      type: Number,
      default: 40
    },
    backgroundColor: {
      type: String,
      default: '#fff'
    }
  },
  setup(props) {
    return {
      thumbSize: `${props.thumbSize}px`,
      backgroundColor: props.backgroundColor
    }
  }
})
</script>

<style scoped lang="less">
.card-goods-list {
  :deep(.van-card) {
    background: v-bind(backgroundColor);
    .van-card__thumb {
      width: v-bind(thumbSize);
      height: v-bind(thumbSize);
    }
    .van-card__content {
      min-height: auto;
    }
  }
}
</style>
