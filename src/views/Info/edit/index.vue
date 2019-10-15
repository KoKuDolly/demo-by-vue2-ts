<template>
  <div class="info-edit">
    <div class="templete-content">
      <div class="templete-content-body">
        <div class="templete-content-body-content">
          <div class="templete-content-body-content-title">1层级级信息</div>
          <div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition">
            <div class="el-table__body-wrapper is-scrolling-none">
              <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
                <tbody>
                  <!-- cid 所属地区 -->
                  <tr class="el-table__row">
                    <td rowspan="1" colspan="1">
                      <div class="cell">1层级</div>
                    </td>
                    <td rowspan="1" colspan="1">
                      <div class="cell">{{cidData.cid}}</div>
                    </td>
                    <td rowspan="1" colspan="1">
                      <div class="cell">所属地区</div>
                    </td>
                    <td rowspan="1" colspan="1">
                      <div class="cell">{{cidData.area}}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="templete-content-body-content">
          <div class="templete-content-body-content-title">apicode级信息</div>
          <ApiCodeTable :data="cidData.apicodeList" ref="apicodetable" :isEdit="isEdit"/>
        </div>
        <div class="templete-content-body-content__fixed" v-if="isEdit">
          <el-button size="mini" @click="handleZancun">暂存</el-button>
          <el-button size="mini" type="primary" @click="handleSubmit">提交</el-button>
        </div>
        <!-- 弹层内容 -->
        <div class="templete-content-body-content compare-container">
          <el-dialog
            :visible.sync="dialogVisible"
            custom-class="el-dialog--paizhaocankao"
            >
            <div slot="title">
              <div>牌照、子牌照类型参考</div>
            </div>
            <el-form :inline="true" :model="dialogForm" size="mini">
              <el-form-item label="公司名称">
                <el-input v-model="dialogForm.name" placeholder="请输入公司名称，支持模糊查询"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleDialogCheck">查询</el-button>
              </el-form-item>
              <el-form-item>
                <p>提示：建议精准匹配，默认展示10条。</p>
              </el-form-item>
            </el-form>
            <div v-for="(value, index) in dialogTableData" :key="index" class="list-line list-line--block">
              <template v-for="(v, i) in value">
                <div :key="i" class="list-line--inline">
                  <span class="list-line--inline__title">{{mapInfo[i]}}</span>
                  <span class="list-line--inline__relation">：</span>
                  <span class="list-line--inline__value">{{v}}</span>
                </div>
              </template>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from 'vue-property-decorator';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace,
} from 'vuex-class';
import ApiCodeTable from './components/ApiCodeTable.vue';
import { mixins } from 'vue-class-component';
import PayzhaoTypeMixins from '@/mixins/PayzhaoTypeMixins';

const infoModule = namespace('info');

@Component({
  components: {
    ApiCodeTable,
  },
})
export default class InfoEdit extends mixins(PayzhaoTypeMixins) {
  @Ref('apicodetable') public apiCodeTableData!: ApiCodeTable;
  @infoModule.Action('apiCodeCheckActions') public apiCodeCheckActions!: (data: any) => Promise<any>;
  @infoModule.Action('apiCodeSaveActions') public apiCodeSaveActions!: (data: any) => Promise<any>;
  @infoModule.Action('paizhaoTypeCankaoActions') public paizhaoTypeCankaoActions!: (data: any) => Promise<any>;

  public cidData: any = {
    cid: '',
    area: '',
    companyName: '',
    companyAbbreviation: '',
    businesserName: '',
    riskerName: '',
    financialLicenceType: '',
    financialSublicenseType: '',
    isLicensed: '',
    apicodeList: [
      {
        apiCode: '',
        companyId: '',
        id: '',
        remark: '',
        status: '',
        apicodeFormList: [
          {
            apiCode: '',
            applicationScenario: '',
            businessScenario: '',
            companyId: '',
            creditEnd: '',
            creditStart: '',
            department: '',
            id: '',
            incomingChannel: '',
            loanCycle: '',
            loanRate: '',
            loanType: '',
          },
        ],
      },
    ],
  };
  public dialogVisible: boolean = false;
  public dialogForm: any = {
    name: '',
  };
  public dialogTableData: any[] = [];
  public mapInfo: any = {
    amountName: 'amountName',
    branchOffice: 'branchOffice',
    name: 'name',
  };

