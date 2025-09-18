<template>
  <div class="home-page">
    <!-- Header -->
    <header class="home-header">
      <div class="header-container">
        <div class="header-left">
          <h1 class="logo">MicroBlog</h1>
        </div>

        <!-- Search -->
        <SearchForm />

        <!-- Create post button -->
        <div class="header-right">
          <button class="btn-create-post" @click="toggleCreatePostModal(false)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Create Post
          </button>
          <div class="user-menu">
            <div class="user-avatar">
              <img :src="auth.user.avatar_url ?? DEFAULT_USER_AVATAR" :alt="auth.user.avatar_url" />
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="home-main">
      <div class="main-container">
        <!-- Sidebar -->
        <HomeSideBar
          :avatarUrl="avatarUrl"
          :name="auth.user.name"
          :postCount="userStats.posts_count"
          :followerCount="userStats.follower_count"
          :followingCount="userStats.following_count"
        />

        <!-- Feed -->
        <section class="feed">
          <!-- Create new post form -->
          <CreatePostForm
            :userAvatar="avatarUrl"
            :userId="auth.user.id"
            @new-post="prependNewPost"
          />

          <!-- Posts Feed -->
          <div class="posts-feed" v-for="homePost in homePosts" :key="homePost.id">
            <UserPostCard
              :avatarUrl="homePost.user?.avatar_url"
              :name="homePost.user?.name"
              :content="homePost.content"
              :media="homePost.media"
            />
          </div>
        </section>

        <!-- Right Sidebar -->
        <HomeRightBar />
      </div>
    </main>
  </div>

  <CreatePostModal
    :userAvatar="avatarUrl"
    :userId ="auth.user.id"
    @new-post="toggleCreatePostModal"
    v-if="isCreatePostModalOpen"
  />
</template>

<script setup>
  // Vue core
  import { computed, onMounted, ref } from 'vue';

  // Composables, constants, and stores
  import { useAuthStore } from '@/stores/useAuthStore';
  import { DEFAULT_USER_AVATAR } from '@/constants';

  // Services
  import { getHomePost } from '@/services/post/postService';
  import { getUserStats } from '@/services/user/authentication/authUserService';

  // Components
  import CreatePostModal from '@/components/post/CreatePostModal.vue';
  import UserPostCard from '@/components/post/UserPostCard.vue';
  import HomeRightBar from '@/components/HomeRightBar.vue';
  import HomeSideBar from '@/components/HomeSideBar.vue';
  import SearchForm from '@/components/SearchForm.vue';
  import CreatePostForm from '@/components/post/CreatePostForm.vue';

  const homePosts = ref([]);
  const userStats = ref({});

  const auth = useAuthStore();
  const avatarUrl = computed(() => auth.user.avatar_url || DEFAULT_USER_AVATAR);

  onMounted(async () => {
    try {
      await auth.getAuthenticatedUser();
      const userId = auth.user.id;

      // Get the posts of the authenticated user + friends post
      const initialHomePosts = await getHomePost(userId);

      // Get the authenticated user's stats (posts, followers, and following counts)
      const initialUserStats = await getUserStats(userId);

      homePosts.value = initialHomePosts.data.posts;
      userStats.value = initialUserStats.data.user;
    } catch (error) {
      console.error('Error loading home data.', error);
    }
  });

  const isCreatePostModalOpen = ref(false);

  const toggleCreatePostModal = (newPost) => {
    isCreatePostModalOpen.value = !isCreatePostModalOpen.value

    if (newPost) prependNewPost(newPost);
  };

  const prependNewPost = (newPost) => homePosts.value.unshift(newPost);
</script>
