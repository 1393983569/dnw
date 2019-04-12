<template>
  <div style="margin-top: 20px; display: flex">
    <Card :bordered="false" style="box-sizing: border-box; width: 45%;display: inline-block; flex: 1;">
      <!--<DatePicker type="daterange" @on-change="onChangeDatePicker" placement="right-start" placeholder="请选择时间" style="width: 200px;"></DatePicker>-->
      <Select v-model="selectShop" @on-change="onChangeShop" clearable style="width:200px">
        <Option v-for="item in shopDataList" :value="item.id + ''" :key="item.id">{{ item.shopName }}</Option>
      </Select>
      <div ref="container" style="height: 400px;"></div>
    </Card>
    <Card :bordered="false" style="box-sizing: border-box; width: 45%;display: inline-block; flex: 1; margin-left: 20px">
      <!--<DatePicker type="daterange" @on-change="onChangeDatePicker" placement="right-start" placeholder="请选择时间" style="width: 200px;"></DatePicker>-->
      <Select v-model="selectShop" @on-change="onChangeShop" clearable style="width:200px">
        <Option v-for="item in shopDataList" :value="item.id + ''" :key="item.id">{{ item.shopName }}</Option>
      </Select>
      <div ref="containerMeal" style="height: 400px;"></div>
    </Card>
  </div>
</template>

<script>
  import {statisticScale, getListShop} from '@/api/statisticsManagement/projectPlan'
  export default {
    name: "barDiagram",
    data () {
      return {
        app: {},
        posList: [
          'left', 'right', 'top', 'bottom',
          'inside',
          'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
          'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
        ],
        // 名称
        dataName: [],
        dataNameMeal: [],
        // 数量
        dataNum: [],
        dataNumMeal: [],
        shopDataList: [],
        selectShop: '',
        shopId: '',
        startTime: '',
        endTime: ''
      }
    },
    methods: {
      initializeDarChart () {
        const dom = this.$refs.container
        const myChart = this.$echarts.init(dom)
        window.onresize = myChart.resize
        let option = null
        this.app.title = ''
        option = {
          // title : {
          //   text: '某站点用户访问来源',
          //   subtext: '纯属虚构',
          //   x:'center'
          // },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series : [
            {
              name: '访问来源',
              type: 'pie',
              radius : '40%',
              center: ['50%', '50%'],
              data: this.dataNum,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        if (option && typeof option === "object") {
          myChart.setOption(option, true);
        }
      },
      initializeDarChartMeal () {
        const dom = this.$refs.containerMeal
        const myChart = this.$echarts.init(dom)
        window.onresize = myChart.resize
        let option = null
        this.app.title = ''
        option = {
          // title : {
          //   text: '某站点用户访问来源',
          //   subtext: '纯属虚构',
          //   x:'center'
          // },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series : [
            {
              name: '访问来源',
              type: 'pie',
              radius : '40%',
              center: ['50%', '50%'],
              data: this.dataNumMeal,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        if (option && typeof option === "object") {
          myChart.setOption(option, true);
        }
      },
      async getList (shopId) {
        // 名称
        this.dataName = []
        // 项目数量
        this.dataNum = []
        try {
          let data = await statisticScale(this.shopId).then().catch(err => {
            console.log(err)
          })
          // 判断数据是否为空
          if (data.info.goodsScale.length !== 0 ) {
            data.info.goodsScale.forEach(item => {
              this.dataName.push(item.gName)
              this.dataNum.push({
                value: item.num,
                name: item.gName
              })
            })
          } else {
            this.$Message.error('暂无数据')
          }
          if (data.info.projectScale.length !== 0) {
            data.info.projectScale.forEach(item => {
              this.dataNameMeal.push(item.pName)
              this.dataNumMeal.push({
                value: item.num,
                name: item.pName
              })
            })
          }
          console.log(this.dataNumMeal)
          this.initializeDarChart()
          this.initializeDarChartMeal()
        } catch (e) {
          console.log(e)
        }
      },
      async getShop () {
        this.shopDataList = []
        try {
          let shopData = await getListShop().then().catch(err => {
            console.log(err)
          })
          this.shopDataList = shopData.info
        } catch (e) {
          console.log(e)
        }
      },
      onChangeDatePicker (e) {
        console.log(e)
        this.startTime = e[0] ? new Date(e[0]).Format("yyyy-MM-dd") : ''
        this.endTime =  e[1] ? new Date(e[1]).Format("yyyy-MM-dd") : ''
        this.getList()
      },
      onChangeShop (e) {
        this.shopId = e
        this.getList()
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.getList()
        this.getShop()
      })
    }
  }
</script>

<style scoped>

</style>
