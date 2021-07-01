<template>
  <div class="mentor-list-container">
    <div class="filter-container">
      <el-input
        v-model="nameText"
        placeholder="请输入姓名"
        style="width: 200px;"
        class="filter-item"
      />
      <el-select
        v-model="collegeName"
        filterable
        clearable
        remote
        class="college-select"
        placeholder="请输入/选择学院名称"
        :remote-method="handleRemoteMethod"
        :loading="selectLoading"
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
        prop="number"
        label="教师工号"
        align="center"
      />
      <el-table-column
        prop="name"
        label="姓名"
        align="center"
      />
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
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
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
      class="mentor-list-dialog"
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="dataForm"
        class="mentor-list-form"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
      >
        <el-form-item label="Number" prop="number">
          <el-input
            v-model="temp.number"
            class="mentor-dialog-input"
            placeholder="请输入教师工号"
          />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="temp.name"
            maxlength="32"
            placeholder="请输入姓名"
            class="mentor-dialog-input"
          />
        </el-form-item>
        <el-form-item label="学院" prop="school">
          <el-select
            v-model="temp.school"
            class="mentor-dialog-select"
            filterable
            clearable
            remote
            placeholder="请输入学院名称"
            :remote-method="handleDialogRemoteMethod"
            :loading="selectLoading"
          >
            <el-option
              v-for="item in dialogCollegeOptions.target"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleDialogCancel">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'? createData() : updateData()"
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
  getMentorList,
  getCollegeList,
  addMentorList,
  updateMentorList
} from '@/api/college'

export default {
  directives: { waves },
  data() {
    return {
      collegeName: '',
      collegeOptions: {
        origin: [],
        target: []
      },
      dialogCollegeOptions: {
        origin: [],
        target: []
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        school: [{ required: true, message: '请输入学院名称', trigger: 'change' }]
      },
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      nameText: '',
      school: '',
      tableData: [],
      listLoading: true,
      selectLoading: false,
      dialogSelectLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      temp: {
        number: "",
        name: "",
        school: ""
      },
      textMap: {
        update: 'Edit',
        create: 'Create'
      }
    }
  },

  created() {
    this.getCollege()
    this.getMentor()
  },

  methods: {
    async getCollege() {
      const res = await getCollegeList()
      const OptionsData = res.data || []

      this.handleMapDialogCollegeOptions(OptionsData)
      this.handleMapCollegeOptions(OptionsData)
    },

    async getMentor() {
      this.listLoading = true
      const queryList = {}

      if (this.collegeName) {
        queryList.school = this.collegeName
      }

      if (this.nameText) {
        queryList.name = this.nameText
      }

      const res = await getMentorList({
        ...queryList,
        page: this.currentPage,
        pageSize: this.pageSize
      })

      const { total_count, teachers } = res.data || {}

      this.totalCount = total_count || 0
      this.tableData = teachers || []
      this.listLoading = false
    },

    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addMentorList(this.temp).then(() => {
            this.dialogFormVisible = false

            this.$message({
              message: '创建成功',
              type: 'success'
            });

            this.getMentor()
          })
        }
      })
    },

    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateMentorList(this.temp).then(() => {
            this.dialogFormVisible = false

            this.$message({
              message: '更新成功',
              type: 'success'
            });

            this.getMentor()
          })
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

    /** 弹窗的学院数据 */
    async handleDialogRemoteMethod(query) {
      if (query !== "") {
        this.selectLoading = true;
        const res = await getCollegeList({
          name: query.trim()
        })

        this.selectLoading = false;
        this.handleMapDialogCollegeOptions(res.data || [], true)
      } else {
        this.dialogCollegeOptions.target = this.collegeOptions.origin.slice()
      }
    },

    handleMapDialogCollegeOptions(data, isSearch) {
      const newCollegeData = data.map(item => {
        return {
          label: item,
          value: item
        }
      });

      if (!isSearch) {
        this.dialogCollegeOptions.origin = newCollegeData
      }
      this.dialogCollegeOptions.target = newCollegeData
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

    handleFilter() {
      this.currentPage = 1
      this.getMentor()
    },

    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true

      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    handleSizeChange(val) {
      this.pageSize = val
      this.$nextTick(() => {
        this.getMentor()
      })
    },

    handleCurrentChange(val) {
      this.currentPage = val
      this.$nextTick(() => {
        this.getMentor()
      })
    },

    handleDialogCancel() {
      this.dialogFormVisible = false
    },

    resetTemp() {
      this.temp = {
        number: "",
        name: "",
        school: ""
      }
    }
  }
}
</script>

<style lang="scss">
  .mentor-list-container {

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

    .mentor-list-form {
      min-width: 400px;
      margin-left:50px;
    }

    .mentor-list-dialog {
      .el-dialog {
        width: 60%;
      }
    }

    .mentor-dialog-input {
      width: 75%;
    }

    .mentor-dialog-select {
      width: 75%;
    }
  }
</style>
<style lang="scss" scoped>
.mentor-list-container {
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
