<template>
  <div>
    <DatePicker type="date" @on-change="onChangeDatePicker" placement="right-start" placeholder="请选择时间" style="width: 200px;"></DatePicker>
    <Select v-model="selectShop" @on-change="onChangeShop" clearable style="width:200px">
      <Option v-for="item in shopDataList" :value="item.id + ''" :key="item.id">{{ item.shopName }}</Option>
    </Select>
    <Card :bordered="false" style="box-sizing: border-box; margin: 20px 0">
      <h3 style="margin-bottom: 10px">
        总统计信息
      </h3>
    <div class="svg-box" style="text-align: center">
      <div class="svg-icon">
        <svg class="iconfont-svg" aria-hidden="true" style="font-size: 45px; color: #82a6f5">
          <use xlink:href="#icon-huiyuan"></use>
        </svg>
        <div>
          总收入 <span style="color: #e82d2d">{{getDataObj.totalIncome}}</span>
        </div>
      </div>
      <div class="svg-icon">
        <svg class="iconfont-svg" aria-hidden="true" style="font-size: 45px; color: #82a6f5">
          <use xlink:href="#icon-huiyuan"></use>
        </svg>
        <div>
          老客收入 <span style="color: #e82d2d">{{getDataObj.oldCusIncome}}</span>
        </div>
      </div>
      <div class="svg-icon">
        <svg class="iconfont-svg" aria-hidden="true" style="font-size: 45px; color: #82a6f5">
          <use xlink:href="#icon-huiyuan"></use>
        </svg>
        <div>
          老客量 <span style="color: #e82d2d">{{getDataObj.oldNum}}</span>
        </div>
      </div>
      <div class="svg-icon">
        <svg class="iconfont-svg" aria-hidden="true" style="font-size: 45px; color: #82a6f5">
          <use xlink:href="#icon-huiyuan"></use>
        </svg>
        <div>
          老客成交量 <span style="color: #e82d2d">{{getDataObj.oldDealNum}}</span>
        </div>
      </div>
      <div class="svg-icon">
        <svg class="iconfont-svg" aria-hidden="true" style="font-size: 45px; color: #82a6f5">
          <use xlink:href="#icon-huiyuan"></use>
        </svg>
        <div>
          流失量 <span style="color: #e82d2d">{{getDataObj.lossNum}}</span>
        </div>
      </div>
      <div class="svg-icon">
        <svg class="iconfont-svg" aria-hidden="true" style="font-size: 45px; color: #82a6f5">
          <use xlink:href="#icon-huiyuan"></use>
        </svg>
        <div>
          新客收入 <span style="color: #e82d2d">{{getDataObj.newCusIncome}}</span>
        </div>
      </div>
    </div>
    <div class="svg-box" style="text-align: center; margin-top: 10px">
      <div class="svg-icon">
        <svg class="iconfont-svg" aria-hidden="true" style="font-size: 45px; color: #82a6f5">
          <use xlink:href="#icon-huiyuan"></use>
        </svg>
        <div>
          老客欠款 <span style="color: #e82d2d">{{getDataObj.oldCusOutcome}}</span>
        </div>
      </div>
      <div class="svg-icon">
        <svg class="iconfont-svg" aria-hidden="true" style="font-size: 45px; color: #82a6f5">
          <use xlink:href="#icon-huiyuan"></use>
        </svg>
        <div>
          新客欠款 <span style="color: #e82d2d">{{getDataObj.newCusOutcome}}</span>
        </div>
      </div>
      <div class="svg-icon">
        <svg class="iconfont-svg" aria-hidden="true" style="font-size: 45px; color: #82a6f5">
          <use xlink:href="#icon-huiyuan"></use>
        </svg>
        <div>
          新客量 <span style="color: #e82d2d">{{getDataObj.newNum}}</span>
        </div>
      </div>
      <div class="svg-icon">
        <svg class="iconfont-svg" aria-hidden="true" style="font-size: 45px; color: #82a6f5">
          <use xlink:href="#icon-huiyuan"></use>
        </svg>
        <div>
          新客成交量 <span style="color: #e82d2d">{{getDataObj.newDealNum}}</span>
        </div>
      </div>
      <div class="svg-icon">
        <svg class="iconfont-svg" aria-hidden="true" style="font-size: 45px; color: #82a6f5">
          <use xlink:href="#icon-huiyuan"></use>
        </svg>
        <div>
          总欠款 <span style="color: #e82d2d">{{getDataObj.totalOutcome}}</span>
        </div>
      </div>
    </div>
    </Card>
    <Card :bordered="false" style="box-sizing: border-box;">
      <h3 style="margin-bottom: 10px">
        个人统计信息
      </h3>
      <Table :columns="columnsProduct" :data="dataProduct"></Table>
    </Card>
  </div>
