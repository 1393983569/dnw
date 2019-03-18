<template>
    <div>
      <div>
        <editableTables :columns='columns' :pageTotal='pageTotal' v-model="dataList" :selectOption='selectOption' @filtrateClick='filtrateClick' @getPage='getPageNum'>
          <div style="margin-left: 10px;display: inline-block;">
            <addMessage @clickOk='addAdminDate' @accomplish='accomplish' :stateEcho='false'></addMessage>
          </div>
          <div style="display: inline-block;">
      <Button @click='getExport'>导出</Button>
    </div>
  </editableTables>
  </div>
    <Modal
      v-model="modalExport"
      title="选择导出字段">
      <CheckboxGroup v-model="social">
        <Checkbox v-for="(item, index) in socialData" :key="index" :label="item.key">
            <span>{{item.name}}</span>
        </Checkbox>
      </CheckboxGroup>
      <div slot="footer">
        <Button type="default" @click="social = [], modalExport = false">取消</Button>
        <Button type="primary" :loading="modal_loading" @click="exportOk">确定</Button>
      </div>
    </Modal>
    <Modal
      v-model="modalbeautyConsultant"
      title="分配美颜顾问"
      @on-ok="beautyConsultantOk"
      @on-cancel="cancel">
      <Select style="width: 100%" v-model="beautyConsultantValue">
        <Option v-for="(item, index) in beautyConsultant" :key="index" :value="item.accountId">职位：{{item.accountJob}} 姓名: {{ item.accountTitle }}</Option>
      </Select>
    </Modal>
  </div>
</template>
<script>
import editableTables from '_c/editableTables/editableTables.vue'
import addMessage from './components/messageAdd.vue'
import { getPageCus, appointCus, appointDelCus, cusExport, exportParam, getAllCus, editCus, getAdminsInfo, getCustomer, getPageConsult } from '@/api/makeAnAppointment/InformationEditing/InformationEditing'
import {getObjName} from '@/libs/util'
export default({
  data () {
    return {
      columns: [
        {
          title: '来源渠道',
          key: 'cusFromName'
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
          title: '预约时间',
          key: 'appointTime'
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
          title: '添加时间',
          key: 'createTime'
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
          width: 200,
          align: 'center',
          render: (h, params) => {
            let showAdd = false
            return h('div', [
              h(addMessage, {
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
                  click: () => {
                    this.modalRecord = !this.modalRecord
                  },
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
                  display: this.$store.state.user.access.indexOf('admin') !== -1 ? 'none' : 'inline-block'
                },
                on: {
                  click: () => {
                    this.userIds = params.row.id
                    this.modalbeautyConsultant = true
                    Promise.all([getAdminsInfo(), getCustomer(this.userIds)]).then(res => {
                      this.beautyConsultantValue = res[1].info.accountId
                      res[0].info.map(item => {
                        this.beautyConsultant.push(item)
                      })
                    }).catch(err => {
                      console.log(err)
                    })
                  }
                }
              }, '分配美颜顾问')
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
      // 基本参数
      dataList: [],
      pageNum: 1,
      cusName: '',
      pageTotal: 1,
      // 需求参数
      cusPhone1: '',
      modalRecord: false,
      adteValue: '',
      timeValue: '',
      userIds: '',
      modalExport: false,
      social: [],
      socialData: [],
      allState: '',
      switcher: '获取所有顾客',
      modalbeautyConsultant: false,
      beautyConsultant: [],
      beautyConsultantValue: '',
      consultingCategory: [],
      modal_loading: false
    }
  },
  methods: {
    // 筛选条件
    filtrateClick (e) {
      console.log(e)
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
      getPageCus(this.pageNum, this.cusName, this.cusPhone1, '', this.$store.state.user.access.indexOf('admin') !== -1 ? 1 : '').then(res => {
        if (res.info === '暂无数据') {
          this.$Message.error(res.info)
          this.pageTotal = 1
          return
        }
        this.pageTotal = res.info.pageTotal
        res.info.data.map(item => {
          let data = {}
          data.cusFromName = item.cusFromName
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
          data.isShop = item.isShop === '0' ? '未到' : '已到'
          data.orderState = item.orderState
          data.appointTime = item.appointTime ? item.appointTime : '暂无'
          data.id = item.id
          data.consultType = getObjName(this.consultingCategory, item.consultType, 'id', 'name')
          data.arriveTime = item.arriveTime ? item.arriveTime : '暂无'
          data.creatorName = item.creatorName
          data.shopName = item.shopNames
          data.createTime = item.createTime.split('.')[0].substring(0, 16)
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
    // 获取导出字段
    getExport () {
      this.socialData = []
      this.social = []
      this.modalExport = true
      exportParam().then(res => {
        this.socialData = []
        for (let key in res.info[0]) {
          this.socialData.push({
            key: key,
            name: res.info[0][key]
          })
        }
      }).catch(() => {
        console.log('获取导出字段 异常')
      })
    },
    // 导出
    exportOk () {
      this.modal_loading = true
      if (this.social.length) {
        cusExport(this.social).then(res => {
          window.location.href = res.info
          this.modalExport = false
          this.modal_loading = false
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$Message.error('请选择导出字段')
      }
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
    // 确定预约
    makeOk () {
      let newData = new Date(this.adteValue).Format('yyyy-M-d') + ' ' + this.timeValue
      appointCus(this.userIds, newData).then(res => {
        this.$Message.success(res.info)
        this.getList()
      }).catch(err => {
        this.$Message.error(err)
      })
    },
    // 弹出框取消
    cancel () {
      this.adteValue = ''
      this.timeValue = ''
      this.beautyConsultantValue = ''
    },
    // 总店特有功能 获取所有店铺的顾客
    //    getAllTheClient() {
    //      if (this.switcher === '获取所有顾客') {
    //        this.allState = '1'
    //        this.switcher = '取消'
    //        this.getList()
    //      } else {
    //        this.allState = ''
    //        this.switcher = '获取所有顾客'
    //        this.getList()
    //      }
    //    },
    // 分配美颜顾问
    beautyConsultantOk () {
      editCus(this.userIds, this.beautyConsultantValue).then(res => {
        this.userIds = ''
        this.beautyConsultantValue = ''
        this.$Message.success(res.info)
      }).catch(err => {
        this.$Message.error(err)
      })
    }
  },
  components: {
    editableTables,
    addMessage
  },
  mounted () {
    // 初始化管理员列表
    this.getList()
    getPageConsult().then(res => {
      if (res.info === '暂无数据') return
      res.info.data.forEach(item => {
        this.consultingCategory.push({
          id: item.id,
          name: item.name
        })
      })
    }).catch(() => {
      console.log('初始化管理员列表 异常')
    })
  }
})
</script>
<style>

</style>
