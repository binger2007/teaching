<template>
  <div>
    <UploadFile
      :department="department"
      target="/api/handle_file/upload"
      @success="successUpload"
    ></UploadFile>
    <!-- <UploadFile :department="department" @success="successUpload"></UploadFile> -->
    <!-- <UploadFile></UploadFile> -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="6" v-for="(url, index) in urls" :key="index">
          <!-- <div
            v-if="url.path.substring(url.path.length - 3) == 'mp4'"
            class="video-img"
          >
            <i class="el-icon-video-camera-solid "></i>
          </div> -->
          <video
            v-if="url.path.substring(url.path.length - 3) == 'mp4'"
            :id="url.path"
            class="video-img"
            @click="playVideo(url.path)"
          >
            <source :src="'http://127.0.0.1/' + url.path" type="video/mp4" />
          </video>

          <el-image
            v-else
            fit="cover"
            :src="'http://127.0.0.1/' + url.path"
            lazy
          ></el-image>
          <div class="img-tit">{{ url.title }}</div>
          <i class="el-icon-delete" @click="delPic(url, index)"></i>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import UploadFile from "../public/UploadFile";
export default {
  name: "showPic",
  data() {
    return {
      fileList: [],
      department: {
        did: sessionStorage.getItem("departmentId")
      },
      urls: []
    };
  },
  components: {
    UploadFile
  },
  mounted() {
    this.loadPic();
  },
  methods: {
    //加载本单位上传的图片
    loadPic() {
      this.$Axios
        .post("handle_file/load", {
          did: this.department.did
        })
        .then(res => {
          this.urls = res.data;
        });
    },

    //删除图片
    delPic(obj, index) {
      this.$confirm("此操作将永久删除该图片, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$Axios.post("handle_file/del", obj).then(res => {
            this.urls.splice(index, 1);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    successUpload(res) {
      this.urls.unshift(res);
    },
    playVideo(id) {
      var tar = document.getElementById(id);
      if (tar.paused) {
        var paused = document.getElementsByClassName("video-img");
        var len = paused.length;
        for (var i = 0; i < len; i++) {
          paused[i].pause();
        }
        tar.play();
      } else tar.pause();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-upload,
.el-upload-dragger {
  width: 100%;
}
.box-card {
  margin-top: 30px;
  height: calc(100vh - 350px);
  overflow: auto;
}
.el-image {
  width: 100%;
}
.el-image img,
.el-image .el-image__error {
  width: 100%;
  height: 200px;
}
.el-col-6 {
  margin-bottom: 20px;

  position: relative;
}
.el-col-6:hover > .el-icon-delete {
  display: block;
}
.el-icon-delete {
  cursor: pointer;
  display: none;
  font-size: 30px;
  position: absolute;
  top: 10px;
  right: 20px;
}
.img-tit {
  text-align: center;
  width: 100%;
  overflow: hidden;
}
.video-img {
  display: block;
  cursor: pointer;
  background: rgb(236, 245, 255);
  width: 100%;
  height: 200px;
  margin-bottom: 4px;
  text-align: center;
}
.video-img i {
  color: #c0c4cc;
  font-size: 100px;
  margin-top: 35px;
}
</style>
