<template>
  <div class="article-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <el-form-item
        label="姓名:"
        prop="student_name"
        label-width="85px"
      >
        <el-input
          v-model="postForm.student_name"
          placeholder="请输入姓名"
          class="article-form-input"
        />
      </el-form-item>

      <el-form-item
        label="学号:"
        prop="student_number"
        label-width="85px"
      >
        <el-input
          v-model="postForm.student_number"
          placeholder="请输入姓名"
          class="article-form-input"
        />
      </el-form-item>

      <el-form-item
        label="导师:"
        prop="teachers"
        label-width="85px"
      >
        <el-select
          v-model="postForm.teachers"
          multiple
          collapse-tags
          placeholder="请选择导师"
          class="article-form-select"
        >
          <el-option
            v-for="item in teacherOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="学院:"
        prop="school"
        label-width="85px"
      >
        <el-select
          v-model="postForm.school"
          filterable
          remote
          class="article-form-select"
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
      </el-form-item>

      <el-form-item
        label="毕设名称:"
        prop="name"
        label-width="85px"
      >
        <el-input
          v-model="postForm.name"
          placeholder="请输入毕设名称"
          class="article-form-input"
        />
      </el-form-item>

      <el-form-item label-width="85px" label="简介:">
        <el-input
          v-model="postForm.brief"
          :rows="1"
          type="textarea"
          class="article-form-textarea"
          autosize
          placeholder="请输入简介"
        />
      </el-form-item>

      <el-form-item label-width="85px" label="毕设封面:" prop="cover">
        <Upload
          v-model="postForm.cover"
          action="/api/admin/upload"
          :file-list="fileList"
          :on-success="handleSuccess"
        />
      </el-form-item>

      <el-form-item label-width="85px" label="毕设内容:" prop="content">
        <Tinymce
          ref="editor"
          v-model="postForm.content"
          width="90%"
          :height="400"
          style="minWidth: 585px"
        />
      </el-form-item>

      <el-form-item label-width="85px" class="submit-form-item">
        <el-button v-loading="publishLoading" type="primary" @click="submitForm">
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload'
import { getWorkListById } from '@/api/graduate'
import { getCollegeList, getMentorList } from '@/api/college'

const defaultForm = {
  name: '',
  school: '',
  level: 1,
  student_name: '',
  student_number: '',
  teachers: [1, 2],
  brief: '', // 简介
  cover: '',
  content: ''
}

export default {
  name: 'ArticleDetail',
  components: {
    Tinymce,
    Upload
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      publishLoading: false,
      userListOptions: [],
      action: 'http://www.baidu.com',
      fileList: [{
        name: 'food.jpg', url: "http://image.biaobaiju.com/uploads/20191103/15/1572765897-YbgBztEKaf.jpg"
      }],
      rules: {
        name: [{ required: true, message: '请输入毕设名称', trigger: 'blur' }],
        school: [{ required: true, message: '请输入/选择学院', trigger: 'change' }],
        student_name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        student_number: [{ required: true, message: '请输入学号', trigger: 'blur' }],
        teachers: [{ required: true, message: '请选择导师', trigger: 'change' }],
        cover: [{ required: true, message: '请上传毕设封面', trigger: 'change' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      },
      selectLoading: false,
      collegeOptions: {
        target: [],
        origin: []
      },
      teacherOptions: []
    }
  },

  created() {
    this.getList()

    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }
  },

  methods: {
    async getList() {
      const mentorRes = await getMentorList({
        page: 0,
        pageSize: 0
      })
      const res = await getCollegeList()

      if (res.code === 0) {
        this.handleMapCollegeOptions(res.data || [])
      }

      if (mentorRes.code === 0) {
        const { teachers } = mentorRes.data || {}

        this.teachers = (teachers || []).map(item => {
          return {
            label: item.name,
            value: item.id
          }
        })
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

    /** 获取毕设数据 */
    async fetchData(id) {
      const res = await getWorkListById({ id })
      const resData = res.data || {}

      this.postForm = Object.assign({}, {
        content: resData.content,
        cover: resData.cover,
        name: resData.name,
        brief: resData.brief,
        school: resData.school,
        teachers: Array.isArray(resData.teachers) && resData.teachers.map(item => {
          const teacherItem = this.teachers.find(tItem => tItem.value === item)
          if (teacherItem) {
            return {
              ...teacherItem
            }
          }
        }),
        student_name: resData.student && resData.student.name,
        student_number: resData.student && resData.student.number
      })
    },

    submitForm() {
      console.log(this.postForm);
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.publishLoading = true
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          this.publishLoading = false

          this.$nextTick(() => {
            this.$router.replace({
              name: "GraduationManagement"
            })
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

    handleSelectBlur() {
      if (this.postForm.school.trim() !== "") {
        return
      }

      this.collegeOptions.target = this.collegeOptions.origin.slice()
    },

    handleSuccess(file, fileList) {
      this.fileList.splice(0, 1, file)
    },

    draftForm() {
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      this.postForm.status = 'draft'
    }
  }
}
</script>

<style lang="scss">
  .article-container {
    .form-container {
      padding: 40px 45px 20px 50px;
    }

    .article-form-input, .article-form-select, .article-form-textarea {
      width: 50%;
    }

    .article-form-textarea textarea {
      padding-right: 40px;
      resize: none;
      border: none;
      border-radius: 0px;
      border-bottom: 1px solid #bfcbd9;
    }

    .submit-form-item {
      width: 91%;
      min-width: 671px;
      margin-top: 20px;
      text-align: right
    }
  }
</style>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.article-container {
  position: relative;
  height: 100%;
  overflow: auto;

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}
</style>
