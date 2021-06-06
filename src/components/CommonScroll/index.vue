<template>
  <div class="common-scroll" ref="wrapper">
    <slot name="default" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watch } from 'vue'
import BScroll from '@better-scroll/core'

export interface PosType {
  x: number
  y: number
}

export default defineComponent({
  name: 'CommonScroll',
  props: {
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 1
    },
    /**
     * 点击列表是否派发click事件
     */
    click: {
      type: Boolean,
      default: true
    },
    /**
     * 是否开启横向滚动
     */
    scrollX: {
      type: Boolean,
      default: false
    },
    /**
     * 是否开启纵向滚动
     */
    scrollY: {
      type: Boolean,
      default: true
    },
    /**
     * 是否派发滚动事件
     */
    listenScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 列表的数据
     */
    data: {
      type: Array,
      default: null
    },
    /**
     * 是否派发滚动到底部的事件，用户上拉加载
     */
    pullup: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发顶部下拉事件，用于下拉刷新
     */
    pulldown: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发列表滚动开始的事件
     */
    beforeScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 当数据更新后刷新scroll延时
     */
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  emits: ['scroll', 'scrollToEnd', 'pulldown', 'beforeScroll'],
  setup(props, { emit }) {
    const wrapper = ref<HTMLElement | null>(null)
    const scroll = ref<BScroll>()

    onMounted(() => {
      initScroll()
    })

    // 初始化scroll
    const initScroll = () => {
      if (!wrapper.value) {
        return
      }
      // better-scroll的初始化
      scroll.value = new BScroll(wrapper.value, {
        probeType: props.probeType,
        scrollX: props.scrollX,
        scrollY: props.scrollY,
        click: props.click
      })

      // 是否派发滚动事件
      if (props.listenScroll) {
        scroll.value.on('scroll', (pos: PosType) => {
          emit('scroll', pos)
        })
      }

      // 是否派发滚动到底部事件，用于上拉加载
      if (props.pullup) {
        scroll.value.on('scrollEnd', () => {
          // 滚动到底部
          if (scroll.value!.y <= scroll.value!.maxScrollY + 50) {
            emit('scrollToEnd')
          }
        })
      }

      // 是否派发顶部下拉事件，用于下拉刷新
      if (props.pulldown) {
        scroll.value.on('touchEnd', (pos: PosType) => {
          // 下拉动作
          if (pos.y > 50) {
            emit('pulldown')
          }
        })
      }

      // 是否派发列表滚动开始的事件
      if (props.beforeScroll) {
        scroll.value.on('beforeScrollStart', () => {
          emit('beforeScroll')
        })
      }
    }

    const disable = () => {
      // 代理better-scroll的disable方法
      scroll.value && scroll.value.disable()
    }
    const enable = () => {
      // 代理better-scroll的enable方法
      scroll.value && scroll.value.enable()
    }
    const refresh = () => {
      // 代理better-scroll的refresh方法
      scroll.value && scroll.value.refresh()
    }
    const scrollTo = () => {
      // 代理better-scroll的scrollTo方法
      scroll.value && scroll.value.scrollTo.apply(scroll.value, arguments)
    }
    const scrollToElement = (...args: any) => {
      // 代理better-scroll的scrollToElement方法
      scroll.value && scroll.value.scrollToElement.apply(scroll.value, args)
    }

    // 监听数据变化，延迟refreshDelay时间后调用refresh方法重新计算，保证滚动正常
    watch(
      () => props.data,
      () => {
        setTimeout(() => {
          refresh()
        }, props.refreshDelay)
      }
    )

    return {
      wrapper,
      initScroll,
      disable,
      enable,
      refresh,
      scrollTo,
      scrollToElement
    }
  }
})
</script>
