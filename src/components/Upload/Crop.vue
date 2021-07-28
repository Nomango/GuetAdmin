<template>
  <div class="upload-wrapper">
    <!--<ul
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
    </ul> -->
    <a class="btn" @click="toggleShow">set avatar</a>
    <my-upload field="file"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
      :width="640"
      :height="480"
      :url="action"
      :headers="headers"
      noCircle
      :value.sync="show"
      :withCredentials="true"
      :langExt="langExt"
      img-format="png"></my-upload>
    <img :src="imgDataUrl">
  </div>
</template>

<script>
import myUpload from 'vue-image-crop-upload';

export default {
  name: "SingleImageUpload3",
  components: {
    'my-upload': myUpload
  },
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
      show: false,
      imgDataUrl: "",
      langExt: {
          hint: '点击，或拖动图片至此处',
          loading: '正在上传……',
          noSupported: '浏览器不支持该功能，请使用IE10以上或其他现在浏览器！',
          success: '上传成功',
          fail: '图片上传失败',
          preview: '封面图预览',
          btn: {
              off: '取消',
              close: '关闭',
              back: '上一步',
              save: '保存'
          },
          error: {
              onlyImg: '仅限图片格式',
              outOfSize: '单文件大小不能超过 ',
              lowestPx: '图片最低像素为（宽*高）：'
          }
      }
    };
  },
  computed: {
    // imageUrl() {
    //   return this.value;
    // },

    // fileList() {
    //   if (!this.value) {
    //     return [];
    //   }

    //   const list = Array.isArray(this.value)
    //     ? this.value
    //     : [{ url: this.value }];

    //   return list;
    // },

    // showUpload() {
    //   return this.fileList.length && this.fileList.length >= this.limit;
    // }
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    /**
      * crop success
      *
      * [param] imgDataUrl
      * [param] field
      */
    cropSuccess(imgDataUrl, field){
      console.log('-------- crop success --------');
      this.imgDataUrl = imgDataUrl;
    },
    /**
      * upload success
      *
      * [param] jsonData  server api return data, already json encode
      * [param] field
      */
    cropUploadSuccess(jsonData, field){
      console.log('-------- upload success --------');
      console.log(jsonData);
      console.log('field: ' + field);
      this.$emit("onsuccess", jsonData, field, null);
    },
    /**
      * upload fail
      *
      * [param] status    server api return error status, like 500
      * [param] field
      */
    cropUploadFail(status, field){
      console.log('-------- upload fail --------');
      console.log(status);
      console.log('field: ' + field);
    }

    // handleBeforeUpload(file) {
    //   const isLt2M = file.size / 1024 / 1024 < 2;
    //   if (!isLt2M) {
    //     this.$message.error("上传头像图片大小不能超过 2MB!");
    //   }

    //   return isLt2M;
    // },

    // handleRemove(file) {
    //   const isArray = Array.isArray(this.value);

    //   if (isArray) {
    //     this.$emit(
    //       "input",
    //       this.fileList.filter(item => item.url !== file.url)
    //     );
    //   } else {
    //     this.$emit("input", "");
    //   }
    // },

    // handleSuccess(response, file, fileList) {
    //   this.$emit("onsuccess", response, file, fileList);
    // },

    // handlePictureCardPreview(file) {
    //   this.dialogImageUrl = file.url;
    //   this.dialogVisible = true;
    // },

    // handleReload() {
    //   this.$refs.upload.click();
    //   this.$emit("reupload");
    // }
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
