<template>
  <header>
    <div class="l-content">
      <el-button plain icon="el-icon-menu" size="mini" @click="handleMenu"></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: item.path }" class="bread" v-for="item in tags" :key="item.path" >{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="r-content">
        <el-dropdown trigger="click" size="mini">
            <span class="el-dropdown-link">
                  <!-- <img :src="userImg" alt="" class="user"> -->
                  <img :src="userImg" alt="" class="user">
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人用户</el-dropdown-item>
              <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
            </el-dropdown-menu>
      </el-dropdown>
    </div>

  </header>
</template>

<script>
import Cookie from 'js-cookie'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'CommonHeader',
  data () {
    return {
      userImg: require('@/assets/images/admin.png')
    }
  },
  methods: {
    ...mapMutations(['updateIsCollapse', 'clearToken', 'clearMenu']),
    handleMenu () {
      this.updateIsCollapse()
    },
    logOut () {
      this.clearToken()
      this.clearMenu()
      const lastLoginDate = this.getDate()
      Cookie.set('lastLoginDate', JSON.stringify(lastLoginDate), { expires: 7 })
      this.$router.push('/login')
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
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    }),
    username () {
      return JSON.parse(Cookie.get('username'))
    }
    // imgSrc () {
    //   const imgSrc = JSON.parse(Cookie.get('imgSrc'))
    //   return imgSrc
    // }
  },
  mounted () {
    if (this.username === 'admin') {
      this.userImg = require('@/assets/images/admin.png')
    } else {
      this.userImg = require('@/assets/images/user.png')
    }
  }
}
</script>

<style lang="less" scoped>
header{
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
.l-content{
  display: flex;
  justify-content: space-between;
  align-items: center;
.bread{
  margin:0 0 0 20px
}
}
.r-content{
  display: flex;
  align-items: center;
  .user{
    width: 40px;
    height: 40px;
    border-radius: 40px;
  }
}
}
// ::v-deep {
//   .el-breadcrumb__inner {
//         color:#fff;
//   }
// }
.el-breadcrumb{
.bread /deep/ .el-breadcrumb__inner{
    color:#fff;
}
}
</style>
