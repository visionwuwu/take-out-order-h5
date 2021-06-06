import { App } from 'vue'
import {
  Button,
  List,
  PullRefresh,
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  Image as VanImage,
  Form,
  Field,
  NavBar,
  Icon,
  Cell,
  CellGroup,
  Grid,
  GridItem,
  Empty,
  Tab,
  Tabs,
  Row,
  Col,
  Sidebar,
  SidebarItem,
  Card,
  Lazyload,
  ImagePreview,
  Stepper,
  Loading,
  Tag,
  Rate,
  Uploader,
  Divider,
  SubmitBar,
  Popup,
  Badge,
  Sticky,
  ContactCard,
  AddressEdit,
  Area,
  AddressList,
  Switch,
  Radio,
  RadioGroup,
  NumberKeyboard,
  PasswordInput,
  CountDown,
  NoticeBar,
  Step,
  Steps
} from 'vant'

// https://vant-contrib.gitee.io/vant/v3/#/zh-CN
const components = [
  Button,
  List,
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  VanImage,
  PullRefresh,
  Form,
  Field,
  NavBar,
  Icon,
  Cell,
  CellGroup,
  Grid,
  GridItem,
  Empty,
  Tab,
  Tabs,
  Row,
  Col,
  Sidebar,
  SidebarItem,
  Card,
  List,
  Stepper,
  Loading,
  Tag,
  Rate,
  Uploader,
  Divider,
  SubmitBar,
  Popup,
  Badge,
  Sticky,
  ContactCard,
  AddressEdit,
  Area,
  AddressList,
  Switch,
  Cell,
  CellGroup,
  Radio,
  RadioGroup,
  NumberKeyboard,
  PasswordInput,
  CountDown,
  NoticeBar,
  Step,
  Steps
]

const plugins = [ImagePreview]

export default (app: App) => {
  components.forEach(component => {
    app.component(component.name, component)
  })

  plugins.forEach(plugin => {
    app.use(plugin)
  })

  // Lazyload 懒加载
  app.use(Lazyload, {
    lazyComponent: true
  })
}
