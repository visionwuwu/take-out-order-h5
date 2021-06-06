<script lang="tsx">
import { computed, defineComponent, onMounted, PropType, ref, toRefs } from 'vue'
import { FullOrderStatus } from 'src/apis/order/model/orderModel'
import { fullOrderStatus } from 'src/views/order/hooks/useOrderListEffect'
import { CurrentTime } from '@vant/use/dist/types/useCountDown'

export default defineComponent({
  name: 'OrderStatusTitle',
  props: {
    status: {
      type: String as PropType<FullOrderStatus>,
      required: true
    },
    time: {
      type: Number,
      default: 0
    },
    onCountDownChange: {
      type: Function as PropType<(currentTime: CurrentTime) => void>,
      default: () => {}
    },
    onCountDownFinish: {
      type: Function as PropType<() => void>,
      default: () => {}
    }
  },
  setup(props) {
    const { status, time, onCountDownChange, onCountDownFinish } = toRefs(props)

    const title = computed(() => fullOrderStatus[status.value])

    const root = ref(null)

    onMounted(() => {
      console.log(root.value)
    })

    const renderCountDown = () => {
      return status.value === FullOrderStatus.unPaid ? (
        <div>
          待支付，剩余
          <van-count-down
            ref={root}
            format="mm:ss"
            time={time.value}
            auto-start={false}
            onChange={onCountDownChange.value}
            onFinish={onCountDownFinish.value}
          />
        </div>
      ) : null
    }

    return () => (
      <div class="order-status-title">
        {title.value ? <span>{title.value}</span> : null}
        <van-icon name="arrow" />
      </div>
    )
  }
})
</script>

<style scoped lang="less">
@import 'styles/variables.module.less';
.order-status-title {
  padding: 13px 16px;
  border-top: none;
  color: #fff;
  background: @theme-color;
  display: flex;
  align-items: center;
  > div,
  > span {
    margin-right: 6px;
    font-size: 16px;
  }
  div {
    display: flex;
    align-items: center;
    color: #fff;
    .van-count-down {
      margin-left: 6px;
    }
  }
}
</style>
