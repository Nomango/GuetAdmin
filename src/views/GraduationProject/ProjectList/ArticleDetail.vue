<template>
  <div class="article-container">
    <el-form
      ref="postForm"
      :model="postForm"
      :rules="rules"
      class="form-container"
    >
      <el-form-item label="毕设名称:" prop="name" label-width="85px">
        <el-input
          v-model="postForm.name"
          maxlength="250"
          placeholder="请输入毕设名称"
          class="article-form-input"
        />
      </el-form-item>

      <el-form-item prop="brief" label-width="85px" label="简介:">
        <el-input
          v-model="postForm.brief"
          :rows="1"
          maxlength="250"
          type="textarea"
          class="article-form-textarea"
          autosize
          placeholder="请输入简介"
        />
      </el-form-item>

      <el-form-item label="学院:" prop="school" label-width="85px">
        <el-select
          v-model="postForm.school"
          filterable
          clearable
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

      <el-form-item label="专业:" prop="major" label-width="85px">
        <el-input
          v-model="postForm.major"
          maxlength="32"
          placeholder="请输入专业名称"
          class="article-form-input"
        />
      </el-form-item>

      <el-form-item label="学生姓名:" prop="student_name" label-width="85px">
        <el-input
          v-model="postForm.student_name"
          maxlength="32"
          placeholder="请输入学生姓名"
          class="article-form-input"
        />
      </el-form-item>

      <el-form-item label="学号:" label-width="85px">
        <el-input
          v-model="postForm.student_number"
          maxlength="32"
          placeholder="请输入学号"
          class="article-form-input"
        />
      </el-form-item>

      <el-form-item label="联系方式:" prop="connect" label-width="85px">
        <el-input
          v-model="postForm.connect"
          maxlength="32"
          placeholder="请输入联系方式"
          class="article-form-input"
        />
      </el-form-item>

      <el-form-item label="导师:" label-width="85px">
        <el-select
          v-model="postForm.teachers"
          multiple
          clearable
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

      <el-form-item label="评级:" prop="level" label-width="85px">
        <el-select
          v-model="postForm.level"
          clearable
          class="article-form-select"
          placeholder="请选择评级"
        >
          <el-option
            v-for="item in levelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label-width="85px" label="封面图:" prop="cover">
        <Upload
          v-model="postForm.cover"
          :action="action"
          :headers="headers"
          @onsuccess="handleSuccess"
        />
      </el-form-item>

      <el-form-item label-width="85px" label="内容:" prop="content">
        <Tinymce
          ref="editor"
          v-model="postForm.content"
          :height="400"
          width="90%"
          style="minWidth: 585px"
        >
          <div slot="extra" class="editor-custom-btn-container">
            <EditorImage
              color="#1890ff"
              class="editor-upload-btn"
              :action="action"
              :prefix="prefix.image"
              :headers="headers"
              @successCBK="imageSuccessCBK"
            />
            <EditorVideo @successCBK="videoSuccessCBK" />
          </div>
        </Tinymce>
      </el-form-item>

      <el-form-item label-width="85px" class="submit-form-item">
        <el-button
          v-loading="publishLoading"
          type="primary"
          @click="submitForm"
        >
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
import Upload from "@/components/Upload";
import EditorImage from "@/components/Upload/EditorImage";
import EditorVideo from "@/components/Upload/Video.vue";
import { getWorkListById, addWorkList, updateWorkList } from "@/api/graduate";
import { getCollegeList, getMentorList } from "@/api/college";
import { fetchPrefix } from "@/api/upload";
import { getToken } from "@/utils/auth";

const defaultForm = {
  name: "",
  school: "",
  major: "",
  level: "",
  student_name: "",
  student_number: "",
  connect: "",
  teachers: [],
  brief: "", // 简介
  cover: "",
  content: ""
};

