<template>
  <div>
    <div>
      <editableTables :columns='columns' :pageTotal='pageTotal'  :stateSelect='false' v-model="dataList" @getPage='getPageNum'></editableTables>
    </div>
    <Modal
      v-model="modal"
      title="商品详情"
      width="950">
        <shopDetails :data="dataDetails" :pageTotal="pageTotal" @onChangePage="onChangePage"></shopDetails>
    </Modal>
  </div>
</template>
<script>
import editableTables from '_c/editableTables'
import { getPageTsGoodsOut, getPageTsGoodsOutInfo, getTsGoodsOutOfInfo, confirmInStock } from '@/api/inventoryManagement/bePutInStorage'
import shopDetails from './componemts/shopDetails.vue'
export default({
  components: {
    shopDetails,
    editableTables
  },
  data () {
    return {
      columns: [
        {
          title: '下单人',
          key: 'aName'
        },
        {
          title: '时间',
          key: 'createTime'
        },
        {
          title: '操作',
          key: 'action',
          width: 250,
          align: 'center',
          render: (h, {row, index}) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  loading: this.dataList[index].sendShop_loading
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.shopListId = row.id
                    this.page = 1
                    this.indexShopList = index
                    this.getShopList()
                  }
                }
              }, '下单详情'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  loading: this.dataList[index].bePutInStorage_loading,
                  disabled: row.inState === 1
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.bePutInStorage(row.id, index)
                  }
                }
              }, '确认入库')
            ])
          }
        }
      ],
      // 基本参数
      dataList: [
        {
          name: 'xxxxx',
          time: '2018',
          id: 5
        }
      ],
      // 查询参数
      selectValue: '',
      // 分页参数
      pageTotal: 1,
      pageNum: 1,
      page: 1,
      // 需求参数
      modal: false,
      dataDetails: [],
      shopListId: '',
      indexShopList: ''
    }
  },
  methods: {
    // 分页查询商品日志
    getList () {
      this.dataList = []
      getPageTsGoodsOutInfo(this.pageNum, this.selectValue).then(res => {
        if (res.info === '暂无数据') {
          this.$Message.error(res.info)
          this.pageTotal = 1
          return
        }
        this.pageTotal = res.info.pageTotal
        res.info.data.map(item => {
          this.dataList.push({
            aName: item.aName,
            createTime: item.createTime.split('.')[0].substring(0, 16),
            id: item.id,
            inState: item.inState,
            sendShop_loading: false,
            bePutInStorage_loading: false
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
    // 根据日志分页查询商品信息
    getShopList () {
      this.dataList[this.indexShopList].sendShop_loading = true
      this.dataDetails = []
      getTsGoodsOutOfInfo(this.page, this.shopListId).then(res => {
        this.dataDetails = []
        this.pageTotal = res.info.pageTotal
        res.info.data.map((item, index) => {
          this.dataDetails.push({
            index: index,
            goodsNum: item.goodsPojo.goodsNum,
            goodsName: item.goodsPojo.goodsName,
            speciName: item.goodsPojo.speciNum + item.goodsPojo.speciName,
            amount: item.amount,
            unit: item.goodsPojo.unit,
            gTotalPrice: item.gTotalPrice / 100,
            gPrice: item.gPrice / 100,
            produceTime: item.goodsPojo.produceTime,
            overTime: item.goodsPojo.overTime,
            barCode: item.goodsPojo.barCode,
            batchNum: item.goodsPojo.batchNum,
            supplierName: item.tsSupplierPojo.name,
            name: item.goodsCategoryPojo.name
          })
        })
        this.modal = true
        this.dataList[this.indexShopList].sendShop_loading = false
      }).catch(() => {
        this.$Message.error('暂无数据')
        this.dataList[this.indexShopList].sendShop_loading = false
      })
    },
    // 确认入库
    bePutInStorage (e, index) {
      this.dataList[index].bePutInStorage_loading = true
      confirmInStock(e).then(res => {
        this.dataList[index].bePutInStorage_loading = false
        this.$Message.success(res.info)
        this.getList()
      }).catch(err => {
        this.$Message.error(err)
        this.dataList[index].bePutInStorage_loading = false
      })
    },
    // 分页
    onChangePage (e) {
      this.page = e
      this.getShopList()
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
