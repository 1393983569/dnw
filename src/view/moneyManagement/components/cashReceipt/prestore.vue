<template>
  <div>
    <div v-show="false">
        <div id="prestore" style="margin-left:30px; width:800px">
        <div style="text-align:center;margin-bottom:20px">
          <ul style="list-style:none">
            <li style="font-size:23px">痘你完({{ shopName }})分店</li>
            <li style="font-size:16px">预存单</li>
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
            <td>存款日期：</td>
            <td style="width:180px">{{ this.prestoreTime }}</td>
            <td>单号: </td>
            <td style="width:120px">{{ orderNumber }}</td>
          </tr>
        </table>
        <hr style="margin:10px auto">
        <div style="margin-bottom:40px">
          <table style="text-align:center">
            <tr>
              <td>预存金额(小写): </td>
              <td>{{ prestoreMoney }}</td>
            </tr>
            <tr>
              <td>预存金额(大写): </td>
              <td>{{ upperPrestoreMoney }}</td>
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
              <td>实收金额: </td>
              <td style="width:120px">{{ actionMoney }}</td>
              <td style="width:80px"></td>
              <td style="width:80px"></td>
              <td colspan="2">抵用券赠送金额: {{ voucherMoney }}</td>
            </tr>
            <tr>
              <template v-for="(item, index) in moneyFrom">
                <td colspan="2">{{ item.payName }}: {{ item.pay }}</td>
              </template>
            </tr>
            <tr>
              <td colspan="4"> 预存金额(大写): {{ upperPrestoreMoney }}</td>
              <td></td>
              <td></td>
              <td colspan="2">收 款 员: {{ cashier }}</td>
            </tr>
            <tr>
              <td colspan="4">分店地址 : {{ address }}</td>
              <td></td>
              <td></td>
              <td colspan="2"> 电 话 : {{ telephone }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <!-- ===================================== -->
    <div id="prestore" style="margin-left:30px; width:800px" :loading="loading">
      <div style="text-align:center;margin-bottom:20px">
        <ul style="list-style:none">
          <li style="font-size:23px">痘你完({{ shopName }})分店</li>
          <li style="font-size:16px">预存单</li>
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
          <td>存款日期：</td>
          <div style="margin-right: 50px">
            <Select v-model="modelDate" style="width:150px" >
              <Option v-for="item in dateList" :value="item.createTime">{{ item.createTime }}</Option>
            </Select>
          </div>
          <td>单号: </td>
          <td style="width:120px">{{ this.orderNumber }}</td>
        </tr>
      </table>
      <hr style="margin:10px auto">
      <div style="margin-bottom:40px">
        <table style="text-align:center">
          <tr>
            <td>预存金额(小写): </td>
            <td>{{ prestoreMoney }}</td>
          </tr>
          <tr>
            <td>预存金额(大写): </td>
            <td>{{ upperPrestoreMoney }}</td>
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
            <td>实收金额: </td>
            <td style="width:120px">{{ actionMoney }}</td>
            <td style="width:80px"></td>
            <td style="width:80px"></td>
            <td colspan="2">抵用券赠送金额: {{ voucherMoney }}</td>
          </tr>
          <!--支付方式 -->
          <tr>
            <template v-for="(item, index) in moneyFrom">
              <td colspan="2" v-if="item.pay != 0">{{ item.payName }} : {{ item.pay }} </td>
            </template>
          </tr>
          <tr>
            <td colspan="4"> 预存金额(大写): {{ upperPrestoreMoney }}</td>
            <td></td>
            <td></td>
            <td colspan="2">收 款 员: {{ cashier }}</td>
          </tr>
          <tr>
            <td colspan="4">分店地址 : {{ address }}</td>
            <td></td>
            <td></td>
            <td colspan="2"> 电 话 : {{ telephone }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div slot="footer" style="margin-left:700px; margin-top:30px">
      <Button type="primary" @click="prestorePrint">打印预存单</Button>
    </div>
  </div>
</template>
<script>
import { printpage } from '@/libs/util'
import { getCusPrestore, getOrder } from '@/api/moneyManagement/moneyManagement.js'
export default {
  data () {
    return {
      cusName: '',
      cusGender: '',
      cusPhone1: '',
      date: '',
      orderNumber: '',
      shopName: '',
      address: '',
      telephone: '',
      prestoreMoney: '',
      upperPrestoreMoney: '',
      totalMoney: '',
      actionMoney: '',
      voucherMoney: '',
      cashier: '',
      moneyFrom: [],
      payName: '',
      pay: '',
      customerId: '',
      modelDate: '',
      prestoreTime: '',
      dateList: [],
      loading: true
    }
  },
  methods: {
    prestorePrint () {
      printpage('prestore')
    },
    getList () {
      this.cusName = ''
      this.cusGender = ''
      this.cusPhone1 = ''
      this.modelDate = ''
      this.orderNumber = ''
      this.dateList = []
      if (!this.orderId) return
      getOrder(this.orderId, this.customerId).then(res => {
        this.cusName = res.info.customerPojo.cusName
        this.cusGender = res.info.customerPojo.cusGender === '0' ? '男' : '女'
        this.cusPhone1 = res.info.customerPojo.cusPhone1
        if (res.info.cusPrestoreList !== []) {
          res.info.cusPrestoreList.map(item => {
            let dateValue = {}
            dateValue.createTime = item.createTime
            dateValue.orderId = item.sign
            this.dateList.push(dateValue)
          })
          this.modelDate = this.dateList[0].createTime
        }
      })
    },
    getUserInfo () {
      if (!this.customerId) return
      this.address = ''
      this.date = ''
      this.prestoreMoney = ''
      this.upperPrestoreMoney = ''
      this.actionMoney = ''
      this.voucherMoney = ''
      this.totalMoney = ''
      this.cashier = ''
      this.telephone = ''
      getCusPrestore(this.customerId, this.orderNumber).then(res => {
        this.moneyFrom = []
        this.shopName = res.info.shopPojo.shopName
        this.address = res.info.shopPojo.address
        this.date = res.info.createTime
        this.prestoreMoney = res.info.prePrice / 100
        this.upperPrestoreMoney = res.info.preNumUpper
        this.actionMoney = res.info.allPrice
        this.voucherMoney = res.info.giveNum
        this.totalMoney = this.actionMoney + this.voucherMoney
        this.cashier = res.info.sysAccountInfoPojo.accountTitle
        this.telephone = res.info.sysAccountInfoPojo.accountPhone
        res.info.cusOrderPayList.map(item => {
          let money = {}
          money.payName = item.payFromPojo.name
          money.pay = item.payPrice / 100
          this.moneyFrom.push(money)
        })
      }).catch(err => {

      })
    },
    getOrderId () {
      this.dateList.map(item => {
        if (item.createTime === this.prestoreTime) {
          this.orderNumber = item.orderId
          this.getUserInfo()
        }
      })
    }
  },
  props: {
    prestoreId: {
      type: String,
      default: ''
    },
    userDataId: {
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
      this.getUserInfo()
    },
    'userDataId' (e) {
      this.orderId = e.split('/')[0]
      this.getList()
    },
    'modelDate' (e) {
      this.prestoreTime = e
      this.getOrderId()
    }
  }
}
</script>
