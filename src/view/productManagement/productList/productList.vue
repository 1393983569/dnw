<template>
  <div>
   <div>
     <Button type="primary"  @click="showAddPro" style="margin-bottom: 10px;">添加产品</Button>
     <Button type="primary"  @click="downloadTemplate" style="margin-bottom: 10px;" :loading="loading_log">下载导入模板</Button>
     <Upload :on-success="onUploadSuccess" :show-upload-list="false" style="display: inline-block; vertical-align: top" :action="`//${$config.baseUrl.pro.split('//')[1]}/importGoods`">
       <Button icon="ios-cloud-upload-outline">导入</Button>
     </Upload>
   </div>
    <Input v-model="keyWords" style="width: 300px;">
      <Select v-model="catId" clearable slot="prepend" style="width:80px">
        <Option v-for="item in cateList" :disabled="item.id === '-1'" :value="item.id"  :key="item.id">{{ item.name }}</Option>
      </Select>
      <Button slot="append" icon="ios-search" @click="onSearch"></Button>
    </Input>
    <editableTables :columns='columns' v-model="values" :pageTotal="totalPage" @getPage="getPage" :selectShow="false" :isLoading="loading"></editableTables>
    <Modal v-model="isShowEditModel" width="1000" class-name="vertical-center-modal" :mask-closable="false">
      <!--model title-->
      <div slot="header">
        <p style="text-align: center;font-size:18px">编辑产品</p>
      </div>
      <!--model content-->
      <strong>分类：</strong>
      <Select v-model="modifyItem.catId" style="width:150px" size="large" clearable>
        <Option v-for="item in cateList" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
      <strong>名称：</strong><Input size="large" v-model="modifyItem.goodsName" style="width: 250px;" placeholder="请输入名称"
                                 clearable/>
      <br>
      <br>
      <div>
        <strong>产品单价(￥)：</strong><InputNumber size="large" v-model="formatPrice"
                                                                 style="width: 100px;" placeholder="请输入进价" clearable
                                                                 number/>
        <strong style="margin-left: 20px;">数量：</strong><InputNumber style="width: 100px;" v-model="modifyItem.stock" number>{{modifyItem.stock}}</InputNumber>
        <strong style="margin-left: 20px;">总金额：</strong><InputNumber style="width: 100px;" v-model="modifyItem.allPrice" number>{{modifyItem.allPrice}}</InputNumber>
        <strong>规格：</strong>
        <Input style="width: 80px;" placeholder="请输入值" v-model="modifyItem.speciNum" number>{{modifyItem.speciNum}}</Input>
        <Select v-model="modifyItem.speciId" clearable slot="prepend" style="width:100px">
          <Option v-for="(item, index) in listSpec" :value="item.id" :key="index">{{ item.specName }}</Option>
        </Select>
        <p style="margin-top: 20px;"></p>
        <strong>产品批号：</strong><InputNumber style="width: 150px;" v-model="modifyItem.batchNum" number>{{modifyItem.batchNum}}</InputNumber>
        <strong style="margin-left: 20px;">生产日期：</strong> <DatePicker type="date" placeholder="请选择生产日期" v-model="modifyItem.produceTime" style="width: 150px"></DatePicker>
        <strong style="margin-left: 20px;">到期日期：</strong> <DatePicker type="date" placeholder="请选择到期日期" v-model="modifyItem.overTime" style="width: 150px"></DatePicker>
        <strong>供应商：</strong>
        <Select v-model="modifyItem.supplierId" clearable slot="prepend" style="width:100px">
          <Option v-for="(item, index) in listSupplier" :value="item.id" :key="index">{{ item.name }}</Option>
        </Select>
        <p style="margin-top: 20px;"></p>
        <strong>二维码：</strong><Input style="width: 100px;" v-model="modifyItem.barCode" number>{{modifyItem.barCode}}</Input>
        <strong>单位：</strong>
        <Select v-model="modifyItem.unitId" style="width:80px" size="large">
          <Option v-for="item in unitList" :value="item.id" :key="item.id">{{ item.unityname }}</Option>
        </Select>
        <!--<strong style="margin-left: 20px;">重量(kg)：</strong><InputNumber size="large" v-model="modifyItem.goodsWeight"-->
                                                                  <!--style="width: 100px;" placeholder="请输入重量" clearable/>-->
        <strong style="margin-left: 20px;">关键词：</strong><Input size="large" v-model="modifyItem.keyWords"
                                                               style="width: 400px;" placeholder="请输入关键词" clearable/>
        <p style="margin-top: 20px;"></p>
        <strong>描述：</strong>
        <editor :editorContent="modifyItem.goodsDesc" ref="modifyEditor" :cMod="'dasd'" :height="150"></editor>
      </div>
      <!--model footer-->
      <div slot="footer" style="text-align: center">
        <Button type="primary" size="large" style="width: 200px" @click="modify" :loading="editLoading">
          <span v-if="!editLoading">保存</span>
          <span v-else>保存中...</span>
        </Button>
      </div>
    </Modal>
    <Modal v-model="isShowAddModel" width="1000" class-name="vertical-center-modal" :mask-closable="false">
      <!--model title-->
      <div slot="header" >
        <p style="text-align: center;font-size:18px">添加产品</p>
      </div>
      <strong>分类：</strong>
      <Select v-model="modifyItem.catId" style="width:150px" size="large" clearable>
        <Option v-for="item in cateList" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
      <strong>名称：</strong><Input size="large" v-model="modifyItem.goodsName" style="width: 300px;" placeholder="请输入名称"
                                 clearable/>
      <br>
      <br>
      <div>
        <strong >产品单价(￥)：</strong><InputNumber size="large" v-model="formatPrice"
                                                                 style="width: 100px;" placeholder="请输入进价" clearable
                                                                 number/>
        <strong style="margin-left: 20px;">数量：</strong><InputNumber size="large" v-model="modifyItem.stock"
                                                              style="width: 100px;" placeholder="请输入数量" clearable
                                                              number/>
        <strong style="margin-left: 20px;">总金额：</strong><InputNumber style="width: 100px;" v-model="modifyItem.allPrice" number></InputNumber>
        <strong>规格：</strong>
        <Input style="width: 80px;" placeholder="请输入值" v-model="modifyItem.speciNum" number>{{modifyItem.speciNum}}</Input>
        <Select v-model="modifyItem.speciId" clearable slot="prepend" style="width:100px">
          <Option v-for="(item, index) in listSpec" :value="item.id" :key="index">{{ item.specName }}</Option>
        </Select>

        <p style="margin-top: 20px;"></p>
        <strong>产品批号：</strong><InputNumber style="width: 150px;" v-model="modifyItem.batchNum" number></InputNumber>
        <strong style="margin-left: 20px;">生产日期：</strong> <DatePicker type="date" placeholder="请选择生产日期" v-model="modifyItem.produceTime" style="width: 150px"></DatePicker>
        <strong style="margin-left: 20px;">到期日期：</strong> <DatePicker type="date" placeholder="请选择到期日期" v-model="modifyItem.overTime" style="width: 150px"></DatePicker>
        <strong>供应商：</strong>
        <Select v-model="modifyItem.supplierId" clearable slot="prepend" style="width:100px">
          <Option v-for="(item, index) in listSupplier" :value="item.id" :key="index">{{ item.name }}</Option>
        </Select>

        <p style="margin-top: 20px;"></p>
        <strong>二维码：</strong><Input style="width: 100px;" v-model="modifyItem.barCode" number></Input>
        <strong>单位：</strong>
        <Select v-model="modifyItem.unitId" style="width:80px" size="large">
          <Option v-for="item in unitList" :value="item.id" :key="item.id">{{ item.unityname }}</Option>
        </Select>
        <!--<strong style="margin-left: 20px;">重量(kg)：</strong><InputNumber size="large" v-model="modifyItem.goodsWeight"-->
                                                               <!--style="width: 100px;" placeholder="请输入重量" clearable/>-->
        <strong style="margin-left: 20px;">关键词：</strong><Input size="large" v-model="modifyItem.keyWords"
                                                               style="width: 400px;" placeholder="请输入关键词" clearable/>
        <p style="margin-top: 20px;"></p>
        <strong>描述：</strong>
        <editor :editorContent="modifyItem.goodsDesc" ref="addEditor" :cMod="'dasd'" :height="150"></editor>
      </div>
      <!--model footer-->
      <div slot="footer" style="text-align: center">
        <Button type="primary" size="large" style="width: 200px" @click="add" :loading="addLoading">
          <span v-if="!addLoading">保存</span>
          <span v-else>保存中...</span>
        </Button>
      </div>
    </Modal>
    <Modal v-model="isShowDetail" width="800" class-name="vertical-center-modal" title="产品详情">
      <!--model content-->
      <div class="detail-list-item">
        <strong>编号：</strong><span>{{modifyItem.goodsNum}}</span>
        <br>
        <strong>分类：</strong><span>{{selectCate}}</span>
        <br>
        <strong>名称：</strong><span>{{modifyItem.goodsName}}</span>
        <br>
        <strong>进价(￥)：</strong><span>{{modifyItem.shopPrice/100}}</span>
        <br>
        <strong>数量：</strong><span>{{modifyItem.stock}}</span>
        <br>
        <strong>总金额：</strong><span>{{modifyItem.allPrice}}</span>
        <br>
        <strong>规格：</strong><span>{{modifyItem.speciNum}}{{modifyItem.speciName}}</span>
        <br>
        <strong>产品批号：</strong><span>{{modifyItem.batchNum}}</span>
        <br>
        <strong>生产日期：</strong><span>{{modifyItem.produceTimeDetails}}</span>
        <br>
        <strong>到期日期：</strong><span>{{modifyItem.overTimeDetails}}</span>
        <br>
        <strong>供应商：</strong><span>{{modifyItem.supplierNameDetails}}</span>
        <br>
        <strong>二维码：</strong><span>{{modifyItem.allPrice}}</span>
        <br>
        <strong>单位：</strong><span>{{selectUnit}}</span>
        <br>
        <!--<strong >重量(kg)：</strong><span>{{modifyItem.goodsWeight}}</span>-->
        <!--<br>-->
        <strong >关键词：</strong><span>{{modifyItem.keyWords}}</span>
        <br>
        <strong>描述：</strong>
        <div v-html="modifyItem.goodsDesc"></div>
      </div>
      <!--model footer-->
      <div slot="footer" style="text-align: center">

      </div>
    </Modal>
  </div>
