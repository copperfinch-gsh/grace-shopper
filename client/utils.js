function getRange(quantity) {
  return [...Array(quantity).keys()].map(i => i + 1);
}

function formatWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function sumCartProducts(cartArr) {
  return cartArr.reduce((accum, cur) => {
    return accum + cur.lineItem.unitPrice * cur.desiredQuantity;
  }, 0);
}

module.exports = { getRange, formatWithCommas, sumCartProducts };
