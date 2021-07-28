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
      action=""
      :show-file-list="false"
      :headers="headers"
      :auto-upload="false"
      :on-change='changeUpload'
    >
      <i slot="default" ref="upload" class="el-icon-plus" />
    </el-upload>
    <el-dialog title="图片剪裁" :visible.sync="cropDialogVisible" append-to-body>
      <div class="cropper-content">
        <div class="cropper" style="text-align:center">
            <vuecropper
                ref="cropper"
                :img="option.img"
                :outputSize="option.size"
                :outputType="option.outputType"
                :info="true"
                :full="option.full"
                :canMove="option.canMove"
                :canMoveBox="option.canMoveBox"
                :original="option.original"
                :autoCrop="option.autoCrop"
                :fixed="option.fixed"
                :fixedNumber="option.fixedNumber"
                :centerBox="option.centerBox"
                :infoTrue="option.infoTrue"
                :fixedBox="option.fixedBox"
            ></vuecropper>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cropDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="finish" :loading="loading">确认</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { VueCropper }  from 'vue-cropper' 
import axios from "axios";

export default {
  name: "CropImageUpload",
  components: {
      'vuecropper': VueCropper
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
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,

      cropDialogVisible: false,
      // 裁剪组件的基础配置option
      option: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: 'png', // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 640, // 默认生成截图框宽度
        autoCropHeight: 480, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [4, 3], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: false // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      picsList: [],  //页面显示的数组
      // 防止重复提交
      loading: false
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
    // 上传按钮   限制图片大小
    changeUpload(file, fileList) {
        const isLt5M = file.size / 1024 / 1024 < 5
        if (!isLt5M) {
            this.$message.error('上传文件大小不能超过 5MB!')
            return false
        }
        this.fileinfo = file;
        // 上传成功后将图片地址赋值给裁剪框显示图片
        this.$nextTick(() => {
            this.getFileURL(file.raw).then(res => {
                this.option.img = res;
                this.cropDialogVisible = true;
            }).catch(err => {
                console.log(err);
                this.$message.error("上传文件失败，请重试");
            });
        })
    },

    getFileURL(file) {
        const _URL = window.URL || window.webkitURL;
        return new Promise((resolve, reject) => {
            let src = _URL.createObjectURL(file);
            resolve(src);
        });
    },

    // 点击裁剪，这一步是可以拿到处理后的地址
    finish() {
      this.$refs.cropper.getCropBlob((data) => {
        this.loading = true

        let newHeaders = Object.assign({}, this.headers, {'Content-Type': 'multipart/form-data'});
        let file = new File([data], this.fileinfo.name, {type: this.fileinfo.type});
        let formData = new FormData();
        formData.append('file', file);
        axios({
            method: 'post',
            url: this.action,
            data: formData,
            headers: newHeaders,
        }).then(res => {
            this.$emit("onsuccess", res.data, null, null);
            this.cropDialogVisible = false;
            this.loading = false;
        }).catch(err => {
            console.log(err);
            this.$message.error("上传文件失败，请重试");
            this.loading = false;
        })
      })
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

    // handleSuccess(response, file, fileList) {
    //   this.$emit("onsuccess", response, file, fileList);
    // },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    handleReload() {
      this.$refs.upload.click();
      this.$emit("reupload");
    }
  }
};
</script>

<style lang="scss" scoped>
// 截图
.cropper-content {
    .cropper {
        width: auto;
        height: 300px;
    }
}

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
