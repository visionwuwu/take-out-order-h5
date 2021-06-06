/* eslint-disable */
import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module 'vuex' {
  interface State {}

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