  @Watch('$route', { immediate: true, deep: true })
  public onRouteChange(n: any, o: any) {
    // console.log(n);
  }

  get isEdit(): boolean {
    return this.$route.name === 'infoEdit';
  }
  public mounted() {
    this.initPageRender();
  }
  public initPageRender() {
    const param = {
      data: {
        id: this.$route.params.id,
      },
    };
    const cidDataEmpty = {
      cid: '',
      area: '',
      companyName: '',
      companyAbbreviation: '',
      businesserName: '',
      riskerName: '',
      financialLicenceType: '',
      financialSublicenseType: '',
      isLicensed: '',
      apicodeList: [
        {
          apiCode: '',
          companyId: '',
          id: '',
          remark: '',
          status: '',
          apicodeFormList: [
            {
              apiCode: '',
              applicationScenario: '',
              businessScenario: '',
              companyId: '',
              creditEnd: '',
              creditStart: '',
              department: '',
              id: '',
              incomingChannel: '',
              loanCycle: '',
              loanRate: '',
              loanType: '',
            },
          ],
        },
      ],
    };

    this.apiCodeCheckActions(param)
      .then((res) => {
        this.cidData = res.data.data || cidDataEmpty;
      })
      .catch((err) => {
        this.cidData = cidDataEmpty;
      });
  }

  public handleDialogVisible() {
    this.dialogVisible = !this.dialogVisible;
  }

  public handleDialogCheck() {
    const param = {
      data: {
        name: this.dialogForm.name,
      },
    };
    this.paizhaoTypeCankaoActions(param)
      .then((res) => {
        // this.dialogTableData = res.data.data.records;
      })
      .catch();
  }

  // 暂存
  public handleZancun() {
    this.handleSaveOrSubmit(1);
  }
  // 提交
  public handleSubmit() {
    this.handleSaveOrSubmit(2);
  }
  // 提交时必填校验方法
  public handleCheckBiTian(value: any): any {
    // console.log(value);
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        const levelOneValue = value[key];
        // console.log(levelOneValue);
        if (levelOneValue instanceof Array) {
          let r = null;
          for (const i of levelOneValue) {
            r = this.handleCheckBiTian(i);
            if (r) {
              break;
            }
          }
          if (r) {
            return r;
          }
        } else {
          if (levelOneValue === '' || levelOneValue === undefined || levelOneValue === null) {
            return {
              flag: true,
              message: '有必填项未填写！',
            };
            break;
          }
        }
      } else {
        return {
          flag: true,
          message: '数据结构有误！',
        };
      }
    }
  }

  public handleSaveOrSubmit(type: number) {
    const temp = {
      type,
    };
    // 提交时做必填校验
    if (type === 2) {
      const result = this.handleCheckBiTian(this.cidData);
      if (result) {
        if (result.flag) {
          this.$message({
            showClose: true,
            type: 'error',
            message: '填写有误，请仔细检查完整再提交！',
          });
          return false;
        }
      }
    }

    const param = {
      data: {
        param: JSON.stringify(temp),
      },
    };
    // console.log(param);
    this.apiCodeSaveActions(param)
      .then((res) => {
        // console.log(res);
        this.$router.push({name: 'infoList'});
      })
      .catch((err) => {
        this.$message({
          showClose: true,
          type: 'error',
          message: err.message || '保存失败！',
        });
      });
  }
}
</script>
<style lang="scss">
  .info-edit {
    .list-line {
      &--block {
        display: block;
      }

      &--inline {
        display: inline;
        margin-right: 10px;
        &__title {
          font-weight: 700;
        }

        &__relation {
          margin-right: 5px;
        }

        &__value {
          //
        }
      }
    }
  }
  .el-dialog--paizhaocankao {
    .el-form--inline {
      .el-input {
        width: 300px;
      }
    }
  }
</style>