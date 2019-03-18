<template>
    <div>
      <Button type="primary" @click="showAddModel">添加店铺</Button>
      <editableTables :columns="columns" :value="values" :selectShow="false" :isLoading="loading" :pageTotal="totalPage" @getPage="getPage"></editableTables>

      <Modal :mask-closable="false" v-model="isAdd" width="600">
        <div slot="header">
          <p style="text-align: center;font-size: 16px">添加店铺</p>
        </div>
        <div class="content-wrapper">
          <p><strong>店铺名称:</strong><Input placeholder="请输入店铺名称" clearable style="margin-left: 5px;width: 200px" v-model="modifyItem.shopName"></Input>
            <strong style="margin-left: 10px">店铺负责人:</strong>
            <Select style="width: 120px" v-model="modifyItem.accountId">
                <Option :value="item.accountId" v-for="(item, index) in adminListData">{{ item.accountJob }}</Option>
            </Select>
            <span>(暂无可不选)</span>
          </p>
          <P><strong>所在区域:</strong>
            <site-select v-model="selectSite"></site-select>
          </P>
          <P><strong>详细地址:</strong>
            <br>
            <Input placeholder="请输入详细地址" clearable style="width: 300px" v-model="modifyItem.address"></Input>
            <strong style="margin-left: 10px">店铺面积(m<sup>2</sup>)：</strong><InputNumber style="margin-left: 5px;width: 80px;" placeholder="面积"  v-model="modifyItem.shopAreas"></InputNumber>
          </P>
          <p><strong>店铺备注：</strong><br>
            <editor :cMod="'dasdsa'" ref="editor" :height="150" :editorContent="modifyItem.shopRemark"></editor>
          </p>
        </div>
        <div slot="footer" style="text-align: center">
          <Button type="primary" size="large" :loading="addLoading" @click="add">
            <span v-if="!addLoading">保存</span>
            <span v-else>保存中...</span>
          </Button>
        </div>
      </Modal>

      <Modal :mask-closable="false" v-model="isModify" width="600">
        <div slot="header">
          <p style="text-align: center;font-size: 16px">修改店铺</p>
        </div>
        <div class="content-wrapper">
          <p><strong>店铺名称:</strong><Input placeholder="请输入店铺名称" clearable style="margin-left: 5px;width: 200px" v-model="modifyItem.shopName"></Input>
            <strong style="margin-left: 10px">店铺负责人:</strong>
            <Select style="width: 120px" v-model="modifyItem.accountId">
              <Option :value="item.accountId" v-for="(item, index) in adminListData">{{ item.accountJob }}</Option>
            </Select>
            <span>(暂无可不选)</span>
          </p>
          <P><strong>所在区域:</strong>
            <site-select v-model="selectSite"></site-select>
          </P>
          <P><strong>详细地址:</strong>
            <br>
            <Input placeholder="请输入详细地址" clearable style="width: 300px" v-model="modifyItem.address"></Input>
            <strong style="margin-left: 10px">店铺面积(m<sup>2</sup>)：</strong><InputNumber style="margin-left: 5px;width: 80px;" placeholder="面积" v-model="modifyItem.shopAreas"></InputNumber>
          </P>
          <p><strong>店铺备注：</strong><br>
            <editor :cMod="'dasdsa'" ref="editor" :height="150" :editorContent="modifyItem.shopRemark"></editor>
          </p>
        </div>
        <div slot="footer" style="text-align: center">
          <Button type="primary" size="large" :loading="modifyLoading" @click="modify">
            <span v-if="!modifyLoading">保存</span>
            <span v-else>保存中...</span>
          </Button>
        </div>
      </Modal>
    </div>
</template>

