<template>
    <div>
      <div v-if="true">
        <editableTables :selectOption='selectOption' :columns='columns' :pageTotal='pageTotal' v-model="dataList" @filtrateClick='filtrateClick'  @getPage='getPageNum'>
          <div style="margin-left: 10px;">
            <Button @click="showDrawer" type="primary">角色权限管理</Button>
            <Drawer title="角色权限" @on-close='closeDrawer' width="720" :closable="false" v-model="valueDrawer">
              <roleAdmin :showTable='valueDrawer'></roleAdmin>
            </Drawer>
          </div>
        </editableTables>
      </div>
    </div>
</template>
<script>
import editableTables from '_c/editableTables/editableTables.vue'
// getRoles 分页获取角色已有权限 管理员 getRolesAlreadyHave 分页获取全部角色信息 管理员
// changeRoleState删除  updateRole添加
import { getRoles, getRolesAlreadyHave, changeRoleState, updateAdmin } from '@/api/userManagement/role'
import { getAdmins, changeAdminState } from '@/api/userManagement/message'
import roleTransfer from '../components/roleTransfer'
import roleAdmin from './roleTable'
export default({
  data () {
    return {
      columns: [
        {
          title: '职务',
          key: 'accountJob'
        },
        {
          title: '姓名',
          key: 'accountName'
        },
        {
          title: '电话',
          key: 'accountPhone'
        },
        {
          title: '职位',
          key: 'roleId',
          width: 250,
          render: (h, param) => {
            return h('div', [
              h('Select', {
                props: {
                  value: this.dataList[param.index].roleId + ''
                },
                style: {
                  'white': 60
                },
                on: {
                  'on-change': (e) => {
                    updateAdmin(e, param.row.id).then(res => {
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
          title: '操作',
          key: 'action',
          width: 250,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              // 穿梭框组件
              //                  h(roleTransfer, {
              //                      props: {
              //                        targetKeys: this.targetKeys,
              //                        roleList: this.roleList
              //                      },
              //                      style: {
              //                          marginRight: '5px',
              //                          display: 'inline-block'
              //                      },
              //                      on: {
              //                          clickOn: () => {
              //                            this.showTransfer = !this.showTransfer
              //                            this.getMockKey(params.row.id)
              //                            this.getTlist ()
              //                          },
              //                          newTargetKeys: (e) => {
              //                            this.targetKeys = e
              //                          },
              //                          // 提交修改的权限
              //                          clickSubmit: () => {
              //                            updateAdmin(params.row.id, this.targetKeys).then(res => {
              //                              this.$Message.success(res.info)
              //                              this.getMockKey(params.row.id)
              //                            }).catch(err => {
              //                                this.$Message.error(err)
              //                            })
              //                          }
              //                      }
              //                  }, '权限'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    changeAdminState(params.row.id).then(res => {
                      this.$Message.success(res.info)
                      this.getList()
                    }).catch(err => {
                      this.$Message.error(err)
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
          label: '姓名',
          value: 'accountTitle'
        },
        {
          label: '职务',
          value: 'accountJob'
        }
      ],
      dataList: [],
      pageNum: 1,
      pageTotal: 1,
      roleList: [],
      targetKeys: [],
      showTransfer: false,
      valueDrawer: false,
      showTable: true,
      accountTitle: ''
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
    // 分页获取角色信息
    getList () {
      this.dataList = []
      getAdmins(this.pageNum, this.accountTitle, this.accountJob).then(res => {
        if (res.info === '暂无数据') {
          this.$Message.error(res.info)
          this.pageTotal = 1
          return
        }
        this.pageTotal = res.info.pageTotal
        res.info.data.map(item => {
          if (item.sysAccountInfoPojo.accountJob !== '超级管理员') {
            let data = {}
            data.accountJob = item.sysAccountInfoPojo.accountJob
            data.accountName = item.accountName
            data.accountPhone = item.sysAccountInfoPojo.accountPhone
            data.roleId = item.sysAccountInfoPojo.roleId
            data.id = item.id
            this.dataList.push(data)
          }
        })
      }).catch(err => {
        this.$Message.error(err)
      })
    },
    // 获得已有权限（已弃用）
    getMockKey (id) {
      let self = this
      let mockKey = []
      self.targetKeys = []
      getRoles(id).then(res => {
        for (let i = 0; res.info.length > i; i++) {
          mockKey.push(
            res.info[i].id + ''
          )
        }
        self.targetKeys = mockKey
      }).catch(err => {
        this.$Message.error(err)
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
      }).catch(err => {
        console.log(err)
      })
    },
    showDrawer () {
      this.valueDrawer = true
    },
    // 关闭抽屉
    closeDrawer () {

    },
    // 得到页数
    getPageNum (e) {
      this.pageNum = e
      this.getList()
    },
    // 复位
    restoration () {
      this.pageNum = ''
    }
  },
  components: {
    editableTables,
    roleTransfer,
    roleAdmin
  },
  mounted () {
    // 初始化管理员列表
    this.getList()
    // 预先得到所有权限
    this.getTlist()
  }
})
</script>
<style>
</style>
