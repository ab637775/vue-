<template>
  <!-- <div>{{tableData}}</div> -->
  <div>
  <el-button type="danger" round style="margin-bottom: 20px;" @click="clearLearningData">清空学习记录</el-button>
  <el-table
    :data="recordTemp"
    style="width: 80%;margin-bottom: 20px;"
    class="table"
    :row-class-name="tableRowClassName"
    border
  >
 <el-table-column
 type="expand"
 >
          <template slot-scope="props">
            <!-- {{props.row.children}} -->
            <el-table
            :data="props.row.children"
            style="width: 100%;"
            border
            class="subTable"
            >
                <el-table-column
                  prop=""
                  label=""
                  sortable
                  width="48">
                </el-table-column>
                <el-table-column
                  prop="date"
                  label="具体时间"
                  sortable
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="username"
                  label="学习者"
                  sortable
                  width="180">
                </el-table-column>
                   <el-table-column
                    prop="count"
                    label="学习次数"
                    sortable
                   >
                  </el-table-column>
                  <el-table-column
                    prop="learningTime"
                    label="单次时长"
                    sortable
                    >
                    <template slot-scope="props">
                      {{props.row.learningTime[0]}}小时{{props.row.learningTime[1]}}分钟{{props.row.learningTime[2]}}秒
                    </template>
                  </el-table-column>

            </el-table>
        </template>
  </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="学习者"
        sortable
        width="180">
      </el-table-column>
          <el-table-column
        prop="totalCount"
        label="学习总次数/次数">
      </el-table-column>
      <el-table-column
        prop="totalTime"
        label="学习总时长/单次时长">
        <template slot-scope="props">
            {{props.row.totalTime[0]}}小时{{props.row.totalTime[1]}}分钟{{props.row.totalTime[2]}}秒
        </template>
      </el-table-column>
  </el-table>

  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  name: 'pagetwo',
  data () {
    return {
      recordTemp: [],
      username: '',
      cookieName: ''
    }
  },
  methods: {
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'green-row'
      } else if (rowIndex % 2 === 1) {
        return 'blue-row'
      }
      return ''
    },
    clearLearningData () {
      this.$confirm('此操作会清空该用户所有的学习记录，是否继续？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        Cookie.remove(`${this.cookieName}`)
        this.$message.success({
          message: '所有学习记录已经成功删除',
          duration: 1000
        })
        location.reload()
      })
    }
  },
  mounted () {
    this.username = JSON.parse(Cookie.get('username'))
    this.cookieName = `learningRecord${this.username}`
    if (!Cookie.get(`${this.cookieName}`)) {
      this.$message.error({
        message: '未发现学习记录，快点去学习！！！',
        duration: 500
      }
      )
    }
    this.recordTemp = JSON.parse(Cookie.get(`${this.cookieName}`))

    this.recordTemp.forEach(value => {
      value.totalCount = value.children.length
      value.username = this.username
      value.children.forEach(subValue => {
        subValue.date = value.date

        subValue.date = value.date + ' ' + subValue.currentTime
        subValue.username = value.username
        console.log(subValue.date)
      })
    })
    console.log('this.recordTemp', this.recordTemp)
    console.log(this.recordTemp.length)
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-table__expanded-cell{
  padding: 0!important;
}
// /deep/  .el-table__row{
//   background-color: lightblue;
// }
  /deep/ .el-table .green-row {
    background: #f0f9eb;
  }

  /deep/ .el-table .blue-row {

    background: #ebf9f7;
  }
</style>
