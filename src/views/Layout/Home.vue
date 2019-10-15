<template>
  <div class="main-con">
    简单大方的home页
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {

}
</script>
<style lang="scss">
  .main-con {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>