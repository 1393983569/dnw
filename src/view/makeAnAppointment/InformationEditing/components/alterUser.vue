<template>
    <div>
      <Button type="primary" @click="modal = !modal">添加人员</Button>
      <Modal
          v-model="modal"
          title="添加人员基本信息"
          @on-ok="ok"
          @on-cancel="cancel">
          <div class="dataList">
            <div>
              <span>用户名: </span><Input v-model="accountName" placeholder="" style="width: 300px" />
            </div>
            <div>
              <span>密码: </span><Input v-model="accountPass" placeholder="" style="width: 300px" />
            </div>
            <div>
              <span>名称: </span><Input v-model="accountTitle" placeholder="" style="width: 300px" />
            </div>
               <div>
              <span>电话: </span><Input v-model="accountPhone" placeholder="" style="width: 300px" />
            </div>
               <div>
              <span>职务: </span><Input v-model="accountJob" placeholder="" style="width: 300px" />
            </div>
          </div>
      </Modal>
    </div>
</template>
<script>
     export default({
     data() {
       return {
        modal: false,
        accountName: '',
        accountPass: '',
        accountTitle: '',
        accountPhone: '',
        accountJob: ''
       }
      },
      methods: {
        ok(){
          if (this.accountName && this.accountPass && this.accountTitle && this.accountPhone && this.accountJob) {
            let data = {}
            data.accountName = this.accountName
            data.accountPass = this.accountPass
            data.accountTitle = this.accountTitle
            data.accountPhone = this.accountPhone
            data.accountJob = this.accountJob
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
          this.accountJob = ''
        }
      },
      components: {
      }
   })
</script>
<style>
  .dataList div{
    margin-bottom: 10px;
  }
</style>
