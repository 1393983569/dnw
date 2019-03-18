<template>
  <div>
    <div>
      <editableTables :columns='columns' :pageTotal='pageTotal' v-model="dataList" :selectOption='selectOption' @filtrateClick='filtrateClick' @getPage='getPageNum'></editableTables>
    </div>
  </div>
</template>
<script>
// 基本模板
import editableTables from '_c/editableTables/editableTables.vue'
import {getPageTsStock} from '@/api/inventoryManagement/theTotalInventory'
export default({
  components: {
    editableTables
  },
  data () {
    return {
      columns: [
        {
          title: '序号',
          key: 'index'
        },
        {
          title: '类别',
          key: 'name'
        },
        {
          title: '编号',
          key: 'goodsNum'
        },
        {
          title: '名称',
          key: 'goodsName'
        },
        {
          title: '规格',
          key: 'speciName'
        },
        {
          title: '数量',
          key: 'amount'
        },
        {
          title: '单位',
          key: 'unit'
        },
        {
          title: '金额',
          key: 'gPrice'
        },
        {
          title: '总金额',
          key: 'gTotalPrice'
        },
        {
          title: '批号',
          key: 'batchNum'
        },
        {
          title: '生产日期',
          key: 'produceTime'
        },
        {
          title: '到期日期',
          key: 'overTime'
        },
        {
          title: '条形码',
          key: 'barCode'
        }
      ],
      selectOption: [
        {
          label: '商品名称',
          value: 'goodsName'
        }
      ],
      // 基本参数
      dataList: [],
      // 查询参数
      selectValue: '',
      // 分页参数
      pageNum: 1,
      pageTotal: 1
      // 需求参数
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
    // 分页查询管理员
    getList () {
      this.dataList = []
      getPageTsStock(this.pageNum, this.selectValue).then(res => {
        if (res.info === '暂无数据') {
          this.$Message.error(res.info)
          this.pageTotal = 1
          return
        }
        this.pageTotal = res.info.pageTotal
        res.info.data.map((item, index) => {
          this.dataList.push({
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
            name: item.goodsCategoryPojo.name
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
