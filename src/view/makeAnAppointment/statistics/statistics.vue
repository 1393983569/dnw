<template>
    <div>
      <div>
        <editableTables :columns='columns' :pageTotal='pageTotal' v-model="dataList" :selectOption='selectOption' @filtrateClick='filtrateClick' @getPage='getPageNum'>
          <div style="margin-left: 10px;">

          </div>
        </editableTables>
      </div>
    </div>
</template>
<script>
import editableTables from '_c/editableTables/editableTables.vue'
import { addAdmin, getAdmins } from '@/api/userManagement/message.js'
export default({
  data () {
    return {
      columns: [
        {
          title: '职务',
          key: 'accountJob'
        },
        {
          title: '用户名',
          key: 'accountName'
        },
        {
          title: '名称',
          key: 'accountTitle'
        },
        {
          title: '电话',
          key: 'accountPhone'
        }
      ],
      selectOption: [
        {
          label: '姓名',
          value: 'accountTitle'
        },
        {
          label: '手机号',
          value: 'accountJob'
        }
      ],
      dataList: [],
      pageNum: 1,
      accountTitle: '',
      accountJob: '',
      pageTotal: 1
    }
  },
  methods: {
    // 筛选条件
    filtrateClick (e) {
      // 复位页码
      this.pageNum = 1
      if (e.modelSelect === 'accountTitle') {
        this.accountTitle = e.selectValueInput
      } else {
        this.accountTitle = ''
      }
      if (e.modelSelect === 'accountJob') {
        this.accountJob = e.selectValueInput
      } else {
        this.accountJob = ''
      }
      this.getList()
    },
    // 添加管理员
    addAdminDate (e) {
      addAdmin(e).then(res => {
        this.$Message.success(res.info)
        this.restoration()
        this.getList()
      }).catch(err => {
        this.$Message.error(err)
      })
    },
    // 分页查询管理员
    getList () {
      this.dataList = []
      getAdmins(this.pageNum, this.accountTitle, this.accountJob).then(res => {
        if (res.info === '暂无数据') {
          this.$Message.error(res.info)
          this.pageTotal = 1
          return
        }
        this.pageTotal = res.info.pageTotal
        res.info.data.map(item => {
          let data = {}
          data.accountJob = item.sysAccountInfoPojo.accountJob
          data.accountName = item.accountName
          data.accountTitle = item.sysAccountInfoPojo.accountTitle
          data.accountPhone = item.sysAccountInfoPojo.accountPhone
          this.dataList.push(data)
        })
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
      this.accountTitle = ''
      this.accountJob = ''
      this.pageNum = ''
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
