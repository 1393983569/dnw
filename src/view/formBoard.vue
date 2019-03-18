<template>
  <div>
    <div>
      <editableTables :columns='columns' :pageTotal='pageTotal' v-model="dataList" :selectOption='selectOption' @filtrateClick='filtrateClick' @getPage='getPageNum'></editableTables>
    </div>
  </div>
</template>
<script>
// 基本模板
import editableTables from '_c/editableTables/editableTables.vue'
import { getPageCus, appointCus, appointDelCus, cusExport, exportParam } from '@/api/makeAnAppointment/InformationEditing/InformationEditing'
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
          width: 250,
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
                    this.$router.push({
                      name: 'chooseTheProject',
                      params: {
                        userId: params.row.id
                      }
                    })
                  }
                }
              }, '开单'),
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
                    this.$router.push({
                      name: 'chooseTheProject',
                      params: {
                        userId: params.row.id
                      }
                    })
                  }
                }
              }, '划卡'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$router.push({
                      name: 'chooseTheProject',
                      params: {
                        userId: params.row.id
                      }
                    })
                  }
                }
              }, '预收款')
            ])
          }
        }
      ],
      selectOption: [
        {
          label: '姓名',
          value: 'cusName'
        }
      ],
      // 基本参数
      dataList: [],
      // 查询参数
      selectValue: '',
      // 分页参数
      pageNum: 1,
      pageTotal: 1
      // 需求参数
    }
  },
  methods: {
    // 筛选条件
    filtrateClick (e) {
      console.log(e)
      // 复位页码
      this.pageNum = 1
      if (e.modelSelect === 'cusName') {
        this.selectValue = e.selectValueInput
      } else {
        this.selectValue = ''
      }

      this.getList()
    },
    // 分页查询管理员
    getList () {
      this.dataList = []
      getPageCus(this.pageNum, this.selectValue).then(res => {
        if (res.info === '暂无数据') {
          this.$Message.error(res.info)
          this.pageTotal = 1
          return
        }
        this.pageTotal = res.info.pageTotal
        res.info.data.map(item => {

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
      this.pageNum = 1
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
