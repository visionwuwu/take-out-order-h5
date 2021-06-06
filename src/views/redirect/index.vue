<script lang="tsx">
import { useRoute, useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const { params, query } = useRoute()
    const { path } = params
    router.replace({ path: '/' + (path as string[]).join('/'), query })
  },
  render() {
    return (
      <div class="loading">
        <div class="loading-mask"></div>
        <div class="loading-icon">
          <van-loading type="spinner" size="24px" color="blue" />
        </div>
      </div>
    )
  }
}
</script>
<style scope lang="less">
@import 'styles/mixin.less';
.loading {
  &-mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background: rgba(0, 0, 0, 0.2);
  }
  &-icon {
    .transform-center();
  }
}
</style>
