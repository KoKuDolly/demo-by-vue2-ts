<template>
  <div class="asider-con">
    <div class="asider-con-logo">
      <img class="asider-con-logo--img" src="~@/assets/images/logo.jpg" />
    </div>
    <div class="asider-con-content">
      <Menu/>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Menu from '@/components/menu.vue';
@Component({
  components: {
    Menu,
  },
})
export default class Aside extends Vue {

}
</script>
<style lang="scss">
@import '~@/styles/variables.scss';

  .asider-con {
    position: fixed;
    z-index: 999;
    width: 200px;
    height: 100%;
    background: $asiderBgColor;
    padding-top: $headerHeight;
    text-align: center;
    &-logo {
      width: $asiderWidth;
      height: $headerHeight;
      position: absolute;
      left: 0;
      top: 0;
      box-sizing: border-box;
      &--img {
        height: 40px;
      }
    }
    .el-menu {
      color: hsla(0, 0%, 100%, .7);
      background: $asiderBgColor;
      .el-menu-item {
        color: inherit;
        font-size: 16px;
        &:hover {
          background-color: $asiderBgColor;
          color: #fff;
        }
        &:focus {
          background-color: $asiderBgColor;
          color: #fff;
        }
      }
    }
  }
</style>