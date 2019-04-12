<template>
  <div>
    <Card :bordered="false" style="box-sizing: border-box">
      <DatePicker type="daterange" @on-change="onChangeDatePicker" placement="right-start" placeholder="请选择时间" style="width: 200px;"></DatePicker>
      <Select v-model="selectShop" @on-change="onChangeShop" clearable style="width:200px">
        <Option v-for="item in shopDataList" :value="item.id + ''" :key="item.id">{{ item.shopName }}</Option>
      </Select>
      <div ref="container" style="height: 400px;"></div>
    </Card>
  </div>
</template>

<script>
  import {proStatistic, getListShop} from '@/api/statisticsManagement/statistics'
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
        // 项目总金额
        seriesDataMoney: [],
        // 项目数量
        seriesDataAmount: [],
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
        this.app.configParameters = {
          rotate: {
            min: -90,
            max: 90
          },
          align: {
            options: {
              left: 'left',
              center: 'center',
              right: 'right'
            }
          },
          verticalAlign: {
            options: {
              top: 'top',
              middle: 'middle',
              bottom: 'bottom'
            }
          },
          position: {
            options: this.$echarts.util.reduce(this.posList, function (map, pos) {
              map[pos] = pos;
              return map;
            }, {})
          },
          distance: {
            min: 0,
            max: 100
          }
        }
        this.app.config = {
          rotate: 90,
          align: 'left',
          verticalAlign: 'middle',
          position: 'insideBottom',
          distance: 15,
          onChange: function () {
            const labelOption = {
              normal: {
                rotate: this.app.config.rotate,
                align: this.app.config.align,
                verticalAlign: this.app.config.verticalAlign,
                position: this.app.config.position,
                distance: this.app.config.distance
              }
            };
            myChart.setOption({
              series: [{
                label: labelOption
              }, {
                label: labelOption
              }, {
                label: labelOption
              }, {
                label: labelOption
              }]
            });
          }
        }
        const labelOption = {
          normal: {
            show: true,
            position: this.app.config.position,
            distance: this.app.config.distance,
            align: this.app.config.align,
            verticalAlign: this.app.config.verticalAlign,
            rotate: this.app.config.rotate,
            formatter: '{c} {a}',
            fontSize: 16,
            rich: {
              name: {
                textBorderColor: '#fff'
              }
            }
          }
        };
        option = {
          color: ['#3aa1ff', '#4ecb73'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['成交总额', '成交量']
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              axisTick: {show: false},
              data: this.xAxisData
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '成交总额',
              type: 'bar',
              barGap: 0,
              label: labelOption,
              data: this.seriesDataMoney
            },
            {
              name: '成交量',
              type: 'bar',
              label: labelOption,
              data: this.seriesDataAmount
            }
          ]
        };
        if (option && typeof option === "object") {
          myChart.setOption(option, true);
        }
      },
      async getList (shopId, startTime, endTime) {
        this.xAxisData = []
        // 项目总金额
        this.seriesDataMoney = []
        // 项目数量
        this.seriesDataAmount = []
        try {
          let data = await proStatistic(this.shopId, this.startTime, this.endTime).then().catch(err => {
            console.log(err)
          })
          // 判断数据是否为空
          if (data.info.length === 0) {
            this.$Message.error('暂无数据')
          } else {
            data.info.forEach(item => {
              this.xAxisData.push(item.pName)
              // 转化为分
              this.seriesDataMoney.push(item.totalPrice / 100)
              this.seriesDataAmount.push(item.num)
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
