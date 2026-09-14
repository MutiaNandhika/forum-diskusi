/**
 * Format timestamp string to relative time in Indonesian.
 * @param {string} date
 * @returns {string}
 */
export function postedAt(date) {
  const now = new Date();
  const posted = new Date(date);
  const diff = now - posted;

  const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffInHours = Math.floor(diff / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(diff / (1000 * 60));
  const diffInSeconds = Math.floor(diff / 1000);

  if (diffInDays > 30) {
    const months = Math.floor(diffInDays / 30);
    return `${months} bulan lalu`;
  }
  if (diffInDays >= 1) {
    return `${diffInDays} hari lalu`;
  }
  if (diffInHours >= 1) {
    return `${diffInHours} jam lalu`;
  }
  if (diffInMinutes >= 1) {
    return `${diffInMinutes} menit lalu`;
  }
  if (diffInSeconds >= 0) {
    return `${diffInSeconds} detik lalu`;
  }
  return 'baru saja';
}

/**
 * Strip HTML tags from a string to display preview text cleanly.
 * @param {string} html
 * @returns {string}
 */
export function stripHtml(html) {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

/**
 * Truncate text with ellipsis.
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export function truncateText(text, maxLength = 160) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}
