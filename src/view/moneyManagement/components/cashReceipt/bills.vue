<template>
  <div>
    <div v-show="false">
      <div id="bills" style="margin-left:30px; width:800px">
      <div style="text-align:center;margin-bottom:20px">
        <ul style="list-style:none">
          <li style="font-size:23px">痘你完({{shopName}})分店</li>
          <li style="font-size:16px">还款单</li>
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
          <td style="width:180px">{{ this.modalDate }}</td>
          <td>单号: </td>
          <td style="width:120px">{{ orderNumber }}</td>
        </tr>
      </table>
      <hr style="margin:10px auto">
      <div style="margin-bottom:40px">
        <table style="text-align:center">
          <tr>
            <td style="width:150px"> 还款日期 </td>
            <td style="width:150px"> 应收金额 </td>
            <td style="width:150px"> 本单实收金额 </td>
            <td style="width:150px"> 剩余欠款 </td>
          </tr>
          <tr>
            <td>{{ this.modalDate }}</td>
            <td>{{ shouldMoney }}</td>
            <td>{{ actionMoney }}</td>
            <td>{{ residueMoney }}</td>
          </tr>
        </table>
      </div>
      <hr style="margin:10px auto">
      <p></p>
      <div>
        <table>
          <tr>
            <td>合计金额: </td>
            <td style="width:120px">{{ totalMoney }}</td>
            <td>应收金额: </td>
            <td style="width: 120px">{{ shouldMoney }}</td>
            <td>实收金额: </td>
            <td style="width: 120px">{{ actionMoney }}</td>
            <td colspan="2"> 剩余欠款: {{ residueMoney }}</td>
          </tr>
          <tr>
            <template v-for="item in payFrom">
              <td colspan="2">{{item.payName}}: {{ item.money}}</td>
            </template>
          </tr>
          <tr>
            <td colspan="6">本单实收金额(大写): {{ upperMoney }}</td>
            <td>收款员: </td>
            <td>{{ cashier }}</td>
          </tr>
          <tr>
            <td>分店地址: </td>
            <td colspan="5">{{ address }}</td>
            <td>电话: </td>
            <td>{{ telePhone }}</td>
          </tr>
        </table>
      </div>
    </div>
    </div>
    <!-- 显示还款页面  -->
    <div id="bills" style="margin-left:30px; width:800px">
      <div style="text-align:center;margin-bottom:20px">
        <ul style="list-style:none">
          <li style="font-size:23px">痘你完({{shopName}})分店</li>
          <li style="font-size:16px">还款单</li>
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
          <Select v-model="modalDate" style="width: 180px; margin-right: 50px">
            <Option v-for="item in dateList" :value="item.createTime">{{ item.createTime }}</Option>
          </Select>
          <td>单号: </td>
          <td style="width:120px">{{ orderNumber }}</td>
        </tr>
      </table>
      <hr style="margin:10px auto">
      <div style="margin-bottom:40px">
        <table style="text-align:center">
          <tr>
            <td style="width:150px"> 还款日期 </td>
            <td style="width:150px"> 应收金额 </td>
            <td style="width:150px"> 本单实收金额 </td>
            <td style="width:150px"> 剩余欠款 </td>
          </tr>
          <tr>
            <td>{{ this.modalDate }}</td>
            <td>{{ shouldMoney }}</td>
            <td>{{ actionMoney }}</td>
            <td>{{ residueMoney }}</td>
          </tr>
        </table>
      </div>
      <hr style="margin:10px auto">
      <p></p>
      <div>
        <table>
          <tr>
            <td>合计金额: </td>
            <td style="width:100px">{{ totalMoney }}</td>
            <td>应收金额: </td>
            <td style="width:100px">{{ shouldMoney }}</td>
            <td>实收金额: </td>
            <td style="width:100px">{{ actionMoney }}</td>
            <td> 剩余欠款: </td>
            <td>{{ residueMoney }}</td>
          </tr>
          <tr>
            <template v-for="item in payFrom">
              <td colspan="2">{{item.payName}}: {{ item.money}}</td>
            </template>
          </tr>
          <tr>
            <td colspan="6">本单实收金额(大写): {{ upperMoney }} </td>
            <td colspan="2">收款员: {{ cashier }}</td>
          </tr>
          <tr>
            <td>分店地址: </td>
            <td colspan="5">{{ address }}</td>
            <td colspan="2">电话:{{ telePhone }} </td>
          </tr>
        </table>
      </div>
    </div>
    <div slot="footer" style="margin-left:700px; margin-top:30px">
      <Button type="primary" @click="billsPrint">打印还款单</Button>
    </div>
  </div>
