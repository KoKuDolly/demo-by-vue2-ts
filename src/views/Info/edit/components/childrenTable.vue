<template>
  <div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition">
    <div class="el-table__body-wrapper is-scrolling-none">
      <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
        <tbody>
          <tr class="el-table__row">
            <td rowspan="1" colspan="4">
              <div class="cell">部门</div>
            </td>
            <td rowspan="1" colspan="4">
              <div class="cell">
                <el-select v-model="smallData.department" placeholder="请选择" :disabled="!isEdit">
                  <template v-for="(value, key) in bumenData">
                    <el-option :key="key" :label="value.cnName" :value="value.cnName"></el-option>
                  </template>
                </el-select>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import {
  State,
  Getter,
  Action,
  Mutation,
  namespace,
} from 'vuex-class';
const infoModule = namespace('info');

@Component
export default class ChildrenTable extends Vue {
  @Prop() public data!: any;
  @Prop(Boolean) public isEdit!: boolean;

  @infoModule.Getter('paizhaoTypeGetter') public paizhaoType!: string;
  public smallData: any = {};
  public bumenData: any = [
    {
      cnName: '',
      enName: '',
    },
  ];

  @Watch('data')
  public handlePropsDataChange(n: any, o: any) {
    this.smallData = n;
  }
}
</script>
<style lang="scss">
.fengxi {
  margin: 0 5px;
}
</style>