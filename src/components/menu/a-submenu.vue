<template>
      <!--收缩菜单-->
      <ul class="a-submenu">
        <div class="a-submenu-title" @click="handClick">
          <slot name="title"></slot>
        </div>
        <div v-show="showChild" class="a-submenu-child-box">
          <slot></slot>
        </div>
      </ul>
</template>
<script>
    export default ({
        name: 'ASubmenu',
        data() {
          return {
            showChild: false,
          }
        },
        methods: {
          handClick () {
            this.showChild = !this.showChild
          }
        }
    })
</script>
<style lang="less">
.a-submenu{
  &-title{
    background: #000a1a;
    color: #ffffff;
  }
  &-child-box{
    overflow: hidden;
    padding-left: 20px;
  }
}
</style>
