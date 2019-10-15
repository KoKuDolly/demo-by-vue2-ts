<template>
  <div class="page-con">
    <router-view/>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Body extends Vue {

}
</script>
<style lang="scss">
  .page-con {
    position: absolute;
    top: 60px;
    left: 200px;
    bottom: 60px;
    right: 0;
    padding: 20px;
    overflow: auto;
  }
</style>