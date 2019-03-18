<template>
  <!-- 状态 -->
  <div>
    <RadioGroup v-model="orderState" @on-change="getOrderState">
      <Radio label="1">已预约</Radio>
      <Radio label="0">未预约</Radio>
    </RadioGroup>
    <Icon type="ios-close" class="icon-delete" @click="getOrderState('')" />
    <span>|</span>
    <RadioGroup v-model="isShop" @on-change="getIsShop">
      <Radio label="1">已到店</Radio>
      <Radio label="0">未到店</Radio>
    </RadioGroup>
    <Icon type="ios-close" class="icon-delete" @click="getIsShop('')" />
    <span>|</span>
    <RadioGroup v-model="dealState" @on-change="getDealState">
      <Radio label="1">已成交</Radio>
      <Radio label="0">未成交</Radio>
    </RadioGroup>
    <Icon type="ios-close" class="icon-delete" @click="getDealState('')" />
  </div>
</template>
<script>
  import '../main.less'
  import {getPagePayFrom} from '@/api/queryCondition/selectSingleChoice'
  export default ({
    data() {
      return {
        orderState: '',
        isShop: '',
        dealState:''
      }
    },
    methods: {
      getOrderState(e){
        this.orderState = e
        this.$emit('sendValue', {
          orderState: e
        })
      },
      getIsShop(e) {
        this.isShop = e
        this.$emit('sendValue', {
          isShop: e
        })
      },
      getDealState(e) {
        this.dealState = e
        this.$emit('sendValue', {
          dealState: e
        })
      }
    },
    mounted () {

    }
  })
</script>
<style>

</style>
