<template>
  <el-form
  :model="form"
  status=icon
  :rules="rules"
  ref="form"
  label-width="100px"
  class="login-container"
  >
  <h3 class="login_title">系统登录</h3>
  <el-form-item
  label="用户名"
   label-width="80px"
   prop="usrname"
   class="usrname"
  >
  <el-input
  type="input"
  v-model="form.username"
  autocomplete="off"
  placeholder="请输入账号"
  ></el-input>
  </el-form-item>

  <el-form-item
  label="密码"
   label-width="80px"
   prop="password"
  >
  <el-input
  type="password"
  v-model="form.password"
  autocomplete="off"
  placeholder="请输入密码"
  ></el-input>
  </el-form-item>
  <el-form-item class="login_submit">
    <el-button type="primary" @click="login" class="login_submit" >登录</el-button>
  </el-form-item>
  </el-form>
</template>

<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
import { getMenu } from '@/request/api/index.js'
import { mapMutations } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      form: {

      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 3,
            message: '用户名长度不能小于3位',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['setToken', 'clearMenu', 'setMenu', 'addMenu', 'updateUsername', 'updateImgSrc']),
    login () {
      getMenu(this.form).then(({ data: res }) => {
        if (res.code === 20000) {
          console.log(res.data)
          this.clearMenu()
          this.setMenu(res.data.menu)
          this.setToken(res.data.token)
          // this.updateUsername(res.data.username)
          // this.updateImgSrc(res.data.imgSrc)
          this.addMenu(this.$router)
          Cookie.set('username', JSON.stringify(res.data.username), { expires: 7 })
          Cookie.set('imgSrc', JSON.stringify(res.data.imgSrc), { expires: 7 })
          if (!Cookie.get('lastLoginDate')) {
            const lastLoginDate = this.getDate()
            Cookie.set('lastLoginDate', JSON.stringify(lastLoginDate), { expires: 7 })
          }
          this.$router.push({ name: 'home' })
        } else {
          this.$message.warning(res.data.message)
        }
      })
    },
    setZero (time) {
      time = time >= 10 ? '' + time : '0' + time
      return time
    },
    getDate () {
      const dateTime = new Date()
      const year = dateTime.getFullYear()
      const month = dateTime.getMonth() + 1
      const day = dateTime.getDate()
      return `${year}-${month}-${day}`
    }
  }
}
</script>

<style lang="less" scoped>
.login-container{
  border-radius: 15px;
  background-clip: padding-box;
  margin: 100px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login_title{
  margin: 0 auto 40px auto;
  text-align:center;
  color:#505458;
}
.login_submit{
  margin: 10px auto 0 auto;
}
</style>
