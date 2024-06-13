const trimString = (str) => {
  if (!str) return '';
  return str.trim().toLowerCase();
};

module.exports = { trimString };