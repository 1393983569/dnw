<template>
  <div>
    <query-condition  @sendDataList="getSelectList" style="display: inline-block; vertical-align: top;" :showState="stateObj">
      <Button type="primary" style="display: inline-block" @click="showAddModel">添加项目</Button>
    </query-condition>
    <Input v-model="keyWords" style="width: 300px;">
      <Select v-model="catId" @on-clear="clickEmpty" clearable slot="prepend" @on-change="onChange" style="width:80px">
        <Option v-for="item in selectOption" :disabled="item.value === '-1'" :value="item.value"  :key="item.value">{{ item.label }}</Option>
      </Select>
      <Button slot="append" icon="ios-search" @click="search"></Button>
    </Input>
    <editableTables :columns="columns" :value="values" :selectOption="selectOption" :selectShow="false" @onChange="onChange" :pageTotal="totalPage" @getPage="getPage"  :isLoading="loading">
    </editableTables>
    <!--添加项目的model-->
    <Modal v-model="isShowAddModel" :mask-closable='false' width="1000">
      <div slot="header">
        <p style="text-align:center;font-size:18px">添加项目</p>
      </div>
      <div class="detail-wrapper">
        <p>
          <strong>项目名称：</strong><Input style="width: 250px" clearable v-model="modifyItem.title" placeholder="请输入名称"></Input>
          <strong style="margin-left: 10px;">项目价格(￥)：</strong><Input style="width: 100px" clearable v-model="formatPrice" placeholder="请输入价格"></Input>
          <strong style="margin-left: 10px;">项目分类：</strong>
          <Select v-model="modifyItem.catId" style="width: 200px">
            <Option v-for="item in selectOption" :disabled="item.value === '-1'" :value="item.value"  :key="item.value">{{ item.label }}</Option>
          </Select>
        </p>
        <p>
          <strong>服务次数：</strong><InputNumber style="width: 100px" v-model="modifyItem.cardNumber"></InputNumber>
          <strong style="margin-left: 10px;">项目关键词：</strong><Input style="width: 300px" clearable v-model="modifyItem.keyWords" placeholder="请输入关键词"></Input>
        </p>
        <p><strong>项目步骤：</strong></p>
        <div v-if="modifyItem.steps&&modifyItem.steps.length>0">
           <table class="goods-table-large">
             <thead>
              <tr>
                <td>步骤名称</td>
                <td>时长(分钟)</td>
                <td>所需耗材(设备)</td>
                <td>操作</td>
              </tr>
             </thead>
             <tbody>
              <tr v-for="(item,index) in modifyItem.steps">
                <td><span>{{index+1}}、</span><Input v-model="item.content" size="small" placeholder="请输入步骤名称" style="width: 100px" clearable></Input></td>
                <td><Input size="small" style="width:50px" placeholder="时长" v-model="item.time"></Input></td>
                <td style="width:400px">
                  <Collapse  size="small">
                    <Panel name="index">
                      展开耗材(设备)列表
                      <table class="goods-list-table" slot="content" v-if="item.goodsList&&item.goodsList.length>0">
                        <tbody>
                        <tr v-for="(good,gindex) in item.goodsList">
                          <td style="width: 250px;">
                            {{good.gName}}
                          </td>
                          <td>
                            <!--数量-->
                            <InputNumber size="small" v-model="good.gNum" style="width: 60px" placeholder="数量"></InputNumber>
                          </td>
                          <td>
                            <!--单位-->
                            <Select v-model="good.gUnit" style="width: 50px;" clearable size="small">
                              <Option v-for="unit in selectUnit" :value="unit.id" :key="unit.id">{{unit.unityname}}</Option>
                            </Select>
                            <!--<Input v-model="good.gUnit" style="width: 50px;" clearable size="small" placeholder="单位"></Input>-->
                          </td>
                          <td>
                            <Button @click="deleteGood(item,gindex)" size="small" type="error">删除</Button>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </Panel>
                  </Collapse>
                </td>
                <td>
                  <Button type="primary" size="small" @click="addProduct(item)">添加耗材</Button>
                  <Button type="error" size="small" @click="deleteStepItem(index)">删除步骤</Button>
                </td>
              </tr>
             </tbody>
           </table>
         </div>
        <Button type="success" size="large" style="width: 100px;margin-bottom: 10px;" @click="addStep">添加步骤</Button>
        <p><strong>项目备注：</strong></p>
        <editor :height="150" :cMod="'dasd'" :editorContent="modifyItem.detailsData" ref="myQuillEditorAdd" @complete="send"></editor>
      </div>
      <div slot="footer" style="text-align: center">
        <Button type="primary" size="large" style="width: 200px" @click="saveData" :loading="addLoading">
          <span v-if="!addLoading">保存</span>
          <span v-else>保存中...</span>
        </Button>
      </div>
    </Modal>
    <!--编辑项目的Model-->
    <Modal v-model="isShowModifyModel" :mask-closable="false" width="1000">
      <div slot="header">
        <p style="text-align:center;font-size:18px">编辑项目</p>
      </div>
      <div class="detail-wrapper">
        <p>
          <strong>项目名称：</strong><Input style="width: 250px" clearable v-model="modifyItem.title" placeholder="请输入名称"></Input>
          <strong style="margin-left: 10px;">项目价格(￥)：</strong><Input style="width: 100px" clearable v-model="formatPrice" placeholder="请输入价格"></Input>
          <strong style="margin-left: 10px;">项目分类：</strong>
          <Select v-model="modifyItem.catId" style="width: 200px">
            <Option v-for="item in selectOption" :disabled="item.value === '-1'" :value="item.value"  :key="item.value">{{ item.label }}</Option>
          </Select>
        </p>
        <p>
          <strong>服务次数：</strong><InputNumber style="width: 100px" v-model="modifyItem.cardNumber"></InputNumber>
          <strong style="margin-left: 10px;">项目关键词：</strong><Input style="width: 300px" clearable v-model="modifyItem.keyWords" placeholder="请输入关键词"></Input>
        </p>
        <p><strong>项目步骤：</strong></p>
        <div v-if="modifyItem.steps&&modifyItem.steps.length>0">
          <table class="goods-table-large">
            <thead>
            <tr>
              <td>步骤名称</td>
              <td>时长(分钟)</td>
              <td>所需耗材(设备)</td>
              <td>操作</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in modifyItem.steps">
              <td><span>{{index+1}}、</span><Input v-model="item.content" size="small" placeholder="请输入步骤名称" style="width: 100px" clearable></Input></td>
              <td><Input size="small" style="width:50px" placeholder="时长" v-model="item.time"></Input></td>
              <td style="width:400px">
                <Collapse>
                  <Panel name="index">
                    展开耗材(设备)列表
                    <table class="goods-list-table" slot="content" v-if="item.goodsList&&item.goodsList.length>0">
                      <tbody>
                      <tr v-for="(good,gindex) in item.goodsList">
                        <td style="width: 250px;">
                          {{good.gName}}
                        </td>
                        <td>
                          <!--数量-->
                          <InputNumber size="small" v-model="good.gNum" style="width: 60px" placeholder="数量"></InputNumber>
                        </td>
                        <td>
                          <!--单位-->
                          <Select v-model="good.gUnit" style="width: 50px;" clearable size="small">
                            <Option v-for="unit in selectUnit" :value="unit.id" :key="unit.id">{{unit.unityname}}</Option>
                          </Select>
                          <!--<Input v-model="good.gUnit" style="width: 50px;" clearable size="small" placeholder="单位"></Input>-->
                        </td>
                        <td>
                          <Button @click="deleteGood(item,gindex)" size="small" type="error">删除</Button>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </Panel>
                </Collapse>
              </td>
              <td>
                <Button type="primary" size="small" @click="addProduct(item)">添加耗材</Button>
                <Button type="error" size="small" @click="deleteStepItem(index)">删除步骤</Button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <Button type="success" size="large" style="width: 100px;margin-bottom: 10px;" @click="addStep">添加步骤</Button>
        <p><strong>项目备注：</strong></p>
        <editor :height="150" :cMod="'dasd'" :editorContent="modifyItem.detailsData" ref="myQuillEditor"></editor>
      </div>
      <div slot="footer" style="text-align: center">
        <Button type="primary" size="large" style="width: 200px" @click="modify" :loading="editLoading">
          <span v-if="!editLoading">保存</span>
          <span v-else>保存中...</span>
        </Button>
      </div>
    </Modal>
    <!--项目详情的model-->
    <Modal v-model="isShowDetailModel" width="800" class-name="vertical-center-modal" title="项目详情">
      <div class="detail-wrapper">
        <p><strong>项目名称：</strong><span>{{modifyItem.title}}</span></p>
        <p><strong>项目价格(￥)：</strong><span>{{modifyItem.price/100}}</span></p>
        <p><strong>服务次数：</strong><span>{{modifyItem.cardNumber}}</span></p>
        <p><strong>项目关键词：</strong><span>{{modifyItem.keyWords}}</span></p>
        <p><strong>项目分类：</strong><span>{{selectCate}}</span></p>
        <p><strong>项目步骤：</strong></p>
        <div v-if="modifyItem.steps&&modifyItem.steps.length>0">
          <table class="goods-table">
            <thead>
            <tr>
              <td>步骤名称</td>
              <td>时长(分钟)</td>
              <td>所需耗材</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item) in modifyItem.steps">
              <td><strong>{{item.content}}</strong></td>
              <td>{{item.time}}</td>
              <td>
                <table class="goods-list-table" v-if="item.goodsList&&item.goodsList.length>0">
                  <tbody>
                  <tr v-for="(good,gindex) in item.goodsList">
                    <td style="width: 200px;">
                      {{good.gName}}
                    </td>
                    <td>
                      <!--数量-->
                      {{good.gNum}}{{formatUnit(good)}}
                    </td>
                  </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <p v-else>无步骤信息</p>

        <p><strong>项目详情：</strong></p>
        <!--详情内容-->
        <div v-html="modifyItem.detailsData"></div>
      </div>
      <div slot="footer">
        <Button type="primary" @click="isShowDetailModel=false">关闭</Button>
      </div>
    </Modal>
    <productSelector :isShow="isShowChoosePro" @modelClose="isShowChoosePro = false" @sendChoose="onChoose"></productSelector>
  </div>
