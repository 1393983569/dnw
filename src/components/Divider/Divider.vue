<template>
    <div class="divider-box" ref="dividerBox">
      <div class="divider-box-left" ref="dividerLeft"></div>
      <div class="divider-box-text" ref="dividerText">
        <slot></slot>
      </div>
      <div class="divider-box-right" :style="{width: this.widthLeft }"></div>
    </div>
</template>
<script>
  import './Divider.less'
    export default ({
      data () {
        return {
          widthLeft: ''
        }
      },
      methods: {

      },
      computed: {

      },
      mounted(){
        this.$nextTick(() => {
          this.widthLeft = this.$refs.dividerBox.getBoundingClientRect().width - this.$refs.dividerLeft.getBoundingClientRect().width - this.$refs.dividerText.getBoundingClientRect().width - 10 + 'px'
        })
      }
    })
</script>
<style>

</style>
