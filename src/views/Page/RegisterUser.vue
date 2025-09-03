<template>
  <div class="register-page">
    <div class="register-container">
      <div class="register-header">
        <h1 class="register-title">Create Account</h1>
        <p class="register-subtitle">Join our micro-blogging community today</p>
      </div>

      <form class="register-form" @submit.prevent="register">
        <!-- Personal Information -->
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">First Name</label>
            <input
              type="text"
              class="form-input"
              placeholder="Enter your first name"
              v-model="form.firstName"
              autocomplete="given-name"
            />
            <p class="text-red-500" v-if="v$.firstName.$error">{{ v$.firstName.$errors[0].$message }}</p>
          </div>

          <div class="form-group">
            <label class="form-label">Last Name</label>
            <input
              type="text"
              class="form-input"
              placeholder="Enter your last name"
              v-model="form.lastName"
              autocomplete="family-name"
            />
            <p class="text-red-500" v-if="v$.lastName.$error">{{ v$.lastName.$errors[0].$message }}</p>
          </div>
        </div>

        <!-- UserName -->
        <div class="form-group">
          <label class="form-label">User Name</label>
          <input
            type="text"
            class="form-input"
            placeholder="Choose a unique userName"
            v-model="form.userName"
            autocomplete="userName"
          />
          <p class="text-red-500" v-if="v$.userName.$error">{{ v$.userName.$errors[0].$message }}</p>
        </div>

        <!-- Email -->
        <div class="form-group">
          <label class="form-label">Email</label>
          <input
            type="email"
            class="form-input"
            placeholder="Enter your email address"
            v-model="form.email"
            autocomplete="email"
          />
          <p class="text-red-500" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</p>
        </div>

        <!-- Password -->
        <div class="form-group">
          <label class="form-label">Password</label>
          <input
            type="password"
            class="form-input"
            placeholder="Create a strong password"
            v-model="form.password"
            autocomplete="new-password"
          />
          <div class="text-red-500" v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</div>
        </div>

        <!-- Confirm Password -->
        <div class="form-group">
          <label class="form-label">Confirm Password</label>
          <input
            type="password"
            class="form-input"
            placeholder="Confirm your password"
            v-model="form.confirmPassword"
            autocomplete="new-password"
          />
          <div class="text-red-500" v-if="v$.confirmPassword.$error">{{ v$.confirmPassword.$errors[0].$message }}</div>
        </div>

        <!-- Terms and Conditions -->
        <div class="terms-checkbox flex-col">
          <div class="flex items-center gap-2">
            <input
            type="checkbox"
            id="terms"
            :checked="form.isPolicyAgree"
            v-model="form.isPolicyAgree"
          />
          <label for="terms">
            I agree to the 
            <a href="#" >Terms of Service</a> 
            and 
            <a href="#" >Privacy Policy</a>
          </label>
        </div>
          <p class="text-red-500" v-if="v$.isPolicyAgree.$error">{{ v$.isPolicyAgree.$errors[0].$message }}</p>
        </div>

        <!-- Form Actions -->
        <div class="form-actions">
          <button type="submit" class="btn-register" :disabled="isSubmitBtnDisabled">Create Account</button>
          <RouterLink to="/" class="btn-back">Back to Home</RouterLink>
        </div>
      </form>

      <div class="register-footer">
        <p>Already have an account? <RouterLink to="/login" class="login-link">Sign in</RouterLink></p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import axios from 'axios';
  import { computed, reactive, ref } from 'vue';
  import { RouterLink } from 'vue-router';
  import useVuelidate from '@vuelidate/core';
  import {
    emailField,
    minLengthField,
    requiredField,
    sameAsField,
    passwordField,
    checkboxField,
  } from '@/composables/validationRules';

  const isSubmitBtnDisabled = ref(false);

  const form = reactive({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    isPolicyAgree: false,
  });

  // The validation rules
  const rules = computed(() => {
    return {
      firstName: { required: requiredField('First Name') },
      lastName: { required: requiredField('Last Name') },
      userName: {
        required: requiredField('User Name'),
        minLength: minLengthField('User Name', 4),
      },
      email: {
        required: requiredField('Email Address'),
        email: emailField(),
      },
      password: {
        required: requiredField('Password'),
        strong: passwordField(),
      },
      confirmPassword: {
        required: requiredField('Confirm Password'),
        sameAs: sameAsField('Confirm Password', form.password),
      },
      isPolicyAgree: {
        sameAs: checkboxField('Terms & Policy'),
      },
    };
  });

  const v$ = useVuelidate(rules, form);

  const register = async () => {
    // Disable the submit button on form submit
    isSubmitBtnDisabled.value = true;

    // Call the validation
    const isFormValidated = await v$.value.$validate();

    // Check if the validation fails and policy is not checked
    if (!isFormValidated || !form.isPolicyAgree) {
      isSubmitBtnDisabled.value = false;

      return;
    };

    try {
      // const response = axios.post('/api/register', { ...form });
    } catch (error) {
      console.error(error.response?.data);
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/main.scss';
</style>
