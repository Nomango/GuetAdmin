<template>
  <div class="college-list-container">
    <div class="filter-container">
      <el-select
        v-model="school"
        filterable
        clearable
        remote
        class="college-select"
        placeholder="请输入/选择学院名称"
        :remote-method="handleRemoteMethod"
        :loading="selectLoading"
        @blur="handleSelectBlur"
      >
        <el-option
          v-for="item in collegeOptions.target"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item search-btn"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        搜索
      </el-button>
      <el-button
        class="filter-item add-btn"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreateSchool"
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
        label="学院名称"
        align="center"
      />
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleAddMentor(row)">
            添加导师
          </el-button>
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
    <el-dialog
      class="school-list-dialog"
      title="添加学院"
      :visible.sync="schooldialogFormVisible"
    >
      <el-form
        ref="schoolForm"
        class="school-list-form"
        :rules="schoolRules"
        :model="schoolTemp"
        label-position="left"
        label-width="80px"
      >
        <el-form-item label="学院名称" prop="name">
          <el-input
            v-model="schoolTemp.name"
            maxlength="64"
            class="school-dialog-input"
            placeholder="请输入学院名称"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="schooldialogFormVisible = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="confirmCreateSchool"
        >
          确定
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      class="mentor-list-dialog"
      title="添加导师"
      :visible.sync="mentordialogFormVisible"
    >
      <el-form
        ref="mentorForm"
        class="mentor-list-form"
        :rules="mentorRules"
        :model="mentorTemp"
        label-position="left"
        label-width="70px"
      >
        <el-form-item label="教师工号">
          <el-input
            v-model="mentorTemp.number"
            class="mentor-dialog-input"
            placeholder="请输入教师工号"
          />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="mentorTemp.name"
            placeholder="请输入导师姓名"
            maxlength="32"
            class="mentor-dialog-input"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="mentordialogFormVisible = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="confirmCreateMentor"
        >
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive

import {
  getCollegeList,
  addCollegeList,
  addMentorList
} from '@/api/college'

export default {
  directives: { waves },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      listLoading: false,
      school: "",
      selectLoading: false,
      schooldialogFormVisible: false,
      mentordialogFormVisible: false,
      tableData: [],
      collegeOptions: {
        origin: [],
        target: []
      },
      schoolTemp: {
        name: ""
      },
      mentorTemp: {
        number: '',
        name: "",
        school: ''
      },
      schoolRules: {
        name: [{ required: true, message: '请输入学院名称', trigger: 'blur' }]
      },
      mentorRules: {
        name: [{ required: true, message: '请输入导师名称', trigger: 'blur' }]
      }
    }
  },

  created() {
    this.getList()
  },

  methods: {
    async getList() {
      this.listLoading = true

      const res = await getCollegeList({
        name: this.school
      })

      this.listLoading = false
      const collegeData = res.data || []
      this.handleMapCollegeOptions(res.data || [])
      this.tableData = collegeData.map(item => {
        return {
          name: item
        }
      })
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
        this.collegeOptions.target = this.collegeOptions.origin.slice()
      }
    },

    handleMapCollegeOptions(data, isSearch) {
      const newCollegeData = data.map(item => ({
        label: item,
        value: item
      }));

      if (!isSearch) {
        this.collegeOptions.origin = newCollegeData
      }
      this.collegeOptions.target = newCollegeData
    },

    handleCreateSchool() {
      this.schoolTemp = {
        name: ""
      }
      this.schooldialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.schoolForm.clearValidate()
      })
    },

    handleFilter() {
      this.currentPage = 1
      this.getList()
    },

    confirmCreateSchool() {
      this.$refs.schoolForm.validate((valid) => {
        if (valid) {
          addCollegeList(this.schoolTemp).then(res => {
            this.schooldialogFormVisible = false
            if (res.code === 0) {
              this.$message({
                message: "添加成功",
                type: "success"
              })

              this.getList()
            }
          })
        }
      })
    },

    confirmCreateMentor() {
      this.$refs.mentorForm.validate((valid) => {
        if (valid) {
          addMentorList(this.mentorTemp).then(res => {
            this.mentordialogFormVisible = false

            if (res.code === 0) {
              this.$message({
                message: "添加成功",
                type: "success"
              })

              this.getList()
            }
          })
        }
      })
    },

    handleAddMentor(row) {
      this.mentorTemp = {
        name: '',
        number: '',
        school: row.name || ''
      }
      this.mentordialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.mentorForm.clearValidate()
      })
    },

    handleSelectBlur() {
      if (this.school.trim() !== "") {
        return
      }

      this.collegeOptions.target = this.collegeOptions.origin.slice()
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
  .college-list-container {

    .college-select, .search-btn, .add-btn {
      margin-left: 10px;
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

    .college-list-form {
      min-width: 400px;
      margin-left:50px;
    }

    .school-dialog-input, .mentor-dialog-input {
      width: 75%;
    }

    .college-dialog-select {
      width: 75%;
    }
  }
</style>
<style lang="scss" scoped>
.college-list-container {
  padding: 20px;
}

.filter-container {
  padding-bottom: 20px;
}

.pagination-container {
  margin-top: 15px;
  text-align: right;
}
</style>
