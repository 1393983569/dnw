<template>
    <div style="display: inline-block">
      <Button type="primary" @click="modal = !modal">添加人员</Button>
      <Modal
        v-model="modal"
        title="添加人员基本信息"
        @on-ok="ok"
        @on-cancel="cancel">
        <div class="dataList">
          <div>
            <span>账号: </span><Input v-model="accountName" placeholder="" style="width: 300px" />
          </div>
          <div>
            <span>密码: </span><Input v-model="accountPass" placeholder="" style="width: 300px" />
          </div>
          <div>
            <span>姓名: </span><Input v-model="accountTitle" placeholder="" style="width: 300px" />
          </div>
             <div>
            <span>电话: </span><Input v-model="accountPhone" placeholder="" style="width: 300px" />
          </div>
          <div>
            <span>角色：</span>
            <Select v-model="roleId" style="width:200px">
              <Option v-for="(item, index) in jobList" :value="item.id" :key="item.index">{{ item.roleTitle }}</Option>
            </Select>
          </div>
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
          jobList: []
       }
      },
      methods: {
        ok(){
          if (this.accountName && this.accountPass && this.accountTitle && this.accountPhone && this.roleId) {
            let data = {}
            data.accountName = this.accountName
            data.accountPass = this.accountPass
            data.accountTitle = this.accountTitle
            data.accountPhone = this.accountPhone
            data.roleId = this.roleId
            data.accountJob = getObjName(this.jobList, this.roleId, 'id', 'roleTitle')
            this.$emit('clickOk', data)
            this.restoration()
          } else {
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