<script>
import {getShopList, getShop, addShop, openOrCloseShop, modifyShop, getAdminsInfo} from '@/api/shopManage/shopManage'
import editableTables from '_c/editableTables/editableTables'
import editor from '_c/editor/editor.vue'
import siteSelect from '@/components/siteSelect/siteSelect'
export default {
  components: {editableTables, editor, siteSelect},
  data: function () {
    return {
      loading: false,
      addLoading: false,
      modifyLoading: false,
      currentPage: 1,
      totalPage: 1,
      columns: [
        {
          title: '店铺名称',
          key: 'shopName',
          align: 'center'
        },
        {
          title: '店铺负责人',
          align: 'center',
          render: (h, params) => {
            let title = params.row.sysAccountInfoPojo ? params.row.sysAccountInfoPojo.accountTitle : '无店铺负责人'
            return h('span', title)
          }
        },
        {
          title: '职务',
          align: 'center',
          render: (h, params) => {
            let title = params.row.sysAccountInfoPojo ? params.row.sysAccountInfoPojo.accountTitle : '无店铺负责人'
            return h('span', title)
          }
        },
        {
          title: '操作',
          key: 'operate',
          align: 'center',
          render: (h, params) => {
            let type = params.row.state === 0 ? 'success' : 'default'
            return h('div', [
              h('Button', {
                props: {
                  type: type,
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '提示',
                      content: `确定要${params.row.state === 0 ? '开启' : '关闭'}<strong style="margin: 5px">${params.row.shopName}</strong>这家店吗?`,
                      onOk: () => {
                        let state = params.row.state === 1 ? 0 : 1
                        openOrCloseShop(params.row.id, state)
                          .then(res => {
                            this.$Message.success('操作成功')
                            this.getData({pageNum: this.currentPage})
                          }).catch(e => {
                            this.$Message.error('操作失败')
                          })
                      }
                    })
                  }
                }
              }, params.row.state === 0 ? '开启' : '关闭'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  'marginLeft': '5px'
                },
                on: {
                  click: () => {
                    this.modifyItem = {}
                    this.modifyItem = params.row
                    this.selectSite = []
                    this.selectSite = [params.row.provinceId, params.row.cityId, params.row.areaId]
                    this.isModify = true
                  }
                }
              }, '编辑')
            ])
          }
        }
      ],
      values: [],
      isAdd: false,
      isModify: false,
      provinceData: [],
      modifyItem: {},
      selectSite: [],
      adminListData: []
    }
  },
  methods: {
    getPage (e) {
      this.currentPage = e
      this.getData({pageNum: e})
    },
    getData (data) {
      this.loading = true
      getShopList(data)
        .then(res => {
          this.loading = false
          if (res.info.data instanceof Array) {
            this.values = res.info.data
          } else {
            if (data.pageNum > 1) {
              this.currentPage--
              this.getData({pageNum: this.currentPage})
            } else {
              this.$Message.info('暂无数据')
              this.values = []
            }
          }
        })
        .catch(e => {
          console.log(e)
          this.$Message.error('网络异常')
          this.loading = false
        })
    },
    showAddModel () {
      this.modifyItem = {}
      this.selectSite = []
      this.isAdd = true
    },
    add () {
      if (!this.modifyItem.shopName) {
        this.$Message.info('店铺名称不能为空')
        return
      }

      if (this.selectSite.length < 3) {
        this.$Message.info('所在区域不完整')
        return
      }

      if (!this.modifyItem.address) {
        this.$Message.info('地址详情不能为空')
        return
      }

      this.modifyItem.provinceId = this.selectSite[0]
      this.modifyItem.cityId = this.selectSite[1]
      this.modifyItem.areaId = this.selectSite[2]
      this.modifyItem.shopRemark = this.$refs.editor.content
      this.addLoading = true
      addShop(this.modifyItem)
        .then(res => {
          this.$Message.success('添加成功')
          this.addLoading = false
          this.isAdd = false
          this.getData({pageNum: this.currentPage})
        })
        .catch(e => {
          this.$Message.error('网络异常')
          this.addLoading = false
          this.isAdd = false
          // this.getData({pageNum:this.currentPage});
        })
    },
    modify () {
      if (!this.modifyItem.shopName) {
        this.$Message.info('店铺名称不能为空')
        return
      }

      if (this.selectSite.length < 3) {
        this.$Message.info('所在区域不完整')
        return
      }

      if (!this.modifyItem.address) {
        this.$Message.info('地址详情不能为空')
        return
      }

      this.modifyItem.provinceId = this.selectSite[0]
      this.modifyItem.cityId = this.selectSite[1]
      this.modifyItem.areaId = this.selectSite[2]
      this.modifyItem.shopRemark = this.$refs.editor.content
      this.modifyLoading = true
      modifyShop(this.modifyItem.id, this.modifyItem)
        .then(res => {
          this.$Message.success('修改成功')
          this.modifyLoading = false
          this.isModify = false
          this.getData({pageNum: this.currentPage})
        })
        .catch(e => {
          this.$Message.error('网络异常')
          this.modifyLoading = false
          this.isAdd = false
        })
    }
  },
  mounted () {
    this.getData({pageNum: this.currentPage})
    getAdminsInfo().then(res => {
      res.info.map(item => {
        this.adminListData.push({
          accountId: item.accountId,
          accountJob: item.accountJob
        })
      })
    }).catch(err => {

    })
  }
}
</script>

<style scoped lang="less">
  .content-wrapper{
    p{
      margin-bottom: 10px;
    }
  }
</style>
