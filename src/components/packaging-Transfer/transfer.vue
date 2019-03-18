<template>
    <div>

    </div>
</template>
<script>
export default ({
  data () {
    return {
      data: '',
      targetK: ''
    }
  },
  props: [
    'targetKeys', 'targetData'
  ],
  methods: {
    handleChange () {
      //          this.$emit('handleChange', )
    }
  },
  mounted: function () {
    this.data = this.targetKeys
    this.targetK = this.targetData
  }
})
</script>
<style>

</style>
