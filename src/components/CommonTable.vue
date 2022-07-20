<template>
  <div class="common-table">
    <el-table :data= "tableData" height="650" stripe>
      <el-table-column
      show-overflow-tooltip
      v-for="item in tableLabel"
      :key="item.prop"
      :label="item.label"
      :width="item.width ? item.width : 125"
      >
      <template slot-scope="scope">
        <span style="margin-left:10px">{{scope.row[item.prop]}}</span>
      </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
      <el-pagination
        class="pager"
        layout="prev, pager, next"
        :total="configData.total"
        :current-page.sync="configData.page"
        @current-change="changePage"
        :page-size="20"
        >
      </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      configData: this.config
    }
  },
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object
  },
  methods: {
    handleEdit (row) {
      this.$emit('edit', row)
    },
    handleDelete (row) {
      this.$emit('del', row)
    },
    changePage (row) {
      this.$emit('changePage', row)
    }
  }
}
</script>

<style lang="less" scoped>
.common-table{
  position: relative;
  height: calc( 100% - 62px );
  background-color: #fff;
  .pager{
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
</style>
