<template>
  <div class="graduation-list-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.student_name"
        placeholder="请输入姓名"
        class="filter-item"
      />
      <el-input
        v-model="listQuery.student_number"
        placeholder="请输入学号"
        class="filter-item"
      />
      <el-input
        v-model="listQuery.name"
        placeholder="请输入毕设名称"
        class="filter-item"
      />
      <el-select
        v-model="listQuery.school"
        filterable
        remote
        class="filter-item college-select"
        placeholder="请输入/选择学院名称"
        :remote-method="handleRemoteMethod"
        :loading="selectLoading"
      >
        <el-option
          v-for="item in collegeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        v-waves
        class="search-btn"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        搜索
      </el-button>
      <el-button
        class="add-btn"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        添加
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        label="毕设名称"
        align="center"
      />
      <el-table-column
        prop="name"
        label="姓名"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.student && row.student.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="student_number"
        label="学号"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.student && row.student.number }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="school"
        label="学院"
        align="center"
      />
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleEdit(row)">
            编辑
          </el-button>
          <el-popover
            :ref="`popover-${row.id}`"
            placement="top"
            width="160"
            trigger="click"
          >
            <p>确定删除该项吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="handlePopoverCancel(row)">取消</el-button>
              <el-button type="primary" size="mini" @click="handleConfirmDelete(row)">确定</el-button>
            </div>
            <el-button
              slot="reference"
              size="mini"
              type="danger"
              :style="{marginLeft: '10px'}"
            >
              删除
            </el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container" :class="totalCount <= 0 ? 'is-hidden' : ''">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        :page-size="pageSize"
        :current-page.sync="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import {
  getWorkList,
  delWorkList
} from '@/api/graduate'
import {
  getCollegeList
} from '@/api/college'

export default {
  directives: { waves },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      listLoading: false,
      selectLoading: false,
      listQuery: {
        school: "",
        name: "",
        student_number: "",
        student_name: ""
      },
      collegeOptions: [],
      tableData: []
    }
  },

  created() {
    this.getList()
    this.getCollege()
  },

  methods: {
    async getCollege() {
      const res = await getCollegeList()

      this.handleMapCollegeOptions(res.data || [], true)
    },

    async getList() {
      this.listLoading = true

      const { data } = await getWorkList({
        ...this.listQuery,
        page: this.currentPage,
        pageSize: this.pageSize
      })

      const { works, totalCount } = data || {}

      this.listLoading = false
      this.totalCount = totalCount

      this.tableData = works || []
    },

    async handleRemoteMethod(query) {
      if (query !== "") {
        this.selectLoading = true;
        const res = await getCollegeList({
          name: query.trim()
        })

        this.selectLoading = false;
        this.handleMapCollegeOptions(res.data || [], true)
      } else {
        this.collegeOptions = []
      }
    },

    handleFilter() {
      if (
        !this.listQuery.school || !this.listQuery.name ||
        !this.listQuery.student_number || !this.listQuery.student_name
      ) {
        this.$message({
          message: '请填写相应字段',
          type: 'error'
        });
        return
      }
      this.currentPage = 1
      this.getList()
    },

    handleCreate() {
      this.$router.push({
        path: '/graduation-management/create'
      })
    },

    handleEdit(row) {
      this.$router.push({
        path: `/graduation-management/edit/${row.id}`
      })
    },

    handlePopoverCancel(row) {
      this.$refs[`popover-${row.id}`].doClose()
    },

    async handleConfirmDelete(row) {
      const res = await delWorkList({
        id: row.id
      })

      if (res.code === 0) {
        this.$refs[`popover-${row.id}`].doClose()

        this.$message({
          message: "删除成功",
          type: 'success'
        })

        this.getList()
      }
    },

    handleMapCollegeOptions(data, isSearch) {
      this.collegeOptions = data.map(item => ({
        label: item,
        value: item
      }));
    },

    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },

    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    }
  }
}
</script>

<style lang="scss">
  .graduation-list-container {

    .filter-item, .search-btn, .add-btn {
      width: 200px;
      margin-left: 10px;
      margin-bottom: 20px;
    }

    .pagination-container {
      .el-pagination{
        margin-right: -10px;
      }

      &.is-hidden {
        .el-pagination{
          display: none;
        }
      }
    }

    .graduation-list-form {
      min-width: 400px;
      margin-left:50px;
    }

    .graduation-list-dialog {
      .el-dialog {
        width: 60%;
      }
    }

    .graduation-dialog-input {
      width: 75%;
    }

    .graduation-dialog-select {
      width: 75%;
    }
  }
</style>
<style lang="scss" scoped>
.graduation-list-container {
  padding: 20px;
}

.pagination-container {
  margin-top: 15px;
  text-align: right;
}
</style>
