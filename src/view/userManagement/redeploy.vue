<template>
    <div>
      <div style="margin-bottom: 20px">
        <d-ivider>标 题</d-ivider>
        <Input v-model="title" placeholder="Enter something..." style="width: 100%" />
      </div>
      <editor @complete="completeHtml" :editorContent="content"></editor>
    </div>
</template>
<script>
import editor from '_c/editor'
import DIvider from '_c/Divider'
import {addCase} from '@/api/userManagement/redeploy'
export default ({
  data () {
    return {
      title: '',
      content: ''
    }
  },
  components: {
    editor,
    DIvider
  },
  methods: {
    completeHtml (e) {
      addCase(this.title, e).then(res => {
        this.$Message.success(res.info)
        this.title = ''
        this.content = e
        // 清空
        setTimeout(() => {
          this.content = ''
        }, 500)
      }).catch(err => {
        this.$Message.error(err)
      })
    }
  }
})
</script>
<style>

</style>
