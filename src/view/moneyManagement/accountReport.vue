<template>
  <div style="margin-left:30px">
    <div class="account" style="margin-bottom: 30px">
      <h1 align="center">痘你完(XXX)分店收银结算报表</h1>
    </div>
    <div>
      <span>选择结算周期: </span>
      <span>
        <DatePicker type="datetime" v-model= "startTime" style="width: 200px"></DatePicker>
      </span>
      <span>
        <DatePicker type="datetime" v-model= "endTime" style="width: 200px"></DatePicker>
      </span>
      <Button type="primary" style="margin-left:200px" @click="accountPrint">打印</Button>
    </div>
    <div class="account" style="margin-top: 30px">
      <span style="margin-left:8px">结算周期: </span>
      <span>{{ accountStart }}</span>
      <span> — </span>
      <span>{{ accountEnd }}</span>
      <span style="margin-left: 220px">打印时间: </span>
      <span>{{ timeDate }}</span>
      <table>
        <tr>
          <td>1.</td>
          <td style="width:60px">现金</td>
          <td>------------------------------------------------------------------------------------------------------</td>
          <td style="text-align:right; width:80px"> {{ cashMoney }}</td>
        </tr>
        <tr>
          <td>2.</td>
          <td>微信</td>
          <td>------------------------------------------------------------------------------------------------------</td>
          <td style="text-align:right">{{ wechatMoney }}</td>
        </tr>
        <tr>
          <td>3.</td>
          <td>支付宝</td>
          <td>------------------------------------------------------------------------------------------------------</td>
          <td style="text-align:right">{{ alipayMoney }}</td>
        </tr>
        <tr>
          <td>4.</td>
          <td>POS</td>
          <td>------------------------------------------------------------------------------------------------------</td>
          <td style="text-align:right">{{ posMoney }}</td>
        </tr>
        <tr>
          <td>5.</td>
          <td>APP</td>
          <td>------------------------------------------------------------------------------------------------------</td>
          <td style="text-align:right">{{  appMoney }}</td>
        </tr>
        <tr>
          <td>6.</td>
          <td>退款</td>
          <td>------------------------------------------------------------------------------------------------------</td>
          <td style="text-align:right">{{ refundMoney }}</td>
        </tr>
        <tr style="font-weight:bold">
          <td>7.</td>
          <td>合计</td>
          <td>-----------------------------------------------------------------------------------------------------</td>
          <td style="text-align:right">{{ totalMoney }}</td>
        </tr>
        <tr style="font-weight:bold">
          <td>8.</td>
          <td colspan="3">合计大写: {{ upperMoney }}</td>
        </tr>
      </table>
      <table style="margin-left:15px; margin-top:20px">
        <tr>
          <td style="width:250px">店长: </td>
          <td style="width:230px">会计: </td>
          <td style="width:230px">出纳: </td>
          <td style="">收银员: {{ cashier }} </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import editableTables from '_c/editableTables/editableTables.vue'
import { printClassPage } from '@/libs/util.js'
import { getSummary } from '@/api/moneyManagement/cashierStatistics/accountReport.js'
export default ({
  data () {
    return {
      startTime: null,
      endTime: new Date(),
      accountStart: '',
      accountEnd: '',
      timeDate: '',
      cashMoney: '',
      wechatMoney: '',
      alipayMoney: '',
      posMoney: '',
      appMoney: '',
      refundMoney: '',
      totalMoney: '',
      upperMoney: '',
      cashier: ''
    }
  },
  methods: {
    getDate () {
      this.startTime = new Date()
      this.startTime.setHours(0)
      this.startTime.setMinutes(0)
      this.startTime.setSeconds(0)
      // 起始日期格式化
      this.accountStart = this.startTime.Format('yyyy-MM-dd hh:mm:ss')
      this.accountEnd = this.endTime.Format('yyyy-MM-dd hh:mm:ss')
    },
    // 结算统计
    getList () {
      getSummary(this.accountStart, this.accountEnd).then(res => {
        this.cashMoney = res.info[0].现金 / 100
        this.wechatMoney = res.info[1].微信 / 100
        this.alipayMoney = res.info[2].支付宝 / 100
        this.posMoney = res.info[3].POS / 100
        this.appMoney = res.info[4].APP / 100
        this.refundMoney = res.info[5].outPrice / 100
        this.totalMoney = res.info[5].price
        this.upperMoney = res.info[5].priceUpper
        this.cashier = res.info[5].name
      }).catch(err => {
        console.log(err)
      })
    },
    accountPrint () {
      this.timeDate = (new Date()).Format('yyyy-MM-dd hh:mm:ss')
      // 延迟
      setTimeout(item => {
        printClassPage('account')
      }, 50)
    }
  },
  mounted () {
    this.getDate()
    this.getList()
  },
  // 数据监听
  watch: {
    'startTime' (e) {
      this.accountStart = e.Format('yyyy-MM-dd hh:mm:ss')
      this.getList()
    },
    'endTime' (e) {
      this.accountEnd = e.Format('yyyy-MM-dd hh:mm:ss')
      this.getList()
    }
  }
})
</script>
