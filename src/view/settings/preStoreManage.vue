<template>
  <div>
    <Button type="primary" @click="addPreStore">添加预存类型</Button>
    <editableTables :columns="columns" :value="values" :isLoading="loading" :pageTotal="totalPage" @getPage="getPage"
                    :selectShow="false"></editableTables>
    <Modal title="添加预存类型" v-model="isAdd">
      <div class="wrapper">
        <p><strong>预 存 名 称:</strong><Input style="width:200px" clearable placeholder="请输入名称" v-model="modifyItem.name"></Input></p>
        <p><strong>预存数(￥):</strong><InputNumber style="width:200px" clearable placeholder="请输入名称" v-model="modifyItem.prestoreNum"></InputNumber></p>
        <p><strong>返还数(￥):</strong><InputNumber style="width:200px" clearable placeholder="请输入名称" v-model="modifyItem.giveNum"></InputNumber></p>
      </div>
      <div style="text-align: center" slot="footer">
        <Button type="primary" :loading="addLoading" @click="add">
          <span v-if="!addLoading">保存</span>
          <span v-else>保存中...</span>
        </Button>
      </div>
    </Modal>
    <Modal title="修改预存类型" v-model="isModify">
      <div class="wrapper">
        <p><strong>预 存 名 称:</strong><Input style="width:200px" clearable placeholder="请输入名称" v-model="modifyItem.name"></Input></p>
        <p><strong>预存数(￥):</strong><InputNumber style="width:200px" clearable placeholder="请输入名称" v-model="modifyItem.prestoreNum"></InputNumber></p>
        <p><strong>返还数(￥):</strong><InputNumber style="width:200px" clearable placeholder="请输入名称" v-model="modifyItem.giveNum"></InputNumber></p>
      </div>
      <div style="text-align: center" slot="footer">
        <Button type="primary" :loading="modifyLoading" @click="modify">
          <span v-if="!modifyLoading">保存</span>
          <span v-else>保存中...</span>
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import editableTables from '_c/editableTables/editableTables.vue'
import {getPreStoreList, addPreStore, deletePreStore, modifyPreStore} from '@/api/settings/setting'

export default {
  components: {
    editableTables
  },
  data: function () {
    return {
      columns: [
        {
          title: '名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '预存数(￥)',
          key: 'prestoreNum',
          align: 'center'
        },
        {
          title: '返还数(￥)',
          key: 'giveNum',
          align: 'center'
        },
        {
          title: '操作',
          key: 'operate',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.modifyItem = params.row
                    this.isModify = true
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  'marginLeft': '5px'
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '提示',
                      content: `确定要删除<strong style="margin: 5px">${params.row.name}</strong>吗？`,
                      onOk: () => {
                        deletePreStore(params.row.id)
                          .then(res => {
                            this.$Message.success('删除成功')
                            this.getData(this.currentPage)
                          })
                          .catch(e => {
                            console.log(e)
                            this.$Message.error('网络异常')
                          })
                      }
                    })
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      values: [],
      loading: false,
      addLoading: false,
      isAdd: false,
      modifyLoading: false,
      isModify: false,
      currentPage: 1,
      totalPage: 1,
      modifyItem: {}
    }
  },
  methods: {
    addPreStore () {
      this.isAdd = true
      this.modifyItem = {}
    },
    getData (pageNum) {
      this.loading = true
      getPreStoreList(pageNum)
        .then(res => {
          this.loading = false
          if (res.info.data instanceof Array) {
            this.values = res.info.data
            this.totalPage = res.info.pageTotal
          } else {
            if (pageNum > 1) {
              this.currentPage--
              this.getData(this.currentPage)
            } else {
              this.values = []
            }
          }
        })
        .catch(e => {
          console.log(e)
          this.loading = false
          this.$Message.error('网络异常')
        })
    },
    getPage (e) {
      this.currentPage = e
      this.getData(this.currentPage)
    },
    add () {
      if (!this.modifyItem.name) {
        this.$Message.info('名称不能为空')
        return
      }
      if (!this.modifyItem.prestoreNum) {
        this.$Message.info('预存不能为空')
        return
      }
      if (!this.modifyItem.giveNum) {
        this.$Message.info('返还不能为空')
        return
      }
      this.addLoading = true
      addPreStore(this.modifyItem)
        .then(res => {
          this.$Message.success('添加成功')
          this.getData(this.currentPage)
          this.addLoading = false
          this.isAdd = false
        })
        .catch(e => {
          console.log(e)
          this.$Message.error('网络异常')
          this.addLoading = false
          this.isAdd = false
        })
    },
    modify () {
      if (!this.modifyItem.name) {
        this.$Message.info('名称不能为空')
        return
      }
      if (!this.modifyItem.prestoreNum) {
        this.$Message.info('预存不能为空')
        return
      }
      if (!this.modifyItem.giveNum) {
        this.$Message.info('返还不能为空')
        return
      }
      this.modifyLoading = true
      modifyPreStore(this.modifyItem.id, this.modifyItem)
        .then(res => {
          this.$Message.success('修改成功')
          this.getData(this.currentPage)
          this.modifyLoading = false
          this.isModify = false
        })
        .catch(e => {
          console.log(e)
          this.$Message.error('网络异常')
          this.modifyLoading = false
          this.isModify = false
        })
    }
  },
  mounted () {
    this.getData(this.currentPage)
  }
}
</script>

<style scoped lang="less">
  .wrapper{
    p{
      margin-bottom: 10px;
    }
  }
</style>
