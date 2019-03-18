<template>
  <!-- 组件递归 -->
    <a-submenu>
      <div slot="title">{{ parent.title }}</div>
      <template v-for="(item, i) in parent.children">
        <a-menu-item v-if="!item.children" :key="`menu_item_re_${index}_${i}`">{{ item.title }}</a-menu-item>
        <re-submenu v-else :key="`menu_item_re${index}_${i}`" :parent="item"></re-submenu>
      </template>
    </a-submenu>
</template>
<script>
import AMenuItem from './a-menu-item.vue'
import ASubmenu from './a-submenu.vue'
    export default ({
        name: 'reSubmenu',
        data() {
            return {

            }
        },
        components: {
          AMenuItem,
          ASubmenu
        },
        props: {
          parent: {
            type: Object,
            default: () =>({})
          },
          index: Number
        }
    })
</script>
<style>

</style>
