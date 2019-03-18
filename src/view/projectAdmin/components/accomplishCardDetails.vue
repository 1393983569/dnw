<template>
    <div>
      <Tabs v-model="tabsValue" @on-click="tabsClick">
        <TabPane label="项目" name="1">
          <Table :columns="columns" :data="dataList"></Table>
        </TabPane>
        <TabPane label="套餐" name="2">
          <Select v-model="selectValue" @on-change="changeSelect">
            <Option v-for="(item, index) in selectList" :value="item.id" :key="index">{{ item.title }}</Option>
          </Select>
          <div style="margin-top: 10px">
            <Table :columns="columns" :data="dataList"></Table>
          </div>
        </TabPane>
      </Tabs>
      <Modal
        v-model="modalLog"
        width="800"
        title="日志">
          <Table :columns="columnsLog" :data="dataLogList"></Table>
          <div style="margin-top: 10px">
            <Page :total="pageTotal * 10" @on-change="onChangePage" />
          </div>
      </Modal>
    </div>
</template>
<script>
import {getCusProject, getCusSetMeal, getCusMealPro, getCusHkInfo} from '@/api/projectAdmin/components/accomplishCardDetails'
export default ({
  data () {
    return {
      columns: [
        {
          title: '套餐名称',
          key: 'title'
        },
        {
          title: '划卡日志',
          key: 'log',
          render: (h, {row, index}) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.modalLog = true
                    this.proId = row.proId
                    this.pageNum = 1
                    this.getHkInfo()
                  }
                }
              }, '划卡日志')
            ])
          }
        }
      ],
      columnsLog: [
        {
          title: '次数',
          key: 'index'
        },
        {
          title: '开单人',
          key: 'kdName'
        },
        {
          title: '划卡人',
          key: 'name'
        },
        {
          title: '划卡时间',
          key: 'createTime'
        }
      ],
      dataLogList: [],
      dataList: [],
      selectValue: '',
      selectList: [],
      tabsValue: '1',
      modalLog: false,
      // 项目id
      proId: '',
      // 顾客的套餐id
      csmId: '',
      tabsState: '',
      pageNum: 1,
      pageTotal: 1
    }
  },
  props: {
    cusId: {
      type: String,
      default: ''
    }
  },
  methods: {
    tabsClick (e) {
      this.tabsState = e
      if (e === '1') {
        this.getList()
      } else {
        // 清空数据
        this.dataList = []
        // 清空已选
        this.selectValue = ''
        this.selectValue = this.selectList[0].id
        this.changeSelect(this.selectList[0].id)
      }
    },
    // 获取顾客项目
    getList () {
      this.dataList = []
      getCusProject(this.cusId, 0).then(res => {
        this.dataList = []
        if (res.info === '暂无数据') return
        res.info.map(item => {
          this.dataList.push({
            title: item.title,
            proId: item.id
          })
        })
      }).catch(() => {
        console.log('获取顾客项目 异常')
      })
    },
    // 获取顾客套餐
    getMeal () {
      this.selectList = []
      getCusSetMeal(this.cusId, 0).then(res => {
        this.selectList = []
        if (res.info === '暂无数据') return
        res.info.map(item => {
          this.selectList.push(item)
        })
      }).catch(() => {
        console.log('获取顾客套餐 异常')
      })
    },
    // 选择套餐
    changeSelect (e) {
      this.getMealPro(e)
    },
    // 获取套餐的项目
    getMealPro (e) {
      this.dataList = []
      getCusMealPro(e, 0).then(res => {
        this.dataList = []
        res.info.map(item => {
          this.dataList.push({
            title: item.tsProjectPojo.title,
            proId: item.tsProjectPojo.id,
            csmId: item.csmId
          })
        })
      }).catch(() => {
        console.log('获取套餐的项目 异常')
      })
    },
    // 获得日志
    getHkInfo () {
      this.dataLogList = []
      getCusHkInfo(this.pageNum, this.proId, this.selectValue).then(res => {
        this.pageTotal = res.info.pageTotal
        this.dataLogList = []
        res.info.data.map((item, index) => {
          this.dataLogList.push({
            index: item.sort,
            name: item.name,
            createTime: item.createTime.split('.')[0].substring(0, 16),
            kdName: item.kdName
          })
        })
      }).catch(err => {
        console.log(err)
      })
    },
    // 分页
    onChangePage (e) {
      this.pageNum = e
      this.getHkInfo()
    }
  },
  mounted () {

  },
  watch: {
    'cusId' (e) {
      this.tabsValue = '1'
      this.getMeal()
      this.getList()
    }
  }
})
</script>
<style>

</style>
