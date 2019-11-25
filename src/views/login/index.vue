<template>
  <div class="login-con">
    <div class="login-con-body">
      <div class="login-con-body-content">
        <header class="login-con-body-content-title">
          信息平台
        </header>
        <el-form :model="formData" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="formData.userName" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="formData.password" placeholder="请输入密码" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleLogin">登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {
  Action,
  namespace,
} from 'vuex-class';

const loginModle = namespace('login');

@Component
export default class Login extends Vue {
  @loginModle.Action('loginAction') public loginAction!: (data: any) => Promise<any>;
  public formData: any = {
    userName: '',
    password: '',
  };

  public handleLogin() {
    this.loginAction({data: this.formData})
      .then((res) => {
        this.$router.push('/');
      })
      .catch((err) => {
        this.$message({
          message: err.message,
          type: 'error',
        });
      });
  }
}
</script>
<style lang="scss">
  .login-con {
    width: 100%;
    height: 100%;
    &-body {
      position: relative;
      width: 100%;
      height: 100%;
      &-content {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        padding: 20px;
        background: rgba(61, 204, 185, 0.4);
        &-title {
          text-align: center;
          font-size: 24px;
          margin-bottom: 22px;
        }
      }
    }
    button[type=button]{
      width: 100%;
    }
  }
</style>
