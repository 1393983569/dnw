<template>
  <div>
    <div id="refundOrder" style="margin-left:30px; width:800px">
      <div style="text-align:center;margin-bottom:20px">
        <ul style="list-style:none">
          <li style="font-size:23px">痘你完({{ shopName }})分店</li>
          <li style="font-size:16px">退款单</li>
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
          <td>日期：</td>
          <td style="width:180px">{{ date }}</td>
          <td>单号: </td>
          <td style="width:120px">{{ orderNumber }}</td>
        </tr>
      </table>
      <hr style="margin:10px auto">
      <div>
        <table style="text-align:center">
          <tr>
            <td style="width:100px">序号</td>
            <td style="width:200px">退款日期</td>
            <td style="width:120px">产品/项目</td>
            <td style="width:100px">数量/次数</td>
            <td style="width:100px">退款金额</td>
            <td style="width:200px">退款原因</td>
            <td style="width:120px">美容顾问</td>
          </tr>
          <template v-for="(item, index) in productInfo">
            <tr>
              <td>{{ index + 1 }}</td>
              <td>{{ date }}</td>
              <td>{{ item.product }}</td>
              <td>{{ item.number }}</td>
              <td>{{ item.refundMoney }}</td>
              <td>{{ refundResult }}</td>
              <td>{{ item.consult }}</td>
            </tr>
          </template>
          <tr style="height:40px"></tr>
          <tr>
            <td style="width:60px"> 合计 </td>
            <td style="width:120px"></td>
            <td style="width:120px"></td>
            <td style="width:100px"></td>
            <td style="width:100px"> {{ totalMoney }} </td>
            <td style="width:100px"></td>
            <td style="width:100px"></td>
            <td style="width:100px"></td>
          </tr>
        </table>
      </div>
      <hr style="margin:10px auto">
      <div>
        <table>
          <tr>
            <td>合计金额: </td>
            <td style="width:80px">{{ totalMoney }}</td>
            <td>退款金额合计: </td>
            <td style="width:100px">{{ refunderMoney }}</td>
            <td>退款金额(大写): </td>
            <td style="width:150px" colspan="3">{{ upperMoney }}</td>
          </tr>
          <tr>
            <template v-for="item in payFrom">
              <td colspan="2">{{ item.payName }}: {{ item.money }}</td>
            </template>
          </tr>
          <tr>
            <td> 抵用券退还:</td>
            <td colspan="5">{{ voucherRefund }}</td>
            <td colspan="2">退款员 : {{ refundor }}</td>
          </tr>
          <tr>
            <td>分店地址: </td>
            <td colspan="5" style="width:100px">{{ address }}</td>
            <td colspan="2">电 话 : {{ telephone }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div slot="footer" style="margin-left:700px; margin-top:30px">
      <Button type="primary" @click="refundOrderPrint">打印退款单</Button>
    </div>
  </div>
</template>
<script>
import { printpage } from '@/libs/util'
import { getOrderType } from '@/api/moneyManagement/moneyManagement.js'
export default {
  data () {
    return {
      cusName: '',
      cusGender: '',
      cusPhone1: '',
      date: '',
      orderNumber: '',
      refundor: '',
      address: '',
      shopName: '',
      telephone: '',
      totalMoney: '',
      refunderMoney: '',
      upperMoney: '',
      voucherRefund: '',
      userId: '',
      refundResult: '',
      refundTime: '',
      type: 2,
      productInfo: [],
      payFrom: []
    }
  },
  props: {
    userDataId: {
      type: String,
      default: ''
    }
  },
  methods: {
    refundOrderPrint () {
      printpage('refundOrder')
    },
    //初始化数据
    getInit() {
      this.cusName = ''
      this.cusGender = ''
      this.cusPhone1 = ''
      this.date = ''
      this.productInfo = []
      this.payFrom = []
      this.refundResult = ''
      this.refunderMoney = ''
      this.totalMoney = ''
      this.shopName = ''
      this.address = ''
      this.refundor = ''
      this.telephone = ''
    },
    getList () {
      if (!this.userId) return
      this.getInit()
      getOrderType(this.userId, this.type).then(res => {
        this.orderNumber = res.info.cusOrderRefundPojo.sign
        if (this.orderNumber === '') {
          this.getInit()
        }else {
          this.cusName = res.info.customerPojo.cusName
          this.cusGender = res.info.customerPojo.cusGender + ''
          if (this.cusGender === '0') {
            this.cusGender = '男'
          } else {
            this.cusGender = '女'
          }
          this.cusPhone1 = res.info.customerPojo.cusPhone1

          this.date = res.info.cusOrderRefundPojo.createTime
          // 获取项目信息
          if (res.info.cusProjectList) {
            res.info.cusProjectList.map(item => {
              let project = {}
              project.product = item.tsProjectPojo.title
              project.number = item.tsProjectPojo.cardNumber
              project.refundMoney = item.tsProjectPojo.price / 100
              project.consult = res.info.sysAccountInfoPojo.accountTitle
              this.productInfo.push(project)
            })
          }
          // 获取套餐信息
          if (res.info.cusSetMealList) {
            res.info.cusSetMealList.map(item => {
              let project = {}
              project.product = item.setMealPojo.mealName
              project.refundMoney = item.setMealPojo.mealPrice / 100
              project.consult = res.info.sysAccountInfoPojo.accountTitle
              this.productInfo.push(project)
            })
          }
          //获取支付渠道
          res.info.cusOrderPayList.map(item => {
            let payList = {}
            payList.payName = item.payFromPojo.name
            payList.money = item.payPrice/100
            this.payFrom.push(payList)
          })
          //退款原因
          this.refundResult = res.info.cusOrderRefundPojo.refundReason
          // 合计金额
          this.totalMoney = res.info.cusOrderRefundPojo.refundNum
          // 退款金额合计
          this.refunderMoney = res.info.cusOrderRefundPojo.refundNum
          // 退款金额大写
          this.upperMoney = res.info.cusOrderRefundPojo.refundNumUpper
          // 抵用券退还

          // 分店名称
          this.shopName = res.info.shopPojo.shopName
          // 分店地址
          this.address = res.info.shopPojo.address
          // 退款员
          this.refundor = res.info.outName
          // 电话
          this.telephone = res.info.sysAccountInfoPojo.accountPhone
        }
      }).catch(err => {

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
