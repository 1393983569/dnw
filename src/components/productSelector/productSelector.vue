<template>
    <Modal v-model="show" @on-cancel="sendClose" width="800">
      <div slot="header">
        <p style="text-align: center;font-size: 16px">选择产品</p>
      </div>
      <div>
        <div>
          <Input v-model="keyWords" style="width: 300px;">
            <Select v-model="catId" clearable slot="prepend" @on-change="onValue" style="width:80px">
              <Option v-for="item in cateList" :disabled="item.id === '-1'" :value="item.id"  :key="item.id">{{ item.name }}</Option>
            </Select>
            <Button slot="append" icon="ios-search" @click="onSearch"></Button>
          </Input>
          <editableTables :columns='columns' v-model="values" :pageTotal="totalPage" @getPage="getPage" :selectShow="false" ref="tables"
          @selectionChange="selectionChange"></editableTables>
        </div>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" @click="sendChoose">确定选择</Button>
      </div>
    </Modal>
</template>

<script>
import editableTables from '_c/editableTables/editableTables.vue'
import {
  getProductListByPage, getCateList
} from '@/api/productManagement/productManagement.js'

export default {
  components: {editableTables},
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      columns: [
        {
          title: '名称',
          key: 'goodsName',
          align: 'center'
        },
        {
          title: '价格',
          key: 'shopPrice',
          align: 'center',
          render: (h, params) => {
            return h('span', params.row.shopPrice / 100)
          }
        },
        {
          title: '选中',
          type: 'selection',
          width: 60,
          align: 'center'
        }
      ],
      values: [],
      totalPage: 0,
      show: false,
      currentPage: 1,
      // search option
      cateList: [],
      keyWords: '',
      catId: '',
      selection: []
    }
  },
  methods: {
    onValue () {
      this.currentPage = 1
      this.getData({catId: this.catId, goodsName: this.keyWords, pageNum: this.currentPage})
    },
    onSearch () {
      this.getData({catId: this.catId, goodsName: this.keyWords, pageNum: this.currentPage})
    },
    getData (data) {
      let self = this
      data.catId = data.catId === undefined ? '' : data.catId
      getProductListByPage(data)
        .then(res => {
          this.totalPage = res.info.pageTotal
          if (res.info.data instanceof Array) {
            this.values = res.info.data
          } else {
            if (self.currentPage > 1) {
              self.currentPage--
              self.getPage(self.currentPage)
            } else {
              this.$Message.info('暂无数据')
              self.values = []
            }
          }
        })
        .catch(() => {
          this.$Message.error('网络异常，请重试')
        })
    },
    getPage (e) {
      this.currentPage = e
      this.getData({catId: this.catId, goodsName: this.keyWords, pageNum: this.currentPage})
    },
    sendClose () {
      this.$emit('modelClose')
    },
    sendChoose () {
      this.sendClose()
      this.$emit('sendChoose', this.selection)
      this.show = false
    },
    selectionChange (selection) {
      this.selection = selection
    }
  },
  mounted () {
    // 获取分类列表
    getCateList()
      .then(res => {
        if (res.info.data instanceof Array) {
          this.cateList = res.info.data
        } else {

        }
      })
      .catch(() => {
        this.$Message.error('查询分类失败')
      })
    this.getData({catId: this.catId, goodsName: this.keyWords, pageNum: this.currentPage})
  },
  watch: {
    isShow: function (newValue) {
      this.show = newValue
      this.catId = ''
      this.keyWords = ''
      this.getData({catId: this.catId, goodsName: this.keyWords, pageNum: this.currentPage})
    }
  }
}
</script>

<style scoped>

</style>
