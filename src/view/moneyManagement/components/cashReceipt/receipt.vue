<template>
  <div>
    <div id="receiptPrint" style="margin-left:30px; width:800px">
      <div style="text-align:center;margin-bottom:20px">
        <ul style="list-style:none">
          <li style="font-size:23px">痘你完({{ shopName }})分店</li>
          <li style="font-size:16px">收款单</li>
        </ul>
      </div>
      <table>
        <tr>
          <td>顾客姓名：</td>
          <td style="width:60px">{{ cusName }}</td>
          <td>性别：</td>
          <td style="width:40px">{{ cusGender }}</td>
          <td>电话：</td>
          <td style="width:120px">{{ cusPhone1 }}</td>
          <td>收款日期：</td>
          <td style="width:180px">{{ date }}</td>
          <td>单号: </td>
          <td style="width:120px">{{ orderNumber }}</td>
        </tr>
      </table>
      <hr style="margin:10px auto">
      <div>
        <table style="text-align:center">
          <tr>
            <td style="width:60px">序号</td>
            <td style="width:120px">产品/项目</td>
            <td style="width:100px">规格</td>
            <td style="width:100px">数量/次数</td>
            <td style="width:100px">应收金额</td>
            <td style="width:100px">实收金额</td>
            <td style="width:100px">美容顾问</td>
            <td style="width:100px">美容师</td>
          </tr>
          <template v-for="(item, index) in productInfo">
            <tr>
              <td>{{ index + 1 }}</td>
              <td>{{ item.product }}</td>
              <td>{{ item.standard }}</td>
              <td>{{ item.number }}</td>
              <td>{{ item.receivable }}</td>
              <td>{{ item.officialReceipt }}</td>
              <td>{{ item.consult }}</td>
              <td>{{ item.cosmetologist }}</td>
            </tr>
          </template>
          <tr style="height:20px"></tr>
          <tr>
            <td style="width:60px"> 合计 </td>
            <td style="width:120px"></td>
            <td style="width:100px"></td>
            <td style="width:100px">{{ number }}</td>
            <td style="width:100px">{{ shouldPay }}</td>
            <td style="width:100px">{{ actionPay }}</td>
            <td style="width:100px"></td>
            <td style="width:100px"></td>
          </tr>
        </table>
      </div>
      <hr style="margin:10px auto">
      <div>
        <table>
          <tr>
            <td>合计金额 : </td>
            <td style="width:120px">{{ totalMoney }}</td>
            <td>应收金额 : </td>
            <td style="width:120px">{{ shouldPay }}</td>
            <td>实收金额 : </td>
            <td style="width:120px">{{ actionPay }}</td>
            <td colspan="2"> 欠 款 : {{ unPay }}</td>
          </tr>
          <tr>
            <template v-for="(item, index) in payFrom">
              <td colspan="2" v-if="item.pay !== '0'">{{ item.payName }} : {{ item.pay }}</td>
            </template>
          </tr>
          <tr>
            <td>预存支付 : </td>
            <td colspan="5">{{ prestorePay }}</td>
            <td>抵用券支付 : </td>
            <td style="width:100px">{{ voucherPay }}</td>
          </tr>
          <tr>
            <td colspan="6">本单实收金额 (大写): {{ upperMoney }}</td>
            <td colspan="3">收款员 : {{ cashier }}</td>
          </tr>
          <tr>
            <td>分店地址 : </td>
            <td colspan="5">{{ address }}</td>
            <td colspan="2"> 电 话 : {{ telephone }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div slot="footer" style="margin-left:750px; margin-top:30px">
      <Button type="primary" @click="gitPrintpage">打印收款单</Button>
    </div>
  </div>
</template>
<script>
import { printpage } from '@/libs/util'
import { getOrder } from '@/api/moneyManagement/moneyManagement.js'
export default {
  data () {
    return {
      pageNum: 1,
      cusName: '',
      cusGender: '',
      cusPhone1: '',
      date: '',
      orderNumber: '',
      number: '',
      totalMoney: '',
      shouldPay: '',
      actionPay: '',
      unPay: '',
      payName: '',
      pay: '',
      payFrom: [],
      productInfo: [],
      shopName: '',
      prestorePay: '',
      voucherPay: '',
      upperMoney: '',
      cashier: '',
      address: '',
      telephone: '',
      userId: '',
      customerId: '',
      pageTotal: {
        default: '1'
      }
    }
  },
  props: {
    userDataId: {
      type: String,
      default: ''
    }
  },
  methods: {
    gitPrintpage () {
      printpage('receiptPrint')
    },
    getList () {
      this.productInfo = []
      this.payFrom = []
      if (!this.userId) return
      getOrder(this.userId).then(res => {
        // 获取顾客基本信息
        this.cusName = res.info.customerPojo.cusName
        this.cusGender = res.info.customerPojo.cusGender + ''
        if (this.cusGender === '0') {
          this.cusGender = '男'
        } else {
          this.cusGender = '女'
        }
        this.cusPhone1 = res.info.customerPojo.cusPhone1
        this.orderNumber = res.info.orderNum
        this.date = res.info.createTime
        // 金额合计
        this.totalMoney = res.info.money / 100
        // 应付金额
        this.shouldPay = res.info.payable / 100
        // 实付金额
        this.actionPay = res.info.paid / 100
        // 欠款
        this.unPay = res.info.unpaid / 100
        // 分店名称
        this.shopName = res.info.shopPojo.shopName
        // 本单实收金额大写
        this.upperMoney = res.info.paidStr
        // 收款员
        this.cashier = res.info.payName
        // 分店地址
        this.address = res.info.shopPojo.address
        // 分店电话
        this.telephone = res.info.sysAccountInfoPojo.accountPhone
        // 抵用券支付和预存支付
        res.info.cusOrderPayList.map(item => {
          if (item.payFromPojo === null) {
            this.voucherPay = item.giveNum/100
            this.prestorePay = item.preNum/100
          }else{
            this.voucherPay = 0
            this.prestorePay = 0
          }
        })
        // 各支付渠道支付金额
        res.info.cusOrderPayList.map(item => {
          let project = {}
          project.payName = item.payFromPojo.name
          project.pay = item.payPrice / 100
          this.payFrom.push(project)
        })
        // 获取项目信息
        if (res.info.cusProjectList) {
          res.info.cusProjectList.map(item => {
            let project = {}
            project.product = item.tsProjectPojo.title
            project.number = item.tsProjectPojo.cardNumber
            project.receivable = item.tsProjectPojo.price / 100
            project.officialReceipt = item.finalPrice / 100
            project.consult = res.info.sysAccountInfoPojo.accountTitle
            this.productInfo.push(project)
          })
        }
        // 获取套餐信息
        if (res.info.cusSetMealList) {
          res.info.cusSetMealList.map(item => {
            let project = {}
            project.product = item.setMealPojo.mealName
            project.receivable = item.setMealPojo.mealPrice / 100
            project.officialReceipt = item.finalPrice / 100
            project.consult = res.info.sysAccountInfoPojo.accountTitle
            this.productInfo.push(project)
          })
        }
        // 获取产品信息
        if (res.info.cusGoodsList) {
          res.info.cusGoodsList.map(item => {
            let project = {}
            project.product = item.goodsPojo.goodsName
            project.standard = item.goodsUnitPojo.unityname
            project.number = item.goodsPojo.goodsNum
            project.receivable = item.goodsPojo.shopPrice / 100
            project.officialReceipt = item.finalPrice / 100
            project.consult = res.info.sysAccountInfoPojo.accountTitle
            project.cosmetologist = item.refereeName
            this.productInfo.push(project)
          })
        }
      })
    }
  },
  mounted () {
    this.getList()
  },
  watch: {
    'userDataId' (e) {
      this.userId = e.split('/')[0]
      this.getList()
    }
  }
}
</script>
