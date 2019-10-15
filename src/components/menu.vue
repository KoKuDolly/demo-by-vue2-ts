<template>
  <div class="menu-con">
    <el-menu
      @select="handleMenuSelect"
      default-active="1">
      <template v-for="(value, key) in menuData">
        <!-- <template v-if="value.children && value.children.length > 0">
          <template v-for="(ivalue, ikey) in value.children">
            <el-submenu :index="`${ikey}`" :key="key + '-' + ikey">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ivalue.meta && ivalue.meta.info}}</span>
              </template>
              <el-menu-item :index="`${ikey}`" :key="key + '-' + ikey">{{ivalue.meta && ivalue.meta.info}}</el-menu-item>
            </el-submenu>
          </template>
        </template> -->
        <template>
          <el-menu-item :index="`${value.meta.childrenName}`" :key="key">{{value.meta && value.meta.info}}</el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { appRouter } from '@/routers/router';

@Component
export default class Menu extends Vue {
  public menuData: any[] = [];

  public mounted() {
    // console.log(appRouter);
    this.initMenu();
  }
  public initMenu() {
    this.menuData = appRouter[0].children;
    // console.log(this.menuData);
  }
  public handleMenuSelect(index: string, path: any) {
    // console.log(index, path);
    this.$router.push({name: index});
  }
}
</script>
<style lang="scss">
@import '~@/styles/variables.scss';

  .asider-con {
    position: absolute;
    width: 200px;
    height: 100%;
    background: $asiderBgColor;
    padding-top: $headerHeight;
    &-logo {
      width: $asiderWidth;
      height: $headerHeight;
      position: absolute;
      left: 0;
      top: 0;
      padding: 10px 0;
      box-sizing: border-box;
    }
  }
</style>