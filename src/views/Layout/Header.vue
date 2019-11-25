<template>
  <div class="header-con">
    <div class="header-con-content">
      <BreadCrumb/>
    </div>
    <div class="header-con-right">
      <el-avatar icon="el-icon-user-solid" size="small"></el-avatar>
      <span class="avator-name">{{userName}}</span>
      <i class="el-icon-switch-button user-quit" @click="handleUserQuit"></i>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import BreadCrumb from '@/components/breadCrumb.vue';
import {
  State,
  Action,
  namespace,
} from 'vuex-class';
import { auth } from '@/utils/auth';

const loginModule = namespace('login');

@Component({
  components: {
    BreadCrumb,
  },
})
export default class Header extends Vue {
  // public userInfoFromLocale: any = null;
  // @loginModule.State('userInfo') public userInfo!: any;
  @loginModule.Action('userQuitAction') public userQuitAction!: () => Promise<any>;

  public userName: string = '';

  // @Watch('userInfo', { immediate: true, deep: true })
  // public userInfoGetters(n: any) {
  //   // console.log(n);
  //   if (!n) {
  //     this.userName = this.userInfoFromLocale.name ? this.userInfoFromLocale.name : '';
  //   } else {
  //     this.userName = n.name;
  //   }
  // }

  public mounted() {
    // this.userInfoFromLocale = auth.getUserInfo();
    console.log(auth.getUserInfo())
    this.userName = auth.getUserInfo().name;
  }

  public handleUserQuit() {
    this.userQuitAction()
      .then((res) => {
        if (res.code === '000000') {
          auth.logOut();
          this.$router.push({ name: 'login' });
        }
      })
      .catch();
  }
}
</script>
<style lang="scss">
@import '~@/styles/variables.scss';

.header-con {
  position: fixed;
  z-index: 998;
  width: 100%;
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  // background: #ccc;
  padding-left: $asiderWidth + 10px;
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(0,0,0,.28);

  &-content {
    float: left;
    height: 60px;
    line-height: 60px;
  }

  &-right {
    float: right;
    .el-avatar--icon {
      vertical-align: middle;
    }
    .avator-name {
      margin: 0 10px;
    }
    .user-quit {
      cursor: pointer;
    }
  }
}
</style>