</template>

<script>
import productSelector from '_c/productSelector/productSelector.vue'
import editableTables from '_c/editableTables/editableTables.vue'
import editor from '_c/editor/editor.vue'
import {
  addProject,
  getProCateList,
  deletePro,
  modifyProject,
  getProDetail,
  modifyProStatus,
  getAllProList
} from '@/api/projectManagement/projectManagement'
import {
  getUnitList
} from '@/api/unitManage/unitManage'
import Operation from 'iview/src/components/transfer/operation'
import clonedeep from 'clonedeep'
import queryCondition from '_c/queryCondition'

export default {
  components: {Operation, editableTables, editor, productSelector, queryCondition},

  data: function () {
    return {
      columns: [
        {
          title: '项目名称',
          key: 'title',
          align: 'center',
          render: (h, params) => {
            return h('strong', {
              style: {
                'fontStyle': Number.parseInt(params.row.status) === 1 ? 'normal' : 'italic',
                'color': Number.parseInt(params.row.status) === 1 ? '#515a6f' : '#a1a1a1'
              }
            }, params.row.title)
          }
        },
        {
          title: '售价(￥)',
          key: 'price',
          align: 'center',
          render: (h, params) => {
            return h('span', params.row.price / 100)
          }
        },
        {
          title: '服务次数',
          key: 'cardNumber',
          align: 'center'
        },
        {
          title: '已售',
          key: 'sold',
          align: 'center'
        },
        {
          title: '状态',
          key: 'status',
          align: 'center',
          render: (h, params) => {
            return h('Select', {
              props: {
                label: params.row.status === 1 ? '上架' : '下架',
                value: params.row.status + '',
                size: 'small'
              },
              style: {
                'width': '80px'
              },
              on: {
                'on-change': (e) => {
                  console.log(e)
                  // 改变状态
                  modifyProStatus(params.row.id, e)
                    .then(res => {
                      params.row.status = e
                      if (e === '1') {
                        this.$Message.success('已上架')
                      } else {
                        this.$Message.success('已下架')
                      }
                    })
                    .catch(e => {
                      console.log(e)
                      this.$Message.error('网络异常')
                    })
                }
              }
            }, [
              h('Option', {
                props: {
                  value: '1'
                }
              }, '上架'),
              h('Option', {
                props: {
                  value: '2'
                }
              }, '下架')
            ])
          }
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
                    this.delete(params.row)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      values: [],
      detailColumns: [
        {
          title: '名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '数量',
          key: 'goodsNum',
          align: 'center'
        },
        {
          title: '单位',
          key: 'goodsUnit',
          align: 'center'
        }
      ],
      stateObj: {
        stateSingleChoice: 1,
        stateMultipleChoice: 1,
        stateTIemDate: 1,
        //          stateState: 1,
        //          stateProjectName: 1,
        //          stateProjectClassfiy: 1,
        stateChannel: 1
        //          statePriceRange: 1
      },
      // search option
      keyWords: '',
      pageNum: 1,
      totalPage: 1,
      catId: '',
      lock: false,
      // search option ends

      // 选项
      selectOption: [],
      selectCate: null,

      selectUnit: [],
      selectUni: null,
      // 数据加载中
      loading: false,
      // 格式化价格，将分转换为元
      formatPrice: 0,
      // 是否显示添加
      isShowAddModel: false,
      // 是否显示详情
      isShowDetailModel: false,
      // 是否显示编辑
      isShowModifyModel: false,
      modifyItem: {},

      // 是否显示选择商品
      isShowChoosePro: false,
      currentStep: {},

      // loading状态显示
      addLoading: false,
      editLoading: false,
      col_name: 'test',
      selecList: []
    }
  },
  methods: {
    // 高级查询
    getSelectList (e) {
      this.selecList = e
      this.getData(this.pageNum, this.keyWords, this.catId)
    },
    search () {
      this.getData(this.pageNum, this.keyWords, this.catId)
    },
    clickEmpty () {
      this.pageNum = 1
      this.keyWords = ''
      this.catId = ''
    },
    getPage (e) {
      this.pageNum = e
      this.getData(this.pageNum, this.keyWords, this.catId)
    },
    onChange (e) {
      this.catId = e === undefined ? '' : e
      this.keyWords = ''
      this.pageNum = 1
      this.getData(this.pageNum, this.keyWords, this.catId)
    },
    showModify (item) {
      getProDetail(item.id)
        .then(res => {
          this.modifyItem = res.info
          this.modifyItem.detailsData = res.info.details
          this.formatPrice = this.modifyItem.price / 100
          this.isShowModifyModel = true
          this.$Loading.finish()
        })
        .catch(e => {
          console.log(e)
          this.$Message.error('获取详情失败')
          this.$Loading.error()
        })
    },
    delete (item) {
      this.$Modal.confirm({
        title: '删除提示',
        content: `确定要删除<strong style="margin: 5px;">${item.title}</strong>吗？`,
        onOk: () => {
          deletePro(item.id)
            .then(res => {
              this.$Message.success('删除成功')
              this.getData(this.pageNum, this.keyWords, this.catId)
            })
            .catch(e => {
              console.log(e)
              this.$Message.error('网络异常')
            })
        }
      })
    },
    showDetail (item) {
      this.$Loading.start()
      getProDetail(item.id)
        .then(res => {
          this.modifyItem = res.info
          this.formatPrice = this.modifyItem.price / 100
          this.isShowDetailModel = true

          this.selectOption.map(e => {
            if (e.value === item.catId) { this.selectCate = e.label }
          })
          this.$Loading.finish()
        })
        .catch(e => {
          console.log(e)
          this.$Message.error('获取详情失败')
          this.$Loading.error()
        })
    },
    showAddModel () {
      this.modifyItem.details = ''
      this.isShowAddModel = true
      this.modifyItem = {
        cardNumber: 0,
        steps: []
      }
      this.formatPrice = 0
    },
    getData (pageNum, keyWords, catId) {
      this.loading = true
      if (this.lock) { return }
      getAllProList({pageNum: pageNum, title: keyWords, catId: catId}, this.selecList)
        .then(res => {
          // console.log(res)
          this.loading = false
          if (res.info.data instanceof Array) {
            this.values = res.info.data
            this.totalPage = res.info.pageTotal
          } else {
            if (this.pageNum > 1) {
              this.pageNum--
              this.getData(this.pageNum, this.keyWords, this.catId)
            } else {
              this.$Message.info('暂无数据')
              this.values = []
            }
          }
          this.lock = false
        })
        .catch(e => {
          this.loading = false
          console.log(e)
          this.$Message.error('网络异常')
          this.lock = false
        })

      this.lock = true
    },
    saveData () {
      this.modifyItem.details = this.$refs.myQuillEditorAdd.content
      if (!this.modifyItem.title) {
        this.$Message.info('项目名称不能为空')
        return
      }
      if (!this.modifyItem.catId) {
        this.$Message.info('项目分类不能为空')
        return
      }
      if (!this.formatPrice) {
        this.$Message.info('项目价格不能为空')
        return
      }
      if (!this.modifyItem.cardNumber) {
        this.$Message.info('项目服务次数不能为空')
        return
      }
      this.addLoading = true
      this.modifyItem.price = this.formatPrice * 100
      addProject(JSON.stringify(this.modifyItem))
        .then(res => {
          this.$Message.success('添加成功')
          this.isShowAddModel = false
          this.addLoading = false
          this.modifyItem = {}
          this.getData(this.pageNum, this.keyWords, this.catId)
        })
        .catch(e => {
          console.log(e)
          this.$Message.error('网络异常')
          this.addLoading = false
        })
    },
    modify () {
      this.modifyItem.details = this.$refs.myQuillEditor.content
      if (!this.modifyItem.title) {
        this.$Message.info('项目名称不能为空')
        return
      }
      if (!this.modifyItem.catId) {
        this.$Message.info('项目分类不能为空')
        return
      }
      if (!this.formatPrice) {
        this.$Message.info('项目价格不能为空')
        return
      }
      if (!this.modifyItem.cardNumber) {
        this.$Message.info('项目服务次数不能为空')
        return
      }
      this.editLoading = true
      this.modifyItem.price = this.formatPrice * 100
      delete this.modifyItem.updateTime
      delete this.modifyItem.createTime
      modifyProject(this.modifyItem.id, JSON.stringify(this.modifyItem))
        .then(res => {
          this.$Message.success('修改成功')
          this.isShowModifyModel = false
          this.editLoading = false
          this.modifyItem = {}
          this.getData(this.pageNum, this.keyWords, this.catId)
        })
        .catch(e => {
          console.log(e)
          this.editLoading = false
          this.$Message.error('网络异常')
        })
    },
    // 添加步骤
    addStep () {
      // 推进去一个空的元素
      this.modifyItem.steps.push({content: '', goodsList: []})
    },
    // 删除这个步骤
    deleteStepItem (index) {
      this.$Modal.confirm({
        title: '提示',
        content: '确定要删除这个步骤吗？',
        onOk: () => {
          this.modifyItem.steps.splice(index, 1)
        }
      })
    },
    /**
       * @param stepItem 步骤item
       * @param good_index 耗材索引
       * @description 删除耗材
       */
    deleteGood (stepItem, good_index) {
      stepItem.goodsList.splice(good_index, 1)
    },
    /**
       * @param item 对应的步骤
       * @description 添加耗材
       */
    addProduct (item) {
      this.currentStep = item
      this.isShowChoosePro = true
    },
    onChoose (selection) {
      selection.map(e => {
        this.currentStep.goodsList.push({
          gId: e.id,
          gName: e.goodsName,
          gNum: 0,
          gUnit: ''
        })
      })
    },
    send (e) {
      // console.log(e);
    },
    formatUnit (item) {
      let x = ''
      this.selectUnit.map(e => {
        if (e.id === Number.parseInt(item.gUnit)) { x = e.unityname }
      })
      return x
    }
  },
  mounted () {
    // 加载分类列表
    getProCateList()
      .then(res => {
        if (res.info.data instanceof Array) {
          res.info.data.map(e => {
            this.selectOption.push({
              label: e.name,
              value: e.id
            })
          })
        }
      })
      .catch(e => {
        console.log(e)
        this.$Message.error('网络异常')
      })
      // 加载单位数据
    getUnitList()
      .then(res => {
        this.selectUnit = res.info.data
      })
      .catch(e => {
        console.log(e)
        this.$Message.error('网络异常')
      })

      // 加载数据
    this.getData(this.pageNum, this.keyWords, this.catId)
  }
}
</script>

<style scoped lang="less">
  .vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;
    .ivu-modal{
      top: 0;
    }
  }
  .detail-wrapper{
    p{
      margin-bottom: 10px;
      font-size: 14px;
    }
  }
  .goods-table-large{
    border: 1px #e1e1e1 solid;
    width: 900px;
    border-collapse: collapse;
    border-radius: 20px;
    margin-bottom: 10px;
    tr{
      border-bottom: 1px #e1e1e1 dashed;
    }
    thead{
      td{
        font-size: 16px;
      }
    }
    td{
      padding: 5px;
    }
    tbody{
      tr:hover{
        background-color: #f8f8f8;
      }

      td{
        font-size: 14px;
        text-align: left;
      }
    }
  }
  .goods-table{
    border: 1px #e1e1e1 solid;
    width: 700px;
    border-collapse: collapse;
    border-radius: 20px;
    margin-bottom: 10px;
    tr{
      border-bottom: 1px #e1e1e1 dashed;
    }
    thead{
        td{
          font-size: 16px;
        }
    }
    td{
      padding: 5px;
    }
    tbody{
      tr:hover{
        background-color: #f8f8f8;
      }

      td{
        font-size: 14px;
        text-align: left;
      }
    }
  }

  .goods-list-table{
    td{
      text-align: left;
    }
  }

</style>
