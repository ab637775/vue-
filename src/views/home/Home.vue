<template>
<el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top:20px">
      <el-card shadow="hover">
         <div class="user">
          <!-- <img :src="require(imgSrc)" class="userImg"> -->
          <img :src="userImg" class="userImg">
          <div class="userInfo">
            <p class="name">{{username}}</p>
            <span class="access" v-if="username === 'admin'">超级管理员</span>
            <span class="access" v-else>普通用户</span>

          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间:<span>{{showLastDate}}</span></p>
          <p>上次登录地点:<span>浙江</span></p>
        </div>
      </el-card>
    <el-card style="margin-top:20px;height:460px;">
      <el-table :data="tableData">
        <el-table-column
        v-for="(item,index) in tableLabel"
        :key=index
        :prop="index"
        :label="item">
        </el-table-column>
      </el-table>
    </el-card>
</el-col>
<el-col :span="16" style="margin-top:20px;">
<div class="order">
  <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:0}" >
    <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
    <div class="detail">
      <p>¥{{item.value}}</p>
      <p>{{item.name}}</p>
    </div>
  </el-card>
</div>
<el-card style="height:280px">
  <Echart chartType = "line"></Echart>
</el-card>
  <div class="graph">
    <el-card style="height:260px">
        <Echart chartType = "bar"></Echart>
    </el-card>
    <el-card style="height:260px">
        <Echart chartType = "pie"></Echart>
    </el-card>
  </div>

</el-col>
</el-row>
</template>

<script>
// import { getTableData } from '@/request/api/index.js'
import Cookie from 'js-cookie'
import Echart from '@/components/Echart.vue'
import { getData } from '@/request/api/index.js'
export default {
  name: 'home',
  components: {
    Echart
  },
  data () {
    return {
      userImg: require('@/assets/images/admin.png'),
      tableData: [
        {
          name: 'oppo',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: 'vivo',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '苹果',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '小米',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '三星',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '魅族',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        }
      ],
      tableLabel: {
        name: '品牌',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      countData: [
        {
          name: '今日支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '今日收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '今日未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        },
        {
          name: '本月支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '本月收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '本月未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        }

      ]
    }
  },
  mounted () {
    getData().then(res => {
      const { code, data } = res.data
      if (code === 20000) {
        // tableData用mock的后端传来的数据来覆盖
        this.tableData = data.tableData
      }
    })
    if (this.username === 'admin') {
      this.userImg = require('@/assets/images/admin.png')
    } else {
      this.userImg = require('@/assets/images/user.png')
    }
    console.log('username', this.username)
    console.log('userImg是', this.userImg)
    // console.log('imgSrc是', this.imgSrc)
    // console.log(typeof this.imgSrc)
    // console.log('userImg和imgSrc相等吗', this.userImg === this.imgSrc)
  },
  computed: {
    showLastDate () {
      return JSON.parse(Cookie.get('lastLoginDate'))
    },
    username () {
      return JSON.parse(Cookie.get('username'))
    },
    imgSrc () {
      const imgSrc = JSON.parse(Cookie.get('imgSrc'))
      return imgSrc
    }
  }
}
</script>

<style lang="less" scoped>

.user{
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid#ccc;
  margin-bottom: 30px;
  .userInfo{
    margin-left: 40px;
   .name{
      font-size: 28px;
      margin-bottom:10px
    }
    .access{
      color: #aaa;
    }
  }
.userImg{
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
}
.login-info{
  font-size: 14px;
  p{
    color: #aaa;
    margin-bottom: 5px;
    span{
      color: #666;
      margin-left: 80px;
      margin-bottom: 5px;
    }
  }
}
.order{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
   .el-card {
        width: 32%;
        margin-bottom: 20px;
      }
  .icon{
    display: flex;
    justify-content: center;
    font-size: 30px;
    align-items: center;
    color: #fff;
    width: 90px;
    height: 90px;
  }
  .detail {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    }
  p:nth-child(1){
    font-size: 25px;
    margin-bottom: 10px;
  }
  p:nth-child(2){
    font-size: 14px;
    text-align: center;
    color: #999;
  }
}
  .graph {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      .el-card {
        width: 48%;
      }
    }
</style>
