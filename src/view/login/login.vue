  <style lang="less">
    @import './login.less';
  </style>
  <template>
    <div class="login" @keydown.enter="handleLogin">
      <div class="login-con">
        <Card icon="log-in" title="欢迎登录" :bordered="false">
          <div class="form-con">
            <login-form ref="loginFormForm" @on-success-valid="handleSubmit"></login-form>
            <p class="login-tip">请输入户名和密码</p>
          </div>
        </Card>
      </div>
    </div>
  </template>
<script>
import loginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    loginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        this.getUserInfo().then(res => {
          this.$Message.success(res.accountInfo + '欢迎登陆')
          this.$refs.loginFormForm.cancelLogin()
          this.$router.push({
            name: 'home'
          })
        })
      }).catch(err => {
        this.$Message.error(err)
        this.$refs.loginFormForm.cancelLogin()
      })
    }
  },
  mounted () {
    this.$Notice.destroy()
  }
}
</script>

  <style>

  </style>
