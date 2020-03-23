<template>
    <div id="wrapper">
        <el-card id="form-container">
            <h4 class="prompt-text" style="margin:0 0 16px 0;text-align: left;font-size: 1.5rem">
                Sign up
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
                <el-form-item prop="passwordConfirm">
                    <label slot="label" class="prompt-text">确认密码<span class="star-sym">*</span></label>
                    <el-input v-model="form.passwordConfirm" type="password" clearable
                              placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="sign-in" @click="submitForm('form')">
                        注册
                    </el-button>
                </el-form-item>
            </el-form>
            <div style="margin: 1rem 0 0.5rem;text-align: left">
                <router-link to="/forget" id="fp">Forget password?</router-link>
            </div>
        </el-card>
    </div>
</template>

<script>
  export default {
    data() {
      const validateNoneEmpty = (rule, value, callback, message = ' ') => {
        if (!value) callback(new Error(message))
        else callback()
      }
      const validatePassword = (rule, value, callback, message) => {
        if (value === '') {
          validateNoneEmpty(rule, value, callback, message)
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        form: {
          username: '',
          password: '',
          passwordConfirm: '',
        }, rule: {
          username: [{validator: validateNoneEmpty, message: '请输入用户名', trigger: 'blur'}],
          password: [{validator: validateNoneEmpty, message: '请输入密码', trigger: 'blur'}],
          passwordConfirm: [{validator: validatePassword, message: '请再次输入密码', trigger: 'blur'}],
        },
      }
    }, methods: {
      submitForm(forName) {
        this.$refs[forName].validate(valid => {
          if (!valid) {
            this.$message.error('请按说明填写表单')
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
    html.Registration {
        background-image: url('../assets/Registration_Default.33f91ca1.digitalocean.gif');
        background-size: cover;
    }
</style>
