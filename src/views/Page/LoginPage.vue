<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <h1 class="login-title">Welcome Back</h1>
        <p class="login-subtitle">Sign in to your Micro Blog account</p>
      </div>
      
      <form class="login-form" @submit.prevent="handleLogin">
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
          <div class="text-red-500 text-center mt-3" v-if="auth.error">{{ auth.error }}</div>
        </div>
      </form>

      <div class="login-footer">
        <p>Don't have an account? <RouterLink to="/register" class="signup-link">Sign up</RouterLink></p>
      </div>
    </div>
  </div>
</template>

<script setup>
  // Vue core & Router
  import { computed, reactive, ref } from 'vue';
  import { RouterLink, useRouter } from 'vue-router';

  // Validation
  import useVuelidate from '@vuelidate/core';
  import { requiredField } from '@/composables/useValidationRules';

  // Store
  import { useAuthStore } from '@/stores/useAuthStore';

  const router = useRouter();
  const auth = useAuthStore();

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
   * 
   * @returns {void}
   */
  const handleLogin = async () => {
    const isFormValidated = await v$.value.$validate();
    if (!isFormValidated) return;

    try {
      isSubmitBtnDisabled.value = true;

      // Login the user
      await auth.login({ ...form });

      // If login details is correct
      if (!auth.error) router.push('/home');
    } catch (error) {
      isSubmitBtnDisabled.value = false;
      form.password = '';

      v$.value.password.$reset();
    }
  };
</script>

<style lang="scss" scoped>
  @use '@/assets/styles/main.scss';
</style>