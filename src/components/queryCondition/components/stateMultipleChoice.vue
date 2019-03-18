<template>
  <!-- 顾客记录 -->
  <div>
    <RadioGroup v-model="consumeState" @on-change="getConsumeState">
      <Radio label="1">初诊</Radio>
      <Radio label="2">复诊</Radio>
      <Radio label="3">再消费</Radio>
    </RadioGroup>
    <Icon type="ios-close" class="icon-delete" @click="getConsumeState('')" />
  </div>
</template>
<script>
  export default ({
    data() {
      return {
        consumeState: ''
      }
    },
    methods: {
      getConsumeState(e) {
        this.consumeState = e
        this.$emit('sendValue', {
          consumeState: e
        })
      }
    },
    mounted () {

    }
  })
</script>
<style>

</style>
