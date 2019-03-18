<template>
    <div>
      <!--<Divider orientation="left" style="font-size: 20px">订 单 详 情</Divider>-->
      <!--<Table :columns="columnsOrderForm" :data="orderForm"></Table>-->
      <!--<Divider orientation="left" style="font-size: 20px">套 餐 列 表</Divider>-->
      <!--<Table :columns="columnsSetMeal" :data="setMeal"></Table>-->
      <!--<Divider orientation="left" style="font-size: 20px">项 目 列 表</Divider>-->
      <!--<Table :columns="columnsProject" :data="project"></Table>-->
      <!--<Divider orientation="left" style="font-size: 20px">产 品 列 表</Divider>-->
      <!--<Table :columns="columnsProduct" :data="product"></Table>-->
      <!--<Divider orientation="left" style="font-size: 20px">退 单 记 录</Divider>-->
      <!--<Table :columns="columnsChargeback" :data="chargeback"></Table>-->
      <!--<Divider orientation="left" style="font-size: 20px">付 款 记 录</Divider>-->
      <!--<Table :columns="columnsPayment" :data="payment"></Table>-->
      <Tabs value="1">
        <TabPane label="订 单 详 情" name="1">
          <Table :columns="columnsOrderForm" :data="orderForm"></Table>
        </TabPane>
        <TabPane label="套 餐 列 表" name="2">
          <Table :columns="columnsSetMeal" :data="setMeal"></Table>
        </TabPane>
        <TabPane label="项 目 列 表" name="3">
          <Table :columns="columnsProject" :data="project"></Table>
        </TabPane>
        <TabPane label="产 品 列 表" name="4">
          <Table :columns="columnsProduct" :data="product"></Table>
        </TabPane>
        <TabPane label="退 单 记 录" name="5">
          <Table :columns="columnsChargeback" :data="chargeback"></Table>
        </TabPane>
        <TabPane label="付 款 记 录" name="6">
          <Table :columns="columnsPayment" :data="payment"></Table>
        </TabPane>
      </Tabs>
    </div>
