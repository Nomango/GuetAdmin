<template>
  <div class="college-list-container">
    <div class="filter-container">
      <el-input v-model="searchText" placeholder="请输入学院名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Add
      </el-button>
    </div>
    <!--
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    />
    -->
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive

export default {
  directives: { waves },
  data() {
    return {
      page: 1,
      limit: 10,
      searchText: '',
      list: null,
      listLoading: true
    }
  },
  created() {
  },
  methods: {
    handleFilter() {
      console.log('a');
    },

    handleCreate() {
      console.log('b');
    }
  }
}
</script>

<style lang="scss">
.college-list-container {
  padding: 20px;
}
.filter-container {
  padding-bottom: 10px;
}
</style>
