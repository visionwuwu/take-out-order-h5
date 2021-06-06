<template>
  <div class="goods-item van-hariline-bottom van-hariline-top">
    <van-card
      :num="item.count"
      :price="computedPrice(item.count, item.price)"
      :desc="item.remarks"
      :title="item.name"
      :thumb="item.image"
    >
      <template #num>
        <van-stepper
          @plus="handlePlus(item)"
          @minus="handleMinus(item)"
          v-model="item.count"
          min="0"
          theme="round"
          button-size="18"
          disable-input
        />
      </template>
    </van-card>
  </div>
</template>

<script lang="ts">
import { GoodsItem } from 'src/store/modules/goods/state'
import useCartModel from '../hooks/useCartModel'
import { defineComponent, PropType, reactive, toRefs } from 'vue'
import { emitter, UpdateGoodsCount } from '../mitt'

export default defineComponent({
  name: 'GoodsItem',
  props: {
    item: {
      type: Object as PropType<GoodsItem>,
      required: true
    }
  },
  setup() {
    const { commitAddGoods, commitRemoveGoods } = useCartModel()

    const methods = reactive({
      handlePlus: (food: GoodsItem) => {
        commitAddGoods(food)
        emitter.emit('update-goods-count', { type: 'increment', value: food } as UpdateGoodsCount)
      },
      handleMinus: (food: GoodsItem) => {
        commitRemoveGoods(food.id)
        emitter.emit('update-goods-count', { type: 'decrement', value: food } as UpdateGoodsCount)
      },
      computedPrice: (count: number, price: number) => {
        return (count * price).toFixed(2)
      }
    })
    return {
      ...toRefs(methods)
    }
  }
})
</script>

<style scoped lang="less">
.goods-item {
  :deep(.van-card) {
    .van-card__thumb {
      width: 15.467vw;
      height: 15.467vw;
    }
    .van-card__content {
      min-height: auto !important;
    }
  }
}
</style>
