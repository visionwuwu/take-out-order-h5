<template>
  <div class="order-comment-container">
    <!-- 商家评分 -->
    <div class="store-evaluation van-hairline--bottom">
      <h2>商家评价</h2>
      <van-rate v-model="storeRate" :size="25" color="#ffd21e" void-icon="star" void-color="#eee" />
    </div>

    <CommonDivider />

    <!-- 填写评论内容 -->
    <div class="van-hairline--bottom van-hairline-top">
      <van-field
        v-model="content"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入评论内容"
        show-word-limit
        clearable
      />
    </div>

    <CommonDivider />

    <!-- 上传评论图片 -->
    <van-divider>上传图片</van-divider>
    <div style="padding: 10px">
      <van-uploader
        @oversize="onOversize"
        :max-size="1024 * 1024"
        v-model="fileList"
        :max-count="3"
        :after-read="afterRead"
        name="files"
        multiple
        lazy-load
        capture="camera"
        accept="image/png,image/jpeg,image/jpg"
      />
    </div>

    <!-- 提交按钮 -->
    <div style="padding: 0 10px">
      <van-button @click="handleAddComment" style="margin: 15px 0" type="primary" block
        >评论</van-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Notify, Toast } from 'vant'
import { defineComponent, reactive, toRefs } from 'vue'
import { getToken } from 'src/utils/cookies'
import axios from 'axios'
import { useAppStore } from 'src/store'
import { useOrderItemEffect } from './hooks/useOrderItemEffect'
import { CommentModel } from 'src/apis/comment/model/commentModel'
import { useRoute, useRouter } from 'vue-router'
import { FullOrderStatus } from 'src/apis/order/model/orderModel'
import { ApiStatusCode } from 'src/common/enums/ApiStatusCode.enum'

const uploadImageBaseUrl = import.meta.env.VITE_APP_UPLOAD_IMAGE_BASE_URL

export default defineComponent({
  name: 'OrderComment',
  setup() {
    const store = useAppStore()
    const route = useRoute()
    const router = useRouter()
    const { createComment, modifyOrderStatusById } = useOrderItemEffect()

    const data = reactive({
      storeRate: 0,
      content: '',
      fileList: []
    })

    const methods = reactive({
      onOversize: (file: File) => {
        console.log(file)
        Toast('文件大小不能超过 1M')
      },
      afterRead: (files: any, detail: any) => {
        const formData = new FormData()

        if (!Array.isArray(files)) {
          files = [files]
        }

        files.forEach((f: any) => {
          formData.append(detail.name, f.file)
        })

        axios
          .post(`${uploadImageBaseUrl}/files/multer`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${getToken()}`
            }
          })
          .then(res => {
            const list = res.data.data
            if (Array.isArray(list)) {
              data.fileList = list.map(item => {
                return {
                  url: item.url,
                  isImage: true
                }
              }) as any
            }
            console.log(data.fileList)
            console.log(res, '========')
          })
      },
      handleAddComment: () => {
        const images = data.fileList.map((item: any) => item.url).join(',')
        const id = parseInt(route.params.id as string)
        // 评论内容或图片必须填写其中一个
        if (!images && !data.content) {
          return Notify({ type: 'warning', message: '评论内容或图片必须填写其中一个' })
        }
        const comment: CommentModel = {
          content: data.content,
          images,
          user: store.state.user.id as any,
          order: id
        }

        Toast.loading({
          duration: 0,
          forbidClick: true,
          message: '评论中...'
        })

        createComment(comment)
          .then(async res => {
            if (res.data.code === ApiStatusCode.OK) {
              await modifyOrderStatusById(id, FullOrderStatus.evaluated)
              router.back()
            }
          })
          .finally(() => {
            Toast.clear()
          })
      }
    })

    return {
      ...toRefs(data),
      ...toRefs(methods)
    }
  }
})
</script>

<style scoped lang="less">
.order-comment-container {
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
}
</style>
