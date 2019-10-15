<template>
  <div>
    <!-- apicode 表格 -->
    <!-- {{isEdit}} -->
    <template v-for="(apicode, apicodeKey) in apiCodeData">
      <div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition" :key="apicodeKey + 'header'">
        <div class="el-table__body-wrapper is-scrolling-none">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
            <tbody>
              <tr class="el-table__row">
                <td rowspan="1" colspan="4">
                  <div class="cell">apicode</div>
                </td>
                <td rowspan="1" colspan="4">
                  <div class="cell">{{apicode.apiCode}}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <template v-for="(apicodeChildren, apicodeChildrenKey) in apicode.apicodeFormList">
        <div :key="apicodeKey + '-' + apicodeChildrenKey" class="apicode-children-con">
          <i class="el-icon-circle-plus icon-middle icon-middle__top" v-if="apicodeChildrenKey === 0 && isEdit" @click="addApicodeChildren(apicodeKey, apicodeChildrenKey)"></i>
          <i class="el-icon-remove icon-middle icon-middle__down" v-if="apicodeChildrenKey > 0 && isEdit" @click="deleteApicodeChildren(apicodeKey, apicodeChildrenKey)"></i>
          <ChildrenTable :data="apicodeChildren" :isEdit="isEdit"/>
        </div>
      </template>
      <div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition" :key="apicodeKey + 'footer'">
        <div class="el-table__body-wrapper is-scrolling-none">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
            <tbody>
              <tr class="el-table__row">
                <td rowspan="1" colspan="2">
                  <div class="cell">备注</div>
                </td>
                <td rowspan="1" colspan="6">
                  <div class="cell">
                    <el-input v-model="apicode.remark" placeholder="请填写备注" type="textarea" :disabled="!isEdit"></el-input>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import ChildrenTable from './childrenTable.vue';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace,
} from 'vuex-class';

const infoModule = namespace('info');

@Component({
  components: {
    ChildrenTable,
  },
})
export default class ApiCodeTable extends Vue {
  @Prop(Array) public data!: any[];
  @Prop(Boolean) public isEdit!: boolean;
  @infoModule.Mutation('mutationApiCodeData') public mutationApiCodeData!: (data: any) => void;
  @infoModule.Getter('paizhaoTypeGetter') public paizhaoType!: string;

  public apiCodeData: any[] = [];

  @Watch('data')
  public handlePropsDataChange(n: any, o: any) {
    n.forEach((v: any, i: number) => {
      if (v.apicodeFormList.length === 0) {
        v.apicodeFormList.push({});
      }
    });
    this.apiCodeData = n;
  }

  public mounted() {
    this.renderApicodeTable();
  }

  public renderApicodeTable() {
    this.apiCodeData = this.data;
  }

  public addApicodeChildren(fatherIndex: number, sonIndex: number) {
    const commonParam: any = {
      apiCode: this.apiCodeData[fatherIndex].apiCode,
      companyId: this.apiCodeData[fatherIndex].companyId,
      isDelete: 0,
      // id: this.apiCodeData[fatherIndex].id,
    };
    let sonDataOfApicode: any = {};
    sonDataOfApicode = {
      ...commonParam,
    };
    this.apiCodeData[fatherIndex].apicodeFormList.push(sonDataOfApicode);
  }
  public deleteApicodeChildren(fatherIndex: number, sonIndex: number) {
    this.apiCodeData[fatherIndex].apicodeFormList.splice(sonIndex, 1);
  }
}
</script>
<style lang="scss">
.apicode-children-con {
  position: relative;
  & .icon-middle {
    position: absolute;
    right: -36px;
    z-index: 2;
    font-size: 32px;
    cursor: pointer;
    top: 16.5px;
  }
}
</style>