<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Welcome to Micro Blog</h1>
        <p class="hero-subtitle">
          Share your thoughts, connect with others, and discover amazing content in our micro-blogging community.
        </p>
        <div class="cta-buttons">
          <RouterLink class="btn btn-primary" to="/login">Login</RouterLink>
          <RouterLink class="btn btn-secondary" to="/register">Register</RouterLink>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="features-grid">
        <div class="card card-feature">
          <div class="card-icon">🚀</div>
          <h3 class="card-title">Fast & Simple</h3>
          <p class="card-description">
            Share your thoughts quickly with our streamlined posting interface designed for modern users.
          </p>
        </div>
        
        <div class="card card-feature">
          <div class="card-icon">🔗</div>
          <h3 class="card-title">Connect & Share</h3>
          <p class="card-description">
            Build meaningful connections with like-minded individuals and share your passions.
          </p>
        </div>
        
        <div class="card card-feature">
          <div class="card-icon">📱</div>
          <h3 class="card-title">Mobile First</h3>
          <p class="card-description">
            Optimized for all devices with a responsive design that looks great on any screen.
          </p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <p>&copy; 2024 Micro Blog. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
  import { RouterLink } from 'vue-router';

  // Component logic can go here
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/main.scss';
</style>