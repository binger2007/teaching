<template>
  <div>
    <div style="width: 100%;">
      <el-button
        v-if="userType == '管理员'"
        type="primary"
        icon="el-icon-plus"
        style="width: 100%;"
        @click="append({ id: 0, p_ids: null })"
        >添加根单位</el-button
      >
    </div>
    <el-card class="box-card" shadow="hover">
      <el-tree
        :data="treeData"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        draggable
        @node-drop="handleDrop"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button
              type="text"
              icon="el-icon-plus"
              size="mini"
              @click="() => append(data)"
              >增加</el-button
            >
            <el-button
              type="text"
              icon="el-icon-edit"
              size="mini"
              @click="() => edit(data)"
              >编辑</el-button
            >
            <el-button
              type="text"
              icon="el-icon-delete"
              size="mini"
              @click="() => remove(node, data)"
              >删除</el-button
            >
          </span>
        </span>
      </el-tree>
    </el-card>
    <el-dialog title="添加单位" :visible.sync="addClassdialogVisible">
      <el-form :model="addClassForm" :rules="rules" ref="addClassForm">
        <el-form-item label="名称" :label-width="formLabelWidth" prop="cname">
          <el-input v-model="addClassForm.cname" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addClassdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitClass('addClassForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog title="编辑单位" :visible.sync="editClassdialogVisible">
      <el-form :model="editClassForm" :rules="rules" ref="editClassForm">
        <el-form-item label="名称" :label-width="formLabelWidth" prop="cname">
          <el-input v-model="editClassForm.cname" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editClassdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditClass('editClassForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { generateOptions } from "../../assets/js/public";
export default {
  name: "departmentManage",
  data() {
    return {
      userType: sessionStorage.getItem("uType"),
      addClassdialogVisible: false,
      editClassdialogVisible: false,
      addClassForm: {
        cname: "",
        pid: "",
        pids: ""
      },
      // 编辑对话框
      editClassForm: {
        cname: "",
        id: ""
      },
      rules: {
        cname: [{ required: true, message: "请输入单位名称", trigger: "blur" }]
      },
      formLabelWidth: "120px",
      treeData: []
    };
  },
  mounted() {
    this.loadClass();
  },
  methods: {
    //加载分类信息
    loadClass() {
      this.$Axios
        .post("handle_department/loadDepartment", {
          departmentId: sessionStorage.getItem("departmentId"),
          userType: this.userType
        })
        .then(res => {
          this.treeData = generateOptions(res.data);
        });
    },
    // 添加节点
    append(data) {
      this.addClassdialogVisible = true;
      this.addClassForm.pid = data.id;
      if (data.p_ids === null) {
        this.addClassForm.pids = "0";
      } else {
        this.addClassForm.pids = data.p_ids + data.id;
      }
    },
    // 删除节点
    remove(node, data) {
      this.$confirm(
        "此操作将永久删除该分类以及分类下面的所有内容, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === data.id);
          children.splice(index, 1);
          this.$Axios
            .post("handle_department/delDepartment", {
              id: data.id
            })
            .then(res => {
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

    submitClass(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$Axios
            .post("handle_department/addDepartment", this.addClassForm)
            .then(res => {
              if (res.data) {
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
                this.loadClass();
                this.addClassForm.cname = "";
              } else {
                this.$message.error("不成功，请重新输入！");
              }
            });
        } else {
          return false;
        }
      });
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      if (
        this.userType == "普通用户" &&
        dropNode.data.id == sessionStorage.getItem("departmentId") &&
        (dropType == "before" || dropType == "after")
      ) {
        this.$message.error("不许移动到根节点！");
        this.loadClass();
      } else {
        var brothers =
          dropType == "inner"
            ? dropNode.childNodes
            : dropNode.parent.childNodes;
        var brotherIds = [];
        brothers.forEach(ele => {
          brotherIds.push(ele.data.id);
        });
        var obj = {
          draggingNodeId: draggingNode.data.id, //拖拽的节点
          brotherIds: JSON.stringify(brotherIds),
          pids:
            dropType == "inner"
              ? dropNode.data.p_ids + dropNode.data.id + ","
              : dropNode.data.p_ids,
          pid: dropType == "inner" ? dropNode.data.id : dropNode.data.p_id
        };
        this.$Axios.post("handle_department/sortDepartment", obj).then(res => {
          if (res.data) {
            this.$message({
              message: "排序成功",
              type: "success"
            });
          }
        });
      }
    },
    edit(data) {
      this.editClassdialogVisible = true;
      this.editClassForm.cname = data.label;
      this.editClassForm.id = data.id;
    },
    submitEditClass(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$Axios
            .post("handle_department/editDepartment", this.editClassForm)
            .then(res => {
              if (res.data == "1") {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.addClassForm.cname = "";
                this.loadClass();
              } else {
                this.$message.error("不成功，请重新输入！");
              }
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box-card {
  width: 100%;
  margin: 20px auto;
  /* height: calc(100vh - 240px); */
  overflow-y: auto;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
