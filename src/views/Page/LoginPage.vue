<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <h1 class="login-title">Welcome Back</h1>
        <p class="login-subtitle">Sign in to your Micro Blog account</p>
      </div>
      
      <form class="login-form" @submit.prevent="login">
        <div class="form-group">
          <label class="form-label">Email</label>
          <input
            type="text"
            class="form-input"
            placeholder="Enter your email"
            v-model="form.email"
            autocomplete="on"
          />
        </div>
        
        <div class="form-group">
          <label class="form-label">Password</label>
          <input
            type="password"
            class="form-input"
            placeholder="Enter your password"
            v-model="form.password"
            autocomplete="off"
          />
        </div>
        
        <div class="form-actions">
          <button type="submit" class="btn-login" :disabled="isDisabled">Sign In</button>
          <button type="button" class="btn-forgot">Forgot Password?</button>
        </div>
      </form>

      <div class="login-footer">
        <p>Don't have an account? <a href="#" class="signup-link">Sign up</a></p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive, ref } from 'vue';
  import axios from 'axios';
  import router from '@/router';

  const isDisabled = ref(false);
  const form = reactive({
    email: '',
    password: '',
  })
  
  const login = async () => {
    try {
      isDisabled.value = true;
      // await axios.post('/api/login', { ...form })

      router.push('/home');
    } catch (error) {
      console.error(error.response?.data);
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/main.scss';
</style>
