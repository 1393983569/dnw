<template>
  <div>
    <div>
      <editableTables :columns='columns' :pageTotal='pageTotal' v-model="dataList" :selectOption='selectOption' @filtrateClick='filtrateClick' @getPage='getPageNum' :selectSatae="selectSatae">
        <Select v-model="selectSataeData" @on-change="selectOn" style="width:200px" placeholder="请选择状态">
          <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <DatePicker @on-change="getData" @on-clear="dateClear" clearable type="daterange" show-week-numbers placement="bottom-end" placeholder="请选择时间区间" style="width: 200px"></DatePicker>
      </editableTables>
    </div>
    <!-- 详情 -->
    <Modal
      v-model="modal"
      title="详情"
      width="900">
      <particulars :userId="userId"></particulars>
    </Modal>
    <!-- 付款 -->
    <Modal
      v-model="modalPayment"
      title="付款"
      width="500">
      <payment :userId="userIdPayment" :sub="submitNum" :cancel="cancelState" @submitPayment="submitPayment"></payment>
      <div slot="footer">
        <Button type="primary" :loading="modal_loading" @click="okPayment">确定</Button>
        <Button @click="cancel">取消</Button>
      </div>
    </Modal>
    <!-- 优惠 -->
    <Modal
      v-model="modalDiscounts"
      title="优惠"
      @on-ok="okDiscounts"
      width="500">
      <discounts :subState="subDiscounts" :orderId="discountsId" @subDataOvr="subDataOvr"></discounts>
    </Modal>
    <!-- 退单 -->
    <Modal
      v-model="modalRefund"
      title="优惠"
      width="500">
      <refund :userId="userIdRefund" :sub="subRefund" :cancel="cancelRefundValue" @submitRefund="submitRefund"></refund>
      <div slot="footer">
        <Button type="primary" :loading="modal_loading" @click="okRefund">确定</Button>
        <Button @click="cancelRefund">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import editableTables from '_c/editableTables/editableTables.vue'
