<template>
    <div>
      <div style="margin-bottom: 10px">
        <Button @click="modal = !modal" type="primary">添加角色</Button>
        <Modal
          v-model="modal"
          title="添加角色"
          @on-ok="ok"
          @on-cancel="cancel">
          <div style="margin-bottom: 10px">
            <span>角色名称：</span> <Input v-model="roleTitle" placeholder="请输入角色名称" style="width: 300px" />
          </div>
          <div style="margin-bottom: 10px">
            <span>角色备注：</span> <Input v-model="roleMark" placeholder="请输入备注" style="width: 300px" />
          </div>
        </Modal>
      </div>
    </div>
</template>
<script>
    export default ({
      data() {
        return {
          modal: false,
          roleTitle: '',
          roleMark: ''
        }
      },
      methods: {
        ok () {
          let data = {}
          data.roleTitle = this.roleTitle
          data.roleMark = this.roleMark
          this.$emit('addClick', data)
        },
        cancel () {
          this.roleTitle = ''
          this.roleMark = ''
        }
      },
      mounted: function () {

      }
    })
</script>
<style>

</style>
