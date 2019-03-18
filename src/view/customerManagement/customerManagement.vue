<template>
    <div>
      <div>
        <editableTables :columns='columns' :pageTotal='pageTotal' v-model="dataList" :selectOption='selectOption' @filtrateClick='filtrateClick' @getPage='getPageNum'>
          <div style="margin-left: 10px;display: inline-block;">
          </div>
          <div style="display: inline-block;">
            <Button @click='educeClick'>导出</Button>
          </div>
        </editableTables>
      </div>
    </div>
</template>
<script>
import editableTables from '_c/editableTables/editableTables.vue'
import { getPageCus } from '@/api/makeAnAppointment/InformationEditing/InformationEditing.js'
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
          key: 'cusGender'
        },
        {
          title: '联系电话',
          key: 'cusPhone1'
        },
        {
          title: '微信',
          key: 'cusWechat'
        },
        {
          title: '生日',
          key: 'cusBirthday'
        },
        {
          title: '星座',
          key: 'cusConstellation'
        },
        {
          title: 'qq',
          key: 'cusQq'
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: params.row.cusId !== 0
                },
                style: {
                  marginRight: '5px',
                  display: 'inline-block'
                },
                on: {
                  click: () => {

                  }
                }
              }, '签到')
            ])
          }
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
      pageTotal: 1,
      modalRecord: false
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
    // 添加顾客
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
      getPageCus(this.pageNum, this.accountTitle, this.accountJob).then(res => {
        if (res.info === '暂无数据') {
          this.$Message.error(res.info)
          this.pageTotal = 1
          return
        }
        this.pageTotal = res.info.pageTotal
        res.info.data.map(item => {
          let data = {}
          data.cusFrom = item.cusFrom
          data.cusName = item.cusName
          data.cusGender = item.cusGender + ''
          if (data.cusGender === '0') {
            data.cusGender = '男'
          } else {
            data.cusGender = '女'
          }
          data.cusPhone1 = item.cusPhone1
          data.cusWechat = item.cusWechat
          data.cusBirthday = item.cusBirthday
          data.cusConstellation = item.cusConstellation
          data.cusQq = item.cusQq
          data.id = item.id
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
    },
    // 导出
    educeClick () {

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
