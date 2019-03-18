<!--<template>-->
    <!--<div class="side-menu-wrapper">-->
      <!--<slot></slot>-->
      <!--<Menu width="auto" theme="dark">-->
        <!--<template v-for="(item, index) in listMenu">-->
          <!--<re-submenu v-if="item.children" :key="`submenu_${item.name}`" :name="item.name" :parents="item"></re-submenu>-->
          <!--<menu-item v-else :key="`submenu_${item.name}`" :name="item.name">{{ item.title }}</menu-item>-->
        <!--</template>-->
      <!--</Menu>-->
      <!--<div></div>-->
    <!--</div>-->
<!--</template>-->
<!--<script>-->
  <!--import ReSubmenu from './re-submenu.vue'-->
    <!--export default ({-->
      <!--name: 'SideMenu',-->
      <!--props: {-->
        <!--collapsed: {-->
          <!--type: Boolean,-->
          <!--default: false-->
        <!--},-->
        <!--listMenu: {-->
          <!--type: Array,-->
          <!--default: () => ([])-->
        <!--}-->
      <!--},-->
      <!--components: {-->
        <!--ReSubmenu-->
      <!--}-->
    <!--})-->
<!--</script>-->
<!--<style lang="less">-->
<!--.side-menu-wrapper{-->
  <!--width: 100%;-->
<!--}-->
<!--</style>-->
