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
        remote
        class="college-select"
        placeholder="请输入学院名称"
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
        label="number"
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
        prop="school"
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
            placeholder="请输入 number"
          />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="temp.name"
            placeholder="请输入姓名"
            class="mentor-dialog-input"
          />
        </el-form-item>
        <el-form-item label="学院" prop="school">
          <el-select
            v-model="temp.school"
            class="mentor-dialog-select"
            filterable
            remote
            placeholder="请输入学院名称"
            :remote-method="handleDialogRemoteMethod"
            :loading="selectLoading"
          >
            <el-option
              v-for="item in dialogCollegeOptions"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
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
      collegeOptions: [],
      dialogCollegeOptions: [],
      rules: {
        name: [{ required: true, message: 'name is required', trigger: 'blur' }],
        school: [{ required: true, message: 'school is required', trigger: 'change' }]
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
    this.getList()
  },

  methods: {
    getList() {
      this.listLoading = true
      Promise.all(
        [
          getMentorList({
            school: this.collegeName,
            name: this.nameText,
            page: this.currentPage,
            pageSize: this.pageSize
          }),
          getCollegeList()
        ]
      )
        .then(([mentorRes, collegeRes]) => {
          const { totalCount, teachers } = mentorRes.data || {}

          this.totalCount = totalCount || 0
          this.tableData = teachers || []
          const newOptions = (collegeRes.data || []).map(collegeItem => {
            return {
              value: collegeItem,
              label: collegeItem
            }
          })
          this.dialogCollegeOptions = newOptions
          this.collegeOptions = newOptions
          this.listLoading = false
        })
    },

    createData() {
      this.$refs['dataForm'].validate((valid) => {
        console.log('dataForm', this.$refs['dataForm']);
        if (valid) {
          addMentorList(this.temp).then(() => {
            this.dialogFormVisible = false

            this.$message({
              message: 'Created Successfully',
              type: 'success'
            });

            this.getList()
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
              message: 'Updated Successfully',
              type: 'success'
            });

            this.getList()
          })
        }
      })
    },

    async handleRemoteMethod(query) {
      if (query !== '') {
        this.selectLoading = true;
        const res = await getCollegeList({
          name: query.trim()
        })

        const collegeListData = res.data || {}

        this.selectLoading = false;
        this.collegeOptions = collegeListData.map(item => ({
          label: item,
          value: item
        }));
      } else {
        this.collegeOptions = [];
      }
    },
    /** 弹窗的学院数据 */
    async handleDialogRemoteMethod(query) {
      if (query !== '') {
        this.dialogSelectLoading = true;
        const res = await getCollegeList({
          name: query.trim()
        })

        const collegeListData = res.data || {}

        this.dialogSelectLoading = false;
        this.dialogCollegeOptions = collegeListData.map(item => ({
          label: item,
          value: item
        }));
      } else {
        this.dialogCollegeOptions = [];
      }
    },

    handleFilter() {
      if (!this.nameText || !this.collegeName) {
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
        this.getList()
      })
    },

    handleCurrentChange(val) {
      this.currentPage = val
      this.$nextTick(() => {
        this.getList()
      })
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
