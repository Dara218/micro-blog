<template>
  <div class="home-page">
    <!-- Header -->
    <header class="home-header">
      <div class="header-container">
        <div class="header-left">
          <h1 class="logo">MicroBlog</h1>
        </div>
        <!-- Search -->
        <div class="header-center">
          <div class="search-bar">
            <input 
              type="text" 
              placeholder="Search posts, users..." 
              class="search-input"
            />
            <button class="search-btn">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>
        </div>
        <!-- Create post button -->
        <div class="header-right">
          <button class="btn-create-post">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Create Post
          </button>
          <div class="user-menu">
            <div class="user-avatar">
              <img src="https://via.placeholder.com/40x40/3b82f6/ffffff?text=U" alt="User" />
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="home-main">
      <div class="main-container">
        <!-- Sidebar -->
        <aside class="sidebar">
          <div class="sidebar-content">
            <div class="user-profile-card">
              <div class="profile-avatar">
                <img src="https://via.placeholder.com/80x80/3b82f6/ffffff?text=U" alt="User" />
              </div>
              <h3 class="profile-name">John Doe</h3>
              <p class="profile-username">@johndoe</p>
              <div class="profile-stats">
                <div class="stat">
                  <span class="stat-number">42</span>
                  <span class="stat-label">Posts</span>
                </div>
                <div class="stat">
                  <span class="stat-number">1.2k</span>
                  <span class="stat-label">Followers</span>
                </div>
                <div class="stat">
                  <span class="stat-number">856</span>
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

        <!-- Feed -->
        <section class="feed">
          <!-- Create Post Card -->
          <form class="create-post-card" @submit.prevent="createPost">
            <div class="form flex-col">
              <div class="create-post-header">
                <div class="user-avatar-small">
                  <img src="https://via.placeholder.com/40x40/3b82f6/ffffff?text=U" alt="User" />
                </div>
                <div class="w-full flex-1">
                  <textarea 
                    class="create-post-input w-full" 
                    placeholder="What's on your mind?"
                    rows="3"
                    v-model="form.content"
                  ></textarea>
                  <p class="text-red-500" v-if="v$.content.$error">{{ v$.content.$errors[0].$message }}</p>
                </div>
              </div>
            </div>

            <div class="create-post-actions">
              <label class="action-btn file-input-label">
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  class="file-input"
                  @change="onImageChange"
                />
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span>Photo</span>
              </label>

              <label class="action-btn file-input-label">
                <input 
                  type="file" 
                  accept="video/*" 
                  multiple 
                  class="file-input"
                  @change="onVideoChange"
                />
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
                <span>Video</span>
              </label>

              <button class="action-btn">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                <span>Poll</span>
              </button>

              <button class="action-btn">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>Location</span>
              </button>

              <button class="action-btn">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Mood</span>
              </button>
            </div>

            <div class="create-post-footer">
              <div class="post-options">
                <label class="option-item">
                  <input type="checkbox" v-model="form.isAllowComments"/>
                  <span>Allow comments</span>
                </label>
                <label class="option-item">
                  <input type="checkbox" v-model="form.isAllowShares"/>
                  <span>Allow shares</span>
                </label>
              </div>
              <button type="submit" class="btn-post" :disabled="isPostButtonDisabled">
                Post
              </button>
            </div>
          </form>

          <!-- Posts Feed -->
          <div class="posts-feed">
            <!-- Sample Post 1 -->
            <article class="post-card">
              <div class="post-header">
                <div class="post-author">
                  <div class="author-avatar">
                    <img src="https://via.placeholder.com/40x40/10b981/ffffff?text=J" alt="Jane Smith" />
                  </div>
                  <div class="author-info">
                    <h4 class="author-name">Jane Smith</h4>
                    <p class="post-meta">@janesmith • 2h ago</p>
                  </div>
                </div>
                <button class="post-menu">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                  </svg>
                </button>
              </div>
              
              <div class="post-content">
                <p class="post-text">
                  Just finished reading an amazing book about productivity! 📚 The key takeaway: focus on systems, not goals. 
                  What's the best productivity tip you've learned recently?
                </p>
                <div class="post-image">
                  <img src="https://via.placeholder.com/500x300/f3f4f6/6b7280?text=Book+Photo" alt="Book" />
                </div>
              </div>
              
              <div class="post-actions">
                <button class="action-btn">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                  <span>24</span>
                </button>
                <button class="action-btn">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                  </svg>
                  <span>8</span>
                </button>
                <button class="action-btn">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                  </svg>
                  <span>Share</span>
                </button>
              </div>
            </article>

            <!-- Sample Post 2 -->
            <article class="post-card">
              <div class="post-header">
                <div class="post-author">
                  <div class="author-avatar">
                    <img src="https://via.placeholder.com/40x40/8b5cf6/ffffff?text=M" alt="Mike Johnson" />
                  </div>
                  <div class="author-info">
                    <h4 class="author-name">Mike Johnson</h4>
                    <p class="post-meta">@mikej • 4h ago</p>
                  </div>
                </div>
                <button class="post-menu">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                  </svg>
                </button>
              </div>
              
              <div class="post-content">
                <p class="post-text">
                  Beautiful sunset from my hike today! 🌅 Nature never fails to amaze me. 
                  #hiking #nature #sunset #photography
                </p>
                <div class="post-image">
                  <img src="https://via.placeholder.com/500x400/fbbf24/ffffff?text=Sunset+View" alt="Sunset" />
                </div>
              </div>
              
              <div class="post-actions">
                <button class="action-btn">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                  <span>156</span>
                </button>
                <button class="action-btn">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                  </svg>
                  <span>23</span>
                </button>
                <button class="action-btn">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                  </svg>
                  <span>Share</span>
                </button>
              </div>
            </article>

            <!-- Sample Post 3 -->
            <article class="post-card">
              <div class="post-header">
                <div class="post-author">
                  <div class="author-avatar">
                    <img src="https://via.placeholder.com/40x40/ef4444/ffffff?text=S" alt="Sarah Wilson" />
                  </div>
                  <div class="author-info">
                    <h4 class="author-name">Sarah Wilson</h4>
                    <p class="post-meta">@sarahw • 6h ago</p>
                  </div>
                </div>
                <button class="post-menu">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                  </svg>
                </button>
              </div>
              
              <div class="post-content">
                <p class="post-text">
                  Just launched my new project! 🚀 It's been months of hard work, but seeing it come to life is incredible. 
                  Thank you to everyone who supported me along the way!
                </p>
              </div>
              
              <div class="post-actions">
                <button class="action-btn">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                  <span>89</span>
                </button>
                <button class="action-btn">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                  </svg>
                  <span>15</span>
                </button>
                <button class="action-btn">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                  </svg>
                  <span>Share</span>
                </button>
              </div>
            </article>
          </div>
        </section>

        <!-- Right Sidebar -->
        <aside class="right-sidebar">
          <div class="sidebar-content">
            <!-- Trending Topics -->
            <div class="trending-card">
              <h3 class="card-title">Trending Topics</h3>
              <div class="trending-list">
                <div class="trending-item">
                  <span class="trending-tag">#productivity</span>
                  <span class="trending-count">2.3k posts</span>
                </div>
                <div class="trending-item">
                  <span class="trending-tag">#photography</span>
                  <span class="trending-count">1.8k posts</span>
                </div>
                <div class="trending-item">
                  <span class="trending-tag">#technology</span>
                  <span class="trending-count">3.1k posts</span>
                </div>
                <div class="trending-item">
                  <span class="trending-tag">#nature</span>
                  <span class="trending-count">1.5k posts</span>
                </div>
                <div class="trending-item">
                  <span class="trending-tag">#startup</span>
                  <span class="trending-count">892 posts</span>
                </div>
              </div>
            </div>

            <!-- Suggested Users -->
            <div class="suggested-card">
              <h3 class="card-title">Suggested for you</h3>
              <div class="suggested-list">
                <div class="suggested-user">
                  <div class="user-avatar-small">
                    <img src="https://via.placeholder.com/32x32/06b6d4/ffffff?text=A" alt="Alex" />
                  </div>
                  <div class="user-info">
                    <h4 class="user-name">Alex Chen</h4>
                    <p class="user-username">@alexchen</p>
                  </div>
                  <button class="follow-btn">Follow</button>
                </div>
                <div class="suggested-user">
                  <div class="user-avatar-small">
                    <img src="https://via.placeholder.com/32x32/84cc16/ffffff?text=E" alt="Emma" />
                  </div>
                  <div class="user-info">
                    <h4 class="user-name">Emma Davis</h4>
                    <p class="user-username">@emmadavis</p>
                  </div>
                  <button class="follow-btn">Follow</button>
                </div>
                <div class="suggested-user">
                  <div class="user-avatar-small">
                    <img src="https://via.placeholder.com/32x32/f59e0b/ffffff?text=R" alt="Ryan" />
                  </div>
                  <div class="user-info">
                    <h4 class="user-name">Ryan Miller</h4>
                    <p class="user-username">@ryanmiller</p>
                  </div>
                  <button class="follow-btn">Follow</button>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup>
  import axios from 'axios';
  import useVuelidate from '@vuelidate/core';
  import { computed, reactive } from 'vue';
  import { requiredField } from '@/composables/validationRules';

  const form = reactive({
    content: '',
    images: [],
    video: [],
    isAllowComments: true,
    isAllowShares: true,
  });

  const isPostButtonDisabled = computed(() => {
    return !form.content.trim() && form.images.length === 0 && form.video.length === 0;
  });

  // The validation rules
  const rules = computed(() => {
    return {
      content: { required: requiredField('Content') },
    };
  });

  const v$ = useVuelidate(rules, form);

  /**
   * Handles the image input field.
   *
   * @param event
   */
  const onImageChange = (event) => {
    form.images = Array.from(event.target.files || []);

    // Retains the image when user cancels the image selection
    event.target.value = '';
  };

  /**
   * Handles the video input field.
   *
   * @param event
   */
  const onVideoChange = (event) => {
    form.video = Array.from(event.target.files || []);

    // Retains the video when user cancels the video selection
    event.target.value = '';
  };

  /**
   * Process the creation of post.
   */
  const createPost = async () => {
    // Call the validation
    const isFormValidated = await v$.value.$validate();

    // log a plain snapshot so you can see values clearly
    console.log('form:', {
      content: form.content,
      images: form.images.map((file) => file.name),
      video: form.video.map((file) => file.name),
      comments: form.isAllowComments,
      shares: form.isAllowShares,
    });

    if (!isFormValidated || isPostButtonDisabled.value) return;

    try {
      const formData = new FormData();

      formData.append('content', form.content);
      form.images.forEach(file => formData.append('images[]', file));
      form.video.forEach(file => formData.append('videos[]', file));
      formData.append('allow_comments', String(form.isAllowComments));
      formData.append('allow_shares', String(form.isAllowShares));

      // axios.post('/api/post/store', formData);
    } catch (error) {
      console.error(error.response?.data);
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/main.scss';
</style>