import {getPageOrder, orderPay, addRefund} from '@/api/orderForm/orderForm'
// 详情
import particulars from './components/particulars'
// 付款
import payment from './components/payment'
// 优惠
import discounts from './components/discounts'
// 退单
import refund from './components/refund'
export default({
  data () {
    return {
      columns: [
        {
          title: '订单编号',
          key: 'orderNum'
        },
        {
          title: '开单人',
          key: 'aName'
        },
        {
          title: '客户名称',
          key: 'cusName'
        },
        {
          title: '总价',
          key: 'money'
        },
        {
          title: '应付',
          key: 'payable'
        },
        {
          title: '已付',
          key: 'paid',
          render: (h, params) => {
            return (
              <div>
                {<span style="color: #10891e;">{params.row.paid}</span>}
              </div>
            )
          }
        },
        {
          title: '未付',
          key: 'unpaid',
          render: (h, params) => {
            return (
              <div>
                {<span style="color: #f90;">{params.row.unpaid}</span>}
              </div>
            )
          }
        },
        {
          title: '优惠',
          key: 'preferential'
        },
        {
          title: '状态',
          key: 'state',
          render: (h, params) => {
            return (
              <div>
                {params.row.state === '退单' ? <div style="color: #f16643;">退单</div> : params.row.state === '已完成' ? <div style="color: #10891e">已完成</div> : <div style="color: #f90">未完成</div>}
              </div>
            )
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 250,
          align: 'center',
          render: (h, params) => {
            let showAdd = false
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.modal = true
                    this.userId = params.row.id
                  }
                }
              }, '详情'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: params.row.state === '退单'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.modalPayment = true
                    this.userIdPayment = params.row.cusId + '.' + params.row.cusName + '.' + params.row.id + '/' + new Date()
                  }
                }
              }, '付款'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: params.row.state === '退单'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.modalDiscounts = true
                    this.discountsId = params.row.id + '/' + new Date() + ''
                  }
                }
              }, '优惠'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  disabled: params.row.state === '退单'
                },
                on: {
                  click: () => {
                    this.modalRefund = true
                    this.userIdRefund = params.row.cusId + '.' + params.row.id + '/' + new Date()
                  }
                }
              }, '退单')
            ])
          }
        }
      ],
      selectOption: [
        {
          label: '订单编号',
          value: 'orderNum'
        },
        {
          label: '客户名称',
          value: 'cusName'
        },
        {
          label: '开单人',
          value: 'aName'
        }
      ],
      stateList: [
        {
          label: '未完成',
          value: '0'
        },
        {
          label: '已完成',
          value: '1'
        },
        {
          label: '退单',
          value: '2'
        }
      ],
      // 基本参数
      dataList: [],
      // 查询参数
      selectValue: '',
      selectState: '',
      // 分页参数
      pageNum: 1,
      pageTotal: 1,
      // 需求参数
      selectSatae: '',
      selectSataeData: '',
      emptyState: true,
      dataDate: '',
      modal: false,
      userId: '',
      modalPayment: false,
      userIdPayment: '',
      submitNum: '',
      cancelState: '',
      modalDiscounts: false,
      subDiscounts: '',
      discountsId: '',
      modalRefund: false,
      subRefund: '',
      cancelRefundValue: '',
      userIdRefund: '',
      modal_loading: false
    }
  },
  methods: {
    // 筛选条件
    filtrateClick (e) {
      // 清空状态
      this.selectSataeData = ''
      this.emptyState = false
      // 复位页码
      this.pageNum = 1
      if (e.modelSelect === 'orderNum') {
        this.selectValue = {
          value: e.selectValueInput,
          key: 'orderNum'
        }
        this.getList()
        return
      } else {
        this.selectValue = {}
      }
      if (e.modelSelect === 'cusName') {
        this.selectValue = {
          value: e.selectValueInput,
          key: 'cusName'
        }
        this.getList()
        return
      } else {
        this.selectValue = {}
      }
      if (e.modelSelect === 'aName') {
        this.selectValue = {
          value: e.selectValueInput,
          key: 'aName'
        }
        this.getList()
        return
      } else {
        this.selectValue = {}
      }
      this.getList()
    },
    // 分页查询订单
    getList () {
      this.dataList = []
      getPageOrder(this.pageNum, this.selectValue, this.dataDate).then(res => {
        if (res.info === '暂无数据') {
          this.$Message.error(res.info)
          this.pageTotal = 1
          return
        }
        this.pageTotal = res.info.pageTotal
        res.info.data.map(item => {
          let dataState = ''
          // 判断状态
          if (item.state === 0) {
            dataState = '未完成'
          } else if (item.state === 1) {
            dataState = '已完成'
          } else {
            dataState = '退单'
          }
          this.dataList.push({
            orderNum: item.orderNum,
            aName: item.aName,
            cusName: item.customerPojo.cusName,
            money: Math.floor(item.money) / 100,
            payable: Math.floor(item.payable) / 100,
            paid: Math.floor(item.paid) / 100,
            preferential: Math.floor(item.preferential) / 100,
            state: dataState,
            unpaid: Math.floor(item.unpaid) / 100,
            id: item.id + '',
            cusId: item.cusId + ''
          })
        })
      }).catch(err => {
        this.$Message.error(err)
      })
    },
    selectOn (e) {
      if (this.emptyState) {
        this.selectSatae = e + new Date()
        this.selectValue = {
          value: e,
          key: 'state'
        }
        this.getList()
      }
      this.emptyState = true
    },
    // 得到页数
    getPageNum (e) {
      this.pageNum = e
      this.getList()
    },
    // 复位
    restoration () {
      this.pageNum = 1
    },
    // 选择时间
    getData (e) {
      if (!e[0]) return
      let data = {}
      data.startTime = e[0]
      data.endTime = e[1]
      this.dataDate = data
      this.getList()
    },
    dateClear () {
      this.dataDate = ''
      this.getList()
    },
    // 提交付款
    submitPayment (e) {
      this.cancelState = new Date() + ''
      orderPay(e).then(res => {
        this.$Message.success(res.info)
        this.modal_loading = false
        this.modalPayment = false
        this.getList()
      }).catch(err => {
        this.$Message.error(err)
        this.modal_loading = false
        this.modalPayment = false
      })
    },
    // 提交金额
    okDiscounts (e) {
      this.subDiscounts = new Date() + ''
    },
    // 判断成功状态
    subDataOvr () {
      this.getList()
    },
    okPayment () {
      this.modal_loading = true
      this.submitNum = new Date() + ''
    },
    cancel () {
      this.modalPayment = false
      this.cancelState = new Date() + ''
    },
    okRefund () {
      this.modal_loading = true
      this.subRefund = new Date() + ''
    },
    cancelRefund () {
      this.cancelRefundValue = new Date() + ''
    },
    // 退单提交
    submitRefund (e) {
      addRefund(e).then(res => {
        this.$Message.success(res.info)
        this.cancelRefund()
        this.modal_loading = false
        this.modalRefund = false
        this.getList()
      }).catch(err => {
        this.$Message.error(err)
        this.cancelRefund()
        this.modal_loading = false
        this.modalRefund = false
      })
    }
  },
  components: {
    editableTables,
    particulars,
    payment,
    discounts,
    refund
  },
  mounted () {
    // 初始化管理员列表
    this.getList()
  }
})
</script>
<style>

</style>
