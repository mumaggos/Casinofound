import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names and resolves Tailwind CSS conflicts
 * @param {...string} inputs - Class names to combine
 * @returns {string} - Combined class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date to a localized string
 * @param {Date|string|number} date - Date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} - Formatted date
 */
export function formatDate(date, options = {}) {
  const defaultOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  return new Date(date).toLocaleDateString(undefined, mergedOptions);
}

/**
 * Formats a number to a currency string
 * @param {number} value - Number to format
 * @param {string} currency - Currency code
 * @returns {string} - Formatted currency
 */
export function formatCurrency(value, currency = 'USD') {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
  }).format(value);
}

/**
 * Truncates a string to a specified length
 * @param {string} str - String to truncate
 * @param {number} length - Maximum length
 * @returns {string} - Truncated string
 */
export function truncateString(str, length = 30) {
  if (!str) return '';
  if (str.length <= length) return str;
  return `${str.slice(0, length)}...`;
}

/**
 * Generates a random ID
 * @param {number} length - Length of the ID
 * @returns {string} - Random ID
 */
export function generateId(length = 8) {
  return Math.random().toString(36).substring(2, 2 + length);
}

/**
 * Debounces a function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttles a function
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit time in milliseconds
 * @returns {Function} - Throttled function
 */
export function throttle(func, limit = 300) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Checks if a value is empty (null, undefined, empty string, empty array, empty object)
 * @param {*} value - Value to check
 * @returns {boolean} - Whether the value is empty
 */
export function isEmpty(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Converts a string to title case
 * @param {string} str - String to convert
 * @returns {string} - Title case string
 */
export function toTitleCase(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Converts a string to kebab case
 * @param {string} str - String to convert
 * @returns {string} - Kebab case string
 */
export function toKebabCase(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
}

/**
 * Converts a string to camel case
 * @param {string} str - String to convert
 * @returns {string} - Camel case string
 */
export function toCamelCase(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
}

/**
 * Converts a string to snake case
 * @param {string} str - String to convert
 * @returns {string} - Snake case string
 */
export function toSnakeCase(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^\w_]+/g, '');
}

