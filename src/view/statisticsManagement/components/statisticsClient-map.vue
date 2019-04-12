<template>
  <div>
    <Drawer :closable="false" width="690" v-model="valueState">
      <Tabs value="name1">
        <TabPane label="产品" name="name1">
          <Table :columns="columnsProduct" :data="dataProduct"></Table>
        </TabPane>
        <TabPane label="项目" name="name2">
          <Table :columns="columnsProject" :data="dataProject"></Table>
        </TabPane>
        <TabPane label="套餐" name="name3">
          <Table :columns="columnsMeals" :data="dataMeals"></Table>
        </TabPane>
        <TabPane label="预存" name="name4">
          <Table :columns="columnsCusPres" :data="dataCusPres"></Table>
        </TabPane>
      </Tabs>
    </Drawer>
  </div>
</template>

<script>
  import {statisticCusRecord} from '@/api/statisticsManagement/statisticsClient-map'
  export default {
    name: "statisticsClient-map",
    data () {
      return {
        valueState: false,
        columnsProduct: [
          {
            title: '产品名',
            key: 'goodsName',
            render: (h, params) => {
              return h('div', params.row.goodsPojo.goodsName)
            }
          },
          {
            title: '打折后的最终价格',
            key: 'finalPrice'
          },
          {
            title: '购买数量',
            key: 'goodsNum'
          },
          {
            title: '购买日期',
            key: 'createTime',
            render: (h, params) => {
              return h('div', params.row.createTime.split('.')[0])
            }
          }
        ],
        columnsProject: [
          {
            title: '项目名',
            key: 'title',
            render: (h, params) => {
              return h('div', params.row.tsProjectPojo.title)
            }
          },
          {
            title: '打折后的最终价格',
            key: 'finalPrice'
          },
          {
            title: '项目次数',
            key: 'cardNumber'
          },
          {
            title: '购买日期',
            key: 'createTime',
            render: (h, params) => {
              return h('div', params.row.createTime.split('.')[0])
            }
          }
        ],
        columnsMeals: [
          {
            title: '项目名',
            key: 'mealName',
            render: (h, params) => {
              return h('div', params.row.setMealPojo.mealName)
            }
          },
          {
            title: '打折后的最终价格',
            key: 'finalPrice'
          },
          {
            title: '购买日期',
            key: 'createTime',
            render: (h, params) => {
              return h('div', params.row.createTime.split('.')[0])
            }
          }
        ],
        columnsCusPres: [
          {
            title: '预存金额',
            key: 'prePrice',
            // render: (h, params) => {
            //   return h('div', params.row.setMealPojo.mealName)
            // }
          },
          {
            title: '购买日期',
            key: 'createTime',
            render: (h, params) => {
              return h('div', params.row.createTime.split('.')[0])
            }
          }
        ],
        dataProduct: [],
        dataProject: [],
        dataMeals: [],
        dataCusPres: []
      }
    },
    methods: {
      showDrawer (id) {
        this.valueState = true
        this.getList (id)
      },
      async getList (id) {
        this.dataProduct = []
        this.dataProject = []
        this.dataMeals = []
        this.dataCusPres = []
        let dataProductRes = await statisticCusRecord(id).then().catch()
        // 产品
        this.dataProduct.push(...dataProductRes.info.cusGoodsList)
        // 项目
        this.dataProject.push(...dataProductRes.info.cusProjects)
        // 套餐
        this.dataMeals.push(...dataProductRes.info.cusSetMeals)
        // 预存
        this.dataCusPres.push(...dataProductRes.info.cusPres)
      }
    }
  }
</script>

<style scoped>

</style>
