<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        :theme="navTheme"
        v-if="navLayout === 'left'"
        :trigger="null"
        collapsible
        v-model="collapsed"
        width="256px"
      >
        <div class="logo">Antd Design Vue Pro</div>
        <SiderMenu :theme="navTheme"/>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0" >
          <a-icon
            v-auth="['admin']"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            class="trigger"
            @click="collapsed = !collapsed"
          >
          </a-icon>
          <Header/>
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer/>
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <Authorized :authority="['admin']">
      <SettingDrawer/>
    </Authorized>
  </div>
</template>
<script>
import Header from "./Header";
import Footer from "./Footer";
import SiderMenu from './SiderMenu';
import SettingDrawer from '../components/SettingDrawer'
export default {
  name: "BasicLayout",
  data() {
    return {
      collapsed: false,
    };
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || 'dark'
    },
    navLayout() {
      return this.$route.query.navLayout || 'left'
    }
  },
  components: {
    Header,
    Footer,
    SiderMenu,
    SettingDrawer,
  }
}
</script>
<style scoped>
  #components-layout-demo-side .logo {
    height: 32px;
    line-height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
    text-align: center;
    overflow: hidden;
  }
  .trigger {
    padding: 0 20px;
    line-height: 64px;
    font-size: 20px;
    cursor: pointer;
  }
  .trigger:hover {
    background-color: #eee;
  }
  .nav-theme-dark >>> .logo {
    color: #fff;
  }
</style>
