<template>
    <div>
      <div v-if="showEditableTables">
        <editableTables :selectShow='false' :columns='columns' :pageTotal='pageTotal' v-model="dataList" @getPage='getPageNum'>
          <div style="margin-left: 10px;">
            <addMessage @addClick='addRoleDate'></addMessage>
          </div>
        </editableTables>
      </div>
      <Modal
        v-model="modal_module"
        title="模块分配">
        <CheckboxGroup v-model="selectModuleList">
          <Checkbox v-for="(item, index) in moduleList" :key="index" :label="item.id">{{ item.remark }}</Checkbox>
        </CheckboxGroup>
        <roleTable-tree :id="this.module_id" @selectUp="selectUp"></roleTable-tree>
        <div slot="footer">
          <Button @click="cancel">取消</Button>
          <Button type="primary" :loading="module_loading" @click="confirm">确定</Button>
        </div>
      </Modal>
    </div>
</template>
<script>
import editableTables from '_c/editableTables/editableTables.vue'
import addMessage from '../components/addRole.vue'
import { mapActions } from 'vuex'
// getNotPermissionsNoPage 分页获取角色已有权限 角色 getPermissionsNoPage 分页获取角色所有权限 角色
import {
  getPageRoles,
  getNotPermissionsNoPage,
  getPermissionsNoPage,
  addRole,
  changeRoleState,
  updateRole,
  getModuleNoPage,
  getModuleNoPageRoleId,
  updateRoleModule} from '@/api/userManagement/role'
import { getModuleTree, getRoleMenu } from '@/api/userManagement/role'
import roleTransfer from '../components/roleTransfer'
import roleTableTree from './cpmponents/roleTable-Tree'
export default({
  components: {
    editableTables,
    addMessage,
    roleTransfer,
    roleTableTree
  },
  data () {
    return {
      columns: [
        {
          title: '角色名称',
          key: 'roleTitle'
        },
        {
          title: '角色备注',
          key: 'roleMark'
        },
        {
          title: '操作',
          key: 'action',
          width: 250,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              // 穿梭框组件
              h(roleTransfer, {
                props: {
                  targetKeys: this.targetKeys,
                  roleList: this.roleList
                },
                style: {
                  marginRight: '5px',
                  display: 'inline-block'
                },
                on: {
                  clickOn: () => {
                    this.showTransfer = !this.showTransfer
                    this.getMockKey(params.row.id)
                  },
                  newTargetKeys: (e) => {
                    this.targetKeys = e
                  },
                  // 提交修改的权限
                  clickSubmit: () => {
                    updateRole(params.row.id, this.targetKeys).then(res => {
                      this.$Message.success(res.info)
                      this.getMockKey(params.row.id)
                    }).catch(err => {
                      this.$Message.error(err)
                    })
                  }
                }
              }, '权限'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.modal_module = true
                    this.module_id = params.row.id + '.' + new Date()
                    this.getMoudle()
                  }
                }
              }, '模块分配'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    changeRoleState(params.row.id).then(res => {
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
      dataList: [],
      pageNum: 1,
      pageTotal: 1,
      showEditableTables: false,
      roleList: [],
      targetKeys: [],
      showTransfer: false,
      modal_module: false,
      moduleList: [],
      selectModuleList: [],
      module_loading: false,
      module_id: '',
      alreadyHaveMounted: []
    }
  },
  props: {
    showTable: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    ...mapActions([
      'getUserInfo'
    ]),
    // 添加角色
    addRoleDate (e) {
      addRole(e.roleTitle, e.roleMark).then(res => {
        this.$Message.success(res.info)
        this.restoration()
        this.getList()
      }).catch(err => {
        this.$Message.error(err)
      })
    },
    // 分页获取角色信息
    getList () {
      getPageRoles(this.pageNum).then(res => {
        this.dataList = []
        if (res.info === '暂无数据') {
          this.$Message.error(res.info)
          return
        }
        this.pageTotal = res.info.pageTotal
        res.info.data.map(item => {
          let data = {}
          data.roleMark = item.roleMark
          data.roleTitle = item.roleTitle
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
      this.pageNum = ''
    },
    // 获得已有权限
    getMockKey (id) {
      let self = this
      let mockKey = []
      self.targetKeys = []
      getNotPermissionsNoPage(id).then(res => {
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
      getPermissionsNoPage().then(res => {
        for (let i = 0; res.info.length > i; i++) {
          mockData.push({
            key: res.info[i].id + '',
            label: res.info[i].name + ''
          })
        }
        self.roleList = mockData
      }).catch(err => {
        console.log(err)
      })
    },
    // 获得模块
    getMoudle () {
      return
      this.moduleList = []
      this.selectModuleList = []
      Promise.all([getModuleNoPage(), getModuleNoPageRoleId(this.module_id)]).then(res => {
        this.moduleList = []
        this.selectModuleList = []
        res[0].info.map(item => {
          this.moduleList.push({
            id: item.id,
            remark: item.remark
          })
        })
        res[1].info.map(item => {
          this.selectModuleList.push(item.id)
        })
      }).catch(err => {

      })
    },
    // 模块取消
    cancel () {
      this.modal_module = false
      this.module_loading = false
      this.selectModuleList = []
      this.alreadyHaveMounted = []
    },
    // 模块提交
    //        confirm() {
    //          return
    //          this.module_loading = true
    //          updateRoleModule(this.module_id.split('.')[0], this.selectModuleList).then(res => {
    //            this.setUserInfoList(res.info)
    //          }).catch(err => {
    //            console.log(err)
    //          })
    //        },
    // 模块提交
    confirm () {
      this.module_loading = true
      getModuleTree(this.module_id.split('.')[0], this.alreadyHaveMounted).then(res => {
        this.setUserInfoList(res.info)
      }).catch(err => {
        console.log(err)
      })
    },
    // 更新全局权限
    setUserInfoList (info) {
      this.getUserInfo().then(res => {
        this.module_loading = false
        this.modal_module = false
        this.selectModuleList = []
        this.alreadyHaveMounted = []
        this.$Message.success(info)
      }).catch(err => {
        console.log(err)
      })
    },
    // 保存已有模块
    selectUp (e) {
      this.alreadyHaveMounted = e
    }
  },
  mounted () {
    // 初始化管理员列表
    if (this.showTable) {
      this.getList()
      // 预先得到所有权限
      this.getTlist()
    }
  },
  watch: {
    'showTable' (e) {
      this.showEditableTables = e
      if (e) {
        this.getList()
        // 预先得到所有权限
        this.getTlist()
      }
    }
  }
})
</script>
<style>
</style>
