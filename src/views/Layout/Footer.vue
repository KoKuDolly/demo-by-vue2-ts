<template>
  <div class="footer-con">
    2019 恐怖南瓜03
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {

}
</script>
<style lang="scss">
@import '~@/styles/variables.scss';
  .footer-con {
    position: absolute;
    z-index: 998;
    width: 100%;
    height: 60px;
    padding-left: 200px;
    line-height: 60px;
    bottom: 0;
    right: 0;
    background: $footerBgColor;
    text-align: center;
  }
</style>