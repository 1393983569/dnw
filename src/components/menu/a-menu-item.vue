<template>
    <!--菜单菜单每一项-->
    <li class="a-menu-item">
      <slot></slot>
    </li>
</template>
<script>
  export default ({
    name: 'AMenuItem'
  })
</script>
<style lang="less">
.a-menu-item{
    background: #0e2f53;
  color: #ffffff;
}
</style>
