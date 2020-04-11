import Vue from 'vue'
import store from './store/index.js'
import { Button, Icon, Layout, Drawer, Radio, Menu, Form, Input  } from "ant-design-vue";
import App from './App'
import router from './router'
import "ant-design-vue/dist/antd.less"
import Authorized from './components/Authorized'
import Auth from './directives/auth'

// import Antd from 'ant-design-vue'
// Vue.use(Antd)

Vue.use(Button)
Vue.use(Layout)
Vue.use(Icon)
Vue.use(Drawer)
Vue.use(Radio)
Vue.use(Menu)
Vue.use(Form)
Vue.use(Input)
Vue.component('Authorized', Authorized)
Vue.use(Auth)

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
