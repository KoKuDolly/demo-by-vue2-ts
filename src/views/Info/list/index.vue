<template>
  <div class="templete-content">
    <div class="templete-content-title">
      <div class="templete-content-title-content">
        <el-form :inline="true" :model="formData">
          <el-form-item label="cid">
            <el-input v-model="formData.cid" placeholder="请输入sid"></el-input>
          </el-form-item>
          <el-form-item label="apiCode">
            <el-input v-model="formData.apiCode" placeholder="请输入apicode"></el-input>
          </el-form-item>
          <el-form-item label="创建者">
            <el-input v-model="formData.operatorName" placeholder="请输入创建者"></el-input>
          </el-form-item>
          <el-form-item label="表单状态">
            <el-select v-model="formData.formStatus" placeholder="请选择表单状态">
              <template v-for="(value, key) in formStatusData">
                <el-option :label="value.cnName" :value="value.code" :key="key"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="templete-content-title-content">
        <el-form :inline="true">
          <el-form-item>
            <el-button type="primary" @click="checkCompanyList">查询</el-button>
            <el-button @click="resetFormData">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="templete-content-body">
      <div class="templete-content-body-content">
        <!-- <el-upload
          class="upload-info-list"
          action="/api/enterpriseop-service/file/upload"
          accept=".xlsx, .xls"
          :on-success="handleuploadOnSuccess"
          :on-error="handleuploadOnError"
          :on-change="handleuploadChange"
          :headers="uploadHeaders">
          <el-button size="small" type="primary">上传</el-button>
        </el-upload>
        <el-button size="small" type="primary" class="upload-info-btn" icon="el-icon-upload" @click.native="handleUpload">上传</el-button>
        <input type="file" class="hidden-input" /> -->
        <el-table :data="tableData">
          <el-table-column prop="cid" label="cid"></el-table-column>
          <el-table-column prop="companyName" label="公司名称"></el-table-column>
          <el-table-column prop="companyNameAbbr" label="公司简称"></el-table-column>
          <el-table-column prop="apiCode" label="apiCode"></el-table-column>
          <el-table-column prop="formStatus" label="表单状态">
            <!-- <template slot-scope="scope"><div>{{forStatusMap[scope.row.formStatus]}}</div></template> -->
          </el-table-column>
          <el-table-column prop="createPerson" label="创建者"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column prop="操作" label="操作">
            <template slot-scope="scope">
              <el-button size="small" type="text" @click="check(scope)">查看</el-button>
              <el-button size="small" type="text" @click="edit(scope)" :disabled="scope.row.formStatus === 2">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="templete-content-footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenationInfo.current"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal"
      ></el-pagination>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace,
} from 'vuex-class';
// import { auth } from '@/utils/auth';

const infoModule = namespace('info');

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);

// window.onbeforeunload = function(){
//   console.log(infoModule);
//   return '你确定要关闭吗？';
// }

@Component
export default class InfoList extends Vue {
  @infoModule.Action('companyListActions') public companyListActions!: (data: any) => Promise<any>;
  @infoModule.State('paizhaoType') public paizhaoType!: any;
  public forStatusMap: any = {
    0: '未填写',
    1: '已暂存',
    2: '已提交',
  };

  public formData = {
    cid: '',
    apiCode: '',
    operatorName: '',
    formStatus: '',
  };
  public tableData: any[] = [];

  private formStatusData: any[] = [
    {
      cnName: 'cnName',
      enName: 'enName',
    },
  ];
  private pagenationInfo = {
    current: 1,
    pageSize: 10,
  };
  private pageTotal: number = 0;
  private uploadHeaders: any = {};

  public mounted() {
    this.checkCompanyList();
    // this.inituploadHeaders();
    // console.log(window);
    // debugger;
    // window.onbeforeunload = function () {
    //   console.log(this.paizhaoType);
    //   if (!this.paizhaoType) {
    //     return false;
    //   } else {
    //     return '??';
    //   }
    // };
    // debugger;
    // window.addEventListener('beforeunload', function(){
    //   console.log(infoModule);
    //   return false;
    // });
  }

  public checkCompanyList() {
    const param = {
      data: {
        ...this.formData,
        ...this.pagenationInfo,
      },
    };
    this.companyListActions(param)
    .then((res) => {
      // console.log(res);
      this.tableData = res.data.records || [];
      this.pageTotal = res.data.total || 0;
    })
    .catch((err) => {
      // console.log(err);
      this.$message({
        message: err.message + '!的消息',
        type: 'error',
      });
      this.tableData = [];
      this.pageTotal = 0;
    });
  }

  public resetFormData() {
    this.formData = {
      cid: '',
      apiCode: '',
      operatorName: '',
      formStatus: '',
    };
  }

  public check(scope: any) {
    this.$router.push({ name: 'infoCheck', params: { id: scope.row.id } });
  }
  public edit(scope: any) {
    this.$router.push({ name: 'infoEdit', params: { id: scope.row.id }  });
  }
  public handleCurrentChange(current: number) {
    this.pagenationInfo.current = current;
    this.checkCompanyList();
  }
  public handleSizeChange(pageSize: number) {
    this.pagenationInfo.pageSize = pageSize;
    this.checkCompanyList();
  }

  // public beforeRouteLeave(to: any, from: any, next: any) {
  //   console.log(to, from , next, this.paizhaoType);
  //   next(false);
  // }

  // public handleUpload(e: any) {
  //   // console.log(e);
  // }

  // private handleuploadOnSuccess(event: any, file: any, fileList: any) {
  //   // console.log(event, file, fileList);
  // }

  // private handleuploadOnError(err: any, file: any, fileList: any) {
  //   // console.log(err, file, fileList);
  // }

  // private handleuploadChange(file: any, fileList: any) {
  //   // console.log(file, fileList);
  // }

  // private inituploadHeaders() {
  //   this.uploadHeaders = {
  //     // 'Content-Type': 'multipart/form-data',
  //     'Content-Type': 'application/json;charset=UTF-8',
  //     'sessionId': auth.getSessionId() ? auth.getSessionId() : '',
  //   };
  // }
}
</script>
<style lang="scss">
.templete-content-body-content {
  position: relative;
  .upload-info-list {
    position: absolute;
    right: 10px;
    top: -34px;
    // z-index: 3;
  }

  .upload-info-btn {
    position: absolute;
    right: 80px;
    top: -34px;
  }
}

</style>
