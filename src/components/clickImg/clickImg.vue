<template>
    <div>
      <img v-for="(item, index) in rePic" @click="clickImg(item)" style="width: 70px; height: 70px; border-radius: 5px; border: 1px solid #adadad; margin-left: 5px;" :src="item"/>
      <Modal
        v-model="modal"
        title="备注1图片"
        @on-cancel="cancel">
        <img :src="imgUrl" style="width: 100%; height: 350px; list-style: none; padding: 0; margin: 5px 0"/>
      </Modal>
    </div>
</template>
<script>
export default ({
  data () {
    return {
      imgUrl: '',
      modal: false
    }
  },
  props: {
    rePic: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    clickImg (e) {
      this.modal = true
      this.imgUrl = e
    },
    cancel () {

    }
  }
})
</script>
<style>

</style>
