<template>
  <div>
    <query-condition  @sendDataList="getSelectList" style="display: inline-block; vertical-align: top;" :showState="stateObj">
      <div style="margin-bottom: 10px; cursor: pointer; display: inline-block">
        <Badge :count="numOfShopping" overflow-count="999">
          <svg style="font-size: 30px" class="iconfont-svg" @click="modal = true" aria-hidden="true">
            <use xlink:href="#icon-gouwuche"></use>
          </svg>
        </Badge>
      </div>
    </query-condition>
    <div>
      <editableTables :columns='columns' :pageTotal='pageTotal' v-model="dataList" :stateSelect='false' @getPage='getPageNum'></editableTables>
    </div>
    <Modal
      v-model="modal"
      title="下单列表"
      :closable="false"
      width="850">
        <shoppingTrolley :data="shoppingListData" @delete="deleteShopList" @amountChange="amountChange"></shoppingTrolley>
      <div slot="footer">
        <Button type="success" long  :loading="sendShop_loading" @click="sendShop">提交</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
// 基本模板
import editableTables from '_c/editableTables/editableTables.vue'
import {
  getPageGoods,
  addTsGoodsOut
} from '@/api/inventoryManagement/placeAnOrder'
import shoppingTrolley from './componemts/shoppingTrolley'
import queryCondition from '_c/queryCondition'
export default({
  components: {
    editableTables,
    shoppingTrolley,
    queryCondition
  },
  data () {
    return {
      columns: [
        {
          title: '商品名称',
          key: 'goodsName'
        },
        {
          title: '商品价格',
          key: 'shopPrice'
        },
        {
          title: '库存',
          key: 'stock'
        },
        {
          title: '单位',
          key: 'unit'
        },
        {
          title: '规格',
          key: 'speciName'
        },
        {
          title: '类别',
          key: 'catName'
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
                    this.addMap(params.row.id, params.row)
                  }
                }
              }, '加入购物车')
            ])
          }
        }
      ],
      stateObj: {
        stateSingleChoice: 1,
        stateMultipleChoice: 1,
        stateTIemDate: 1,
        stateState: 1,
        stateChannel: 1,
        stateProjectClassfiy: 1
      },
      // 基本参数
      dataList: [],
      // 查询参数
      selecList: [],
      // 分页参数
      pageNum: 1,
      pageTotal: 1,
      // 需求参数
      shoppingList: new Map(),
      numOfShopping: 0,
      shoppingListData: [],
      modal: false,
      sendShop_loading: false
    }
  },
  methods: {
    // 高级查询
    getSelectList (e) {
      this.selecList = e
      this.getList()
    },
    // 分页查询管理员
    getList () {
      this.dataList = []
      getPageGoods(this.pageNum, this.selecList).then(res => {
        this.dataList = []
        if (res.info === '暂无数据') {
          this.$Message.error(res.info)
          this.pageTotal = 1
          return
        }
        this.pageTotal = res.info.pageTotal
        res.info.data.map(item => {
          this.dataList.push({
            shopPrice: item.shopPrice / 100,
            stock: item.stock,
            goodsName: item.goodsName,
            speciName: item.speciNum + item.speciName,
            catName: item.catName,
            unit: item.unit,
            id: item.id,
            amount: 0
          })
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
    // 取出Map里的数组
    getMapList (map) {
      let dataList = []
      map.forEach((item, key, map) => {
        dataList.push(item)
      })
      this.numOfShopping = dataList.length
      this.shoppingListData = dataList
      return dataList
    },
    // 指定key添加
    addMap (key, value) {
      this.shoppingList.set(key, value)
      this.getMapList(this.shoppingList)
    },
    // 给map集合放入数组
    addMapList (list) {
      list.map(item => {
        this.shoppingList.set(item.id, item)
      })
      this.getMapList(this.shoppingList)
    },
    // 复位数据
    deleteMapAll () {
      this.shoppingList.clear()
      this.shoppingListData = []
      this.numOfShopping = 0
    },
    // 删除
    deleteShopList (e) {
      this.shoppingList.delete(e)
      this.getMapList(this.shoppingList)
    },
    // 提交
    sendShop () {
      let dataList = []
      this.sendShop_loading = true
      this.shoppingListData.map(item => {
        dataList.push({
          gId: item.id,
          amount: item.amount,
          gPrice: item.shopPrice * 100,
          catName: item.catName
        })
      })
      addTsGoodsOut(dataList).then(res => {
        this.sendShop_loading = false
        this.$Message.success(res.info)
        this.modal = false
        this.deleteMapAll()
      }).catch(err => {
        this.$Message.error(err)
        this.sendShop_loading = false
      })
    },
    // 数量
    amountChange (e) {
      if (e.length !== 0) {
        this.addMapList(e)
      }
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
