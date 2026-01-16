/**
 * Escapes special characters in strings for safe use in SVG/XML contexts
 * Prevents XSS vulnerabilities
 */
export const escapeSVG = (str) => {
  if (!str) return '';
  return String(str).replace(/[<>&'"]/g, (char) => {
    const entities = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      "'": '&apos;',
      '"': '&quot;'
    };
    return entities[char];
  });
};

/**
 * Formats gender strings consistently
 * @param {string} gender - Gender identifier (Male/Female/m/f)
 * @returns {string} Formatted gender string with emoji
 */
export const formatGender = (gender) => {
  if (!gender || typeof gender !== 'string') return '';
  const normalized = gender.toLowerCase();
  if (normalized === 'male' || normalized === 'm') {
    return '👨 Male';
  }
  if (normalized === 'female' || normalized === 'f') {
    return '👩 Female';
  }
  return '';
};

/**
 * Formats a date string with optional weekday
 * @param {string} dateString - ISO date string
 * @param {boolean} includeWeekday - Whether to include day of week
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString, includeWeekday = false) => {
  if (!dateString) return '';
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  if (includeWeekday) {
    options.weekday = 'long';
  }
  return new Date(dateString).toLocaleDateString('en-US', options);
};

/**
 * Validates that a character name is a valid string
 * @param {any} name - Name to validate
 * @returns {boolean} Whether the name is valid
 */
export const isValidName = (name) => {
  return name && typeof name === 'string' && name.trim().length > 0;
};