</template>

<script>

import './productList.less'
import editor from '_c/editor/editor.vue'
import editableTables from '_c/editableTables/editableTables.vue'
import {
  getUnitList
} from '@/api/unitManage/unitManage'
import {getProductListByPage, deleteProductById, addProduct, modifyProductById, getCateList, openOrClosePro, getProduct} from '@/api/productManagement/productManagement'
import {getListSpec, getListSupplier, downloadTemplateOfGoods} from '@/api/productManagement/productList'
// import config from '@/config/index'
export default {
  components: {
    editableTables, editor
  },
  data: function () {
    return {
      columns: [
        {
          title: '编号',
          key: 'goodsNum',
          align: 'center',
          render: (h, params) => {
            return h('span', params.row.goodsNum ? params.row.goodsNum : '暂无编号')
          }
        },
        {
          title: '名称',
          key: 'goodsName',
          align: 'center',
          render: (h, params) => {
            return h('strong', {
              style: {
                'fontStyle': Number.parseInt(params.row.status) === 1 ? 'normal' : 'italic',
                'color': Number.parseInt(params.row.status) === 1 ? '#515a6f' : '#a1a1a1'
              }
            }, params.row.goodsName)
          }
        },
        {
          title: '进价(￥)',
          key: 'shopPrice',
          align: 'center',
          render: (h, params) => {
            return h('span', parseInt(params.row.shopPrice) / 100)
          }
        },
        {
          title: '库存',
          key: 'stock',
          align: 'center'
        },
        {
          title: '库存',
          key: 'allPrice',
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
                  openOrClosePro(params.row.id, e)
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
          align: 'left',
          width: 190,
          render: (h, params) => {
            return h('Div', [
              h('Button', {
                props: {
                  type: 'success',
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
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginLeft: '5px'
                },
                on: {
                  click: () => {
                    this.showModifyPro(params.row)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginLeft: '5px'
                },
                on: {
                  click: () => {
                    this.deletePro(params.row)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      values: [],
      totalPage: 0,
      currentPage: 1,
      // 数据加载
      loading: false,
      // 是否显示编辑框
      isShowEditModel: false,
      editLoading: false,
      // 是否显示添加框
      isShowAddModel: false,
      addLoading: false,
      // 是否显示详情
      isShowDetail: false,
      modifyItem: {},
      // 将分为单位的进价转换为元
      formatPrice: 0,
      // 类型列表
      cateList: [],
      // 单位列表
      unitList: [],
      // 选中的类别
      selectCate: null,
      // 选中的单位
      selectUnit: null,

      // search option
      keyWords: '',
      catId: '',
      // 规格
      listSpec: [],
      // 规格单位
      speciName: '',
      // 供应商
      listSupplier: [],
      loading_log: false
    }
  },
  methods: {
    //    onValue () {
    //      this.currentPage = 1
    //      this.getData({catId: this.catId, goodsName: this.keyWords, pageNum: this.currentPage})
    //    },
    onSearch () {
      this.getData({catId: this.catId, goodsName: this.keyWords, pageNum: this.currentPage})
    },
    getData (data) {
      let self = this
      data.catId = data.catId === undefined ? '' : data.catId
      this.loading = true
      getProductListByPage(data)
        .then(res => {
          // console.log(res)
          this.loading = false
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
        .catch(err => {
          this.loading = false
          console.log(err)
          this.$Message.error('网络异常，请重试')
        })
    },
    getPage (e) {
      this.currentPage = e
      this.getData({catId: this.catId, goodsName: this.keyWords, pageNum: this.currentPage})
    },
    deletePro (item) {
      let self = this
      this.$Modal.confirm({
        title: '提示',
        content: `确定要删除<strong style="margin: 5px">${item.goodsName}</strong>吗？`,
        okText: '确定',
        cancelText: '取消',
        closable: true,
        onOk: function () {
          deleteProductById(item.id)
            .then(res => {
              this.$Message.success('删除成功')
              self.getData({catId: self.catId, goodsName: self.keyWords, pageNum: self.currentPage})
            })
            .catch(e => {
              console.log(e)
              this.$Message.error('网络异常，请重试')
            })
        }
      })
    },
    showModifyPro (item) {
      this.$Loading.start()
      getProduct(item.id)
        .then(res => {
          this.selectCate = null
          this.modifyItem = res.info
          console.log(res.info.speciNum, 'speciNum')
          console.log(res.info.status, 'status')
          console.log(res.info.supplierId, 'supplierId')
          this.modifyItem.supplierId = res.info.supplierId + ''
          this.formatPrice = parseInt(this.modifyItem.shopPrice) / 100
          this.isShowEditModel = !this.isShowEditModel
          this.$Loading.finish()
        })
        .catch(e => {
          this.$Loading.error()
        })
    },
    showAddPro () {
      this.selectCate = null
      this.modifyItem = {}
      this.modifyItem.stock = 1
      this.formatPrice = 0
      this.isShowAddModel = !this.isShowAddModel
    },
    modify () {
      let self = this
      if (!this.modifyItem.goodsName) {
        this.$Message.info('名称不能为空')
        return
      }

      // if (!this.formatPrice && !Number.parseFloat(this.formatPrice)) {
      //   this.$Message.info('进价不能为空')
      //   return
      // }
      // if (!this.modifyItem.stock && !Number.parseFloat(this.modifyItem.stock)) {
      //   this.$Message.info('数量不能为空')
      //   return
      // }

      // if (!this.modifyItem.allPrice && !Number.parseFloat(this.modifyItem.allPrice)) {
      //   this.$Message.info('总金额不能为空')
      //   return
      // }

      if (!this.modifyItem.catId) {
        this.$Message.info('分类不能为空')
        return
      }
      this.modifyItem.goodsDesc = this.$refs.modifyEditor.content
      this.modifyItem.shopPrice = parseInt(this.formatPrice * 100)
      this.modifyItem.produceTime = this.modifyItem.produceTime ? new Date(this.modifyItem.produceTime).Format('yyyy-M-d') : ''
      this.modifyItem.overTime = this.modifyItem.overTime ? new Date(this.modifyItem.overTime).Format('yyyy-M-d') : ''
      this.editLoading = true
      modifyProductById(this.modifyItem.id, this.modifyItem)
        .then(res => {
          this.isShowEditModel = false
          this.$Message.success('编辑成功')
          this.editLoading = false
          self.getPage(self.currentPage)
        })
        .catch(e => {
          console.log(e)
          this.editLoading = false
          this.$Message.error('网络错误')
        })
    },
    add () {
      let self = this

      // if (!this.modifyItem.goodsName) {
      //   this.$Message.info('名称不能为空')
      //   return
      // }

      // if (!this.formatPrice && !Number.parseFloat(this.formatPrice)) {
      //   this.$Message.info('进价不能为空')
      //   return
      // }

      // if (!this.modifyItem.stock && !Number.parseFloat(this.modifyItem.stock)) {
      //   this.$Message.info('数量不能为空')
      //   return
      // }

      // if (!this.modifyItem.allPrice && !Number.parseFloat(this.modifyItem.allPrice)) {
      //   this.$Message.info('总金额不能为空')
      //   return
      // }

      // if (!this.modifyItem.catId) {
      //   this.$Message.info('分类不能为空')
      //   return
      // }
      this.modifyItem.goodsDesc = this.$refs.addEditor.content
      this.modifyItem.shopPrice = this.formatPrice * 100
      this.modifyItem.produceTime = this.modifyItem.produceTime ? new Date(this.modifyItem.produceTime).Format('yyyy-M-d') : ''
      this.modifyItem.overTime = this.modifyItem.overTime ? new Date(this.modifyItem.overTime).Format('yyyy-M-d') : ''
      this.addLoading = true
      addProduct(this.modifyItem)
        .then(res => {
          this.isShowAddModel = false
          this.addLoading = false
          this.$Message.success('添加成功')
          self.getPage(self.currentPage)
        })
        .catch(e => {
          console.log(e)
          this.isShowAddModel = false
          this.addLoading = false
          this.$Message.error('网络错误')
        })
    },
    showDetail (item) {
      this.$Loading.start()
      getProduct(item.id)
        .then(res => {
          this.selectCate = null
          this.modifyItem = res.info
          this.modifyItem.overTimeDetails = res.info.overTime
          this.modifyItem.produceTimeDetails = res.info.produceTime
          this.listSupplier.map(item => {
            if (item.id + '' === res.info.supplierId + '') {
              this.modifyItem.supplierNameDetails = item.name
            }
          })
          this.formatPrice = parseInt(this.modifyItem.shopPrice * 100) / 10000
          this.isShowDetail = !this.isShowDetail
          this.cateList.map(e => {
            if (this.modifyItem.catId === e.id) {
              this.selectCate = e.name
            }
          })
          this.unitList.map(e => {
            if (this.modifyItem.unitId === e.id) {
              this.selectUnit = e.unityname
            }
          })
          this.$Loading.finish()
        })
        .catch(e => {
          this.$Loading.error()
        })
    },
    async downloadTemplate () {
      this.loading_log = true
      try {
        let resData = await downloadTemplateOfGoods()
        this.loading_log = false
        window.location.href = resData.info
      } catch (e) {
        this.$Message.error(e)
      }
    },
    onUploadSuccess () {
      this.$Message.success('成功')
      this.getData({catId: this.catId, goodsName: this.keyWords, pageNum: this.currentPage})
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
      .catch(e => {
        console.log(e)
        this.$Message.error('查询分类失败')
      })
    // 获取单位
    getUnitList()
      .then(res => {
        this.unitList = res.info.data
      })
      .catch(e => {
        this.$Message.error('网络异常')
      })
    this.getData({catId: this.catId, goodsName: this.keyWords, pageNum: this.currentPage})
    // 查询规格列表
    getListSpec().then(res => {
      res.info.map(item => {
        this.listSpec.push({
          specName: item.specName,
          id: item.id
        })
      })
    }).catch(err => {
      console.log(err)
    })
    // 查询供应商列表
    getListSupplier().then(res => {
      res.info.map(item => {
        this.listSupplier.push({
          name: item.name,
          id: item.id + ''
        })
      })
    }).catch(err => {
      console.log(err)
    })
  }

}

</script>
