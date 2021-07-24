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
    <el-dialog :visible.sync="dialogVisible">
      <el-upload
        :show-file-list="false"
        :on-success="handleVideoSuccess"
        :before-upload="beforeUploadVideo"
        class="editor-slide-upload"
        action=""
        :headers="headers"
        :http-request="uploadVideoFile"
      >
        <video
          v-if="videoForm.showVideoPath != '' && !videoFlag"
          v-bind:src="videoForm.showVideoPath"
          controls="controls"
        >
          您的浏览器不支持视频播放
        </video>
        <i
          v-else-if="videoForm.showVideoPath == '' && !videoFlag"
          class="el-icon-plus"
        />
        <el-progress
          v-if="videoFlag == true"
          type="circle"
          v-bind:percentage="videoUploadPercent"
          style="margin-top:7px;"
        />
      </el-upload>
      <el-button @click="dialogVisible = false">
        取消
      </el-button>
      <el-button type="primary" @click="handleSubmit">
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

      videoFlag: false,
      // 是否显示进度条
      videoUploadPercent: "",
      // 进度条的进度，
      isShowUploadVideo: false,
      // 显示上传按钮
      videoForm: {
        showVideoPath: ""
      }
    };
  },
  created() {
    this.getOSSClient();
  },
  methods: {
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

    uploadVideoFile(params) {
      const file = params.file;
      let filename = file.filename;

      // 最好可以按work_id分开上传路径，也就是 /videos/:work_id/xxx.mp4
      // 但是不知道怎么把work_id传过来
      // 如果不好传work_id，可以随机产生一个文件名，防止名称冲突（记得带文件后缀）
      filename = "videos/" + filename;
      this.multipartUpload(filename, file);
    },

    async putObject(filename, data) {
      // 上传单个文件
      try {
        const result = await this.OSSClient.put(filename, data);
        console.log(result);
      } catch (e) {
        // TODO 处理一下异常
        this.$message.error(e);
        console.log(e);
      }
    },

    async multipartUpload(filename, data) {
      // 分片上传

      // 支持File对象、Blob数据以及OSS Buffer。
      // 填写本地文件的完整路径。如果未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
      // const data = 'D:\\localpath\\examplefile.txt';
      // 填写上传的内容。
      // const data = ;
      // 填写上传的内容。
      // const data = new OSS.Buffer('Hello OSS');

      try {
        // TODO 不确定这里的Blob用的对不对
        const result = await this.OSSClient.multipartUpload(
          filename,
          new Blob(data),
          {
            progress: function(percentage, checkpoint) {
              this.videoFlag = true;
              // TODO 不确定这里的percentage是什么
              console.log(percentage);
              this.videoUploadPercent = percentage.toFixed(0) * 1;
            },
            meta: { year: 2020, people: "test" },
            mime: "text/plain"
          }
        );
        // TODO 不清楚result是什么，应该有对象的url吧
        console.log(result);
      } catch (e) {
        // TODO 处理一下异常
        this.$message.error(e);
        console.log(e);
      }
    },

    handleVideoSuccess(res, file) {
      this.isShowUploadVideo = true;
      this.videoFlag = false;
      this.videoUploadPercent = 0;

      if (file.status === "success") {
        // TODO 这里的文件路径应该是从上传的result拿到，但是不知道result是什么
        // 也可以用后端的 /api/upload/prefix 拿到video文件地址前缀，然后拼起来得到完整url
        this.videoForm.showVideoPath = file.url;
      } else {
        this.$message.error("上传失败，请重新上传");
      }
    },

    handleSubmit() {
      console.log("handleSubmit");
    },

    beforeUploadVideo(file) {
      const isLt500M = file.size / 1024 / 1024 < 500;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
          "video/mov",
          "video/ogv"
        ].indexOf(file.type) === -1
      ) {
        this.$message.warning("请上传正确的视频格式");
        return false;
      }
      if (!isLt500M) {
        this.$message.warning("视频大小不能超过500MB");
        return false;
      }
      this.isShowUploadVideo = false;
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
</style>
