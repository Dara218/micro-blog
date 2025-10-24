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
          <PostActions
            :authUserId="props.authUserId"
            :likeCount="reply.like_count || 0"
            :postId="reply.id"
            :isLiked="reply.is_liked || false"
            type="comment"
            @like-updated="(likeData) => $emit('reply-like-updated', { replyId: reply.id, ...likeData })"
          />
          <button class="reply-action-btn reply-btn">
            Reply
          </button>
        </div>

        <!-- Recursive call / Nested Reply -->
        <Reply
          v-if="reply.replies && reply.replies.length"
          :replies="reply.replies"
          :authUserId="props.authUserId"
          @reply-like-updated="(likeData) => $emit('reply-like-updated', likeData)"
          class="nested-replies ml-2"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { DEFAULT_USER_AVATAR } from '@/constants';
  import PostActions from '../post/PostActions.vue';

  const emit = defineEmits(['reply-like-updated']);

  const props = defineProps({
    authUserId: { type: Number, default: null },
    replies: { type: Array, default: [] },
  })
</script>
