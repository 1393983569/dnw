<template>
  <div>
    <Row>
      <Col span="24">
        <quillEditor v-model="content"
                     ref="myQuillEditor"
                     :options="editorOption"
                     @blur="onEditorBlur($event)"
                     @focus="onEditorFocus($event)"
                     @ready="onEditorReady($event)"
                     @change="onEditorChange($event)">
        </quillEditor>
      </Col>
    </Row>
    <div style="margin-top: 10px">
      <Button v-if="cMod === 'add'" size="large" @click="send" type="success">发布</Button>
      <Button v-if="cMod === 'edit'" size="large" @click="edit" type="success">保存编辑</Button>
    </div>
    <Modal v-model="showQiniu" width="510" :transfer="false">
      <div style="text-align: center">
        <qiniu-img @updateImg="onImage">
          上传图片
        </qiniu-img>
      </div>
    </Modal>
  </div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import Quill from 'quill'
import QiniuImg from '_c/qiniu-img'

export default {
  components: {
    quillEditor,
    QiniuImg
  },
  props: {
    cMod: {
      type: String,
      default: 'add'
    },
    // 回显内容
    editorContent: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 562
    }
  },
  data () {
    return {
      editorOption: {
        modules: {
          toolbar: [
            [{ 'size': ['small', false, 'large'] }],
            ['bold', 'italic'],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'color': [] }, { 'background': [] }],
            ['link', 'image']
          ],
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          }
        }
      },
      // 图片上传
      showQiniu: false,
      content: '<div>4545456456456456456456456</div>',
      imgValue: ''
    }
  },
  methods: {
    onEditorBlur (quill) {
      // console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      // console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      // console.log('editor ready!', quill)
    },
    onEditorChange ({ quill, html, text }) {
      // console.log('editor change!', quill, html, text)
      this.content = html
      // console.log(this.content);
    },
    // 点击图片ICON触发事件
    imgHandler (state) {
      this.showQiniu = true
      this.range = this.$refs.myQuillEditor.quill.getSelection()
    },
    // 发布
    send: function () {
      this.$emit('complete', this.content)
    },
    edit: function () {
      this.$emit('edit', this.content)
    },
    onImage (url) {
      this.$refs.myQuillEditor.quill.insertEmbed(this.range.index, 'image', url)
      this.showQiniu = false
    }
  },
  mounted () {
    this.content = this.editorContent
    this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
    this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('video', this.videoHandler)
    // 设置编辑器高度
    this.editor.container.style.height = `${this.height}px`
    this.editor.container.firstChild.style.height = `${this.height}px`
    // console.log(this.$refs.myQuillEditor)
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    },
    inputValue (value) {
      this.content = value
    }
  },
  watch: {
    'editorContent': function (e) {
      this.content = e
    }
  }
}
</script>
<style>
  @import "./editor.css";
</style>
