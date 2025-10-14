<template>
  <!-- Replies Section -->
  <div class="replies-container">
    <!-- Reply 1 -->
    <div v-for="reply in props.replies" :key="reply.id" class="reply-item">
      <div class="reply-connector"></div>
      <div class="author-avatar">
        <img :src="reply.user.avatar_url ?? DEFAULT_USER_AVATAR" :alt="reply.user.avatar_url ?? DEFAULT_USER_AVATAR" />
      </div>
      <div class="reply-body">
        <div class="reply-meta">
          <span class="reply-name">{{ reply.user.name }}</span>
          <span class="reply-time">• 45m</span>
        </div>
        <p class="reply-text">{{ reply.content }}</p>
        <div class="reply-actions">
          <button class="reply-action-btn like-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>3</span>
          </button>
          <button class="reply-action-btn reply-btn">
            Reply
          </button>
        </div>

        <!-- Recursive call / Nested Reply -->
        <Reply
          v-if="reply.replies && reply.replies.length"
          :replies="reply.replies"
          class="nested-replies ml-2"
        />
      </div>
    </div>
  </div>
</template>

<script setup>

  import { DEFAULT_USER_AVATAR } from '@/constants';

  const props = defineProps({
    replies: { type: Array, default: [] },
  })
</script>