export default {
  name: "ArticleDetail",
  components: {
    Tinymce,
    Upload,
    EditorImage,
    EditorVideo
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
      action: `${process.env.VUE_APP_BASE_API}/api/admin/upload/image`,
      headers: {
        "X-Token": getToken()
      },
      rules: {
        name: [{ required: true, message: "请输入毕设名称", trigger: "blur" }],
        school: [
          { required: true, message: "请输入/选择学院", trigger: "change" }
        ],
        major: [{ required: true, message: "请输入专业名称", trigger: "blur" }],
        student_name: [
          { required: true, message: "请输入姓名", trigger: "blur" }
        ],
        cover: [
          { required: true, message: "请上传毕设封面", trigger: "change" }
        ],
        brief: [{ required: true, message: "请输入简介", trigger: "blur" }],
        level: [{ required: true, message: "请选择等级", trigger: "change" }]
      },
      selectLoading: false,
      collegeOptions: {
        target: [],
        origin: []
      },
      teacherOptions: [],
      levelOptions: [
        {
          label: "无奖项",
          value: 0
        },
        {
          label: "一等奖",
          value: 1
        },
        {
          label: "二等奖",
          value: 2
        },
        {
          label: "三等奖",
          value: 3
        }
      ],
      prefix: {}
    };
  },

  created() {
    this.getList();
    this.getPrefix();

    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id;
      this.fetchData(id);
    }
  },

  methods: {
    async getPrefix() {
      const res = await fetchPrefix();
      this.prefix = res.data || {};
    },

    async getList() {
      const mentorRes = await getMentorList({
        page: 0,
        pageSize: 0
      });

      const res = await getCollegeList();

      if (res.code === 0) {
        this.handleMapCollegeOptions(res.data || []);
      }

      if (mentorRes.code === 0) {
        const { teachers } = mentorRes.data || {};

        this.teacherOptions = (teachers || []).map(item => {
          return {
            label: item.name,
            value: item.id
          };
        });
      }
    },

    handleMapCollegeOptions(data, isSearch) {
      const newCollegeData = data.map(item => ({
        label: item,
        value: item
      }));

      if (!isSearch) {
        this.collegeOptions.origin = newCollegeData;
      }
      this.collegeOptions.target = newCollegeData;
    },

    /** 获取毕设数据 */
    async fetchData(id) {
      const res = await getWorkListById({ id });
      const resData = res.data || {};

      this.postForm = Object.assign(
        {},
        {
          content: resData.content,
          cover: resData.cover,
          level: resData.level,
          name: resData.name,
          brief: resData.brief,
          school: resData.school,
          teachers: Array.isArray(resData.teachers) ? resData.teachers : [],
          student_name: resData.student && resData.student.name,
          student_number: resData.student && resData.student.number,
          major: resData.major,
          connect: resData.connect
        }
      );
    },

    handleListQuery() {
      const listquery = {
        ...this.postForm,
        student: {
          number: this.postForm.student_number,
          name: this.postForm.student_name
        }
      };

      if (this.isEdit) {
        listquery.id = Number(this.$route.params.id);
      }

      delete listquery.student_name;
      delete listquery.student_number;

      return listquery;
    },

    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          const actionWorkApi = this.isEdit ? updateWorkList : addWorkList;

          actionWorkApi(this.handleListQuery()).then(res => {
            if (res.code === 0) {
              this.publishLoading = true;
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.publishLoading = false;

              if (!this.isEdit) {
                this.$nextTick(() => {
                  this.$router.replace({
                    name: "GraduationManagement"
                  });
                });
              }
            }
          });
        }
      });
    },

    async handleRemoteMethod(query) {
      if (query !== "") {
        this.selectLoading = true;
        const res = await getCollegeList({
          name: query.trim()
        });

        this.selectLoading = false;
        this.handleMapCollegeOptions(res.data || [], true);
      } else {
        this.collegeOptions.target = this.collegeOptions.origin.slice();
      }
    },

    handleSelectBlur() {
      if (this.postForm.school.trim() !== "") {
        return;
      }

      this.collegeOptions.target = this.collegeOptions.origin.slice();
    },

    handleSuccess(res, file, fileList) {
      if (res && res.code === 0) {
        const { suffix } = res.data;
        this.postForm.cover = this.prefix.image + suffix;
      }
    },

    draftForm() {
      if (
        this.postForm.content.length === 0 ||
        this.postForm.title.length === 0
      ) {
        this.$message({
          message: "请填写必要的标题和内容",
          type: "warning"
        });
        return;
      }
      this.$message({
        message: "保存成功",
        type: "success",
        showClose: true,
        duration: 1000
      });
      this.postForm.status = "draft";
    },

    imageSuccessCBK(arr) {
      const editorEle = this.$refs.editor;

      if (editorEle) {
        arr.forEach(v =>
          window.tinymce
            .get(editorEle.tinymceId)
            .insertContent(
              `<img class="wscnph" style="max-width: 100%;" src="${v.url}" >`
            )
        );
      }
    },

    videoSuccessCBK(videoPath) {
      const editorEle = this.$refs.editor;

      if (editorEle) {
        window.tinymce
          .get(editorEle.tinymceId)
          .insertContent(
            `<video src="${videoPath}" controls="controls">复制链接播放视频：${videoPath}</video>`
          )
      }
    }
  }
};
</script>

<style lang="scss">
::v-deep .wscnph {
  max-width: 200px;
}
.article-container {
  .form-container {
    padding: 40px 45px 20px 50px;
  }

  .article-form-input,
  .article-form-select,
  .article-form-textarea {
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
    text-align: right;
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

.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  display: flex;
  align-items: center;

  .upload-container {
    margin-right: 10px;
  }
}
</style>
