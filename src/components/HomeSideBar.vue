!<template>
  <aside class="sidebar">
    <div class="sidebar-content">
      <div class="user-profile-card">
        <div class="profile-avatar">
          <img :src="props.avatarUrl" :alt="props.avatarUrl" />
        </div>
        <h3 class="profile-name">{{ props.name }}</h3>
        <p class="profile-username">@johndoe</p>
        <div class="profile-stats">
          <div class="stat">
            <span class="stat-number">{{ props.postCount }}</span>
            <span class="stat-label">Posts</span>
          </div>
          <div class="stat">
            <!-- Todo: Add "k", "m", "b" if million, etc. -->
            <span class="stat-number">{{ props.followerCount }}</span>
            <span class="stat-label">Followers</span>
          </div>
          <div class="stat">
            <span class="stat-number">{{ props.followingCount }}</span>
            <span class="stat-label">Following</span>
          </div>
        </div>
      </div>

      <nav class="sidebar-nav">
        <a href="#" class="nav-item active">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
          </svg>
          Home
        </a>
        <a href="#" class="nav-item">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
          </svg>
          Explore
        </a>
        <a href="#" class="nav-item">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
          Notifications
        </a>
        <a href="#" class="nav-item">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
          Messages
        </a>
      </nav>
    </div>
  </aside>
</template>

<script setup>
  import { defineProps } from 'vue';

  const props = defineProps([
    'avatarUrl',
    'name',
    'postCount',
    'followerCount',
    'followingCount',
  ]);
</script>