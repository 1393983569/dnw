<template>
  <div>
    <Button type="primary" style="margin-bottom: 10px;" @click="showAddMeal">添加套餐</Button>
    <editableTables :selectShow="false" :columns="columns" :value="values" @getPage="getPage" :pageTotal="totalPage" :width="600"></editableTables>
    <!--add modal-->
    <Modal :mask-closable="false" v-model="isShowAddMeal" width="800px">
      <div slot="header">
        <p style="text-align: center;font-size: 16px">添加套餐</p>
      </div>
      <div class="list-item">
        <p>
          <strong>套餐名称：</strong><Input placeholder="请输入套餐名称" clearable style="width: 200px" v-model="modifyItem.mealName"></Input>
          <strong>套餐价格(￥)：</strong><Input placeholder="请输入价格" clearable style="width: 150px" v-model="modifyItem.mealPrice"></Input>
        </p>
        <p>
          <strong>项目列表</strong>
        </p>
        <div v-if="modifyItem.projectlist&&modifyItem.projectlist.length>0">
          <table class="pro-table" style="margin-left: 10px">
            <thead>
            <tr>
              <td>项目名称</td>
              <td>项目价格(￥)</td>
              <td>操作</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in modifyItem.projectlist">
              <td>{{item.title}}</td>
              <td>{{item.price}}</td>
              <td><Button type="error" size="small" @click="deletePro(index)">删除</Button></td>
            </tr>
            </tbody>
          </table>
        </div>
        <Button type="success" @click="addProject" style="margin-left: 10px;margin-top: 10px;">添加项目</Button>
        <p style="margin-top: 10px;">
          <strong>套餐详情</strong>
        </p>
        <editor ref="editorAdd" :height="150" style="margin-left: 10px;" :cMod="'hello'" :editorContent="modifyItem.detailData"></editor>
      </div>
      <div slot="footer" style="text-align: center">
        <Button type="primary" size="large" :loading="addLoading" @click="add">
          <span v-if="!addLoading">
            保存
          </span>
          <span v-else>
            保存中...
          </span>
        </Button>
      </div>
    </Modal>
    <!--modify modal-->
    <Modal :mask-closable="false" v-model="isShowModify" width="800px">
      <div slot="header">
        <p style="text-align: center;font-size: 16px">修改套餐</p>
      </div>
      <div class="list-item">
        <p>
          <strong>套餐名称：</strong><Input placeholder="请输入套餐名称" clearable style="width: 200px" v-model="modifyItem.mealName"></Input>
          <strong>套餐价格(￥)：</strong><Input placeholder="请输入价格" clearable style="width: 150px" v-model="modifyItem.mealPrice"></Input>
        </p>
        <p>
          <strong>项目列表</strong>
        </p>
        <div v-if="modifyItem.projectlist&&modifyItem.projectlist.length>0">
          <table class="pro-table" style="margin-left: 10px">
            <thead>
            <tr>
              <td>项目名称</td>
              <td>项目价格(￥)</td>
              <td>操作</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in modifyItem.projectlist">
              <td>{{item.title}}</td>
              <td>{{item.price}}</td>
              <td><Button type="error" size="small" @click="deletePro(index)">删除</Button></td>
            </tr>
            </tbody>
          </table>
        </div>
        <Button type="success" @click="addProject" style="margin-left: 10px;margin-top: 10px;">添加项目</Button>
        <p style="margin-top: 10px;">
          <strong>套餐详情</strong>
        </p>
        <editor ref="editor" :height="150" style="margin-left: 10px;" :cMod="'hello'" :editorContent="modifyItem.detailData"></editor>
      </div>
      <div slot="footer" style="text-align: center">
        <Button type="primary" size="large" :loading="modifyLoading" @click="modify">
          <span v-if="!modifyLoading">
            保存
          </span>
          <span v-else>
            保存中...
          </span>
        </Button>
      </div>
    </Modal>
    <!--detail modal-->
    <Modal :mask-closable="false" v-model="isShowDetail" width="800px">
      <div slot="header">
        <p style="text-align: center;font-size: 16px">套餐详情</p>
      </div>
      <div class="list-item">
        <p>
          <strong>套餐名称：</strong><span>{{modifyItem.mealName}}</span>
        </p>
        <p>
          <strong>套餐价格(￥)：</strong><span>{{modifyItem.mealPrice}}</span>
        </p>
        <p>
          <strong>项目列表</strong>
        </p>
        <div v-if="modifyItem.projectlist&&modifyItem.projectlist.length>0">
          <table class="pro-table" style="margin-left: 10px">
            <thead>
            <tr>
              <td>项目名称</td>
              <td>项目价格(￥)</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in modifyItem.projectlist">
              <td>{{item.title}}</td>
              <td>{{item.price}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div v-else style="margin-left: 10px;">
          <span>无项目详情</span>
        </div>
        <p style="margin-top: 10px;">
          <strong>套餐详情</strong>
        </p>
        <div v-html="modifyItem.detailData"></div>
      </div>
      <div slot="footer" style="text-align: center">
        <Button type="primary" size="large" @click="isShowDetail=false">关闭</Button>
      </div>
    </Modal>

    <productSelector :isShow="isShowChoose" @sendChoose="onChoose" @modelClose="onClose"></productSelector>

  </div>
</template>

<script>
import editableTables from '_c/editableTables/editableTables.vue'
import productSelector from '_c/projectSelector/projectSelector.vue'
import editor from '_c/editor/editor.vue'
import {
  getMealList,
  getMealDetail,
  addMeal,
  modifyMeal,
  deleteMeal
} from '@/api/mealManagement/mealManagement.js'

export default {
  components: {editableTables, editor, productSelector},
  data: function () {
    return {
      columns: [
        {
          title: '套餐名称',
          key: 'mealName',
          align: 'center'
        },
        {
          title: '套餐价格(￥)',
          key: 'mealPrice',
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
                    this.showDetail(params.row)
                  }
                }
              }, '详情'),
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                style: {
                  'marginLeft': '5px'
                },
                on: {
                  click: () => {
                    this.showModify(params.row)
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
                    this.showDelete(params.row)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      values: [],
      currentPage: 1,
      totalPage: 1,
      isShowAddMeal: false,
      isShowDetail: false,
      isShowModify: false,
      addLoading: false,
      modifyLoading: false,
      modifyItem: {
        projectlist: []
      },
      isShowChoose: false
    }
  },
  methods: {
    getPage (e) {
      this.currentPage = e
      this.getData(e)
    },
    showDetail (item) {
      this.modifyItem = {}
      this.$Loading.start()
      // 先加载数据
      getMealDetail(item.id)
        .then(res => {
          this.modifyItem = res.info
          this.modifyItem.detailData = res.info.detail
          this.isShowDetail = true
          this.$Loading.finish()
        })
        .catch(e => {
          console.log(e)
          this.$Message.error('网络异常')
          this.$Loading.error()
        })
    },
    showModify (item) {
      // 先加载数据
      this.$Loading.start()
      getMealDetail(item.id)
        .then(res => {
          this.modifyItem = res.info
          this.modifyItem.detailData = res.info.detail
          this.isShowModify = true
          this.$Loading.finish()
        })
        .catch(e => {
          console.log(e)
          this.$Message.error('网络异常')
          this.$Loading.error()
        })
    },
    showDelete (item) {
      this.$Modal.confirm({
        title: '提示',
        content: `确定要删除<strong style="margin: 5px">${item.mealName}</strong>吗？`,
        onOk: () => {
          deleteMeal(item.id)
            .then(res => {
              this.$Message.success('删除成功')
              this.getData(this.currentPage)
            }).catch(e => {
              this.$Message.error('网络异常')
            })
        }
      })
    },
    getData (page) {
      getMealList(page)
        .then(res => {
          if (res.info.data instanceof Array) {
            this.values = res.info.data
            this.totalPage = res.info.pageTotal
          } else {
            if (this.currentPage > 1) {
              this.currentPage--
              this.getData(this.currentPage)
            } else {
              this.$Message.info('暂无数据')
            }
          }
        })
        .catch(e => {
          console.log(e)
          this.$Message.error('网络异常')
        })
    },
    showAddMeal () {
      this.modifyItem.detailData = ''
      this.modifyItem.detail = ''
      this.modifyItem = {
        projectlist: []
      }
      this.isShowAddMeal = true
    },
    addProject () {
      this.isShowChoose = true
    },
    deletePro (index) {
      this.modifyItem.projectlist.splice(index, 1)
    },
    onChoose (selection) {
      this.isShowChoose = false
      selection.map(e => {
        this.modifyItem.projectlist.push(e)
      })
    },
    onClose () {
      this.isShowChoose = false
    },
    add () {
      if (!this.modifyItem.mealName) {
        this.$Message.info('名称不能为空')
        return
      }
      if (!this.modifyItem.mealPrice || !Number.parseFloat(this.modifyItem.mealPrice)) {
        this.$Message.info('价格不能为空')
        return
      }
      let ids = []
      this.modifyItem.projectlist.map(e => {
        ids.push(e.id)
      })
      delete this.modifyItem.projectlist
      this.modifyItem.ids = ids.join(',')
      this.modifyItem.detail = this.$refs.editorAdd.content
      this.addLoading = true
      addMeal(this.modifyItem)
        .then(res => {
          this.modifyItem = {}
          this.addLoading = false
          this.isShowAddMeal = false
          this.$Message.success('添加成功')
          this.getData(this.currentPage)
        })
        .catch(e => {
          console.log(e)
          this.addLoading = false
          this.isShowAddMeal = false
          this.$Message.error('网络异常')
        })
    },
    modify () {
      if (!this.modifyItem.mealName) {
        this.$Message.info('名称不能为空')
        return
      }
      if (!this.modifyItem.mealPrice || !Number.parseFloat(this.modifyItem.mealPrice)) {
        this.$Message.info('价格不能为空')
        return
      }
      let ids = []
      this.modifyItem.projectlist.map(e => {
        ids.push(e.id)
      })
      delete this.modifyItem.projectlist
      delete this.modifyItem['updateTime']
      this.modifyItem.ids = ids.join(',')
      this.modifyItem.detail = this.$refs.editor.content
      this.modifyLoading = true
      modifyMeal(this.modifyItem)
        .then(res => {
          this.modifyLoading = false
          this.isShowModify = false
          this.$Message.success('修改成功')
          this.getData(this.currentPage)
        })
        .catch(e => {
          console.log(e)
          this.modifyLoading = false
          this.isShowModify = false
          this.$Message.error('网络异常')
        })
    }

  },
  mounted () {
    this.getData(this.currentPage)
  }
}
</script>

<style scoped lang="less">
  .list-item{
     p{
       margin-bottom: 10px;
       strong{
         margin-left: 10px;
       }
     }
  }
  .pro-table{
    border: 1px #e1e1e1 solid;
    border-collapse: collapse;
    width: 600px;
    tbody{
      tr:hover{
        background-color: #f1f1f1;
      }
    }
    td{
      padding: 10px;
      text-align: center;
    }
    tr{
      border-bottom: 1px #e1e1e1 solid;
    }

  }
</style>
