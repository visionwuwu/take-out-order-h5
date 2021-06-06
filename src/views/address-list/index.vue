<template>
  <div class="address-list-container">
    <van-address-list
      v-if="addressList.length > 0"
      v-model="chosenAddressId"
      :list="addressList"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
    ></van-address-list>
    <van-empty v-else description="还没有收货地址去添加">
      <van-button round type="danger" class="bottom-button" @click="onAdd">新增收货地址</van-button>
    </van-empty>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Address, AddressList } from 'src/utils/cookies'
import { getUserId } from 'src/utils/user'
import { AddressActionType } from '../address-edit-or-add/index.vue'
import { AddressListAddress, Toast } from 'vant'

interface StateModel {
  chosenAddressId: number
  addressList: AddressListAddress[]
}

export default defineComponent({
  name: 'AddressList',
  beforeRouteEnter(to, from, next) {
    const uid = getUserId()
    const list = Address.loadAddressList(uid)
    next((vm: any) => {
      vm.addressList = vm.formatAddressList(list)
      vm.chosenAddressId = vm.getChosenAddressId(list)
    })
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const uid = getUserId()
    const id = parseInt(route.query.id as string)

    // 定义数据
    const data = reactive<StateModel>({
      chosenAddressId: 0,
      addressList: []
    })

    // 定义方法
    const methods = reactive({
      onAdd: () => {
        router.push({
          path: '/address-edit-or-add',
          query: {
            type: AddressActionType.add
          }
        })
      },
      onEdit: (item: any) => {
        router.push({
          path: '/address-edit-or-add',
          query: {
            type: AddressActionType.edit,
            id: item.id
          }
        })
      },
      onSelect: (item: AddressListAddress) => {
        // SelectedAddressIds.setSelectedAddressId(uid, item.id as number)
        Toast.loading({
          duration: 150,
          onClose: () => {
            router.push({ path: '/orderConfirm', query: { id: item.id } })
          }
        })
      },
      formatAddressList: (list: AddressList) => {
        return list.map(item => {
          const address = item.province + item.city + item.county + item.addressDetail
          return {
            id: item.id,
            name: item.name,
            tel: item.tel,
            address,
            isDefault: item.isDefault
          }
        })
      },
      getChosenAddressId() {
        const address = id
          ? Address.loadAddressById(uid, id)
          : Address.loadDefaultAddressInfoByUid(uid)

        return address ? address.id : 0
      }
    })

    return {
      ...toRefs(data),
      ...toRefs(methods)
    }
  }
})
</script>

<style scoped lang="less"></style>
