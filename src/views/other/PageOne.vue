<template>

  <el-card>
    <div class="time-container">
      <div class="title">学习计时器</div>
      <div class="time-box">
          <span class="currentTime">当前时间是{{currentTime}}</span>
        <ul class="timeList">
          <li>{{HoursStr}}</li>
          <li>:</li>
          <li>{{MinsStr}}</li>
          <li>:</li>
          <li>{{SecsStr}}</li>
        </ul>
      <el-card class="print-container">
        <!-- {{this.recordVuex}} -->
        <!-- {{this.depot}} -->
        <div v-for="item in this.cookie" :key="item.date">
            <p class="dateTitle">日期：{{item.date}}</p>
            <p v-for="subItem in item.children" :key="subItem.count">
            第{{subItem.count}}次学习记录     学习时间为{{subItem.learningTime[0]}}小时{{subItem.learningTime[1]}}分钟{{subItem.learningTime[2]}}秒
            </p>
        </div>
      </el-card>
        <div class="btn-container">
        <el-button type="primary" class="start-btn" @click="startLearning">开始学习</el-button>
        <el-button class="stop-btn" @click="stopLearning">暂停</el-button>
        <el-button type="warning" class="reset-btn" @click="resetLearning"  v-no-more-click>重置时间</el-button>
        <el-button type="success" class="save-btn" @click="saveLearning" v-no-more-click>保存今日学习时间</el-button>
        <el-button type="info" class="print-btn" @click="printLearning">打印学习时间</el-button>
        </div>
      </div>
    </div>
    </el-card>

