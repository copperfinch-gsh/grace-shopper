function getRange(quantity) {
  return [...Array(quantity).keys()].map(i => i + 1);
}

function formatWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

module.exports = { getRange, formatWithCommas };
