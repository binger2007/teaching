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
    :http-request="checkedFile"
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
    return {
      maxSize: 5 * 1024 * 1024 * 1024, // 上传最大文件限制
      multiUploadSize: 1 * 1024 * 1024, // 大于这个大小的文件使用分块上传(后端可以支持断点续传)
      eachSize: 1 * 1024 * 1024 // 每块文件大小
    };
  },
  methods: {
    checkedFile(options) {
      const { maxSize, multiUploadSize, eachSize, singleUpload } = this;
      const { file, data } = options;
      // console.log(file.size);
      if (file.size < multiUploadSize) {
        //小文件直接上传
        singleUpload(file, data);
      }
    },
    //上传小文件
    singleUpload(file, data) {
      console.log(file, data);
      // 根据后台需求数据格式
      const form = new FormData();
      // 文件对象
      form.append("file", file);
      form.append("clientType", "xxx");
      // 本例子主要要在请求时添加特定属性，所以要用自己方法覆盖默认的action
      // form.append("did", data.did);
      console.log(form.get("file"));
      this.$Axios
        .post("handle_file/upload", form, {
          headers: { "content-type": "multipart/form-data" }
        })
        .then(res => {
          // if (res.data) {
          //   this.$message({
          //     message: "保存成功",
          //     type: "success"
          //   });
          //   this.$emit("submitPerson");
          // } else {
          //   this.$message.error("不成功！");
          // }
        });
    },
    //处理类型
    handleExceed(file) {
      // console.log(file);
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
      if (
        !isLt2M &&
        (file.type === "image/jpeg" || file.type === "image/png")
      ) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
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
