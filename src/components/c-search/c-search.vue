<template>
    <div class="csearch-box" ref="csBox">
      <div>
        <span>筛选</span>
      </div>
      <div>
        <slot></slot>
      </div>
    </div>
</template>
<script>
    export default ({
      data() {
        return {

        }
      },
      props: {

      }
    })
</script>
<style lang="less">
  .csearch-box{

  }
</style>
