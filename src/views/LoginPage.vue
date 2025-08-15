<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <h1 class="login-title">Welcome Back</h1>
        <p class="login-subtitle">Sign in to your Micro Blog account</p>
      </div>
      
      <form class="login-form">
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-input" placeholder="Enter your email" />
        </div>
        
        <div class="form-group">
          <label class="form-label">Password</label>
          <input type="password" class="form-input" placeholder="Enter your password" />
        </div>
        
        <div class="form-actions">
          <button type="submit" class="btn-login">Sign In</button>
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
// Login logic can go here
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/main.scss';
</style>
