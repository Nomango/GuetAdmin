<template>
  <div class="upload-container">
    <el-button
      :style="{ background: color, borderColor: color }"
      icon="el-icon-upload"
      size="mini"
      type="primary"
      @click="dialogVisible = true"
    >
      上传视频
    </el-button>
    <el-dialog :visible.sync="dialogVisible" @close='closeDialog'>
      <el-upload
        drag
        :show-file-list="false"
        :before-upload="beforeUploadVideo"
        class="editor-slide-upload"
        action=""
        :headers="headers"
        :http-request="uploadVideoFile"
        :multiple="false"
      >
        <i v-if="!videoFlag && !uploadSuccess" class="el-icon-upload"></i>
        <div v-if="!videoFlag && !uploadSuccess" class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <el-progress
          v-if="videoFlag"
          type="circle"
          v-bind:percentage="videoUploadPercent"
          style="margin-top:7px;"
          />
        <video
          v-if="videoForm.showVideoPath != '' && !videoFlag"
          v-bind:src="videoForm.showVideoPath"
          controls="controls"
        >
          您的浏览器不支持视频播放
        </video>
        <div class="el-upload__tip" slot="tip">只能上传mp4/ogg/flv/avi/wmv/rmvb/mov文件，且不超过500MB</div>
      </el-upload>
      <el-button type="primary" @click="handleSubmit" v-if="uploadSuccess">
        确认
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
// OSS相关文档
// https://help.aliyun.com/document_detail/64047.html?spm=a2c4g.11186623.6.1227.4b0426fdpDkw93

import OSS from "ali-oss";
import { getSTSToken } from "@/api/AssumeRole";
import { fetchPrefix } from "@/api/upload";
import crypto from 'crypto';
import path from 'path';

export default {
  name: "EditorSlideUpload",
  props: {
    color: {
      type: String,
      default: "#1890ff"
    },

    prefix: {
      type: String,
      default: ""
    },

    headers: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dialogVisible: false,
      OSSClient: null,
      OSSRootPath: "",

      uploadSuccess: false,
      videoFlag: false,
      // 是否显示进度条
      videoUploadPercent: "",
      // 显示上传按钮
      videoForm: {
        showVideoPath: ""
      }
    };
  },
  created() {
    this.getPrefix();
    this.getOSSClient();
  },
  methods: {
    async getPrefix() {
      const res = await fetchPrefix();
      const prefix = res.data || {};
      this.OSSRootPath = prefix.root;
    },

    async getOSSClient() {
      const res = await getSTSToken({});
      const { data } = res;

      this.OSSClient = new OSS({
        // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
        region: "oss-cn-shenzhen",
        // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
        accessKeyId: data.AccessKeyId,
        accessKeySecret: data.AccessKeySecret,
        // 从STS服务获取的安全令牌（SecurityToken）。
        stsToken: data.SecurityToken,
        // 填写Bucket名称。
        bucket: "guetshow"
      });
    },

    getRandomString(len) {
      return crypto.randomBytes(Math.ceil(len / 2)).toString('hex').slice(0, len)
    },

    uploadVideoFile(params) {
      const file = params.file;
      const filename = "raw_videos/" + this.getRandomString(24) + path.extname(file.name);
      this.multipartUpload(filename, file);
    },

    async multipartUpload(filename, data) {
      // 分片上传
      try {
        const result = await this.OSSClient.multipartUpload(
          filename,
          data,
          {
            progress: this.updateProgress
          }
        );

        // 上传成功
        this.uploadSuccess = true;
        this.videoFlag = false;
        this.videoUploadPercent = 0;
        this.videoForm.showVideoPath = this.OSSRootPath + result.name;
      } catch (e) {
        this.$message.error('上传失败，请重试');
        console.log(e);
      }
    },

    updateProgress(percentage, checkpoint) {
      this.videoFlag = true;
      this.videoUploadPercent = Math.floor(percentage * 10000) / 100;
    },

    handleSubmit() {
      this.$emit("successCBK", this.videoForm.showVideoPath);
      this.videoForm.showVideoPath = "";
      this.dialogVisible = false;
      this.uploadSuccess = false;
    },

    beforeUploadVideo(file) {
      if (this.videoFlag) {
        this.$message.warning("视频已经上传中，请勿重复操作");
        return false;
      }
      const isLt500M = file.size / 1024 / 1024 < 500;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
          "video/mov"
        ].indexOf(file.type) === -1
      ) {
        this.$message.warning("请上传正确的视频格式");
        return false;
      }
      if (!isLt500M) {
        this.$message.warning("视频大小不能超过500MB");
        return false;
      }
    },

    closeDialog() {
      this.OSSClient.cancel();
    }
  }
};
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  ::v-deep .el-upload--picture-card {
    width: 100%;
  }
}

.video-form-icon {
  padding: 50px;
  border: 1px solid #989898;
  border-radius: 5px;
}
</style>
