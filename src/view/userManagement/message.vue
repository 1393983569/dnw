<template>
    <div>
      <div>
        <editableTables :columns='columns' :pageTotal='pageTotal' v-model="dataList" :selectOption='selectOption' @filtrateClick='filtrateClick' @getPage='getPageNum'>
          <div style="margin-left: 10px; display: inline-block">
            <Select v-model="selectShopId" @on-change="getList" clearable filterable  style="display: inline-block" placeholder="请选择店铺">
              <Option v-for="(item, index) in this.shopList" :value="item.id + ''" :key="index">{{ item.label }}</Option>
            </Select>
          </div>
          <addMessage  @clickOk='addAdminDate'></addMessage>
        </editableTables>
      </div>
      <Modal v-model="modalState"
             title="修改密码"
             @on-ok="passwordOk"
             :loading="modalPassword"
             @on-cancel="password = ''">
        <Input v-model="password" placeholder="请输入新密码" style="width: 300px" />
      </Modal>
    </div>
</template>
<script>
import editableTables from '_c/editableTables/editableTables.vue'
import addMessage from './components/addMessage.vue'
import { addAdmin, getAdmins, getListShop, changeAdminShop, changePassword, changeAdminState } from '@/api/userManagement/message'
import { updateAdmin, getRolesAlreadyHave } from '@/api/userManagement/role'
export default({
  data () {
    return {
      columns: [
        {
          title: '职务',
          key: 'accountJob'
        },
        {
          title: '用户名',
          key: 'accountName'
        },
        {
          title: '名称',
          key: 'accountTitle'
        },
        {
          title: '电话',
          key: 'accountPhone'
        },
        {
          title: '权限',
          key: 'roleId',
          render: (h, param) => {
            return h('div', [
              h('Select', {
                props: {
                  value: this.dataList[param.index].roleId + ''
                },
                on: {
                  'on-change': (e) => {
                    updateAdmin(param.row.id, e).then(res => {
                      this.$Message.success(res.info)
                      this.dataList[param.index].roleId = e + ''
                    }).catch(err => {
                      this.$Message.error(err)
                    })
                  }
                }
              }, this.roleList.map(item => {
                return h('Option', {
                  props: {
                    value: item.key + '',
                    label: item.label + ''
                  }
                })
              }))
            ])
          }
        },
        {
          title: '所在店铺',
          key: 'shopId',
          render: (h, params) => {
            if (this.$store.state.user.access.indexOf('admin') !== -1) {
              return h('div', [
                h('Select', {
                  props: {
                    value: this.dataList[params.index].shopId
                  },
                  on: {
                    'on-change': (e) => {
                      changeAdminShop(params.row.accountId, e).then(res => {
                        this.$Message.success(res.info)
                        this.getList()
                      }).catch(err => {
                        this.$Message.success('异常错误')
                      })
                    }
                  }
                }, this.shopList.map(item => {
                  return h('Option', {
                    props: {
                      value: item.id,
                      label: item.label
                    }
                  })
                }))
              ])
            } else {
              return h('div', '不可操作')
            }
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.password = ''
                    this.daminId = params.row.id
                    this.modalState = true
                  }
                }
              }, '修改密码'),
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
                    this.$Modal.confirm({
                      title: '提示',
                      content: '确定删除吗？',
                      onOk: () => {
                        changeAdminState(params.row.id)
                          .then(res => {
                            this.getList()
                          })
                          .catch(e => {
                            this.$Message.error(e)
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
      selectOption: [
        {
          label: '用户名',
          value: 'accountTitle'
        },
        {
          label: '职务',
          value: 'accountJob'
        }
      ],
      dataList: [],
      pageNum: 1,
      accountTitle: '',
      accountJob: '',
      pageTotal: 1,
      shopList: [],
      vmodelSelect: '',
      selectShopId: '',
      modalState: false,
      password: '',
      daminId: '',
      modalPassword: true,
      roleList: []
    }
  },
  methods: {
    // 筛选条件
    filtrateClick (e) {
      // 复位页码
      this.pageNum = 1
      if (e.modelSelect === 'accountTitle') {
        this.accountTitle = e.selectValueInput
      } else {
        this.accountTitle = ''
      }
      if (e.modelSelect === 'accountJob') {
        this.accountJob = e.selectValueInput
      } else {
        this.accountJob = ''
      }
      this.getList()
    },
    // 添加管理员
    addAdminDate (e) {
      addAdmin(e).then(res => {
        this.$Message.success(res.info)
        this.restoration()
        this.getList()
      }).catch(err => {
        this.$Message.error(err)
      })
    },
    // 分页查询管理员
    getList () {
      this.dataList = []
      getAdmins(this.pageNum, this.accountTitle, this.accountJob, this.selectShopId).then(res => {
        if (res.info === '暂无数据') {
          this.$Message.error(res.info)
          this.pageTotal = 1
          return
        }
        this.pageTotal = res.info.pageTotal
        res.info.data.map(item => {
          let data = {}
          data.accountJob = item.sysAccountInfoPojo.accountJob
          data.accountName = item.accountName
          data.accountTitle = item.sysAccountInfoPojo.accountTitle
          data.accountPhone = item.sysAccountInfoPojo.accountPhone
          data.shopId = item.sysAccountInfoPojo.shopId
          data.accountId = item.sysAccountInfoPojo.accountId
          data.roleId = item.sysAccountInfoPojo.roleId + ''
          data.id = item.id
          this.dataList.push(data)
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
      this.pageNum = ''
    },
    // 得到店铺
    getShopName () {
      getListShop().then(res => {
        res.info.map(item => {
          this.shopList.push({
            id: item.id,
            label: item.shopName
          })
        })
      }).catch(err => {
        console.log(err)
      })
    },
    passwordOk () {
      this.modalPassword = true
      if (!this.password) {
        this.modalPassword = false
        this.$Message.error('密码不能为空')
        return
      }
      changePassword(this.daminId, this.password).then(res => {
        this.modalPassword = false
        this.modalState = false
        this.$Message.success(res.info)
      }).catch(err => {
        this.$Message.error(err)
        this.modalPassword = false
      })
    },
    // 获得全部权限
    getTlist () {
      let self = this
      let mockData = []
      self.roleList = []
      getRolesAlreadyHave().then(res => {
        for (let i = 0; res.info.length > i; i++) {
          mockData.push({
            key: res.info[i].id + '',
            label: res.info[i].roleTitle + ''
          })
        }
        self.roleList = mockData
        console.log(self.roleList, 'ssssssssssssssss')
      }).catch(err => {
        console.log(err)
      })
    }
  },
  components: {
    editableTables,
    addMessage
  },
  mounted () {
    // 初始化管理员列表
    this.getList()
    this.getShopName()
    this.getTlist()
  }
})
</script>
<style>

</style>
