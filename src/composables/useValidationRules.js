import {
  email,
  helpers,
  minLength,
  required,
  sameAs,
  maxLength,
} from "@vuelidate/validators";

/**
 * Required fields.
 *
 * @param {*} fieldName The field name
 *
 * @returns string
 */
export const requiredField = (fieldName) => {
  return helpers.withMessage(`${fieldName} is required.`, required);
};

/**
 * Minimum length field.
 *
 * @param {*} fieldName The field name
 * @param {*} otherField The minimum length
 *
 * @returns string
 */
export const minLengthField = (fieldName, length) => {
  return helpers.withMessage(`${fieldName} must be at least ${length} characters.`, minLength(length));
};

/**
 * Maximum length field.
 *
 * @param {*} fieldName The field name
 * @param {*} otherField The maximum length
 *
 * @returns string
 */
export const maxLengthField = (fieldName, length, type) => {
  const maxFileErrorMessage = `Must not exceed ${length} ${fieldName}.`;

  return helpers.withMessage(
    type === 'file' ? maxFileErrorMessage : `${fieldName} must not exceed ${length} characters.`,
    maxLength(length));
};

/**
 * Same as other field.
 * 
 * @param {*} fieldName The field name
 * @param {*} otherField The field name to be compared to
 *
 * @returns string
 */
export const sameAsField = (fieldName, otherField) => {
  return helpers.withMessage(`${fieldName} must match.`, sameAs(otherField));
};

/**
 * Email validation field.
 *
 * @returns string
 */
export const emailField = () => {
  return helpers.withMessage(`Enter a valid email address.`, email);
};

/**
 * Password validation field.
 *
 * @returns boolean
 */
export const passwordField = () => {
  return helpers.withMessage(
    'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.',
    value => {
      if (!value) return false;

      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
    }
  );
};

/**
 * Checkbox validation field. 
 *
 * @param {*} fieldName 
 *
 * @returns string
 */
export const checkboxField = (fieldName) => {
  return helpers.withMessage(`Please check the ${fieldName}.`, sameAs(true));
};

/**
 * Max file size validation field. 
 *
 * @param {*} fieldName
 * @param {*} maxDb
 *
 * @returns string
 */
export const maxFileSize = (fieldName, maxMb) => {
  return helpers.withMessage(
    `Max ${maxMb}mb ${fieldName} is allowed.`,
    files => Array.isArray(files) && files.every(file => file.size <= maxMb * 1024 * 1024),
  );
};

/**
 * File type validation field. 
 *
 * @param {*} fieldName
 * @param {*} mimes
 *
 * @returns string
 */
export const fileType = (fieldName, mimes) => {
  const imageErrorMessage = 'Only png, jpg, jpeg, and gif are allowed.';

  return helpers.withMessage(
    fieldName === 'Image' ? imageErrorMessage : '',
    files => files.every(file => mimes.includes(file.type)),
  );
};
