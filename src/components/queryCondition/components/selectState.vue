<template>
  <!--状态 -->
  <div>
    <RadioGroup v-model="status" @on-change="selectStateValue">
      <Radio label="2">下线</Radio>
      <Radio label="1">上线</Radio>
      <Radio label="0">全部</Radio>
    </RadioGroup>
    <Icon type="ios-close" class="icon-delete" @click="selectStateValue('')" />
  </div>
</template>
<script>
  export default ({
    data() {
      return {
        status: ''
      }
    },
    methods: {
      selectStateValue(e) {
        this.status = e
        this.$emit('sendValue', {
          status: e
        })
      }
    },
    mounted () {

    }
  })
</script>
<style>

</style>
