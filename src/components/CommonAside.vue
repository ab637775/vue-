<template>
    <el-menu
    :default-active="this.$route.path"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
        <h3 class="menu-title">{{isCollapse ? '后台' :'通用后台管理系统'}}</h3>
            <el-menu-item
            v-for="item in noChilderen"
            :index="item.path === '/' ? '/home' : item.path" :key="item.path"
            @click="clickMenu(item)">
                <i :class="'el-icon-'+item.icon"></i>
                <span slot="title">{{item.label}}</span>
            </el-menu-item>
      <el-submenu v-for="item in hasChilderen" :index="item.path+''" :key="item.path">
            <template slot="title">
              <i :class="'el-icon-'+item.icon"></i>
              <span slot="title">{{item.label}}</span>
            </template>
            <el-menu-item-group v-for="(subItem) in item.children" :key=subItem.path>
                  <el-menu-item :index="subItem.path" @click="clickSubMenu(subItem)">
                      {{subItem.label}}
                  </el-menu-item>
            </el-menu-item-group>
      </el-submenu>
    </el-menu>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      // isCollapse: false,
      menu:
        [
          {
            path: '/',
            name: 'home',
            label: '首页',
            icon: 's-home',
            url: 'home/Home'
          },
          {
            path: '/mall',
            name: 'mall',
            label: '商品管理',
            icon: 'video-play',
            url: 'mall/Mall'
          },
          {
            path: '/user',
            name: 'user',
            label: '用户管理',
            icon: 'user',
            url: 'user/Uesr'
          },
          {
            label: '其他',
            icon: 'location',
            children: [{
              path: '/page1',
              name: 'page1',
              label: '页面1',
              icon: 'setting',
              url: 'other/PageOne'
            }, {
              path: '/page2',
              name: 'page2',
              label: '页面2',
              icon: 'setting',
              url: 'other/PageTwo'
            }]
          }
        ]
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    // 点击侧边栏的选项触发对应页面的跳转事件
    clickMenu (item) {
      this.$router.push({ path: item.path })
      // 同步跳转生成tab栏，与此侧边栏功能实现关系不大
      this.selectMenu(item)
    },
    clickSubMenu (subItem) {
      // console.log(subItem)
      this.$router.push({ path: subItem.path })
      this.selectMenu(subItem)
    },
    // 导入vuex中的selectMenu函数
    ...mapMutations(['selectMenu'])
  },
  computed: {
    // 对获取的数据进行处理，分割出无子菜单和有子菜单的两组数据
    noChilderen () {
      return this.asyncMenu.filter(value => !value.children)
    },
    hasChilderen () {
      return this.asyncMenu.filter(value => value.children)
    },
    isCollapse () {
      return this.$store.state.tab.isCollapse
    },
    asyncMenu () {
      return this.$store.state.tab.menu
      // 从vuex中获取数据
    }
  },
  mounted () {
    console.log(this.$route.path)
  }
}
</script>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu{
    height: 100%;
    border:none

  }
  .menu-title{
      color: #fff;
      text-align:center;
      line-height:48px;
    }
</style>
