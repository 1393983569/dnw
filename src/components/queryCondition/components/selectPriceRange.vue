<template>
  <!-- 价格区间 -->
  <div>
    <InputNumber :min="0" v-model="valueOrigin" @on-blur="getValueOrigin" ></InputNumber>
    -
    <InputNumber @on-blur="getValueOver" :min="0" v-model="valueOver"></InputNumber>
  </div>
</template>
<script>
  export default ({
    data() {
      return {
        valueOrigin: 0,
        valueOver: 0
      }
    },
    methods: {
      getValueOrigin() {
        this.$emit('sendValue', {
          beginPrice: this.valueOrigin * 100,
          endPrice: this.valueOver * 100
        })
//        if (this.valueOrigin && this.valueOver) {
//          this.$emit('sendValue', {
//            beginPrice: this.valueOrigin * 100,
//            endPrice: this.valueOver * 100
//          })
//        }
      },
      getValueOver() {
        this.$emit('sendValue', {
          beginPrice: this.valueOrigin * 100,
          endPrice: this.valueOver * 100
        })
//        if (this.valueOrigin && this.valueOver) {
//          this.$emit('sendValue', {
//            beginPrice: this.valueOrigin * 100,
//            endPrice: this.valueOver * 100
//          })
//        } else {
//          this.$Message.error('请填写完整价格区间')
//        }
      }
    },
    mounted: function () {

    }
  })
</script>
<style>

</style>