</template>
<script>
import { printpage } from '@/libs/util'
import { getOrder, getCusRePayMent } from '@/api/moneyManagement/moneyManagement.js'
export default {
  data () {
    return {
      orderId: '',
      cusName: '',
      cusGender: '',
      cusPhone1: '',
      orderNumber: '',
      cashier: '',
      address: '',
      shopName: '',
      telePhone: '',
      totalMoney: '',
      shouldMoney: '',
      actionMoney: '',
      residueMoney: '',
      upperMoney: '',
      modalDate: '',
      createTime: '',
      dateList: [],
      payFrom: []
    }
  },
  methods: {
    billsPrint () {
      printpage('bills')
    },
    getList () {
      this.dateList = []
      this.orderNumber = ''
      this.cusName = ''
      this.cusGender = ''
      this.cusPhone1 = ''
      this.modalDate = ''
      if (!this.orderId) return
      getOrder(this.orderId, this.customerId).then(res => {
        this.cusName = res.info.customerPojo.cusName
        this.cusGender = res.info.customerPojo.cusGender + ''
        if (this.cusGender === '0') {
          this.cusGender = '男'
        } else {
          this.cusGender = '女'
        }
        this.cusPhone1 = res.info.customerPojo.cusPhone1
        // 获得还款时间和单号列表
        res.info.cusOrderRepaymentList.map(item => {
          let dateValue = {}
          dateValue.createTime = item.createTime
          dateValue.orderId = item.sign
          this.dateList.push(dateValue)
        })
        this.modalDate = this.dateList[0].createTime
      }).catch(err => {

      })
    },
    getInit () {
      this.shouldMoney = ''
      this.actionMoney = ''
      this.residueMoney = ''
      this.payFrom = [],
      this.upperMoney = ''
      this.cashier = ''
      this.address = ''
      this.telePhone = ''
    },
    getRePay () {
      this.getInit()
      getCusRePayMent(this.customerId, this.orderNumber).then(res => {
        // 合计金额
        this.totalMoney = res.info.payAble
        // 应收金额
        this.shouldMoney = res.info.payAble
        // 实收金额
        this.actionMoney = res.info.paid
        // 剩余欠款
        this.residueMoney = this.shouldMoney - this.actionMoney
        // 实收金额大写
        this.upperMoney = res.info.paidUpper
        // 收款员
        this.cashier = res.info.sysAccountInfoPojo.accountTitle
        // 分店名称
        this.shopName = res.info.shopPojo.shopName
        // 分店地址
        this.address = res.info.shopPojo.address
        // 电话
        this.telePhone = res.info.sysAccountInfoPojo.accountPhone
        // 获取支付渠道
        res.info.cusOrderPayList.map(item => {
          let payList = {}
          payList.payName = item.payFromPojo.name
          payList.money = item.payPrice / 100
          this.payFrom.push(payList)
        })
      })
    },
    // 获取与还款时间对应的订单id
    getOrderId () {
      this.dateList.map(item => {
        if (this.createTime === item.createTime) {
          this.orderNumber = item.orderId
          this.getRePay()
        }
      })
    }
  },
  props: {
    userDataId: {
      type: String,
      default: ''
    },
    prestoreId: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.getList()
  },
  watch: {
    'prestoreId' (e) {
      this.customerId = e.split('/')[0]
      this.getList()
    },
    'userDataId' (e) {
      this.orderId = e.split('/')[0]
      this.getList()
    },
    'modalDate' (e) {
      this.createTime = e
      this.getOrderId()
    }
  }
}
</script>
