<template>
  <div>
    <div>
        <span style="color: #959494">
           用户名：
        </span>
      <span>
         {{ this.userName }}
        </span>
    </div>
    <div style="margin-top: 10px">
      <span>
        预存款类别：
      </span>
      <Select v-model="modelCategory" style="width:200px">
        <Option v-for="(item, index) in categoryList" :value="item.id" :key="item.index">{{ item.name }}</Option>
      </Select>
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
import { getPagePayFrom } from '@/api/orderForm/orderForm'
import countTo from '_c/count-to'
import { getCustomer } from '@/api/makeAnAppointment/InformationEditing/InformationEditing'
import { getListPrestore } from '@/api/cuManagement/InformationEditing/InformationEditing'
export default ({
  data () {
    return {
      uId: '',
      dataList: [],
      money: 0,
      userName: '',
      categoryList: [],
      modelCategory: ''
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

      })
    },
    getUserName () {
      getCustomer(this.uId).then(res => {
        this.userName = res.info.cusName
      }).catch(err => {

      })
    },
    getMoney (e) {
      this.money = 0
      this.dataList.map(item => {
        this.money += item.payPrice * 100
      })
      this.money = Math.floor(this.money) / 100
    },
    // 得到优惠类别
    getDiscounts () {
      this.categoryList = []
      this.modelCategory = ''
      getListPrestore().then(res => {
        res.info.map(item => {
          this.categoryList.push(item)
        })
      }).catch(() => {
        console.log('得到优惠类别 异常')
      })
    }
  },
  mounted () {

  },
  watch: {
    'userId' (e) {
      this.uId = e.split('/')[0]
      this.getList()
      this.getUserName()
      this.getDiscounts()
    },
    'sub' () {
      let dataSub = {
        paymentList: this.dataList,
        totalPrices: this.money,
        cusId: this.uId,
        preId: this.modelCategory
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
