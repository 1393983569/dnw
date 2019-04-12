<template>
  <Card :bordered="false" style="box-sizing: border-box">
    <div style="margin-bottom: 10px">
      <DatePicker type="daterange" @on-change="onChangeDatePicker" placement="right-start" placeholder="请选择时间" style="width: 200px;"></DatePicker>
      <Select v-model="selectShop" @on-change="onChangeShop" clearable style="width:200px;">
        <Option v-for="item in shopDataList" :value="item.id + ''" :key="item.id">{{ item.shopName }}</Option>
      </Select>
    </div>
    <div class="svg-box" style="text-align: center">
      <div class="svg-icon">
        <svg class="iconfont-svg" aria-hidden="true" style="font-size: 45px; color: #82a6f5">
          <use xlink:href="#icon-huiyuan"></use>
        </svg>
        <div>
          会员人数 <span style="color: #e82d2d">{{makeAnAppointment}}</span>
        </div>
      </div>
      <div class="svg-icon">
        <svg class="iconfont-svg" aria-hidden="true" style="font-size: 45px; color: #c8d945">
          <use xlink:href="#icon-yuyuezhongxin"></use>
        </svg>
        <div>
          到店人数 <span style="color: #e82d2d">{{member}}</span>
        </div>
      </div>
      <div class="svg-icon">
        <svg class="iconfont-svg" aria-hidden="true" style="font-size: 45px; color: #97d242">
          <use xlink:href="#icon-yonghufangkeshu"></use>
        </svg>
        <div>
          总顾客人数 <span style="color: #e82d2d">{{totalCustomer}}</span>
        </div>
      </div>
      <div class="svg-icon">
        <svg class="iconfont-svg" aria-hidden="true" style="font-size: 45px; color: #2a5200">
          <use xlink:href="#icon-daodiantiyan"></use>
        </svg>
        <div>
          预约人数 <span style="color: #e82d2d">{{makeAnAppointment}}</span>
        </div>
      </div>
      <div class="svg-icon">
        <svg class="iconfont-svg" aria-hidden="true" style="font-size: 45px; color: #d7b9e0">
          <use xlink:href="#icon-chenggong"></use>
        </svg>
        <div>
          已成交人数 <span style="color: #e82d2d">{{makeABargain}}</span>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
  import {getListShop, getCusCount, getSummary} from '@/api/statisticsManagement/numberOfPeople'
  export default {
    name: "numberOfPeople",
    data () {
      return {
        shopDataList: [],
        selectShop: '',
        shopId: '',
        startTime: '',
        endTime: '',
        // 预约
        makeAnAppointment: 0,
        // 到店
        reachTheStore: 0,
        // 总顾客
        totalCustomer: 0,
        // 成交
        makeABargain: 0,
        // 会员
        member: 0
      }
    },
    methods: {
      async getDataValue () {
        try {
          // 预约
          this.makeAnAppointment = 0
          // 到店
          this.reachTheStore = 0
          // 总顾客
          this.totalCustomer = 0
          // 成交
          this.makeABargain = 0
          // 会员
          this.member = 0
          let userList = await getCusCount(this.shopId, this.startTime, this.endTime).then().catch()
          this.member = userList.info[0].vipNum
          this.reachTheStore = userList.info[0].daodianNum
          this.makeABargain = userList.info[0].chengjiaoNum
          this.totalCustomer = userList.info[0].allCusNum
          this.makeAnAppointment = userList.info[0].yuyueNum
        } catch (e) {
         console.log(e)
        }
      },
      async getShop () {
        this.shopDataList = []
        try {
          let shopData = await getListShop().then().catch()
          this.shopDataList = shopData.info
        } catch (e) {
          console.log(e)
        }
      },
      onChangeShop (e) {
        this.shopId = e
        this.getDataValue()
      },
      onChangeDatePicker (e) {
        this.startTime = e[0] ? new Date(e[0]).Format("yyyy-MM-dd") : ''
        this.endTime =  e[1] ? new Date(e[1]).Format("yyyy-MM-dd") : ''
        this.getDataValue()
      }
    },
    mounted () {
      this.getDataValue()
      this.getShop()
    }
  }
</script>

<style scoped>
  .svg-box{
    display: flex;
  }
  .svg-icon{
    flex: 1;
  }
</style>
