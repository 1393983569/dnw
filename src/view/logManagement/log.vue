<template>
  <div>
    <div>
      <editableTables :columns='columns' :pageTotal='pageTotal' :selectShow="false" v-model="dataList" @getPage='getPageNum'>
        <DatePicker type="daterange" v-model="selectDate" @on-change="onChangeDatePicker" placement="bottom-end" placeholder="请选择时间" style="width: 200px"></DatePicker>
      </editableTables>
    </div>
  </div>
</template>
<script>
  // 基本模板
  import editableTables from '_c/editableTables/editableTables.vue'
  import { getPageCus, appointCus, appointDelCus, cusExport, exportParam } from '@/api/makeAnAppointment/InformationEditing/InformationEditing'
  import {getLogs} from '@/api/logManagement/log'
  export default({
    data () {
      return {
        columns: [
          {
            title: '操作人',
            key: 'accountTitle',
            render: (h, params) => {
              return h('div', params.row.sysAccountInfoPojo.accountTitle)
            }
          },
          {
            title: '操作时间',
            key: 'createTime',
            render: (h, params) => {
              return h('div', params.row.createTime.split('.')[0])
            }
          },
          {
            title: '操作内容',
            key: 'operate'
          }
        ],
        // 基本参数
        dataList: [],
        // 查询参数
        selectValue: '',
        // 分页参数
        pageNum: 1,
        pageTotal: 1,
        // 需求参数
        selectDate: [],
        startTime: '',
        endTime: ''
      }
    },
    methods: {
      // 分页查询管理员
      getList () {
        this.dataList = []
        getLogs(this.pageNum, this.startTime, this.endTime).then(res => {
          if (res.info === '数据暂无') {
            this.$Message.error(res.info)
            this.pageTotal = 1
            return
          }
          this.pageTotal = res.info.pageTotal
          this.dataList.push(...res.info.data)
        }).catch(err => {
          this.pageTotal = 1
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
        this.accountTitle = ''
        this.accountJob = ''
        this.pageNum = 1
      },
      onChangeDatePicker () {
        this.startTime = this.selectDate[0] ? new Date(this.selectDate[0]).Format("yyyy-MM-dd hh:mm:ss.S") : ''
        this.endTime = this.selectDate[1] ? new Date(this.selectDate[1]).Format("yyyy-MM-dd hh:mm:ss.S") : ''
        this.getList()
      }
    },
    components: {
      editableTables
    },
    mounted () {
      // 初始化管理员列表
      this.getList()
    }
  })
</script>
<style>

</style>
