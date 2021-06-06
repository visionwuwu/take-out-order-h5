<template>
  <div class="kind-container">
    <van-tabs
      v-model:active="tabIndex"
      ref="tabRef"
      animated
      :color="variables.themeColor"
      lazy-render
      title-inactive-color="gray"
      title-active-color="black"
    >
      <van-tab title="点餐">
        <div class="order-panel">
          <cascad-list :kind-foods-list="kindFoodsList" :kind-menus="kindList" />
        </div>
      </van-tab>
      <van-tab title="评价">
        <div class="comment-panel">
          <van-list v-model:loading="loading" :finished="finished" offset="10" @load="handleOnLoad">
            <comment-list :commentList="commentList" />
            <van-empty v-if="commentList.length === 0" description="暂无评论" />
            <template v-if="commentList.length > 0" #finish> 没有更多了 </template>
          </van-list>
        </div>
      </van-tab>
    </van-tabs>

    <!-- SubmitBar 提交订单栏 -->
    <van-submit-bar
      v-show="tabIndex === 0"
      class="van-hairline--top"
      :class="submitBarClasses"
      :disabled="!cartHasActive"
      :price="formatCartTotalPrice(totalPrice, 'fen')"
      button-text="结算"
      @submit="onSubmit"
    >
      <van-badge :content="totalGoods" max="99" :show-zero="false">
        <van-icon :class="iconCartClasses" @click="toggleShowCart" name="cart-circle-o" />
      </van-badge>
    </van-submit-bar>

    <!-- 购物车弹出层 -->
    <van-popup
      class="cart-popup"
      v-model:show="show"
      :closeable="false"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <div class="cart-popup__content">
        <van-row class="cart-popup__header" justify="space-between">
          <van-col>购物车</van-col>
          <van-col @click="handleEmptyCart">清空购物车</van-col>
        </van-row>
        <div class="cart-popup__body">
          <goods-list :goods-list="goodsList" />
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs, watch } from 'vue'
import { useOrderEffect } from './hooks/useOrderEffect'
import { useCommentEffect } from './hooks/useCommenEffect'
import useCartModel from './hooks/useCartModel'
import useTabRedraw from './hooks/useTabRedraw'
import CommentList from './components/CommentList.vue'
import GoodsList from './components/GoodsList.vue'
import variables from 'styles/variables.module.less'
import { Dialog } from 'vant'
import { emitter, UpdateGoodsCount } from './mitt'
import { useRouter } from 'vue-router'
import { formatCartTotalPrice } from 'utils/helper'
import CommonScroll, { PosType } from 'comps/CommonScroll/index.vue'
import CascadList from './components/CascadList.vue'

export default defineComponent({
  name: 'Kind',
  components: {
    CommentList,
    GoodsList,
    CommonScroll,
    CascadList
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {})
  },
  setup() {
    const router = useRouter()
    const { getKindList, getKindFoodsList, kindList, kindFoodsList } = useOrderEffect()
    const { totalGoods, totalPrice, goodsList, cartHasActive, commitEmptyCart } = useCartModel()
    const { state, getCommentList, tabRef } = useCommentEffect()
    useTabRedraw(tabRef)

    // 定义data
    const data = reactive({
      tabIndex: 0,
      show: false,
      submitBarClasses: computed(() => ({
        'gray-mode': !cartHasActive.value,
        'disabled-submitbar': !cartHasActive.value
      })),
      iconCartClasses: computed(() => ({ 'disabled-icon-cart': !cartHasActive.value }))
    })

    // 是否关闭购物车
    watch(cartHasActive, newVal => {
      if (!newVal && data.show) {
        data.show = false
      }
    })

    // 定义methods
    const methods = reactive({
      handleOnLoad: () => {
        getCommentList()
      },
      toggleShowCart: () => {
        data.show = !data.show
      },
      handleEmptyCart: () => {
        Dialog.confirm({
          title: '提示',
          message: '您确认要清空购物车吗？'
        })
          .then(() => {
            commitEmptyCart()
            emitter.emit('update-goods-count', { type: 'empty', value: '' } as UpdateGoodsCount)
          })
          .catch(() => {})
      },
      onSubmit: () => {
        router.push('/orderConfirm')
      }
    })

    getKindList()
    getKindFoodsList()

    return {
      ...toRefs(state),
      ...toRefs(data),
      ...toRefs(methods),
      formatCartTotalPrice,
      totalGoods,
      totalPrice,
      goodsList,
      cartHasActive,
      tabRef,
      kindList,
      kindFoodsList,
      variables
    }
  }
})
</script>

<style scoped lang="less">
@import 'styles/variables.module.less';
@barsHeight: @tabbar-height + @nav-bar-height;
@submit-bar-height: 50px;
@tabs-line-height: 44px;
.kind-container {
  height: calc(100vh - @barsHeight);
  .van-tabs {
    :deep(.van-tab__pane) {
      // height: calc(100vh - @barsHeight - @tabs-line-height);
    }
  }

  .van-submit-bar {
    bottom: @tabbar-height;
    :deep(.van-submit-bar__button) {
      width: 25.333vw;
      height: 9.667vw;
    }
    .van-icon {
      color: @theme-color;
      font-size: 28px;
    }
  }
  .order-panel {
    // height: 100%;
    height: calc(100vh - @barsHeight - @tabs-line-height - @submit-bar-height);
  }
  .comment-panel {
    height: calc(100vh - @barsHeight - @tabs-line-height);
    padding-bottom: @tabbar-height;
    overflow-y: auto;
  }

  .disabled-submitbar {
    background: hsl(84, 100%, 65%);
    transition: background 0.2s;
  }

  .disabled-icon-cart {
    pointer-events: none;
  }

  :deep(.cart-popup) {
    // padding-top: 30px !important;
    box-sizing: border-box !important;
    .van-popup__close-icon--top-right {
      top: 2.267vw;
      right: 3.267vw;
    }
    &__content {
      position: relative;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    &__header {
      // position: absolute;
      // left: 0;
      width: 100%;
      z-index: 10;
      padding: 10px 15px;
      box-sizing: border-box;
      font-size: 12px;
      background: #f4f4f4;
    }
    &__body {
      flex: 1;
      overflow-y: auto;
    }
  }
}
</style>
