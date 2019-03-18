<template>
  <div>
    <Card style="min-height: 100px; margin-bottom: 20px">
      <div>
        <Button type="primary" @click="selectCombo">选择产品</Button>
      </div>
      <Divider dashed />
      <Table border :columns="columns" :data="dataTable"></Table>
    </Card>
    <!-- 选择目标 -->
    <Modal
      width="700"
      v-model="modal"
      title="产品选择">
      <selectInput :selectData="selectData" @subData="subData"></selectInput>
      <Table border :columns="columnsSelect" @on-selection-change="singleSelect" :data="dataSelect"></Table>
      <Page :total="pageTotal * 10" style="margin-top: 20px" @on-change="getPageNum"/>
    </Modal>
  </div>
</template>
<script>
import editableTables from '_c/editableTables'
// getSetMeal 查询套餐详情
import { getPageGoods, getListDiscount, addCusSetMeal } from '@/api/cuManagement/InformationEditing/InformationEditing'
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
          key: 'catName'
        },
        {
          title: '价格',
          key: 'shopPrice'
        },
        {
          title: '分类',
          key: 'catId'
        },
        {
          title: '单位',
          key: 'unitId'
        },
        {
          title: '数量',
          key: 'goodsNum',
          render: (h, {row, column, index}) => h('div', [
            h('InputNumber', {
              props: {
                min: 1,
                value: row.goodsNum
              },
              on: {
                'on-change': (e) => {
                  this.dataTable[index].goodsNum = e
                  let provinceValue = 1
                  for (let i = 0; this.discountValue.length > i; i++) {
                    if (this.discountValue[i].value === row.disId) {
                      provinceValue = this.discountValue[i].label
                    }
                  }
                  // 应付（原价）
                  this.dataTable[index].accountsPayable = Math.floor((parseInt(this.dataTable[index].shopPrice * 100) * e)) / 100
                  // 折后价
                  this.dataTable[index].finalPrice = Math.floor((provinceValue * parseInt(this.dataTable[index].shopPrice * 100) * e)) / 100
                  // 数据改变事件
                  this.$emit('onChangeProduct', this.dataTable)
                }
              }
            })
          ])
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
                  this.dataTable[index].finalPrice = Math.floor((provinceValue * parseInt(this.dataTable[index].shopPrice * 100) * row.goodsNum)) / 100
                  this.$emit('onChangeProduct', this.dataTable)
                },
                // 清空
                'on-clear': () => {
                  this.dataTable[index].disId = ''
                  this.dataTable[index].finalPrice = Math.floor((this.dataTable[index].shopPrice * 100) * parseInt(this.dataTable[index].goodsNum)) / 100
                  this.$emit('onChangeProduct', this.dataTable)
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
                    this.$emit('onChangeProduct', this.dataTable)
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
          title: '名称',
          key: 'catName'
        },
        {
          title: '单价',
          key: 'shopPrice'
        },
        {
          title: '分类',
          key: 'catId'
        },
        {
          title: '单位',
          key: 'unitId'
        }
      ],
      selectData: [{key: 'goodsName', name: '商品名'},{key: 'catName', name: '类别'}],
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
    classifyProduct: {
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
      getPageGoods(this.pageNum, this.selectValue).then(res => {
        this.dataSelect = []
        this.pageTotal = res.info.pageTotal
        res.info.data.map(item => {
          // 按id找类别名
          let classifyData = ''
          let unitData = ''
          this.classifyProduct.map(classify => {
            if (item.catId === classify.id) {
              classifyData = classify.name
            }
          })
          this.pageGoodsUnit.map(unit => {
            if (item.unitId === unit.id) {
              unitData = unit.unityname
            }
          })
          this.dataSelect.push({
            catName: item.goodsName,
            shopPrice: parseInt(item.shopPrice) / 100,
            // 打折后价格
            finalPrice: parseInt(item.shopPrice) / 100,
            goodsNum: 1,
            catId: classifyData,
            unitId: unitData,
            // 产品id
            gId: item.id,
            // 折扣id
            disId: '',
            accountsPayable: parseInt(item.shopPrice) / 100,
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
          let selectionCatName = selection[i].catName
          let isExist = false
          let obj = selection[i]
          for (let j = 0; this.dataTable.length > j; j++) {
            let dataTableCatName = this.dataTable[j].catName
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
      this.$emit('onChangeProduct', this.dataTable)
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
