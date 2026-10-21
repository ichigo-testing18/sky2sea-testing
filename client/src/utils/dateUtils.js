// Date parsing, delay calculation, and formatting helper utilities

export const calculateArrivalDifference = (actualArrivalDateStr, initialEtaStr) => {
  if (!actualArrivalDateStr || !initialEtaStr) return null;
  
  const actual = new Date(actualArrivalDateStr);
  const initial = new Date(initialEtaStr);

  if (isNaN(actual.getTime()) || isNaN(initial.getTime())) return null;

  // Calculate day difference ignoring hours/minutes
  const utc1 = Date.UTC(actual.getFullYear(), actual.getMonth(), actual.getDate());
  const utc2 = Date.UTC(initial.getFullYear(), initial.getMonth(), initial.getDate());

  const diffDays = Math.round((utc1 - utc2) / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const formatDateDisplay = (dateStr, prefix = '') => {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  const formatted = `${day} ${month} ${year}`;
  return prefix ? `${prefix} ${formatted}` : formatted;
};

export const formatLastUpdated = (dateStr) => {
  if (!dateStr) return '06/10/2026 18:42';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;

  const pad = (num) => String(num).padStart(2, '0');
  const day = pad(d.getDate());
  const month = pad(d.getMonth() + 1);
  const year = d.getFullYear();
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
