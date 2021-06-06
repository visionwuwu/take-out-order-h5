<template>
  <div class="cascad-menu" ref="cascadMenu">
    <common-scroll ref="leftMenu" class="left-menu" :data="menus">
      <div class="left-container">
        <ul>
          <li
            v-for="(menu, index) in menus"
            ref="leftItem"
            class="left-item"
            :class="{ current: currentIndex === index }"
            :key="index"
            @click="selectLeft(index, $event)"
          >
            <p class="text">{{ menu.name }} {{ currentIndex }}</p>
          </li>
        </ul>
      </div>
    </common-scroll>
    <common-scroll
      ref="rightMenu"
      class="right-menu"
      :data="menus"
      :listenScroll="true"
      :probeType="3"
      @scroll="scrollHeight"
    >
      <div class="right-menu-container">
        <ul>
          <li
            class="right-item"
            v-for="(menu, i) in menus"
            :ref="
              el => {
                if (el) rightItems[i] = el
              }
            "
            :key="i"
          >
            <div class="title">{{ menu.name }}</div>
            <ul>
              <li v-for="item in menu.data" :key="item">
                <div class="data-wrapper">
                  <div class="data">{{ item.name }}</div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </common-scroll>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, reactive, ref, toRefs } from 'vue'
import CommonScroll, { PosType } from 'comps/CommonScroll/index.vue'

interface DataModel {
  rightTops: number[]
  scrollY: number
  leftScrollY: number
}

const menusList = [
  {
    name: '菜单1',
    data: [
      {
        name: '1.1'
      },
      {
        name: '1.2'
      },
      {
        name: '1.3'
      },
      {
        name: '1.4'
      },
      {
        name: '1.5'
      },
      {
        name: '1.6'
      }
    ]
  },
  {
    name: '菜单8',
    data: [
      {
        name: '1.1'
      },
      {
        name: '1.2'
      },
      {
        name: '1.3'
      },
      {
        name: '1.4'
      },
      {
        name: '1.5'
      },
      {
        name: '1.6'
      }
    ]
  },
  {
    name: '菜单2',
    data: [
      {
        name: '1.1'
      },
      {
        name: '1.2'
      },
      {
        name: '1.3'
      },
      {
        name: '1.4'
      },
      {
        name: '1.5'
      },
      {
        name: '1.6'
      }
    ]
  },
  {
    name: '菜单3',
    data: [
      {
        name: '1.1'
      },
      {
        name: '1.2'
      },
      {
        name: '1.3'
      },
      {
        name: '1.4'
      },
      {
        name: '1.5'
      },
      {
        name: '1.6'
      }
    ]
  },
  {
    name: '菜单4',
    data: [
      {
        name: '1.1'
      },
      {
        name: '1.2'
      },
      {
        name: '1.3'
      },
      {
        name: '1.4'
      },
      {
        name: '1.5'
      },
      {
        name: '1.6'
      }
    ]
  },
  {
    name: '菜单5',
    data: [
      {
        name: '1.1'
      },
      {
        name: '1.2'
      },
      {
        name: '1.3'
      },
      {
        name: '1.4'
      },
      {
        name: '1.5'
      },
      {
        name: '1.6'
      }
    ]
  },
  {
    name: '菜单6',
    data: [
      {
        name: '1.1'
      },
      {
        name: '1.2'
      },
      {
        name: '1.3'
      },
      {
        name: '1.4'
      },
      {
        name: '1.5'
      },
      {
        name: '1.6'
      }
    ]
  },
  {
    name: '菜单7',
    data: [
      {
        name: '1.1'
      },
      {
        name: '1.2'
      },
      {
        name: '1.3'
      },
      {
        name: '1.4'
      },
      {
        name: '1.5'
      },
      {
        name: '1.6'
      }
    ]
  },
  {
    name: '菜单8',
    data: [
      {
        name: '1.1'
      },
      {
        name: '1.2'
      },
      {
        name: '1.3'
      },
      {
        name: '1.4'
      },
      {
        name: '1.5'
      },
      {
        name: '1.6'
      }
    ]
  },
  {
    name: '菜单9',
    data: [
      {
        name: '1.1'
      },
      {
        name: '1.2'
      },
      {
        name: '1.3'
      },
      {
        name: '1.4'
      },
      {
        name: '1.5'
      },
      {
        name: '1.6'
      }
    ]
  }
]
export default defineComponent({
  components: {
    CommonScroll
  },
  setup() {
    const menus = ref<any[]>(menusList)
    const leftMenu = ref()
    const rightMenu = ref()
    const rightItems = ref<any[]>([])
    const data = reactive<DataModel>({
      rightTops: [],
      scrollY: 0,
      leftScrollY: 0
    })

    const currentIndex = computed(() => {
      let index = data.rightTops.findIndex((height, index) => {
        return data.scrollY >= data.rightTops[index] && data.scrollY < data.rightTops[index + 1]
      })
      if (data.scrollY > data.rightTops[index] + 50) {
        index++
      }
      return index
    })

    nextTick(() => {
      calculateHeight()
    })

    const scrollHeight = (pos: PosType) => {
      console.log(pos)
      data.scrollY = Math.abs(Math.round(pos.y))
    }

    const selectLeft = (index: number, event: any) => {
      if (!event._constructed) {
        return
      }
      const el = rightItems.value[index]
      rightMenu.value.scrollToElement(el, 300)
    }

    const calculateHeight = () => {
      const lis = rightItems.value
      console.log(lis)
      let height = 0
      data.rightTops.push(height)
      Array.prototype.slice.call(lis).forEach(li => {
        height += li.clientHeight
        data.rightTops.push(height)
      })
      console.log(data.rightTops)
    }

    return {
      menus,
      currentIndex,
      leftMenu,
      rightMenu,
      rightItems,
      ...toRefs(data),
      selectLeft,
      scrollHeight
    }
  }
})
</script>

<style scoped lang="less">
.cascad-menu {
  display: flex;
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
  ul {
    padding: 0;
    list-style: none;
  }
  .left-menu {
    width: 80px;
    flex: 0 0 80px;
    background: #f3f5f7;
    .left-item {
      height: 54px;
      text-align: center;
      font-size: 14px;
      width: 100%;
      &.current {
        position: relative;
        background: #fff;
      }
      &.current::before {
        position: absolute;
        top: 50%;
        left: 0;
        width: 1.067vw;
        height: 4.267vw;
        background-color: #ee0a24;
        transform: translateY(-50%);
        content: '';
      }
      .text {
        width: 100%;
        line-height: 54px;
      }
    }
  }
  .right-menu {
    flex: 1;
    .right-item {
      height: 100%;
      border: 1px solid #ccc;
      .title {
        border-bottom: 1px solid #ccc;
        height: 20px;
      }
      .data-wrapper {
        .data {
          line-height: 40px;
          height: 40px;
        }
      }
    }
  }
}
</style>
