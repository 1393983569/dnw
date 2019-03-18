<template>
  <!-- 时间查询 只用于时间/日期 -->
    <div>
      <DatePicker type="daterange" v-model="dateValue" @on-change="getDateValue" placement="right-start" placeholder="请选择日期" style="width: 200px"></DatePicker>
    </div>
</template>
<script>
  export default ({
    data() {
      return {
        dateValue: ''
      }
    },
    methods: {
      getDateValue() {
        let begin = ''
        let over = ''
        if (this.dateValue[0] && this.dateValue[1]) {
          begin = new Date(this.dateValue[0]).Format('yyyy-M-d')
          over = new Date(this.dateValue[1]).Format('yyyy-M-d')
        } else {
          begin = ''
          over = ''
        }
        this.$emit('sendValue', {
          startTime: begin,
          endTime: over
        })
      }
    },
    mounted () {

    }
  })
</script>
<style>

</style>
