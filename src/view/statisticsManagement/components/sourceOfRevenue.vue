<template>
  <div>
    <Card :bordered="false" style="box-sizing: border-box;">
      <DatePicker type="daterange" @on-change="onChangeDatePicker" placement="right-start" placeholder="请选择时间" style="width: 200px;"></DatePicker>
      <Select v-model="selectShop" @on-change="onChangeShop" clearable style="width:200px">
        <Option v-for="item in shopDataList" :value="item.id + ''" :key="item.id">{{ item.shopName }}</Option>
      </Select>
      <div ref="container" style="height: 400px;"></div>
    </Card>
  </div>
</template>

<script>
  import {getSummary, getListShop} from '@/api/statisticsManagement/sourceOfRevenue'
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
        // 项目名称
        xAxisData: [],
        // 名称
        dataName: [],
        // 数量
        dataNum: [],
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
          // title: {
          //   text: '世界人口总量',
          //   subtext: '数据来自网络'
          // },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          // legend: {
          //   // 按钮 和 series 里的name对应
          //   data: ['2011年']
          // },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: this.dataName
          },
          series: [
            {
              // name: '2011年',
              type: 'bar',
              data: this.dataNum
            }
          ]
        };
        if (option && typeof option === "object") {
          myChart.setOption(option, true);
        }
      },
      async getList (shopId, startTime, endTime) {
        this.xAxisData = []
        // 名称
        this.dataName = []
        // 项目数量
        this.dataNum = []
        try {
          let data = await getSummary(this.shopId, this.startTime, this.endTime).then().catch(err => {
            console.log(err)
          })
          // 判断数据是否为空
          if (data.info.length === 0) {
            this.$Message.error('暂无数据')
          } else {
            data.info.forEach(item => {
              let keyName = Object.keys(item)
              if (keyName.length === 1) {
                this.dataName.push(keyName)
                this.dataNum.push(item[keyName])
              }
            })
          }
          this.initializeDarChart()
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
