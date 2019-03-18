<template>
  <div>
    <Button type="primary" @click='clickOn' :size='size'>
      <slot></slot>
    </Button>
    <Modal
      v-model="modal"
      title="添加角色"
      @on-ok="ok"
      @on-cancel="cancel">
      <Transfer
        :data="roleList"
        :target-keys="targetKeys"
        filterable
        :titles="['可添加', '已有']"
        @on-change="handleChange"></Transfer>
    </Modal>
  </div>
</template>
<script>
  export default ({
    data() {
      return {
        modal: false,
      }
    },
    props: {
      targetKeys: {
        type: Array,
        default: () => ([])
      },
      roleList: {
        type: Array,
        default: () => ([])
      },
      showTransfer: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: 'small'
      },
      type: {
        type: String,
        default: 'primary'
      }
    },
    methods: {
      handleChange (newTargetKeys, direction, moveKeys) {
        this.$emit('newTargetKeys', newTargetKeys)
      },
      ok () {
        this.$emit('clickSubmit')
      },
      cancel() {

      },
      clickOn() {
        this.modal = true
        this.$emit('clickOn')
      },
    },
    mounted() {

    },
    watch: {
      'showTransfer'(e) {
        this.modal = e
      }
    }
  })
</script>
<style>

</style>
