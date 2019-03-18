<template>
  <div>
    <editable-tables :columns='columns7' :pageTotal='pageTotal' v-model="data7" :selectOption='selectOption' @filtrateClick='filtrateClick' @getPage='getPageNum':isLoading="loading">
    </editable-tables>
    <Modal
      v-model="payDetails"
      title="收银小票打印"
      width="1000">
      <div>
        <cash-receipt :ordersId='ordersId' :cusId='cusId'></cash-receipt>
      </div>
      <div slot="footer" hidden>
      </div>
    </Modal>
  </div>
</template>
<script>
import editableTables from '_c/editableTables/editableTables.vue'
import cashReceipt from './components/cashReceipt'
import { getPageOrder } from '@/api/moneyManagement/moneyManagement'
import { printpage } from '@/libs/util'
export default ({
  data () {
    return {
      payDetails: false,
      loading: false,
      pageTotal: 1,
      PageNum: 1,
      ordersId: '',
      cusId: '',
      selectOption: [
        {
          value: 'orderId',
          label: '订单号'
        },
        {
          value: 'cusName',
          label: '顾客姓名'
        },
        {
          value: 'cusGender',
          label: '性别'
        },
        {
          value: 'cusPhone1',
          label: '联系电话'
        }
      ],
      columns7: [
        {
          title: '订单编号',
          key: 'orderId',
          align: 'center'
        },
        {
          title: '顾客姓名',
          key: 'cusName',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('strong', params.row.cusName)
            ])
          }
        },
        {
          title: '性别',
          key: 'cusGender',
          align: 'center'
        },
        {
          title: '联系电话',
          key: 'cusPhone1',
          align: 'center'
        },
        {
          title: '订单日期',
          key: 'orderTime',
          align: 'center'
        },
        {
          title: '具体操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  sizeType: 'original'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.payDetails = true
                    this.ordersId = params.row.ordersId + ''
                    this.cusId = params.row.cusId + ''
                  }
                }
              }, '小票打印')
            ])
          }
        }
      ],
      data7: []
    }
  },
  components: {
    cashReceipt,
    editableTables
  },
  methods: {
    // 筛选条件 查询条件
    filtrateClick (e) {
      this.PageNum = 1
      if (e.modelSelect === 'orderId') {
        this.orderId = e.selectValueInput
      } else {
        this.orderId = ''
      }
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
      if (e.modelSelect === 'cusPhone1') {
        this.cusPhone1 = e.selectValueInput
      } else {
        this.cusPhone1 = ''
      }
      this.getList()
    },
    // 分页获取顾客订单信息
    getList () {
      this.data7 = []
      this.loading = true
      getPageOrder(this.PageNum, this.orderId, this.cusName, this.cusGender, this.cusPhone1).then(res => {
        this.loading = false
        if (res.info === '暂无数据') {
          this.$Message.error(res.info)
          this.pageTotal = 1
          return
        }
        this.pageTotal = res.info.pageTotal
        res.info.data.map(item => {
          let data = {}
          data.orderTime = item.createTime
          data.orderId = item.orderNum
          data.cusName = item.customerPojo.cusName
          data.cusGender = item.customerPojo.cusGender + '' === '0' ? '男' : '女'
          data.cusPhone1 = item.customerPojo.cusPhone1
          // 订单id
          data.ordersId = item.id
          // 顾客id
          data.cusId = item.cusId
          this.data7.push(data)
        })
      }).catch(err => {
        this.$Message.error(err)
      })
    },
    // 获取分页
    getPageNum (e) {
      this.PageNum = e
      this.getList()
    }
  },
  // 页面加载完成后就执行的函数
  mounted () {
    this.$nextTick(() => {
      this.getList()
    })
  }
})
</script>
<style>
</style>
