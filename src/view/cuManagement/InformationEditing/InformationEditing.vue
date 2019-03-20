<template>
    <div>
      <div>
        <query-condition @sendDataList="getSelectList" :showState="stateObj"></query-condition>
        <editableTables :columns='columns' :pageTotal='pageTotal' v-model="dataList" :selectOption='selectOption' @filtrateClick='filtrateClick' @getPage='getPageNum'>
          <div style="margin-left: 10px;display: inline-block;">
            <messageAdd @clickOk='addAdminDate' @accomplish='accomplish' :stateEcho='false'></messageAdd>
          </div>
          <div style="display: inline-block;">
            <Button @click='getExport'>导出</Button>
          </div>
        </editableTables>
      </div>
      <Modal
      v-model="modalExport"
      title="选择导出字段"
      @on-ok="exportOk"
      @on-cancel="cancel">
      <CheckboxGroup v-model="social">
        <Checkbox v-for="(item, index) in socialData" :key="index" :label="item.key">
          <span>{{item.name}}</span>
        </Checkbox>
      </CheckboxGroup>
    </Modal>
    <Modal
      v-model="advancesReceived "
      title="预收款"
      @on-ok="advancesReceivedOk"
      @on-cancel="cancel">
      <advancesReceived :userId="userIdPayment" :sub="submitNum" :cancel="cancelState" @submitPayment="submitPayment"></advancesReceived>
    </Modal>
    </div>
