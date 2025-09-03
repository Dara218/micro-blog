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
          <p class="text-red-500" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</p>
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
          <p class="text-red-500" v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</p>
        </div>
        
        <div class="form-actions">
          <button type="submit" class="btn-login" :disabled="isSubmitBtnDisabled">Sign In</button>
          <button type="button" class="btn-forgot">Forgot Password?</button>
        </div>
      </form>

      <div class="login-footer">
        <p>Don't have an account? <RouterLink to="/register" class="signup-link">Sign up</RouterLink></p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import axios from 'axios';
  import { requiredField } from '@/composables/useValidationRules';
  import useVuelidate from '@vuelidate/core';
  import {
    computed,
    reactive,
    ref,
  } from 'vue';
  import {
    RouterLink,
    useRouter,
  } from 'vue-router';

  const router = useRouter();
  const isSubmitBtnDisabled = ref(false);
  const form = reactive({
    email: '',
    password: '',
  })

  // The validation rules
  const rules = computed(() => {
    return {
      email: { required: requiredField('Email Address') },
      password: { required: requiredField('Password') },
    };
  });

  const v$ = useVuelidate(rules, form);

  /**
   * Process login user.
   */
  const login = async () => {
    const isFormValidated = await v$.value.$validate();
    
    console.log(isFormValidated);
    

    if (!isFormValidated) return;

    try {
      isSubmitBtnDisabled.value = true;
      // await axios.post('/api/login', { ...form })

      // Note: Temporary
      router.push('/home');
    } catch (error) {
      console.error(error.response?.data);
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/main.scss';
</style>