</template>
<script>
import { getOrder } from '@/api/orderForm/orderForm'
export default ({
  data () {
    return {
      id: '',
      // 订单
      orderForm: [],
      columnsOrderForm: [
        {
          type: 'expand',
          width: 50,
          render: (h, {row, index}) => {
            return (
              <div>
                <row>
                  <i-col span="8">
                    <span>原价: </span>
                    <span>{ row.money }</span>
                  </i-col>
                  <i-col span="8">
                    <span>应付: </span>
                    <span>{ row.payable }</span>
                  </i-col>
                  <i-col span="8">
                    <span>已付: </span>
                    <span>{ row.paid }</span>
                  </i-col>
                </row>
                <row>
                  <i-col span="8">
                    <span>未付: </span>
                    <span>{ row.unpaid }</span>
                  </i-col>
                  <i-col span="8">
                    <span>优惠: </span>
                    {row.preferential ? <span>{ row.preferential }</span> : <span>0</span>}
                  </i-col>
                  <i-col span="8">
                  </i-col>
                </row>
              </div>
            )
          }
        },
        {
          title: '订单号',
          key: 'orderNum'
        },
        {
          title: '客户名称',
          key: 'cusName'
        },
        {
          title: '美颜顾问',
          key: 'aName'
        },
        {
          title: '状态',
          key: 'state'
        },
        {
          title: '开单时间',
          key: 'createTime'
        }
      ],
      // 套餐
      setMeal: [],
      columnsSetMeal: [
        {
          title: '名称',
          key: 'mealName'
        },
        {
          title: '价格',
          key: 'mealPrice'
        },
        {
          title: '折扣',
          key: 'disNum'
        }
      ],
      // 项目
      project: [],
      columnsProject: [
        {
          title: '名称',
          key: 'name'
        },
        {
          title: '价格',
          key: 'finalPrice'
        },
        {
          title: '次数',
          key: 'cardNumber'
        },
        {
          title: '分类',
          key: 'cardBackground'
        },
        {
          title: '折扣',
          key: 'discountPojo'
        }
      ],
      // 产品
      product: [],
      columnsProduct: [
        {
          title: '名称',
          key: 'goodsName'
        },
        {
          title: '单价',
          key: 'finalPrice'
        },
        {
          title: '数量',
          key: 'goodsNum'
        },
        {
          title: '单位',
          key: 'unityname'
        },
        {
          title: '分类',
          key: 'name'
        },
        {
          title: '折扣',
          key: 'discountPojo'
        }
      ],
      // 退单
      chargeback: [],
      columnsChargeback: [
        {
          title: '处理人',
          key: 'aName'
        },
        {
          title: '退款金额',
          key: 'refundNum'
        },
        {
          title: '原因',
          key: 'refundReason'
        },
        {
          title: '创建时间',
          key: 'createTime'
        }
      ],
      // 付款
      payment: [],
      columnsPayment: [
        {
          title: '支付方式',
          key: 'name'
        },
        {
          title: '金额',
          key: 'payPrice'
        },
        {
          title: '支付时间',
          key: 'createTime'
        }
      ]
    }
  },
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  methods: {
    getList () {
      if (!this.id) return
      getOrder(this.id).then(res => {
        let data = res.info
        // 订单
        this.setOrderForm(data)
        // 套餐
        this.setSetMeal(data)
        // 项目
        this.setProject(data)
        // 产品
        this.setProduct(data)
        // 退单
        this.setChargeback(data)
        // 付款
        this.setPayment(data)
      }).catch(err => {
        console.log(err)
      })
    },
    // 订单
    setOrderForm (data) {
      this.orderForm = []
      this.orderForm.push({
        orderNum: data.orderNum,
        cusName: data.customerPojo.cusName,
        aName: data.aName,
        state: data.state,
        createTime: data.createTime.split('.')[0].substring(0, 16),
        // 原价
        money: data.money,
        // 应付
        payable: data.payable,
        // 已付
        paid: data.paid,
        // 未付
        unpaid: data.unpaid
      })
    },
    // 套餐
    setSetMeal (data) {
      this.setMeal = []
      data.cusSetMealList.map(item => {
        this.setMeal.push({
          mealName: item.setMealPojo.mealName,
          mealPrice: item.setMealPojo.mealPrice / 100,
          disNum: item.disNum
        })
      })
    },
    // 项目
    setProject (data) {
      this.project = []
      data.cusProjectList.map(item => {
        this.project.push({
          name: item.tsProjectCategoryPojo.name,
          finalPrice: item.finalPrice / 100,
          cardNumber: item.tsProjectPojo.cardNumber,
          cardBackground: item.tsProjectPojo.cardBackground,
          discountPojo: item.discountPojo
        })
      })
    },
    // 产品
    setProduct (data) {
      this.product = []
      data.cusGoodsList.map(item => {
        this.product.push({
          goodsName: item.goodsPojo.goodsName,
          finalPrice: item.finalPrice / 100,
          goodsNum: item.goodsNum,
          unityname: item.goodsUnitPojo.unityname,
          name: item.goodsCategoryPojo.name,
          discountPojo: item.discountPojo
        })
      })
    },
    // 退单
    setChargeback (data) {
      this.chargeback = []
      if (!data.cusOrderRefundPojo.sign) return
      this.chargeback.push({
        aName: data.cusOrderRefundPojo.aName,
        refundNum: data.cusOrderRefundPojo.refundNum / 100,
        refundReason: data.cusOrderRefundPojo.refundReason,
        createTime: data.cusOrderRefundPojo.createTime.split('.')[0]
      })
    },
    // 付款
    setPayment (data) {
      this.payment = []
      data.cusOrderPayList.map(item => {
        this.payment.push({
          name: item.payFromPojo.name,
          payPrice: item.payPrice / 100,
          createTime: item.createTime.split('.')[0].substring(0, 16)
        })
      })
    },
    // 复位
    restoration () {
      this.setMeal = []
      this.project = []
      this.product = []
      this.chargeback = []
      this.payment = []
      this.orderForm = []
    }
  },
  mounted () {
    this.getList()
  },
  watch: {
    'userId' (e) {
      this.id = e
      this.restoration()
      this.getList()
    }
  }
})
</script>
<style>

</style>
