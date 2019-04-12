<template>
    <div style="display: inline-block">
      <Button type="primary" @click="modal = !modal">添加人员</Button>
      <Modal
        v-model="modal"
        :closable="false"
        :mask-closable="false"
        title="添加人员基本信息">
        <div class="dataList">
          <div>
            <span>账号：</span><Input v-model="accountName" placeholder="" style="width: 300px" />
          </div>
          <div>
            <span>密码：</span><Input v-model="accountPass" placeholder="" style="width: 300px" />
          </div>
          <div>
            <span>姓名：</span><Input v-model="accountTitle" placeholder="" style="width: 300px" />
          </div>
             <div>
            <span>电话：</span><Input v-model="accountPhone" placeholder="" style="width: 300px" />
          </div>
          <div>
            <span>状态：</span>
            <Select v-model="onlineState" style="width:200px">
              <Option value="1">线上</Option>
              <Option value="2">线下</Option>
            </Select>
          </div>
          <div>
            <span>角色：</span>
            <Select v-model="roleId" style="width:200px">
              <Option v-for="(item, index) in jobList" :value="item.id" :key="item.index">{{ item.roleTitle }}</Option>
            </Select>
          </div>
        </div>
        <div slot="footer">
          <Button type="default" @click="cancel">取消</Button>
          <Button type="primary" :loading="modal_loading" @click="ok">确定</Button>
        </div>
      </Modal>
    </div>
</template>
<script>
  import { getRoles } from '@/api/userManagement/message'
  import { getObjName } from '@/libs/util'
   export default({
      data() {
       return {
          modal: false,
          accountName: '',
          accountPass: '',
          accountTitle: '',
          accountPhone: '',
          roleId: '',
          jobList: [],
          onlineState: '',
          modal_loading: false
       }
      },
      methods: {
        ok(){
          this.modal_loading = true
          if (this.accountName && this.accountPass && this.accountTitle && this.accountPhone && this.roleId) {
            let data = {}
            data.accountName = this.accountName
            data.accountPass = this.accountPass
            data.accountTitle = this.accountTitle
            data.accountPhone = this.accountPhone
            data.onlineState = this.onlineState
            data.roleId = this.roleId
            this.modal_loading = false
            this.modal = false
            data.accountJob = getObjName(this.jobList, this.roleId, 'id', 'roleTitle')
            this.$emit('clickOk', data)
            this.restoration()
          } else {
            this.modal = true
            this.modal_loading = false
            this.$Message.error('请完善信息')
          }
        },
        cancel() {
          this.restoration()
        },
        restoration() {
          this.accountName = ''
          this.accountPass = ''
          this.accountTitle = ''
          this.accountPhone = ''
          this.roleId = ''
          this.modal_loading = false
          this.modal = false
          this.onlineState = ''
        }
      },
      components: {

      },
      mounted () {
        getRoles().then(res => {
          res.info.map(item => {
            this.jobList.push({
              roleTitle: item.roleTitle,
              id: item.id
            })
          })
        }).catch(err => {
          console.log(err)
        })
      }
   })
</script>
<style>
  .dataList div{
    margin-bottom: 10px;
  }
</style>
