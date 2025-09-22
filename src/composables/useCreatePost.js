import { computed, reactive, ref } from 'vue';
import { fileType, maxFileSize, maxLengthField } from '@/composables/useValidationRules';
import { buildPostFormData, createPost } from '@/services/post/postService';
import { VALIDATION } from '@/constants/validation';
import useVuelidate from '@vuelidate/core';

/**
 * Composable for creating a new post with content, images, and videos.
 * Provides form state, validation, and submission handling.
 *
 * @param userId - The user id
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
export const useCreatePost = (userId) => {
  const isSubmitting = ref(false);

  const createDefaultForm = (userId) => ({
    user_id: userId,
    content: '',
    images: [],
    videos: [],
    isAllowComments: true,
    isAllowShares: true,
  });
  const form = reactive(createDefaultForm(userId));

  const resetForm = () => {
    Object.assign(form, createDefaultForm(userId));

    v$.value.$reset();
  };

  // The validation rules
  const rules = computed(() => {
    return {
      content: { maxLength: maxLengthField('Post', 255) },
      images: {
        fileType: fileType('Image', VALIDATION.image_mimes),
        fileSize: maxFileSize('Image', 5),
        maxFiles: maxLengthField('Image', 10, 'file'),
      },
      videos: {
        fileType: fileType('Video', VALIDATION.video_mimes),
        fileSize: maxFileSize('Video', 25), // 25MB limit
        maxFiles: maxLengthField('Video', 4, 'file'),
      }
    };
  });
  const v$ = useVuelidate(rules, form);

  /**
   * Checks if post submit button is disabled.
   *
   * @returns {void}
   */
  const isPostButtonDisabled = computed(() => {
    return !form.content.trim()
      && form.images.length === 0
      && form.videos.length === 0;
  });

  /**
   * Handles the image input field.
   *
   * @param {Event} event
   *
   * @returns {void}
   */
  const onImageChange = (event) => {
    form.images = Array.from(event.target.files || []);

    // Trigger validation for the images field
    v$.value.images.$touch();

    // Retains the image when user cancels the image selection
    event.target.value = '';
  };

  /**
   * Handles the video input field.
   *
   * @param {Event} event
   *
   * @returns {void}
   */
  const onVideoChange = (event) => {
    form.videos = Array.from(event.target.files || []);

    // Trigger validation for the videos field
    v$.value.videos.$touch();

    // Retains the video when user cancels the video selection
    event.target.value = '';
  };

  /**
   * Process the creation of a post.
   *
   * @returns {Promise<boolean|undefined>} Returns true if post creation succeeds
   */
  const processPost = async () => {
    // Disable the submit button
    isSubmitting.value = true;

    const isFormValidated = await v$.value.$validate();

    if (!isFormValidated || isPostButtonDisabled.value) {
      isSubmitting.value = false;

      return;
    };

    try {
      const formData = buildPostFormData({
        userId: form.user_id,
        content: form.content,
        images: form.images,
        videos: form.videos,
        isAllowComments: form.isAllowComments,
        isAllowShares: form.isAllowShares,
      });

      // Send the data to the server
      const { data } = await createPost(formData);
      if (!data.success) return false;

      return data.post;
    } catch (error) {
      // Re-enable the button if server error
      isSubmitting.value = false;

      throw error.response?.data.message;
    } finally {
      isSubmitting.value = false;

      resetForm();
    }
  };

  return {
    form,
    v$,
    isSubmitting,
    isPostButtonDisabled,
    onImageChange,
    onVideoChange,
    processPost,
  };
};