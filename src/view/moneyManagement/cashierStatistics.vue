<template>
  <div id="cashier">
    <h1 align="center">逗你完({{ shopName }})分店收银统计表</h1>
    <editable-tables :columns='columns1' :pageTotal='pageTotal' v-model="data1" :selectOption='selectOption' @filtrateClick='filtrateClick' @getPage='getPageNum' style="margin-top:30px" :isLoading="loading">
      <DatePicker type="daterange" v-model="statisticTime" :value="value1" placement="bottom-end" style="width: 200px"></DatePicker>
      <div style="display: inline-block; vertical-align: top">
        <Button type="primary" @click='getExport'>导出</Button>
      </div>
      <div slot='statistics' style="margin-top:30px">
        <span style="font-size:16; display: inline-block; margin-left:30px">合计总额： {{ totalMoney }}</span>
        <span style="font-size:16; display: inline-block; margin-left:60px">现金： {{ cashMoney }}</span>
        <span style="font-size:16; display: inline-block; margin-left:60px">微信： {{  wechatMoney }}</span>
        <span style="font-size:16; display: inline-block; margin-left:60px">支付宝： {{  alipayMoney }}</span>
        <span style="font-size:16; display: inline-block; margin-left:60px">POS机： {{ posMoney }}</span>
        <span style="font-size:16; display: inline-block; margin-left:60px">APP： {{ appMoney }}</span>
        <span style="font-size:16; display: inline-block; margin-left:60px">预收款： {{ prestoreMoney }}</span>
        <span style="font-size:16; display: inline-block; margin-left:60px">还款： {{ backMoney }}</span>
        <span style="font-size:16; display: inline-block; margin-left:60px">退款： {{ refundMoney }}</span>
        <span style="font-size:16; display: inline-block; margin-left:60px">抵用券： {{ voucherMoney }}</span>
      </div>
    </editable-tables>
  </div>
</template>
<script>
import editableTables from '_c/editableTables/editableTables.vue'
// 导出  分页
import { getPageCus, shopStatistic, shopStatisticExport } from '@/api/moneyManagement/cashierStatistics/cashierStatistics.js'
export default {
  data () {
    return {
      modalExport: false,
      loading: false,
      pageTotal: 1,
      social: [],
      socialData: [],
      pageNum: 1,
      value1: [],
      totalMoney: '',
      cashMoney: '',
      wechatMoney: '',
      alipayMoney: '',
      posMoney: '',
      appMoney: '',
      prestoreMoney: '',
      backMoney: '',
      refundMoney: '',
      voucherMoney: '',
      startTime: '',
      endTime: '',
      statisticTime: '',
      shopName: '',
      selectOption: [
        {
          value: 'cusName',
          label: '姓名'
        },
        {
          value: 'cusGender',
          label: '性别'
        },
        {
          value: 'phone',
          label: '电话'
        },
        {
          value: 'createTime',
          label: '日期'
        }
      ],
      columns1: [
        {
          type: 'index',
          title: '序号',
          width: 60,
          fixed: 'left',
          align: 'center'
        },
        {
          title: '消费日期',
          key: 'createTime',
          fixed: 'left',
          align: 'center'
        },
        {
          title: '姓名',
          key: 'cusName',
          fixed: 'left',
          align: 'center'
        },
        {
          title: '性别',
          key: 'cusGender',
          align: 'center'
        },
        {
          title: '电话',
          key: 'phone',
          align: 'center'
        },
        {
          title: '消费内容',
          key: 'content',
          align: 'center'
        },
        {
          title: '数量/次数',
          key: 'number',
          align: 'center'
        },
        {
          title: '消费金额',
          key: 'money',
          align: 'center'
        },
        {
          title: '美容顾问',
          key: 'gwName',
          align: 'center'
        },
        {
          title: '美容师',
          key: 'mrsName',
          align: 'center'
        },
        {
          title: '收银员',
          key: 'syName',
          align: 'center'
        }
      ],
      data1: []
    }
  },
  components: {
    editableTables
  },
  methods: {
    filtrateClick (e) {
      this.pageNum = 1
      if (e.modelSelect === 'cusName') {
        this.cusName = e.selectValueInput
      } else {
        this.cusName = ''
      }
      if (e.modelSelect === 'cusGender') {
        this.cusGender = e.selectValueInput === '男' ? '0' : '1'
      } else {
        this.cusGender = ''
      }
      if (e.modelSelect === 'phone') {
        this.Phone = e.selectValueInput
      } else {
        this.phone = ''
      }
      this.getList()
    },
    setDate () {
      // 设置起始日期
      let date = new Date().Format('yyyy-MM-dd').split('-')
      let dateValue = []
      // 字符串拼接
      dateValue[1] = `${date[0]}-${date[1]}-${date[2]}`
      dateValue[0] = `${date[0]}-${date[1]}-1`
      this.statisticTime = dateValue
    },
    getList () {
      this.loading = true
      // 分页
      shopStatistic(this.pageNum, this.startTime, this.endTime, this.cusName, this.cusGender, this.phone).then(res => {
        console.log(res, 'llllll')
        this.totalMoney = ''
        this.prestoreMoney = ''
        this.refundMoney = ''
        this.backMoney = ''
        this.voucherMoney = ''
        this.cashMoney = ''
        this.wechatMoney = ''
        this.alipayMoney = ''
        this.posMoney = ''
        this.appMoney = ''
        this.loading = false
        this.data1 = []
        if (res.info === '暂无数据') return
        res.info.map(item => {
          // 店铺名称
          this.shopName = item.shopName
          // 消费日期
          if (item.cusOrdersStatistic.data != null) {
            item.cusOrdersStatistic.data.map(temp => {
              if (temp.cusGender === '0') {
                temp.cusGender = '男'
              } else{
                temp.cusGender = '女'
              }
              temp.money = temp.money / 100
            })
            this.data1 = item.cusOrdersStatistic.data
          }
          // 预收款总额
          this.prestoreMoney = item.allPrestore
          // 退款总额
          this.refundMoney = item.allRefund
          // 还款总额
          this.backMoney = item.allRepayment
          // 抵用券总额
          this.voucherMoney = item.allGive
          // 支付渠道
          this.cashMoney = item.现金
          this.wechatMoney = item.微信
          this.alipayMoney = item.支付宝
          this.posMoney = item.POS
          this.appMoney = item.APP
          // 合计金额
          this.totalMoney = parseFloat(this.cashMoney) + parseFloat(this.wechatMoney) + parseFloat(this.alipayMoney) +
                          parseFloat(this.posMoney) + parseFloat(this.prestoreMoney) + parseFloat(this.voucherMoney)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取分页
    getPageNum (e) {
      this.pageNum = e
      this.getList()
    },
    //导出
    getExport() {
      console.log(this.startTime, this.endTime, this.cusName, this.cusGender, this.phone)
      shopStatisticExport(this.startTime, this.endTime, this.cusName, this.cusGender, this.phone).then(res => {
        window.location.href = res.info
      }).catch(err => {
        this.$Message.error(err)
      })
    }
  },
  // 立即执行函数
  mounted () {
    this.setDate()
  },
  // 监听函数
  watch: {
    'statisticTime' (e) {
      this.startTime = new Date(e[0]).Format('yyyy-MM-dd')
      this.endTime = new Date(e[1]).Format('yyyy-MM-dd')
      this.getList()
    }
  }
}
</script>
<style>

</style>
