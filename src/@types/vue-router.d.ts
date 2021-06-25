import 'vue-router'
/* eslint-disable */
export interface Navbar {
  title?: string
  leftText?: string
  rightText?: string
  leftArrow?: boolean
  fixed?: boolean
  placeholder?: boolean
  zIndex?: number | string
  backPath?: string
}
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    noCache?: boolean
    deepth?: number
    navbar?: Navbar
    showTab?: boolean
    auth?: boolean
  }
}
