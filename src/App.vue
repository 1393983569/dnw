<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

#app {
  .size;
}

/* iconfont引入样式 */
@font-face {font-family: 'iconfont';
  src: url('./assets/fond/iconfont.eot');
  src: url('./assets/fond/iconfont.eot?#iefix') format('embedded-opentype'),
  url('./assets/fond/iconfont.woff') format('woff'),
  url('./assets/fond/iconfont.ttf') format('truetype'),
  url('./assets/fond/iconfont.svg#iconfont') format('svg');
}
.iconfont{
  font-family:"iconfont" !important;
  font-size:16px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  }
  .iconfont-svg {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
