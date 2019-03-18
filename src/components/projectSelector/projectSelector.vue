<template>
  <Modal v-model="show" @on-cancel="sendClose" width="800">
    <div slot="header">
      <p style="text-align: center;font-size: 16px">选择项目</p>
    </div>
    <div>
      <div>
        <Input v-model="keyWords" style="width: 300px;">
          <Select v-model="catId" clearable slot="prepend" @on-change="onValue" style="width:80px">
            <Option v-for="item in cateList" :disabled="item.id === '-1'" :value="item.id"  :key="item.id">{{ item.name }}</Option>
          </Select>
          <Button slot="append" icon="ios-search" @click="search"></Button>
        </Input>
        <editableTables :columns='pro_columns' v-model="pro_values" :pageTotal="totalPage" @getPage="getPage" :selectShow="false"
                        ref="tables"
                        @selectionChange="selectionChange" :isLoading="loading"></editableTables>
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
  getProlistByPage, getProCateList
} from '@/api/projectManagement/projectManagement.js'

export default {
  components: {
    editableTables
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      pro_columns: [
        {
          title: '名称',
          key: 'title',
          align: 'center'
        },
        {
          title: '服务次数',
          key: 'cardNumber',
          align: 'center'
        },
        {
          title: '价格',
          key: 'price',
          align: 'center',
          render: (h, params) => {
            return h('span', params.row.price / 100)
          }
        },
        {
          type: 'selection',
          key: 'operate',
          align: 'center'
        }
      ],
      pro_values: [],
      loading: false,
      show: false,
      keyWords: '',
      catId: 0,
      cateList: [],
      totalPage: 1,
      currentPage: 1,
      selection: []
    }
  },
  methods: {
    search () {
      this.currentPage = 1
      this.getData({pageNum: this.currentPage, title: this.keyWords, catId: this.catId})
    },
    onValue (e) {
      this.currentPage = 1
      this.keyWords = ''
      this.catId = e === undefined ? '':e
      this.getData({pageNum: this.currentPage, title: this.keyWords, catId: this.catId})
    },
    getPage (e) {
      this.currentPage = e
      this.getData({pageNum: this.currentPage, title: this.keyWords, catId: this.catId})
    },
    getData (data) {
      this.loading = true
      getProlistByPage(data)
        .then(res => {
          this.pro_values = res.info.data
          this.totalPage = res.info.pageTotal
          this.loading = false
        })
        .catch(e => {
          console.log(e)
          this.$Message.error('网络异常')
          this.loading = false
        })
    },
    selectionChange (e) {
      this.selection = e
    },
    sendClose () {
      this.$emit('modelClose')
    },
    sendChoose () {
      this.sendClose()
      let select = []
      this.$emit('sendChoose', this.selection)
      this.show = false
    }
  },
  mounted () {
    getProCateList()
      .then(res => {
        this.cateList = res.info.data
      })
      .catch(e => {
        console.log(e)
      })
  },
  watch: {
    isShow: function (newValue) {
      this.show = newValue
      this.keyWords = ''
      this.currentPage = 1
      if (newValue) {
        this.getData({pageNum: this.currentPage, title: this.keyWords})
      }
    }
  }
}
</script>

<style scoped>

</style>
