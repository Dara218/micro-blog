import { computed, reactive, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { requiredField } from '@/composables/useValidationRules';
import { buildPostFormData, createPostRequest } from '@/services/user/post/postService';

/**
 * Composable for creating a new post with content, images, and videos.
 *
 * Provides form state, validation, and submission handling.
 *
 * @returns {Object} An object containing:
 * - {Object} form - The reactive form data (content, images, videos, toggles).
 * - {Object} v$ - Vuelidate validation state.
 * - {import('vue').Ref<boolean>} isSubmitting - Whether the form is submitting.
 * - {import('vue').ComputedRef<boolean>} isPostButtonDisabled - Whether the post button is disabled.
 * - {Function} onImageChange - Handles the image input field.
 * - {Function} onVideoChange - Handles the video input field.
 * - {Function} createPost - Handles creating the post (returns Promise<boolean|undefined>).
 */
export const useCreatePost = () => {
  const isSubmitting = ref(false);

  const form = reactive({
    content: '',
    images: [],
    videos: [],
    isAllowComments: true,
    isAllowShares: true,
  });

  // Checks if post submit button is disabled
  const isPostButtonDisabled = computed(() => {
    return !form.content.trim()
      && form.images.length === 0
      && form.videos.length === 0;
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
   * @param {Event} event - The input change event from an <input type="file"> element.
   *
   * @returns {void}
   */
  const onImageChange = (event) => {
    form.images = Array.from(event.target.files || []);

    // Retains the image when user cancels the image selection
    event.target.value = '';
  };

  /**
   * Handles the video input field.
   *
   * @param {Event} event - The input change event from an <input type="file"> element.
   *
   * @returns {void}
   */
  const onVideoChange = (event) => {
    form.videos = Array.from(event.target.files || []);

    // Retains the video when user cancels the video selection
    event.target.value = '';
  };

  /**
   * Process the creation of a post.
   *
   * @returns {Promise<boolean|undefined>} Returns true if post creation succeeds, 
   * undefined if validation fails or an error occurs.
   */
  const createPost = async () => {
    // Disable the submit button
    isSubmitting.value = true;

    const isFormValidated = await v$.value.$validate();

    // // log a plain snapshot so you can see values clearly
    // console.log('form:', {
    //   content: form.content,
    //   images: form.images.map((file) => file.name),
    //   video: form.video.map((file) => file.name),
    //   comments: form.isAllowComments,
    //   shares: form.isAllowShares,
    // });

    if (!isFormValidated || isPostButtonDisabled.value) {
      isSubmitting.value = false;

      return;
    };

    try {
      const formData = buildPostFormData({
        content: form.content,
        images: form.images,
        videos: form.videos,
        isAllowComments: form.isAllowComments,
        isAllowShares: form.isAllowShares,
      });

      // Send the data to the server
      createPostRequest(formData);

      return true;
    } catch (error) {
      console.error(error.response?.data);
    }
  };

  return {
    form,
    v$,
    isSubmitting,
    isPostButtonDisabled,
    onImageChange,
    onVideoChange,
    createPost,
  };
};