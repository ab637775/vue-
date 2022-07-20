<template>
  <div class="manage">
<div v-if="isShow">
      <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible="isShow"
      >
      <common-form
      :formLabel="operateFormLabel"
      :form="operateForm"
      :inline="true"
      ref="form"
      ></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow=false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
      </el-dialog>
</div>
    <div class="manage-header">
       <el-button type="primary" @click="addUser">+ 新增</el-button>
      <div class="search-box">
         <common-form
            :formLabel="formLabel"
            :form="searchForm"
            :inline="true"
            ref="form"
            >
            <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
            </common-form>
      </div>
    </div>
        <common-table
        :tableData="tableData"
        :tableLabel="tableLabel"
        :config="config"
        @changePage="getList()"
        @edit="editRow"
        @del="deleteRow"
        ></common-table>
  </div>
</template>

<script>
import { editUserDate, addUserDate, getUser, delUser } from '@/request/api/index.js'
import CommonForm from '@/components/CommonForm.vue'
import CommonTable from '@/components/CommonTable.vue'
export default {
  name: 'User',
  data () {
    return {
      operateType: 'add',
      isShow: false,
      operateFormLabel: [
        {
          model: 'name',
          label: '姓名',
          type: 'input'
        },
        {
          model: 'age',
          label: '年龄',
          type: 'input'
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date'
        },
        {
          model: 'addr',
          label: '地址',
          type: 'input'
        }
      ],
      operateForm: {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      },
      formLabel: [{
        model: 'keyword',
        label: '',
        type: 'input'
      }],
      searchForm: {
        keyword: ''
      },
      tableData: [],
      tableLabel: [
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'age',
          label: '年龄'
        },
        {
          prop: 'sexLabel',
          label: '性别'
        },
        {
          prop: 'birth',
          label: '出生日期',
          width: 200
        },
        {
          prop: 'addr',
          label: '地址',
          width: 320
        }
      ],
      config: {
        page: 1,
        total: 30
      }
    }
  },
  components: {
    CommonForm,
    CommonTable
  },
  methods: {
    confirm () {
      if (this.operateType === 'edit') {
        editUserDate(this.operateForm).then(res => {
          console.log(res)
          this.isShow = false
          this.getList()
        })
      } else {
        addUserDate(this.operateForm).then(res => {
          console.log(res)
          this.isShow = false
          this.getList()
        })
      }
    },
    addUser () {
      this.isShow = true
      this.operateType = 'add'
      this.operateForm = {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      }
    },
    getList (name = '') {
      this.config.loading = true
      name ? (this.config.page = 1) : ''
      // if (name) {
      //   this.config.page = 1
      // }
      getUser({
        page: this.config.page,
        name
      }).then(({ data: res }) => {
        console.log('res', res)
        this.tableData = res.list.map(item => {
          item.sexLabel = item.sex === 0 ? '女' : '男'
          return item
        })
        this.config.total = res.count
        this.config.loading = false
        // console.log(this.tableData)
      })
    },
    editRow (row) {
      this.isShow = true
      this.operateType = 'edit'
      this.operateForm = row
    },
    deleteRow (row) {
      this.$confirm('此操作将永久删除该组件，是否继续？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const id = row.id
        console.log(row)
        // const currentTable = this.tableData
        // console.log('currentTable是 ' + currentTable)
        console.log('id是' + id)
        console.log(typeof id)
        console.log(this.tableData[0].id === id)
        delUser(id).then((res) => {
          console.log('删除后的list', res)
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.manage-header{
  display: flex;
  // height: 100px;
  justify-content: space-between;
  align-items: center;
  .search-box{
    height: 62px;
    padding-top: 10px;
  }
}
</style>
