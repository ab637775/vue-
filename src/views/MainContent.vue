<template>
  <el-container style="height:100%">
  <el-aside width="auto">
    <common-aside></common-aside>
  </el-aside>
  <el-container>
    <el-header>
      <common-header></common-header>
    </el-header>
    <common-tag></common-tag>
    <el-main>
      <!-- 利用keep-alive缓存组件，使得切换页面时也能计时 -->
      <keep-alive include="pageone">
            <router-view></router-view>
      </keep-alive>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import CommonAside from '@/components/CommonAside.vue'
import CommonHeader from '@/components/CommonHeader.vue'
import CommonTag from '@/components/CommonTag.vue'
import { mapMutations } from 'vuex'
export default {
  components: { CommonAside, CommonHeader, CommonTag },
  name: 'Main',
  methods: {
    ...mapMutations(['addMenu'])
  },
  mounted () {
    this.addMenu(this.$router)
  }
}
</script>

<style lang="less" scoped>
.el-header{
  background-color: black;
}
.el-main{
  padding-top: 0;
}
</style>
