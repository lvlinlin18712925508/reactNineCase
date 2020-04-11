<template>
  <div style="width: 256px">
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      :theme="theme"
      :inlineCollapsed="collapsed"
    >
      <template v-for="item in menuData">
        <a-menu-item v-if="!item.children" :key="item.path" @click="() => $router.push({path: item.key, query: $route .query})">
          <a-icon v-if="item.meta.icon" :type="item.meta.icon"/>
          <span>{{item.meta.title}}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.path"/>
      </template>
    </a-menu>
  </div>
</template>

<script>
   import SubMenu from './SubMenu';
   import { check } from '@/utils/auth'
    export default {
      name: "SiderMenu",
      props: {
        theme: {
          type: String,
          default: 'dark'
        }
      },
      watch: {
        '$route.path': function (val) {
          this.selectedKeys = this.selectedKeysMap[val]
          this.openKeys = this.collapsed ? [] : this.openKeysMap[val]
        }
      },
      data() {
        this.selectedKeysMap = {}
        this.openKeysMap = {}
        const menuData = this.getMenuData(this.$router.options.routes);
        return {
          collapsed: false,
          selectedKeys: this.selectedKeysMap[this.$route.path],
          openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path],
          menuData,
        };
      },
      methods: {
        toggleCollapsed() {
          this.collapsed = !this.collapsed;
        },
        getMenuData(routes = [], parentKeys = [], selectedKey) {
          const menuData = [];
          for(let item of routes) {
            if(item.name && !item.hideInMenu) {
              if(item.meta && item.meta.authority && !check(item.meta.authority)) {
                break;
              }
              this.openKeysMap[item.path] = parentKeys;
              this.selectedKeysMap[item.path] = [selectedKey || item.path]
              const newItem = {...item}
              delete newItem.children;
              if(item.children && !item.hideChildrenInMenu) {
                newItem.children = this.getMenuData(item.children, [...parentKeys, item.path])
              } else {
                this.getMenuData(item.children, selectedKey ? parentKeys : [...parentKeys, item.path], selectedKey||item.path)
              }
              menuData.push(newItem)
            } else if(!item.hideInMenu && !item.hideChildrenInMenu && item.children) {
              menuData.push(...this.getMenuData(item.children, [...parentKeys, item.path]))
            }
          }

          // console.log('menuData',menuData)
          return menuData;
        }
      },
      components: {
        'sub-menu': SubMenu,
      },
    }
</script>

<style scoped>
  .ant-menu-dark .ant-menu-item:hover {
    background-color: red;
  }
  .ant-menu-dark .ant-menu-item:active {
    background-color: red;
  }
</style>
