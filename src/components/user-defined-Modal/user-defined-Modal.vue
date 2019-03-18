<template>
    <div>
      <Button @click="confirm">
        <slot></slot>
      </Button>
    </div>
</template>
<script>
    export default ({
        props: {
          promptContent: {
            type: String,
            default: ''
          }
        },
        methods: {
          confirm () {
            this.$Modal.confirm({
              title: '提示',
              content: `<p>${this.promptContent}</p>`,
              onOk: () => {
                this.$emit('handleOK', '')
              },
              onCancel: () => {

              }
            });
          },
        }
    })
</script>
<style>

</style>
