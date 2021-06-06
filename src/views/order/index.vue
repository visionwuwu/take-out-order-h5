<template>
  <div class="order-container">
    <van-tabs
      v-model:active="tabIndex"
      :color="variables.themeColor"
      title-inactive-color="gray"
      title-active-color="black"
      @click="handleTabsClick"
    >
      <van-tab
        :name="tabItem.type"
        v-for="tabItem in tabList"
        :key="tabItem.type"
        :title="tabItem.title"
      >
        <van-list
          v-model:loading="tabItem.data.loading"
          :finished="tabItem.data.finished"
          offset="10"
          :immediate-check="false"
          @load="onLoad(tabItem)"
        >
          <order-list v-if="tabItem.data.list.length > 0" :order-list="tabItem.data.list" />
          <template #finish v-if="tabItem.data.list.length > 0">{{
            tabItem.data.finishedText
          }}</template>
          <van-empty v-if="tabItem.data.list.length === 0" description="暂无订单" />
        </van-list>
      </van-tab>
    </van-tabs>

    <div v-show="loading" class="loading">
      <van-loading size="24px" type="spinner">加载中...</van-loading>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, reactive, ref, toRefs } from 'vue'
import { useOrderListEffect, TabItem } from './hooks/useOrderListEffect'
import { EmitData, emitter } from './mitt'
import CommonScroll from 'comps/CommonScroll/index.vue'
import OrderList from './components/OrderList.vue'
import variables from 'styles/variables.module.less'

export default defineComponent({
  name: 'Order',
  components: {
    OrderList,
    CommonScroll
  },
  setup() {
    const { state, getOrderList } = useOrderListEffect()

    const isOpen = ref(false)
    const loading = ref(false)

    const methods = reactive({
      onLoad: (item: TabItem) => {
        if (isOpen.value) return
        getOrderList(item)
          .then(res => {
            // 返回的列表数据
            const list = res.data.data

            // list 不存在
            if (!list) return

            // 加载完成页面加一
            item.data.page += 1

            // 拼接列表
            item.data.list = list.length === 0 ? item.data.list : [...item.data.list, ...list]

            // 当列表小于10时表示数据加载完了
            if (list && list.length < 10) {
              item.data.finished = true
            }
          })
          .finally(() => {
            // 加载状态结束
            item.data.loading = false
          })
      },
      handleTabsClick: (name: string) => {
        const item = state.tabList.find(item => item.type === name)

        if (!item) return

        isOpen.value = true
        loading.value = true

        item.data.page = 1
        item.data.finished = false
        item.data.list = []

        console.log(item)

        getOrderList(item)
          .then(res => {
            // 返回的列表数据
            const list = res.data.data

            // list 不存在
            if (!list) return

            // 加载完成页面加一
            item.data.page = item.data.page + 1

            // 拼接列表
            item.data.list = [...list]

            // 当列表小于10时表示数据加载完了
            if (list && list.length < 10) {
              item.data.finished = true
            }
          })
          .finally(() => {
            // 加载状态结束
            item.data.loading = false
            isOpen.value = false
            loading.value = false
          })
      }
    })

    const callback = (data?: EmitData) => {
      if (!data) return

      switch (data.type) {
        case 'delete':
          state.tabList.forEach(tabItem => {
            tabItem.data.list = tabItem.data.list.filter(item => item.id !== data.value)
          })
          break
        case 'cancelled':
          state.tabList.forEach(tabItem => {
            tabItem.data.list = tabItem.data.list.map(item => {
              if (item.id === data.value.id) {
                item.status = data.value.status
              }
              return item
            })
          })
          break
        case 'delivered':
          state.tabList.forEach(tabItem => {
            tabItem.data.list = tabItem.data.list.map(item => {
              if (item.id === data.value.id) {
                item.status = data.value.status
              }
              return item
            })
          })
          break
      }
    }

    methods.handleTabsClick('all')

    // methods.onLoad(state.tabList[0])

    emitter.on('refresh-list', callback)

    onUnmounted(() => {
      emitter.off('refresh-list', callback)
    })

    return {
      ...toRefs(state),
      ...toRefs(methods),
      loading,
      variables
    }
  }
})
</script>

<style scoped lang="less">
@import 'styles/mixin.less';
.loading {
  .transform-center();
}
</style>
