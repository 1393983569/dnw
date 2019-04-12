<template>
    <div>
      <div v-if="this.state !== 'P'" style="display: inline-block">
        <span>
          请选择项目：
        </span>
        <Select  v-model="projectSelect" @on-change="selectProject" style="width:200px">
          <Option v-for="(item, index) in projectList" :value="item.id" :key="index">{{ item.name }}</Option>
        </Select>
      </div>
      <div style="display: inline-block; margin-left: 10px;">
        <span>总次数：<span style="color: #2b85e4">{{ tsProjectPojoCardNumber }}</span></span>
        <span>剩余次数：<span style="color: #c71139">{{ cardNumber }}</span></span>
        <span>已做次数：<span style="color: #69bd38">{{ haveFinished }}</span></span>
      </div>
      <Button type="info" size="small" @click="buttonClick">划卡详情</Button>
      <span>美容师：</span>
      <Select v-model="creator" v-show="this.dataList.length" style="width:200px" @on-change="modalStampTheCard">
        <Option v-for="(item, index) in adminList" :value="item.accountId + ''" :key="index">{{ item.accountTitle }}</Option>
      </Select>
      <div style="margin-top: 10px">
        <Table stripe :columns="columns" :data="dataList"></Table>
      </div>
      <!-- 划卡详情 -->
      <Modal
        v-model="modalDetails"
        width="850"
        title="划卡详情">
        <cardDetails :idObj="cardDetailsId"></cardDetails>
      </Modal>
    </div>
</template>
<script>
import {getTsProject, getSetMeal, getAdminsInfo, getCusSetMealProSteps} from '@/api/projectAdmin/components/stampTheCard'
import editableTables from '_c/editableTables'
import cardDetails from './cardDetails'
export default ({
  data () {
    return {
      columns: [
        {
          title: '序号',
          key: 'index'
        },
        {
          title: '项目步骤',
          key: 'content'
        },
        // {
        //   title: '美容师',
        //   key: 'creator',
        //   width: 250,
        //   align: 'center',
        //   render: (h, params) => {
        //     return h('div', [
        //       h('Select', {
        //         props: {
        //           value: this.dataList[params.index].creator + ''
        //         },
        //         on: {
        //           'on-change': (e) => {
        //             this.dataList[params.index].creator = e
        //             this.$emit('onChange', this.dataList)
        //           }
        //         }
        //       }, this.adminList.map(item => {
        //         return h('Option', {
        //           props: {
        //             value: item.accountId + ''
        //           }
        //         }, item.accountTitle)
        //       }))
        //     ])
        //   }
        // }
      ],
      // 基本参数
      dataList: [],
      // 按状态显示样式
      state: '',
      projectList: [],
      projectSelect: '',
      listId: '',
      adminList: [],
      cardNumber: 0,
      tsProjectPojoCardNumber: 0,
      haveFinished: 0,
      modalDetails: false,
      cardDetailsId: {},
      logIdObj: '',
      creator: ''
    }
  },
  props: {
    // 项目 P 套餐 S
    userIdAndState: {
    // type: Object,
    // default: () => ({})
      default: ''
    },
    value: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    // 点击表格列表项目 得到项目步骤
    getProcedure (projectId, cusId) {
      this.dataList = []
      getTsProject(projectId).then(res => {
        // 统计次数
        this.cardNumber = res.info.cardNumber
        this.tsProjectPojoCardNumber = res.info.tsProjectPojo.cardNumber
        this.haveFinished = parseInt(this.tsProjectPojoCardNumber) - parseInt(this.cardNumber)
        // 判断是否有步奏
        if (res.info.tsProjectPojo.steps.length !== 0) {
          res.info.tsProjectPojo.steps.map((item, index) => {
            this.dataList.push({
              index: index + 1,
              cusId: res.info.cusId,
              pId: res.info.id,
              content: item.content,
              type: 1
            })
          })
        } else {
          this.dataList.push({
            index: 1,
            cusId: res.info.cusId,
            pId: res.info.id,
            content: res.info.tsProjectPojo.title,
            type: 1
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 点击表格列表套餐触发 得到项目列表
    getProjectList (listId, pId) {
      this.projectList = []
      getSetMeal(pId).then(res => {
        res.info.map(item => {
          this.projectList.push({
            id: item.id + '.' + pId,
            name: item.title
          })
        })
        // 初始化项目步奏列表
        this.projectSelect = this.projectList[0].id
        this.getMealStep(this.projectSelect.split('.')[1], this.projectSelect.split('.')[0])
      }).catch(err => {
        console.log(err)
      })
    },
    // 得到套餐项目步奏
    getMealStep (csmId, pId) {
      this.dataList = []
      getCusSetMealProSteps(csmId, pId).then(res => {
        // 统计次数
        this.cardNumber = res.info.pNum
        this.tsProjectPojoCardNumber = res.info.tsProjectPojo.cardNumber
        this.haveFinished = parseInt(this.tsProjectPojoCardNumber) - parseInt(this.cardNumber)
        if (res.info.tsProjectPojo.steps.length !== 0) {
          res.info.tsProjectPojo.steps.map((item, index) => {
            this.dataList.push({
              index: 1,
              cusId: res.info.cusId,
              pId: res.info.pId,
              content: item.content,
              creator: '',
              csmId: csmId,
              stepId: item.sid,
              type: 2
            })
          })
        } else {
          this.dataList.push({
            index: 1,
            content: res.info.tsProjectPojo.title,
            creator: '',
            csmId: csmId,
            pId: res.info.pId,
            cusId: this.listId,
            type: 2
          })
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 选择项目
    selectProject (e) {
      if (e) {
        this.getMealStep(e.split('.')[1], e.split('.')[0])
      }
    },
    // 获得admin列表
    getAdminList () {
      this.adminList = []
      getAdminsInfo().then(res => {
        console.log(res)
        res.info.map(item => {
          this.adminList.push({
            accountTitle: item.sysAccountInfoPojo.accountTitle,
            accountId: item.sysAccountInfoPojo.accountId
          })
        })
      }).catch(err => {
        console.log(err)
      })
    },
    // 复位
    restoration () {
      this.state = 'P'
      this.listId = ''
      this.projectSelect = []
      this.dataList = []
      this.cardNumber = 0
      this.tsProjectPojoCardNumber = 0
      this.haveFinished = 0
      this.creator = ''
    },
    // 点击划卡详情按钮
    buttonClick () {
      this.modalDetails = true
      this.cardDetailsId = {
        time: new Date(),
        idObj: this.logIdObj
      }
    },
    modalStampTheCard (e) {
      console.log(this.dataList, '-----------------------')
      console.log(e)
      this.dataList.forEach(item => {
        item.mrsId = e
      })
      this.$emit('onChange', this.dataList)
    }
  },
  components: {
    editableTables,
    cardDetails
  },
  mounted () {
    this.getAdminList()
  },
  watch: {
    'userIdAndState' (e) {
      this.logIdObj = e
      this.logIdObj.projectSelect = this.projectSelect
      // 复位
      this.restoration()
      this.state = e.state
      // 项目
      if (this.state === 'P') {
        this.listId = e.id.projectId
        this.getProcedure(this.listId, e.id.cusId)
        // 套餐
      } else {
        this.listId = e.csmId
        this.getProjectList(this.listId, e.pId)
      }
    }
  }
})
</script>
<style>

</style>
