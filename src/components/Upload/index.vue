<template>
  <div class="upload-wrapper">
    <ul
      v-if="fileList.length"
      class="el-upload-list el-upload-list--picture-card"
    >
      <li
        v-for="(file, index) in fileList"
        :key="index"
        class="el-upload-list__item is-ready"
      >
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in" />
          </span>
          <span class="el-upload-list__item-reupload" @click="handleReload()">
            <i class="el-icon-refresh-right" />
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete" />
          </span>
        </span>
      </li>
    </ul>
    <el-upload
      v-show="!showUpload"
      class="el-inner-upload"
      :action="action"
      :show-file-list="false"
      :on-success="handleSuccess"
      :headers="headers"
      :with-credentials="true"
      :before-upload="handleBeforeUpload"
    >
      <i slot="default" ref="upload" class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "SingleImageUpload3",
  props: {
    action: {
      type: String,
      default: ""
    },

    value: {
      type: String,
      default: ""
    },

    limit: {
      type: Number,
      default: 1
    },
    headers: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false
    };
  },
  computed: {
    imageUrl() {
      return this.value;
    },

    fileList() {
      if (!this.value) {
        return [];
      }

      const list = Array.isArray(this.value)
        ? this.value
        : [{ url: this.value }];

      return list;
    },

    showUpload() {
      return this.fileList.length && this.fileList.length >= this.limit;
    }
  },
  methods: {
    handleBeforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }

      return isLt2M;
    },

    handleRemove(file) {
      const isArray = Array.isArray(this.value);

      if (isArray) {
        this.$emit(
          "input",
          this.fileList.filter(item => item.url !== file.url)
        );
      } else {
        this.$emit("input", "");
      }
    },

    handleSuccess(response, file, fileList) {
      this.$emit("onsuccess", response, file, fileList);
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    handleReload() {
      this.$refs["upload"].click();
      this.$emit("reupload");
    }
  }
};
</script>

<style lang="scss" scoped>
.upload-wrapper ::v-deep {
  .el-inner-upload {
    display: inline-block;
  }

  .el-upload {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    line-height: 146px;
    vertical-align: top;

    i {
      font-size: 28px;
      color: #8c939d;
    }
  }

  .el-upload-list__item-thumbnail {
    object-fit: cover;
  }
}
.upload-wrapper {
  width: 100%;
  position: relative;
}
</style>
