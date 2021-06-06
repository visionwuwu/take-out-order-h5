<template>
  <div class="edit-address-container">
    <van-nav-bar
      :title="type === 'add' ? '添加地址' : '编辑地址'"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <van-address-edit
      :area-list="areaList"
      :show-delete="type === 'edit'"
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      :address-info="addressInfo"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { areaList } from '@vant/area-data'
import { Toast, AddressEditInfo, AddressListAddress } from 'vant'
import { Address, AddressInfo } from 'src/utils/cookies'
import { getUserId } from 'src/utils/user'
import { useRoute, useRouter } from 'vue-router'

const initAddressInfo: AddressInfo = {
  id: +new Date(),
  name: '',
  tel: '',
  province: '',
  city: '',
  county: '',
  addressDetail: '',
  areaCode: '000000',
  isDefault: true
}

export enum AddressActionType {
  edit = 'edit',
  add = 'add'
}

interface StateModel {
  type: AddressActionType
  addressInfo: AddressInfo
}

export default defineComponent({
  name: 'AddressEditOrAdd',
  beforeRouteEnter(to, from, next) {
    const { type, id } = to.query
    const uid = getUserId()
    const addressInfo = Address.loadAddressById(uid, parseInt(id as string))
    next((vm: any) => {
      // 添加地址
      if (type === AddressActionType.add) {
      }

      // 编辑地址
      if (type === AddressActionType.edit) {
        vm.addressInfo = addressInfo
          ? addressInfo
          : { ...initAddressInfo, id: parseInt(id as string) }
      }

      // 编辑/保存地址类型更新
      if (Object.values(AddressActionType).includes(type as any)) {
        vm.type = type
      }
    })
  },
  setup() {
    const data = reactive<StateModel>({
      type: AddressActionType.add,
      addressInfo: initAddressInfo
    })
    const route = useRoute()
    const id = parseInt(route.query.id as string)
    const router = useRouter()
    const uid = getUserId()

    const methods = reactive({
      onSave: (content: AddressEditInfo) => {
        const { postalCode, country, ...address } = content
        if (data.type === AddressActionType.add) {
          Address.addAddress(uid, { ...address, id: +new Date() })
        } else {
          Address.modifyAddress(uid, id, { id, ...address })
        }
        methods.goBack('保存成功')
      },
      onDelete: (content: AddressEditInfo) => {
        Address.removeAddress(uid, id)
        methods.goBack('删除成功')
        console.log(content)
      },
      goBack(message: string) {
        Toast({
          type: 'success',
          message: message,
          duration: 800,
          onClose: () => {
            router.back()
          }
        })
      }
    })

    return {
      ...toRefs(methods),
      ...toRefs(data),
      areaList
    }
  }
})
</script>

<style scoped lang="less">
.edit-address-container {
}
</style>
