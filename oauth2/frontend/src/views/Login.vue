<template>
    <div id="wrapper">
        <el-card id="form-container">
            <h4 class="prompt-text" style="margin:0 0 16px 0;text-align: left;font-size: 1.5rem">
                Sign in to your account
            </h4>
            <el-form :model="form" :rules="rule" ref="form">
                <el-form-item prop="username">
                    <label slot="label" class="prompt-text">用户名<span class="star-sym">*</span></label>
                    <el-input v-model="form.username" clearable placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <label slot="label" class="prompt-text">密码<span class="star-sym">*</span></label>
                    <el-input v-model="form.password" type="password" clearable
                              placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="sign-in" @click="submitForm('form')">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
            <div style="margin: 1rem 0 0.5rem;text-align: left">
                <router-link to="/forget" id="fp">忘记密码？</router-link>
            </div>
        </el-card>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          username: '',
          password: '',
        }, rule: {
          username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        },
      }
    }, methods: {
      submitForm(forName) {
        this.$refs[forName].validate(valid => {
          if (!valid) {
            this.$message.error('请填写用户名密码')
            return
          }

        })
      },
    },
  }
</script>

<style scoped>
    #fp {
        color: #0061eb;
        font-weight: initial;
        font-size: 16px
    }

    .sign-in {
        background-color: #0061eb;
        color: white;
        width: 100%;
    }

    .sign-in:hover {
        background-color: #3387ff;
    }

    #form-container {
        margin: 2rem auto auto auto;
        padding-top: 0;
        width: 22rem;
        font-weight: 600;
    }

    .star-sym {
        color: #3387ff;
    }

    .prompt-text {
        color: #031b4e;
        margin-left: 0;
    }

    label {
        font-weight: 400;
    }
</style>
<style>
    html.Login {
        background-image: url('../assets/Login_Default.8d17b815.digitalocean.jpg');
        background-size: cover;
    }
</style>
