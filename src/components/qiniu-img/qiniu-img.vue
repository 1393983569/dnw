<!--图片空间-->
<template>
  <div style="display: inline-block">
    <div slot="footer">
      <div class="mt15">
        <div id="container" class="upload-container">
          <div class="upload-pickfiles" id="pickfiles">
            <Button type="success" :id="`pickfiles2${this._uid}`"  :size="size" :loading="uploading">
              <slot></slot>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {getKey} from '@/api/qiniu'
export default ({
  data () {
    return {
      uploading: false,
      uptokenKey: '',
      currentFileOldName: ''
    }
  },
  mounted: function () {
    getKey().then(res => {
      this.uptokenKey = res.info
      this.$nextTick(() => {
        this.qiniu()
      })
    }).catch(err => {
      console.log(err)
    })
  },
  props: {
    size: {
      type: String,
      default: 'small'
    }
  },
  methods: {
    // 七牛上传
    qiniu: function () {
      let self = this
      var uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4', // 上传模式,依次退化
        browse_button: 'pickfiles2' + this._uid, // 上传选择的点选按钮，**必需**
        // uptoken_url: 'uptoken.php', //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
        uptoken: self.uptokenKey,
        domain: 'http://qiniu.dnwapp.com/', // bucket 域名，下载资源时用到，**必需**
        container: 'container', // 上传区域DOM ID，默认是browser_button的父元素，
        max_file_size: '100mb', // 最大文件体积限制
        flash_swf_url: 'plupload/Moxie.swf', // 引入flash,相对路径
        max_retries: 3, // 上传失败最大重试次数
        dragdrop: true, // 开启可拖曳上传
        drop_element: 'container', // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
        chunk_size: '4mb', // 分块上传时，每片的体积
        auto_start: true, // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
        init: {
          'UploadProgress': function (up, file) {
            self.uploading = true
          },
          'FileUploaded': function (up, file, info) {
            var res = JSON.parse(info)
            var imgUrl = up.getOption('domain') + res.key
            self.$Message.success('上传成功')
            //              self.$emit('update:value', imgUrl)
            self.$emit('updateImg', imgUrl)
            self.uploading = false
          },
          'Error': function (up, err, errTip) {
            self.uploading = false
            self.$Message.error('上传失败，请联系管理员')
          },
          'Key': function (up, file) {
            self.currentFileOldName = file.name
            var index = file.name.lastIndexOf('.')
            var g = file.name.substr(index + 1)
            var key = new Date().getTime() + '.' + g
            return key
          }
        }
      })
    }
  }
})
</script>
<style>
  @import "./qiniu-img.css";
</style>
