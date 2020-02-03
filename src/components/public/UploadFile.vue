<template>
  <el-upload
    class="upload-demo"
    :before-upload="handleExceed"
    drag
    :show-file-list="false"
    :action="target"
    multiple
    :on-success="successUpload"
    :data="department"
  >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">
      将文件拖到此处，或<em>点击上传,</em> 只能上传jpg/png文件，且不超过500kb
    </div>
  </el-upload>
</template>

<script>
export default {
  name: "uploadFile",
  props: ["department", "target", "allowed"],
  data() {
    return {};
  },
  methods: {
    //处理类型
    handleExceed(file) {
      console.log(file);
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "video/mp4";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error(
          "上传图片只能是 JPG 格式和PNG格式,以及MP4格式的视频!"
        );
      }
      //   if (!isLt2M) {
      //     this.$message.error("上传图片大小不能超过 2MB!");
      //   }
      return isJPG;

      //   return isJPG && isLt2M;
    },
    // 上传成功后回调
    successUpload(response, file, fileList) {
      this.$message({
        message: "图片上传成功",
        type: "success"
      });
      this.$emit("success", response);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
