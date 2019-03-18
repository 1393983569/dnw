<template>
    <div>
      <div>
        <editableTables :columns='columns' :pageTotal='pageTotal' v-model="dataList" :selectOption='selectOption' @filtrateClick='filtrateClick' @getPage='getPageNum'>
          <div style="margin-left: 10px;">
            <Button type="primary" @click="nowButton">{{ buttonValue }}</Button>
          </div>
        </editableTables>
      </div>
      <Modal
        v-model="modal"
        title="顾客转移"
        @on-ok="ok"
        @on-cancel="cancel">
        <Select v-model="modelAdmin" placeholder='请选择其他管理' style="width:200px">
          <Option v-for="item in adminList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Modal>
    </div>
</template>
<script>
import editableTables from '_c/editableTables/editableTables.vue'
import { addAdmin, getAdminsInfo, getZiXunOfShop } from '@/api/userManagement/message'
import amendTheScheme from './amendTheScheme.vue'
import { updateCustomer, getPageCus2 } from '@/api/makeAnAppointment/returnVisit/returnVisit'
import {getCusVisitCount} from '@/api/user'
import {mapMutations} from 'vuex'
export default({
  data () {
    return {
      columns: [
        {
          title: '姓名',
          key: 'cusName'
        },
        {
          title: '联系电话',
          key: 'cusPhone1'
        },
        {
          title: '咨询类别',
          key: 'consultTypeName'
        },
        {
          title: '顾客来源',
          key: 'cusFromName'
        },
        {
          title: '性别',
          key: 'cusGender'
        },
        {
          title: '状态',
          key: 'isVisit',
          render: (h, params) => {
            return (
              <div>
                { params.row.isVisit === '0' ? <span style='color: #961822'>未回访</span> : <span style='color: #098900'>已回访</span> }
              </div>
            )
          }
        },
        {
          title: '回访日志',
          key: 'reviewTheLog',
          width: 320,
          render: (h, params) => {
            return (
              <div>
                {
                  params.row.reviewTheLog.length !== 0 ? params.row.reviewTheLog.map(item => {
                    return <div style='margin-bottom: 5px;'><span><span style='color: #aaabac'>回访时间:</span>{item.createTime}</span><span><span style='color: #aaabac'>回访人:</span>{item.name}</span><span><span style='color: #aaabac'>回访目的:</span>{item.purpose}</span><span style='color: #aaabac'>回访记录:</span><span style='color: #469252'>{item.result}</span></div>
                  }) : <span>暂无数据</span>
                }
              </div>
            )
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 250,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(amendTheScheme, {
                props: {
                  type: 'primary',
                  size: 'small',
                  id: params.row.id + ''
                },
                style: {
                  marginRight: '5px',
                  display: 'inline-block'
                },
                on: {
                  addPlanOk: () => {
                    this.getList()
                    this.getVisit()
                  }
                }
              }),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.modal = true
                    this.clickUserId = params.row.id
                    getZiXunOfShop().then(res => {
                      this.adminList = []
                      res.info.map(item => {
                        this.adminList.push({
                          value: item.accountId,
                          label: item.accountTitle
                        })
                      })
                    }).catch(err => {
                      console.log(err)
                    })
                  }
                }
              }, '顾客转移')
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
      buttonValue: '获取今日回访顾客',
      vTime: '',
      modal: false,
      modelAdmin: '',
      adminList: [],
      clickUserId: ''
    }
  },
  methods: {
    ...mapMutations([
      // 总访问顾客
      'SET_VISIT_ALL',
      // 已完成访问的顾客
      'SET_VISIT_YES',
      // 还没访问的顾客
      'SET_VISIT_NO'
    ]),
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
      getPageCus2(this.pageNum, this.cusName, this.cusPhone1, this.vTime).then(res => {
        if (res.info === '暂无数据') {
          this.$Message.error(res.info)
          this.pageTotal = 1
          return
        }
        this.pageTotal = res.info.pageTotal
        res.info.data.map(item => {
          let data = {}
          data.cusFromName = item.cusFromName ? item.cusFromName : '暂无'
          data.cusName = item.cusName
          data.cusGender = item.cusGender + ''
          if (data.cusGender === '0') {
            data.cusGender = '男'
          } else {
            data.cusGender = '女'
          }
          data.cusPhone1 = item.cusPhone1
          data.cusConstellation = item.cusConstellation
          data.isShop = item.isShop
          data.id = item.id
          data.consultTypeName = item.consultTypeName
          data.reviewTheLog = item.cusVisitPojo
          data.isVisit = item.isVisit
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
      this.pageNum = 1
    },
    // 获取今日回访
    nowButton () {
      if (this.buttonValue === '获取今日回访顾客') {
        this.buttonValue = '取消'
        this.vTime = '1'
        this.restoration()
        this.getList()
      } else {
        this.buttonValue = '获取今日回访顾客'
        this.vTime = ''
        this.restoration()
        // 复原
        this.getList()
      }
    },
    // 顾客转移
    ok () {
      if (!this.modelAdmin) {
        this.$Message.error('请完善信息')
        return
      }
      updateCustomer(this.clickUserId, this.modelAdmin).then(res => {
        this.$Message.success(res.info)
        this.modelAdmin = ''
      }).catch(err => {
        this.$Message.error(err)
      })
    },
    // 弹出框取消按钮
    cancel () {

    },
    // 获得计划回访人数
    getVisit () {
      this.$Notice.destroy()
      getCusVisitCount().then(res => {
        let data = res.info[0]
        this.SET_VISIT_ALL(data.visitAll)
        this.SET_VISIT_YES(data.visitYes)
        this.SET_VISIT_NO(data.visitNo)
        // 触发回访提示
        this.visitPlanShow()
      }).catch(err => {
        console.log(err)
      })
      this.$Notice.config({
        top: 50
      })
    },
    // 回访提示
    visitPlanShow () {
      this.$Notice.info({
        title: '回访提醒',
        duration: 0,
        render: (h) => {
          return (
            <div>
              <row>
                <i-col span="8">
                计划回访
                  <span>
                    {this.$store.state.deteilsId.visitAll}
                  </span>
              人
                </i-col>
                <i-col span="8">
                已回访
                  <span style="color: rgb(25, 190, 107)">
                    {this.$store.state.deteilsId.visitYes}
                  </span>
              人
                </i-col>
                <i-col span="8">
                未回访
                  <span style="color: red">
                    {this.$store.state.deteilsId.visitNo}
                  </span>
              人
                </i-col>
              </row>
            </div>
          )
        }
      })
    }
  },
  components: {
    editableTables,
    amendTheScheme
  },
  mounted () {
    // 初始化管理员列表
    this.getList()
    this.getVisit()
  }
})
</script>
<style>

</style>
