<template>
  <div class="main-con" v-if="isLogin">
    <Header/>
    <Aside/>
    <Body/>
    <Footer/>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import {
  Action,
  namespace,
} from 'vuex-class';
import Aside from './Aside.vue';
import Body from './Body.vue';
import Header from './Header.vue';
import Footer from './Footer.vue';
import { auth } from '@/utils/auth';

const loginModle = namespace('login');

@Component({
  components: {
    Header,
    Aside,
    Body,
    Footer,
  },
})
export default class Layout extends Vue {
  public isLogin: boolean = false;
  @loginModle.Action('loginAction') public loginAction!: (data: any) => Promise<any>;

  // @Watch('$route')
  // public checkRouter() {
  //   const path: string = this.$route.path;
  //   if (path === '/login' || path === '/*') {
  //     this.isLogin = false;
  //   } else {
  //     this.isLogin = true;
  //   }
  // }

  // public created() {
  //   this.checkRouter();
  // }

  public mounted() {
    if (process.env.VUE_APP_ISCAS === 'notcas') {
       this.isLogin = true;
    } else {
      this.loginByCas();
    }
  }

  public loginByCas() {
    const { ticket } = this.$route.query;
    if (ticket) {
      this.loginAction({data: { ticket }})
        .then((res) => {
          this.isLogin = true;
          this.$router.push('/');
          // this.renderLayout();
        })
        .catch((err) => {
          auth.logOut();
        });
    } else {
      this.renderLayout();
    }
  }

  public renderLayout() {
    if (auth.isLoginIn()) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
      auth.logOut();
    }
  }

}
</script>
<style lang="scss">
  .main-con {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>