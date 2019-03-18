<template>
  <!-- 项目名称 -->
  <div>
    <Input search placeholder="请输入项目名称" @on-search="selectProName"/>
  </div>
</template>
<script>
  export default ({
    data() {
      return {

      }
    },
    methods: {
      selectProName(e) {
        this.$emit('sendValue', {
          title: e
        })
      }
    },
    mounted () {

    }
  })
</script>
<style>

</style>
