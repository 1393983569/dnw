<template>
    <div>
      <Button type="primary" @click="buttonmModal" :size='size' >回访设置</Button>
      <Modal
          v-model="modal"
          title="添加回访"
          @on-ok="ok"
          @on-cancel="cancel"
          width= '550'
          >
          <div style="margin-bottom: 10px;">
            <Input v-model="valueInput" type="textarea" :autosize="true" placeholder="请输入目的" style="width: 200px" />
            <DatePicker type="date" v-model='datePickerValue' placeholder="请选择时间" style="width: 200px"></DatePicker>
            <Button type="info" @click='addPlan '>添加回访</Button>
          </div>
          <div style="margin-top: 10px;">
            <editableTables :columns='columns' :pageTotal='pageTotal' :selectShow='false' v-model="dataList"  @getPage='getPageNum'></editableTables>
          </div>
      </Modal>
      <!-- 计划完成弹出框 -->
      <Modal
        v-model="modalRecord"
        title="回访信息"
        @on-ok="addPlanOk"
        @on-cancel="cancel">
          <Input v-model="inputRecord" type="textarea" placeholder="请填写回访记录" />
      </Modal>
    </div>
</template>
<script>
import editableTables from '_c/editableTables/editableTables'
import { getPageCusVisit, addCusVisit, deleteCusVisit, updateCusVisit } from '@/api/makeAnAppointment/returnVisit/returnVisit'
export default({
  data () {
    return {
      modal: false,
      valueInput: '',
      pageNum: 1,
      modalRecord: false,
      inputRecord: '',
      dataList: [],
      datePickerValue: '',
      pageTotal: 1,
      visitState: 0,
      idList: '',
      columns: [
        {
          title: '目的',
          key: 'purpose'
        },
        {
          title: '访问时间',
          key: 'createTime'
        },
        {
          title: '操作',
          key: 'action',
          width: 250,
          align: 'center',
          render: (h, params) => {
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
                    this.idList = params.row.id
                    this.modalRecord = !this.modalRecord
                  }
                }
              }, '回访完成'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    deleteCusVisit(params.row.id).then(res => {
                      this.$Message.success(res.info)
                      this.getList()
                    }).catch(err => {
                      this.$Message.error(err)
                    })
                  }
                }
              }, '删除')
            ])
          }
        }
      ]
    }
  },
  methods: {
    // 得到List数据
    getList () {
      getPageCusVisit(this.id, this.pageNum, 0).then(res => {
        this.dataList = []
        this.pageTotal = res.info.pageTotal
        res.info.data.map(item => {
          this.dataList.push(item)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    // 添加计划
    addPlan () {
      if (!this.datePickerValue || !this.valueInput) {
        this.$Message.error('请完善信息')
        return
      }
      this.pageNum = 1
      addCusVisit(this.id, this.valueInput, new Date(this.datePickerValue).Format('yyyy-M-d')).then(res => {
        this.$Message.success(res.info)
        this.datePickerValue = ''
        this.valueInput = ''
        this.idList = ''
        this.getList()
      }).catch(err => {
        this.$Message.error(err)
      })
    },
    ok () {},
    cancel () {
      this.inputRecord = ''
      this.datePickerValue = ''
      this.valueInput = ''
    },
    // 计划完成
    addPlanOk () {
      updateCusVisit(this.idList, this.inputRecord).then(res => {
        this.$Message.success(res.info)
        this.inputRecord = ''
        this.getList()
        this.$emit('addPlanOk')
      }).catch(err => {
        this.$Message.error(err)
      })
    },
    // 得到页数
    getPageNum (e) {
      this.pageNum = e
      this.getList()
    },
    buttonmModal () {
      this.modal = true
      this.getList()
    }
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'small'
    }
  },
  components: {
    editableTables
  }
})
</script>
<style>
</style>
