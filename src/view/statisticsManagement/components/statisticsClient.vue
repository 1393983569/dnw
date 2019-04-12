<template>
  <div style="margin-top: 20px">
    <Card :bordered="false" style="box-sizing: border-box;">
      <DatePicker type="daterange" @on-change="onChangeDatePicker" placement="right-start" placeholder="请选择时间" style="width: 200px"></DatePicker>
      <Select v-model="selectShop" @on-change="onChangeShop" clearable style="width:200px">
        <Option v-for="item in shopDataList" :value="item.id + ''" :key="item.id">{{ item.shopName }}</Option>
      </Select>
      <InputNumber :min="0" v-model="startPrice" placeholder="开始价格" style="width: 100px" /> - <InputNumber :min="0" v-model="endPrice" placeholder="结束价格" style="width: 100px" />
      <Button type="primary" @click="getList">查询</Button>
      <editableTables :columns='columns' :pageTotal='pageTotal' v-model="dataList" :selectShow="false" @getPage='getPageNum'></editableTables>
    </Card>
    <statisticsClient-map ref="statisticsClientMap"/>
  </div>
</template>
<script>
  // 基本模板
  import editableTables from '_c/editableTables/editableTables.vue'
  // import { getPageCus, appointCus, appointDelCus, cusExport, exportParam } from '@/api/makeAnAppointment/InformationEditing/InformationEditing'
  import {statisticCus, getListShop} from '@/api/statisticsManagement/statisticsClient'
  import statisticsClientMap from './statisticsClient-map'
  export default({
    data () {
      return {
        columns: [
          {
            title: '来源渠道',
            key: 'cusFrom'
          },
          {
            title: '姓名',
            key: 'cusName'
          },
          {
            title: '性别',
            key: 'cusGender',
            render: (h, params) => {
              return h('div', params.row.cusGender + '' === '1' ? '男' : '女')
            }
          },
          {
            title: '电话',
            key: 'cusPhone1'
          },
          {
            title: '总消费',
            key: 'pay',
            render: (h, params) => {
              return h('div', params.row.pay / 100)
            }
          },
          {
            title: '状态',
            key: 'consumeState'
          },
          {
            title: 'vip',
            key: 'vip',
            render: (h, params) => {
              return h('div', params.row.vip + '' === '0' ? '否' : '是')
            }
          },
          {
            title: '操作',
            key: 'action',
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
                      this.$refs.statisticsClientMap.showDrawer(params.row.id)
                    }
                  }
                }, '消费记录')
              ])
            }
          }
        ],
        // 基本参数
        dataList: [],
        // 查询参数
        shopId: '',
        startTime: '',
        endTime: '',
        startPrice: 0,
        endPrice: 0,
        shopDataList: [],
        selectShop: '',
        // 分页参数
        pageNum: 1,
        pageTotal: 1
        // 需求参数
      }
    },
    components: {
      editableTables,
      statisticsClientMap
    },
    methods: {
      // 分页查询管理员
      getList () {
        this.dataList = []
        console.log(this.startPrice, this.endPrice)
        statisticCus(this.pageNum, this.shopId, this.startTime, this.endTime, this.startPrice, this.endPrice).then(res => {
          if (res.info === null || res.info === '暂无数据') {
            this.pageTotal = 1
            return
          }
          this.pageTotal = res.info.pageTotal
          this.dataList.push(...res.info.data)
        }).catch(err => {
          this.$Message.error(err)
        })
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
      // 时间选择
      onChangeDatePicker (e) {
        this.startTime = e[0] ? new Date(e[0]).Format("yyyy-MM-dd") : ''
        this.endTime =  e[1] ? new Date(e[1]).Format("yyyy-MM-dd") : ''
        this.getList()
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
      onChangeShop (e) {
        this.shopId = e
        this.getList()
      }
    },
    mounted () {
      // 初始化管理员列表
      this.getList()
      this.getShop()
    }
  })
</script>
<style>

</style>