</template>

<script>
  import {statisticStatement, getListShop} from '@/api/statisticsManagement/operationsStatement'
  export default {
    name: "statisticsClient-map",
    data () {
      return {
        valueState: false,
        columnsProduct: [
          {
            title: '总收入',
            key: 'totalIncome',
            render: (h, params) => {
              return h('div', params.row.totalIncome / 100)
            }
          },
          {
            title: '老客收入',
            key: 'oldCusIncome',
            render: (h, params) => {
              return h('div', params.row.oldCusIncome / 100)
            }
          },
          {
            title: '老客量',
            key: 'oldNum'
          },
          {
            title: '老客成交量',
            key: 'oldDealNum'
          },
          {
            title: '流失量',
            key: 'lossNum'
          },
          {
            title: '新客收入',
            key: 'newCusIncome',
            render: (h, params) => {
              return h('div', params.row.newCusIncome / 100)
            }
          },
          {
            title: '老客欠款',
            key: 'oldCusOutcome',
            render: (h, params) => {
              return h('div', params.row.oldCusOutcome / 100)
            }
          },
          {
            title: '新客欠款',
            key: 'newCusOutcome',
            render: (h, params) => {
              return h('div', params.row.newCusOutcome / 100)
            }
          },
          {
            title: '新客量',
            key: 'newNum'
          },
          {
            title: '新客成交量',
            key: 'newDealNum'
          },
          {
            title: '总欠款',
            key: 'totalOutcome',
            render: (h, params) => {
              return h('div', params.row.totalOutcome / 100)
            }
          },
          {
            title: '顾问姓名',
            key: 'gwName'
          }
        ],
        dataProduct: [],
        getDataObj: {},
        selectShop: '',
        shopDataList: [],
        dayTime: '',
        shopId: '',
      }
    },
    methods: {
      showDrawer (id) {
        this.valueState = true
        this.getList (id)
      },
      async getList () {
        this.dataProduct = []
        this.getDataObj = {}
        let dataSum = await statisticStatement(this.selectShop, this.dayTime, 1).then().catch()
        let data = await statisticStatement(this.selectShop, this.dayTime).then().catch()
        this.getDataObj = dataSum.info[0]
        this.getDataObj.newCusOutcome = dataSum.info[0].newCusOutcome / 100
        this.getDataObj.oldCusOutcome = dataSum.info[0].oldCusOutcome / 100
        this.getDataObj.totalOutcome = dataSum.info[0].totalOutcome / 100
        this.dataProduct.push(...data.info)
      },
      async getShop () {
        this.shopDataList = []
        try {
          let shopData = await getListShop().then().catch(err => {
            console.log(err)
          })
          console.log(shopData.info)
          this.shopDataList = shopData.info
        } catch (e) {
          console.log(e)
        }
      },
      // 选择时间
      onChangeDatePicker (e) {
        this.dayTime = e
        this.getList()
      },
      // 选择店铺
      onChangeShop (e) {
        console.log(e)
        this.shopId = e
        this.getList()
      }
    },
    mounted () {
      this.getShop()
      this.getList()
      this.selectShop = this.$store.state.user.shopId
    }
  }
</script>

<style scoped>
.svg-box{
  display: flex;
  flex-wrap: wrap;
}
.svg-icon{
  flex: 1;
}
</style>
