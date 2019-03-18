<template>
  <div>
    <Card style="min-height: 100px; margin-bottom: 20px">
      <div>
        <Button type="primary" @click="selectCombo">选择项目</Button>
      </div>
      <Divider dashed />
      <Table border :columns="columns" :data="dataTable"></Table>
    </Card>
    <!-- 选择目标 -->
    <Modal
      width="700"
      v-model="modal"
      title="项目选择">
      <selectInput :selectData="selectData" @subData="subData"></selectInput>
      <Table border :columns="columnsSelect" @on-selection-change="singleSelect" :data="dataSelect"></Table>
      <Page :total="pageTotal * 10" style="margin-top: 20px" @on-change="getPageNum"/>
    </Modal>
  </div>
</template>
<script>
import editableTables from '_c/editableTables'
// getSetMeal 查询套餐详情
import { getPageTsProject, getListDiscount, addCusSetMeal } from '@/api/cuManagement/InformationEditing/InformationEditing'
import clonedeep from 'clonedeep'
import selectInput from '_c/selectInput'
export default ({
  components: {
    editableTables,
    selectInput
  },
  data () {
    return {
      // 已选
      columns: [
        {
          title: '名称',
          key: 'title'
        },
        {
          title: '价格',
          key: 'price'
        },
        {
          title: '次数',
          key: 'cardNumber'
        },
        {
          title: '分类',
          key: 'catId'
        },
        {
          title: '应付',
          key: 'accountsPayable'
        },
        {
          title: '折扣',
          key: 'disId',
          render: (h, {row, column, index}) => h('div', [
            h('Select', {
              props: {
                value: row.disId,
                clearable: true
              },
              on: {
                'on-change': (e) => {
                  let provinceValue = 1
                  for (let i = 0; this.discountValue.length > i; i++) {
                    if (this.discountValue[i].value === e) {
                      provinceValue = this.discountValue[i].label
                    }
                  }
                  this.dataTable[index].disId = e
                  this.dataTable[index].finalPrice = Math.floor((provinceValue * parseInt(this.dataTable[index].price * 100))) / 100
                  this.$emit('onChangeProject', this.dataTable)
                },
                // 清空
                'on-clear': () => {
                  this.dataTable[index].disId = ''
                  this.dataTable[index].finalPrice = this.dataTable[index].price
                  this.$emit('onChangeProject', this.dataTable)
                }
              }
            },
            this.discountValue.map(item => {
              return h('Option', {
                props: {value: item.value}
              }, item.label)
            }))
          ])
        },
        {
          title: '打折后',
          key: 'finalPrice'
        },
        {
          title: '推荐人',
          key: 'referee',
          render: (h, {row, column, index}) => h('div', [
            h('Select', {
              props: {
                value: row.referee,
                clearable: true
              },
              on: {
                'on-change': (e) => {
                  this.dataTable[index].referee = e
                }
              }
            }, this.adminList.map(item => {
              return h('Option', {
                props: {value: item.value}
              }, item.label)
            }))
          ])
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.dataTable.splice(params.index, 1)
                    this.$emit('onChangeProject', this.dataTable)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      // 选择目标
      columnsSelect: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '项目名称',
          key: 'title'
        },
        {
          title: '项目价格',
          key: 'price'
        },
        {
          title: '项目次数',
          key: 'cardNumber'
        },
        {
          title: '项目分类',
          key: 'catId'
        }
      ],
      selectData: [{key: 'title', name: '项目名'}, {key: 'catName', name: '类别'}],
      // 分页
      pageTotal: 1,
      // 页码
      pageNum: 1,
      // 已选择Table数据
      dataTable: [],
      // 选择目标Table数据
      dataSelect: [],
      // 折扣数组
      discountValue: [],
      modal: false,
      // 查询数据
      selectValue: ''
    }
  },
  props: {
    classifyProject: {
      type: Array,
      default: () => ([])
    },
    pageGoodsUnit: {
      type: Array,
      defaule: () => ([])
    },
    // 管理员列表
    adminList: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    // 得到折扣
    gitDiscount () {
      this.discountValue = []
      getListDiscount().then(res => {
        res.info.map(item => {
          this.discountValue.push(
            {
              value: item.id,
              label: item.discountNum
            }
          )
        })
      }).catch(err => {
        console.log(err)
      })
    },
    // 套餐获取列表
    selectCombo () {
      this.modal = true
      getPageTsProject(this.pageNum, this.selectValue).then(res => {
        this.dataSelect = []
        this.pageTotal = res.info.pageTotal
        res.info.data.map(item => {
          // 按id找类别名
          let classifyData = this.getClassify(item.catId)
          this.dataSelect.push({
            title: item.title,
            price: parseInt(item.price) / 100,
            // 打折后价格
            finalPrice: parseInt(item.price) / 100,
            catId: classifyData,
            cardNumber: item.cardNumber,
            // 产品id
            pId: item.id,
            // 折扣id
            disId: '',
            accountsPayable: parseInt(item.price) / 100,
            referee: ''
          })
        })
      }).catch(err => {
        console.log(err)
      })
    },
    // 单选
    singleSelect (selection) {
      if (this.dataTable.length === 0) {
        this.dataTable = selection
      } else {
        let result = []
        for (let i = 0; selection.length > i; i++) {
          let selectionCatName = selection[i].title
          let isExist = false
          let obj = selection[i]
          for (let j = 0; this.dataTable.length > j; j++) {
            let dataTableCatName = this.dataTable[j].title
            if (selectionCatName === dataTableCatName) {
              isExist = true
              break
            }
          }
          if (!isExist) {
            result.push(obj)
          }
        }
        result.map(item => {
          this.dataTable.push(item)
        })
      }
      this.$emit('onChangeProject', this.dataTable)
    },
    // 获取分类
    getClassify (catId) {
      let classifyProject = ''
      this.classifyProject.map(classify => {
        if (catId === classify.id) {
          classifyProject = classify.name
          return classifyProject
        }
      })
      return classifyProject
    },
    // 获取分页
    getPageNum (page) {
      this.pageNum = page
      this.selectCombo()
    },
    subData (e) {
      this.pageNum = 1
      this.selectValue = e
      this.selectCombo()
    }
  },
  mounted () {
    this.gitDiscount()
  }
})
</script>
<style>

</style>