</template>
<script>
import editableTables from '_c/editableTables/editableTables.vue'
import messageAdd from './components/messageAdd.vue'
import { getPageCusSelect, appointCus, appointDelCus, cusExport, exportParam } from '@/api/makeAnAppointment/InformationEditing/InformationEditing'
import { addCusPrestore, getPageConsult, getPageCusFrom } from '@/api/cuManagement/InformationEditing/InformationEditing'
import {getObjName} from '@/libs/util'
import advancesReceived from './components/advancesReceived'
import queryCondition from '_c/queryCondition'
export default({
  components: {
    editableTables,
    messageAdd,
    advancesReceived,
    queryCondition
  },
  data () {
    return {
      columns: [
        {
          title: '是否成交',
          key: 'dealState'
        },
        {
          title: '姓名',
          key: 'cusName'
        },
        {
          title: '联系电话',
          key: 'cusPhone1'
        },
        {
          title: '性别',
          key: 'cusGender'
        },
        {
          title: '到诊状态',
          key: 'isShop'
        },
        {
          title: '到诊时间',
          key: 'arriveTime'
        },
        {
          title: '咨询类别',
          key: 'consultType'
        },
        {
          title: '来源渠道',
          key: 'cusFrom'
        },
        {
          title: '门店',
          key: 'shopName'
        },
        {
          title: '咨询人',
          key: 'creatorName'
        },
        {
          title: '操作',
          key: 'action',
          width: 250,
          align: 'center',
          render: (h, params) => {
            let showAdd = false
            return h('div', [
              h(messageAdd, {
                props: {
                  type: 'primary',
                  size: 'small',
                  stateEcho: true,
                  userId: params.row.id + ''
                },
                style: {
                  marginRight: '5px',
                  display: 'inline-block'
                },
                on: {
                  accomplish: () => {
                    this.accomplish()
                  }
                }
              }),
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
                on: {
                  click: () => {
                    this.advancesReceived = true
                    this.userIdPayment = params.row.id + '/' + new Date()
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
        },
        {
          label: '手机号',
          value: 'cusPhone1'
        }
      ],
      stateObj: {
        //        stateSingleChoice: 1,
        //        stateMultipleChoice: 1,
        //        stateTIemDate: 1,
        stateState: 1,
        stateProjectName: 1,
        stateProjectClassfiy: 1,
        //        stateChannel: 1,
        statePriceRange: 1
      },
      // 基本参数
      dataList: [],
      pageNum: 1,
      cusName: '',
      pageTotal: 1,
      // 需求参数
      cusPhone1: '',
      adteValue: '',
      timeValue: '',
      userIds: '',
      modalExport: false,
      social: [],
      socialData: [],
      advancesReceived: false,
      cancelState: '',
      userIdPayment: '',
      submitNum: '',
      selecList: [],
      consultList: [],
      cusFromList: []
    }
  },
  methods: {
    // 筛选条件
    filtrateClick (e) {
      // 复位页码
      this.pageNum = 1
      if (e.modelSelect === 'cusName') {
        this.cusName = e.selectValueInput
      } else {
        this.cusName = ''
      }
      if (e.modelSelect === 'cusPhone1') {
        this.cusPhone1 = e.selectValueInput
      } else {
        this.cusPhone1 = ''
      }
      this.getList()
    },
    getSelectList (e) {
      this.selecList = e
      this.getList()
    },
    // 分页查询管理员
    getList () {
      this.dataList = []
      getPageCusSelect(this.pageNum, this.cusName, this.cusPhone1, this.selecList).then(res => {
        this.dataList = []
        if (res.info === '暂无数据') {
          this.$Message.error(res.info)
          this.pageTotal = 1
          return
        }
        this.pageTotal = res.info.pageTotal
        res.info.data.map(item => {
          let data = {}
          data.cusFrom = getObjName(this.cusFromList, item.cusFrom, 'id', 'name')
          data.cusName = item.cusName
          data.cusGender = item.cusGender === '0' ? '男' : '女'
          data.cusPhone1 = item.cusPhone1
          data.cusWechat = item.cusWechat
          data.cusConstellation = item.cusConstellation
          data.isShop = item.isShop === '0' ? '未到' : '已到'
          data.orderState = item.orderState
          data.appointTime = item.appointTime
          data.id = item.id
          data.createTime = item.createTime.split('.')[0].substring(0, 16)
          data.consultType = getObjName(this.consultList, item.consultType, 'id', 'name')
          data.creatorName = item.creatorName
          data.shopName = item.shopName
          data.arriveTime = item.arriveTime ? item.arriveTime : '暂无'
          data.dealState = item.dealState === 0 ? '未消费' : '已消费'
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
    // 需求方法------
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
    // 获取导出字段
    getExport () {
      this.socialData = []
      this.modalExport = true
      exportParam().then(res => {
        for (let key in res.info[0]) {
          this.socialData.push({
            key: key,
            name: res.info[0][key]
          })
        }
      }).catch(() => {
        console.log('exportParam 异常')
      })
    },
    // 导出
    exportOk () {
      cusExport(this.social).then(res => {
        window.location.href = res.info
      }).catch(err => {
        console.log(err)
      })
    },
    // 监听添加页面事件
    accomplish (e) {
      if (e) {
        this.accountTitle = ''
        this.accountJob = ''
      } else {
        this.restoration()
      }
      this.getList()
    },
    // 提交预存款
    submitPayment (e) {
      this.cancelState = new Date() + ''
      addCusPrestore(e).then(res => {
        this.$Message.success(res.info)
      }).catch(err => {
        this.$Message.error(err)
      })
    },
    //
    advancesReceivedOk () {
      this.submitNum = new Date() + ''
    },
    // 弹出框取消
    cancel () {
      this.cancelState = new Date() + ''
      this.adteValue = ''
      this.timeValue = ''
    },
    // 得到咨询类别
    getPageConsultList () {
      getPageConsult().then(res => {
        res.info.data.map(item => {
          this.consultList.push({
            id: item.id,
            name: item.name
          })
        })
      }).catch(err => {
        console.log(err)
      })
    },
    // 得到来源渠道
    getPageCusFromList () {
      getPageCusFrom().then(res => {
        res.info.data.map(item => {
          this.cusFromList.push({
            id: item.id,
            name: item.name
          })
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    // 初始化管理员列表
    this.getList()
    this.getPageConsultList()
    this.getPageCusFromList()
  }
})
</script>
<style>

</style>
