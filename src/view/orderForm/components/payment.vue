  <template>
    <div>
      <Alert type="warning" show-icon>系统默认优先使用预存款支付</Alert>
      <div style="text-align: center">
          <span style="color: #959494">
             用户名：
          </span>
        <span>
           {{ this.userName }}
          </span>
      </div>
      <div style="text-align: center; margin-top: 10px">
        <div style="display: inline-block">
          <span style="color: #959494">
             预存款：
          </span>
          <span style="color: #00a50f">
            {{ prestore }}
          </span>
        </div>
        <div style="display: inline-block">
          <span style="color: #959494">
             应付：
          </span>
          <span>
            {{ dealWith }}
          </span>
        </div>
      </div>
      <div style="text-align: center; margin-top: 10px">
        <span style="color: #959494">
           实付：
        </span>
        <span style="color: #ae0a35; font-size: 20px">
           {{ outOfPocket }}
        </span>
      </div>
      <template v-for="(item, index) in dataList">
        <div style="margin-top: 10px">
          <span>{{ item.name }}:</span>
          <InputNumber :min="0" v-model="item.payPrice" @on-change="getMoney(index)" style="width: 100%; margin-top: 5px"></InputNumber>
        </div>
      </template>
      <Divider orientation="left">总 计</Divider>
      <div style="height: 20px;">
        <count-to :decimals="2" :duration="1" :end="money" style="color: #ae0a35; font-size: 20px;float: right; padding-right: 20px;">
            <span slot="left">
              <Icon type="logo-yen" />
            </span>
        </count-to>
      </div>
    </div>
  </template>
<script>
import { getPagePayFrom, getCusAllPrestore } from '@/api/orderForm/orderForm'
import countTo from '_c/count-to'
export default ({
  data () {
    return {
      uId: '',
      dataList: [],
      money: 0,
      userName: '',
      prestore: '',
      dealWith: '',
      outOfPocket: '',
      orderNum: ''
    }
  },
  props: {
    userId: {
      type: String,
      required: true
    },
    sub: {
      type: String,
      default: ''
    },
    cancel: {
      type: String,
      default: ''
    }
  },
  components: {
    countTo
  },
  methods: {
    getList () {
      this.dataList = []
      getPagePayFrom().then(res => {
        res.info.data.map(item => {
          this.dataList.push({
            pfromId: item.id,
            name: item.name,
            payPrice: 0
          })
        })
      }).catch(err => {
        console.log(err)
      })
    },
    getMoney (e) {
      this.money = 0
      this.dataList.map(item => {
        this.money += item.payPrice * 100
      })
      this.money = Math.floor(this.money) / 100
    },
    getPrestoreAndoutOfPocketDetails () {
      this.prestore = ''
      this.dealWith = ''
      this.outOfPocket = ''
      getCusAllPrestore(this.uId, this.orderNum).then(res => {
        this.prestore = res.info.allPres
        this.dealWith = res.info.payAble
        this.outOfPocket = res.info.pay
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {

  },
  watch: {
    'userId' (e) {
      this.uId = e.split('/')[0].split('.')[0]
      this.userName = e.split('/')[0].split('.')[1]
      this.orderNum = e.split('/')[0].split('.')[2]
      this.getList()
      this.getPrestoreAndoutOfPocketDetails()
    },
    'sub' () {
      let dataSub = {
        paymentList: this.dataList,
        totalPrices: this.money,
        orderId: this.orderNum,
        cusId: this.uId
      }
      this.$emit('submitPayment', dataSub)
    },
    'cancel' () {
      this.dataList = []
      this.money = 0
    }
  }
})
</script>
  <style>
  </style>
