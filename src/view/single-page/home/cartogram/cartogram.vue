<template>
  <div>
     <Row>
        <Col span="12">
          <div id="myChart" :style="{width: '100%', height: '300px', display: 'inline-block'}"></div>
        </Col>
        <Col span="12">
          <div id="myPie" :style="{width: '100%', height: '300px', display: 'inline-block'}"></div>
        </Col>
    </Row>
  </div>
</template>
<script>
import { getCountByAge, getCusCount } from '@/api/home/cartogram/cartogram'
export default({
  name: 'hello',
  data () {
    return {
      indicatorData: [
        {
          text: '',
          max: ''
        }
      ],
      valueData: [],
      sourceData: [
        {
          value: '',
          name: ''
        }
      ]
    }
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: { text: '顾客肖像' },
        tooltip: {
          trigger: 'axis'
        },
        radar: [
          {
            indicator: this.indicatorData,
            center: ['49%', '58%'],
            radius: 100
          }
        ],
        series: [
          {
            type: 'radar',
            tooltip: {
              trigger: 'item'
            },
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data: [
              {
                value: this.valueData,
                name: '顾客肖像'
              }
            ]
          }
        ]
      })
    },
    // 统计各年龄段的人数
    getNumber () {
      getCountByAge().then(res => {
        this.indicatorData = []
        this.valueData = []
        res.info.map(item => {
          this.indicatorData.push({
            text: item.age,
            max: res.msg
          })
          this.valueData.push(item.num)
        })
        this.drawLine()
        this.initPie()
      }).catch(err => {
        this.$Message.error(err)
      })
    },
    initPie () {
      let myPie = this.$echarts.init(document.getElementById('myPie'))
      myPie.setOption({
        title: {
          text: '来源渠道',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        calculable: true,
        series: [
          {
            name: '来源',
            type: 'pie',
            radius: [30, 110],
            center: ['49%', '58%'],
            roseType: 'area',
            data: this.sourceData
          }
        ]
      })
    },
    // 来源渠道
    getCount () {
      getCusCount().then(res => {
        this.sourceData = []
        res.info.map(item => {
          this.sourceData.push({
            value: item.num,
            name: item.cusFrom
          })
        })
        this.drawLine()
        this.initPie()
      }).catch(err => {
        this.$Message.error(err)
      })
    }
  },
  components: {

  },
  mounted () {
    this.$nextTick(() => {
      this.getNumber()
      this.getCount()
    })
  }
})
</script>
<style>

</style>
