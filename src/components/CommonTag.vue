<template>
  <div class="tag">
    <el-tag
    v-for="(item,index) in tags"
    size="small"
    :key="item.path"
    :closable="item.name !== 'home'"
    :effect="$route.path == item.path ? 'dark' :'plain'"
    @click="changeMenu(item)"
    @close="handleClose(item,index)"
    >
      {{item.label}}
    </el-tag>
    <!-- <div>
      {{tags}}
    </div> -->
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    })
  },
  methods: {
    changeMenu (item) {
      this.$router.push(item.path)
    },
    handleClose (item, index) {
      const lastIndex = this.tags.length - 1
      this.closeTag(item)
      if (item.path !== this.$route.path) {
        return
      }
      if (index === lastIndex) {
        this.$router.push({ path: this.tags[index - 1].path })
      } else {
        this.$router.push({ path: this.tags[index].path })
      }
    },
    ...mapMutations(['closeTag'])
  }
}
</script>

<style lang="less" scoped>
.tag{
  padding: 20px;
  .el-tag{
    margin-left: 15px;
    cursor: pointer;
  }
}
</style>
