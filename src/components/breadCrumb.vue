<template>
  <div class="bread-crumb-con">
    <el-breadcrumb separator="/">
      <template v-for="(value, key) in breadData">
        <el-breadcrumb-item :to="value.path" :key="key">{{value.cnName}}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({})
export default class BreadCrumb extends Vue {
  public breadData: any[] = [];

  @Watch('$route')
  public onRouteChange(n: any, o: any) {
    // console.log(n, o);
    const data = n.matched;
    this.breadData = data.map((v: any) => {
      return {
        path: v.path,
        cnName: v.meta.info,
      };
    });
  }

  public created() {
    this.getRouterArr();
  }
  public mounted() {
    // console.log(routes);
  }
  public getRouterArr() {
    // console.log(this.$route, this.$route.matched);
    const data = this.$route.matched;
    this.breadData = data.map((v: any) => {
      return {
        path: v.path,
        cnName: v.meta.info,
      };
    });
    // console.log(this.$route, data, this.breadData);
  }
}
</script>
<style lang="scss">
  .bread-crumb-con {
    height: 100%;
    line-height: 60px;
    .el-breadcrumb {
      line-height: inherit;
    }
  }
</style>