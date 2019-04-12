<template>
  <div>
    <div>
      <editableTables :columns='columns' :pageTotal='pageTotal' v-model="dataList" :selectOption='selectOption' @filtrateClick='filtrateClick' @getPage='getPageNum'></editableTables>
    </div>
    <Modal
      v-model="modal"
      width="900"
      :mask-closable="false"
      title="划卡">
      <stampTheCard @onChange="onChangeSelect" :userIdAndState="userId"></stampTheCard>
      <div slot="footer" style="width: 20%; display: inline-block">
        <Button type="default" size="large" @click="cancel">取消</Button>
        <Button type="primary" size="large" :loading="loading" @click="okCus">确定</Button>
      </div>
    </Modal>
    <Modal
      v-model="modalAccomplish"
      width="900"
      title="日志">
      <accomplish-card-details :cusId="modalAccomplishId"></accomplish-card-details>
    </Modal>
  </div>
</template>
<script>
import editableTables from '_c/editableTables/editableTables.vue'
import {appointCus, appointDelCus, cusExport, exportParam} from '@/api/makeAnAppointment/InformationEditing/InformationEditing'
import { addCreatorToStep, getPageCus } from '@/api/projectAdmin/components/stampTheCard'
import stampTheCard from './components/stampTheCard.vue'
import mealButton from './components/mealButton'
import projectButton from './components/projectButton'
import accomplishCardDetails from './components/accomplishCardDetails'
export default({
  components: {
    editableTables,
    stampTheCard,
    projectButton,
    mealButton,
    accomplishCardDetails
  },
  data () {
    return {
      columns: [
        {
          title: '客户名称',
          key: 'cusName'
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '项目划卡',
          key: 'projectList',
          render: (h, {index, row}) => {
            return h('div', [
              h(projectButton, {
                props: {
                  cusIdValue: row.id + ''
                },
                on: {
                  clickProject: (e) => {
                    this.projectListClick(e)
                  }
                }
              })
            ])
          }
        },
        {
          title: '已有套餐',
          key: 'setMeal',
          render: (h, {index, row}) => {
            return h('div', [
              h(mealButton, {
                props: {
                  cusIdValue: row.id + ''
                },
                on: {
                  clickMeal: (e) => {
                    this.setMealListClick(e)
                  }
                }
              })
            ])
          }
        },
        {
          title: '日志',
          key: 'action',
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
                    this.modalAccomplishId = params.row.id + ''
                    this.modalAccomplish = true
                  }
                }
              }, '已完成划卡日志')
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
      pageTotal: 1,
      // 需求参数
      // 项目
      projectList: [
        {
          name: '祛痘1',
          value: '1'
        },
        {
          name: '祛痘2',
          value: '2'
        },
        {
          name: '祛痘3',
          value: '3'
        }
      ],
      // 套餐
      setMealList: [
        {
          name: '套餐1',
          value: '2'
        },
        {
          name: '套餐2',
          value: '3'
        }
      ],
      // 顾客id
      userId: '',
      // 对话框显示
      modal: false,
      dataListCus: [],
      loading: false,
      modalAccomplish: false,
      modalAccomplishId: ''
    }
  },
  methods: {
    // 筛选条件
    filtrateClick (e) {
      // 复位页码
      this.pageNum = 1
      if (e.modelSelect === 'cusName') {
        this.selectValue = e.selectValueInput
      } else {
        this.selectValue = ''
      }
      this.getList()
    },
    // 分页查询顾客
    getList () {
      this.dataList = []
      getPageCus(this.pageNum, this.selectValue).then(res => {
        if (res.info === '暂无数据') {
          this.$Message.error(res.info)
          this.pageTotal = 1
          return
        }
        this.pageTotal = res.info.pageTotal
        res.info.data.map((item, index) => {
          item.projectList = {
            name: '祛痘' + index,
            value: index
          }
          this.dataList.push(item)
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
    // 点击项目列表
    projectListClick (e) {
      this.userId = {
        id: e,
        state: 'P',
        time: new Date()
      }
      this.modal = true
    },
    // 点击套餐列表
    setMealListClick (e) {
      this.userId = {
        csmId: e.csmId,
        pId: e.pId,
        state: 'S',
        time: new Date()
      }
      this.modal = true
    },
    // 监听选择事件
    onChangeSelect (e) {
      console.log(e)
      this.dataListCus = e
    },
    // 点击取消
    cancel () {
      this.modal = false
    },
    // 点击确定
    okCus () {
      this.loading = true
      let state = true
      console.log(this.dataListCus)
      if (this.dataListCus.length === 0) {
        this.loading = false
        this.$Message.error('请选择美颜师')
        return
      }
      // this.dataListCus.map(item => {
      //   if (item.creator === '' || item.creator) {
      //     state = false
      //   }
      // })
      // if (!state) {
      //   this.loading = false
      //   this.$Message.error('请选择美颜师')
      //   return
      // }
      addCreatorToStep(this.dataListCus).then(res => {
        this.loading = false
        this.modal = false
        this.$Message.success(res.info)
      }).catch(err => {
        this.loading = false
        this.$Message.error(err)
      })
    }
  },
  mounted () {
    // 初始化管理员列表
    this.getList()
  }
})
</script>
<style>

</style>
