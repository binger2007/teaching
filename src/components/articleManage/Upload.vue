<template>
  <el-dialog title="选择文件" :visible.sync="dialogFormVisible">
    <el-tree ref="tree" :data="data" :check-strictly="true" show-checkbox></el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="getCheckedNodes">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import uploader from "vue-simple-uploader";
export default {
  name: "Upload",
  data() {
    return {
      dialogFormVisible: false,
      data: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  mounted() {
    // console.log(123);
    this.$Axios.get("/showFileList.php").then(res => {
      this.data = res.data;
    });
  },
  methods: {
    //将选中的歌曲传到父节点
    getCheckedNodes() {
      this.$emit("getFiles", this.$refs.tree.getCheckedNodes());
    }
  }
};
</script>

<style>
</style>