</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Cookie from 'js-cookie'
export default {
  name: 'pageone',
  data () {
    return {
      HoursStr: '00',
      MinsStr: '00',
      SecsStr: '00',
      year: '',
      month: '',
      day: '',
      hours: '',
      mins: '',
      secs: '',
      week: '',
      currentTime: '',
      // temp用来暂存当前次数的学习时间
      temp: [],
      // depot用来存储今天学习的所有数据
      depot: [],
      // 从cookie中读取的数据
      cookie: [],
      timer1: '',
      timer2: '',
      // 学习次数
      count: 1,
      isbtn: false,
      id: 1,
      subId: 1,
      // 判断有无learningRecord的cookie
      isCookie: false,
      // 判断是否暂停
      isStop: false
    }
  },
  computed: {
    ...mapState({
      tempVuex: state => state.page1.temp,
      // 测试能否从Cookie中取出record的数据
      recordVuex: state => state.page1.record
    })
  },
  methods: {
    ...mapMutations(['updateTemp', 'setRecord', 'getRecord']),
    getNowTime () {
      const allWeek = [
        '星期天',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六'
      ]
      const dateTime = new Date()
      this.hours = this.setZero(dateTime.getHours())
      this.mins = this.setZero(dateTime.getMinutes())
      this.secs = this.setZero(dateTime.getSeconds())
      this.year = dateTime.getFullYear()
      this.month = dateTime.getMonth() + 1
      this.day = dateTime.getDate()
      this.week = allWeek[dateTime.getDay()]
      // this.currentTime = hours + ':' + mins + ':' + secs
      this.currentTime = `${this.year}年${this.month}月${this.day}日 ${this.hours}:${this.mins}:${this.secs}`
    },
    setZero (time) {
      time = time >= 10 ? '' + time : '0' + time
      return time
    },
    startLearning () {
      let learningSecs = 0
      let learningMins = 0
      let learningHours = 0
      // 判断temp中是否有存储的时间，若有就重新赋值给计时时间参数
      if (this.temp.length !== 0) {
        learningSecs = Number(this.temp[2])
        learningMins = Number(this.temp[1])
        learningHours = Number(this.temp[0])
      }
      this.timer2 = setInterval(() => {
        learningSecs++
        if (learningSecs > 59) {
          learningSecs -= 60
          if (learningMins > 59) {
            learningMins -= 60
            learningHours++
          }
          learningMins++
        }
        this.SecsStr = this.setZero(learningSecs)
        this.MinsStr = this.setZero(learningMins)
        this.HoursStr = this.setZero(learningHours)
        console.log(this.temp)
      }, 1000)
      console.log(this.SecsStr)
    },
    stopLearning () {
      // 使用temp数组存储暂停时的时间
      this.temp[0] = this.HoursStr
      this.temp[1] = this.MinsStr
      this.temp[2] = this.SecsStr
      console.log(this.temp)
      console.log(this.temp[0] + ':' + this.temp[1] + ':' + this.temp[2])
      this.updateTemp(this.temp)
      console.log('这是tempVuex', this.tempVuex)
      this.isStop = true
      clearInterval(this.timer2)
    },
    resetLearning () {
      // 学习时间小于0就弹出错误警告
      if (this.HoursStr === '00' && this.MinsStr === '00' && this.SecsStr === '00') {
        this.$message.error({
          message: '当前学习时间为零，不得重置',
          duration: 500
        })
        return
      } else {
        this.$confirm('此操作将重置当前学习时间, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.SecsStr = '00'
          this.MinsStr = '00'
          this.HoursStr = '00'
          this.temp = []
          clearInterval(this.timer2)
          this.$message({
            type: 'success',
            message: '重置成功!'
          })
        })
      }
    },
    saveLearning () {
      // 未暂停就保存会弹出错误警告
      if (!this.isStop) {
        this.$message.error({
          message: '未暂停计时，保存失败',
          duration: 2000
        })
        return
      }

      // 学习时间小于1分钟就弹出错误警告
      // if (this.HoursStr === '00' && this.MinsStr === '00') {
      //   this.$message.error({
      //     message: '当前学习时间小于1分钟，保存失败',
      //     duration: 500
      //   })
      //   return
      // }
      const saveDate = `${this.year}年${this.month}月${this.day}日`
      const tempTime = this.tempVuex
      const saveCurrentTime = `${this.hours}:${this.mins}:${this.secs}`
      const saveRecord = {
        id: Number(this.id + '' + this.subId),
        count: this.count,
        learningTime: tempTime,
        currentTime: saveCurrentTime
      }
      const tempDepot = {
        id: this.id,
        date: saveDate,
        totalTime: null,
        children: []
      }
      if (this.depot.length === 0) {
        this.depot.push(tempDepot)
      }
      const lastIndex = this.depot.length - 1
      let childLen = 0
      const learningTimeArr = []
      if (this.depot.every(val => { return val.date === saveDate })) {
        this.depot[lastIndex].children.push(saveRecord)
        childLen = this.depot[lastIndex].children.length
        console.log('childLen', childLen)
        // console.log('修改id前的this.depot', this.depot)
        console.log('id是', this.depot[lastIndex].children[childLen - 1].id)
        this.depot[lastIndex].children.forEach(value => {
          learningTimeArr.push(value.learningTime)
        })
        this.depot[lastIndex].totalTime = this.calTotalTime(learningTimeArr)
        console.log('这是totalTime', this.depot[lastIndex].totalTime)
        this.subId++
        this.count++
      }

      // 如果当前记录的日期和cookie里预存的是同一天那就只往children里添加新的学习记录，否则就新增一个对象，记录新的一天的学习

      // console.log(tempDepot)

      console.log('这是depot', this.depot)

      this.setRecord(this.depot)
      const username = JSON.parse(Cookie.get('username'))
      const cookieName = `learningRecord${username}`
      console.log(cookieName)
      if (!Cookie.get(`${cookieName}`)) {
        this.isCookie = false
        Cookie.set(`${cookieName}`, JSON.stringify(this.depot), { expires: 7 })
        console.log('没有这个数据')
        const learningRecord = JSON.parse(Cookie.get(`${cookieName}`))
        console.log('所以新设定数据为', learningRecord)
      } else {
        this.isCookie = true
        const learningRecord = JSON.parse(Cookie.get(`${cookieName}`))
        const cookieLastIndex = learningRecord.length - 1
        console.log('这是cookieLastIndex', cookieLastIndex)
        const cookieChildLen = learningRecord[cookieLastIndex].children.length
        console.log('这是cookieChildLen', cookieChildLen)
        // console.log('learningRecord修改前', learningRecord)
        // 是同一天的情况
        if (learningRecord.some(val => { return val.date === saveDate })) {
          const saveTotalTime = this.depot[lastIndex].totalTime
          const recalTotalTime = []
          const saveTemp = {
            // id: Number(learningRecord[lastIndex].children[cookieChildLen - 1].id) + 1,
            id: this.limitID(learningRecord[cookieLastIndex].children[cookieChildLen - 1].id),
            count: learningRecord[cookieLastIndex].children.length + 1,
            learningTime: tempTime,
            currentTime: saveCurrentTime
          }
          // if (!learningRecord[cookieLastIndex].totalTime) {
          //   learningRecord[cookieLastIndex].totalTime = saveTotalTime
          // } else {
          learningRecord[cookieLastIndex].children.forEach(value => {
            recalTotalTime.push(value.learningTime)
          })
          recalTotalTime.push(tempTime)
          console.log('这是recalTotalTime', recalTotalTime)
          learningRecord[cookieLastIndex].totalTime = this.calTotalTime(recalTotalTime)
          // }

          learningRecord[cookieLastIndex].children.push(saveTemp)
          console.log('有这个数据且被修改了', learningRecord)
          Cookie.set(`${cookieName}`, JSON.stringify(learningRecord), { expires: 7 })
          this.cookie = learningRecord
        } else {
          // 不是同一天的情况
          learningRecord.push(...this.depot)
          const cookieNextDateLastIndex = learningRecord.length - 1
          learningRecord[cookieNextDateLastIndex].id += 1
          learningRecord[cookieNextDateLastIndex].children[0].id = Number(learningRecord[cookieNextDateLastIndex].id + '' + 1)
          console.log(learningRecord[cookieNextDateLastIndex])
          // learningRecord[cookieNextDateLastIndex].children[0].currentTime = saveCurrentTime
          Cookie.set(`${cookieName}`, JSON.stringify(learningRecord), { expires: 7 })
          const result = JSON.parse(Cookie.get(`${cookieName}`))
          console.log('日期变动了，所以新设定数据为', result)
        }
        // console.log('有这个数据且被修改了', learningRecord)
        // Cookie.set('learningRecord', JSON.stringify(learningRecord))
      }
      // console.log('这是recordVuex', this.recordVuex)
      this.SecsStr = '00'
      this.MinsStr = '00'
      this.HoursStr = '00'
      this.temp = []
      clearInterval(this.timer2)
      this.$message({
        type: 'success',
        message: `学习时间保存成功!今天您已学习${this.isCookie === true ? this.cookie[this.cookie.length - 1].children.length : 1}次，请继续努力！`,
        duration: 1000
      })
    },
    printLearning () {
      // if (this.HoursStr === '00' && this.MinsStr === '00') {
      //   this.$message({
      //     message: '学习时间未满1分钟，不得打印！',
      //     type: 'warning'
      //   })
      // }
      const printContainer = document.querySelector('.print-container')
      this.isbtn = !this.isbtn
      if (this.isbtn) {
        printContainer.style = 'display:block'
        // this.getRecord()
        // console.log('这是recordVuex', this.recordVuex)
      } else {
        printContainer.style = 'display:none'
      }
    },
    limitID (id) {
      // 传入数字id转化为字符串再进行处理，使得主id不变，副id加一
      // 最后输出副id加一的子数组的id值
      // 如传入12 输出 13 ， 传入 19 输出 120 ，传入29 输出 210
      // 确保children子数组存储ID数量在十个以上时不会出错
      id = id + ''
      const str = id.slice(1)
      const tempNum = Number(str) + 1
      const result = Number(id[0] + tempNum)
      return result
    },
    calTotalTime (arr) {
    // return Number(arr[1])
      let totalTime = 0
      let resultArr = []
      arr.forEach(value => {
        totalTime += parseInt(value[0]) * 3600 + parseInt(value[1]) * 60 + parseInt(value[2])
      })
      const totalHours = this.setZero(parseInt(totalTime / 3600))
      const totalMins = this.setZero(parseInt(totalTime % 3600 / 60))
      const totalSecs = this.setZero(parseInt(totalTime % 3600 % 60))
      resultArr = [totalHours, totalMins, totalSecs]
      return resultArr
    }
  },
  mounted () {
    this.getNowTime()
    console.log(this.temp)
    clearInterval(this.timer1)
    this.timer1 = setInterval(this.getNowTime, 1000)
    const username = JSON.parse(Cookie.get('username'))
    const cookieName = `learningRecord${username}`
    if (Cookie.get(`${cookieName}`)) {
      this.isCookie = true
      const learningRecord = JSON.parse(Cookie.get(`${cookieName}`))
      this.cookie = learningRecord
      console.log('有这个数据且未被修改', learningRecord)
    } else {
      this.isCookie = false
      this.cookie = this.depot
      console.log('没发现learningRecord')
      // return
    }
    console.log('this.cookie', this.cookie)
  }
}
</script>

<style lang="less" scoped>
  *{
    padding: 0;
    margin: 0;
  }
  ul{
    list-style: none;
  }
  .title{
    width: 100%;
    font-size: 50px;
    text-align: center;
    margin-bottom: 30px
  }
  .time-container{
  position: relative;
 .time-box{
    width: 100%;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .currentTime{
      position: absolute;
      top: 0px;
      right: 20px;
      font-size: 20px;
    }
  .timeList{
    display: flex;
    justify-content: center;
    width: 600px;
    height: 100px;
    padding:20px;
    background-color: #409EFF;
    li{
      color: #fff;
      display: inline-block;
      font-size: 80px;
    }
  }
  .print-container{
    display:none;
    width: 60%;
    height: 300px;
    p{
      margin-bottom: 10px;
    }
    .dateTitle{
      font-weight: 700;
    }
  }
  .btn-container{
    display: flex;
    width: 800px;
    justify-content: space-between;
    button{
      font-size: 17px;
    }
    .start-btn,.stop-btn,.reset-btn{
      width: 100px;
      height: 40px;

    }
    .save-btn,.print-btn{
      width: 150px;
      height: 40px;
    }
  }
  }

  }
</style>
