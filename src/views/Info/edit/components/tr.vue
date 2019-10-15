<template>
  <!-- cid 所属地区 -->
  <tr class="el-table__row">
    <template v-for="(value, index) in data">
      <td :rowspan="value.rowspan" :colspan="value.colspan" :key="index" :class="value.class">
        <div class="cell" v-if="!value.slot">{{value.cnName}}</div>
        <div class="cell" v-else><slot name="body"></slot></div>
      </td>
    </template>
  </tr>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class TheTr extends Vue {
  @Prop() public data!: any[];
}
</script>
<style lang="scss">
  .el-table__row {
    .title {
      font-weight: 700;
    }
  }
</style>