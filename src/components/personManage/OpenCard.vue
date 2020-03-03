<template>
  <el-dialog
    :title="info.name + '的健康动态监测卡'"
    :visible.sync="dialogVisible"
    width="80%"
  >
  </el-dialog>
</template>
<script>
import { generateOptions } from "../../assets/js/public";
export default {
  name: "editPerson",
  data() {
    return {
      dialogVisible: false,
      info: {}
    };
  },
  mounted() {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
