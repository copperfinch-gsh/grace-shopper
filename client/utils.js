function getRange(quantity) {
  return [...Array(quantity).keys()].map(i => i + 1);
}

module.exports = { getRange };
