const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  const strN = n.toString();
  let maxNum = parseInt(strN.slice(1));
  for (let i = 1; i < strN.length; i++) {
    const currentNum = parseInt(strN.slice(0, i) + strN.slice(i + 1));
    maxNum = Math.max(maxNum, currentNum);
  }
  return maxNum;
}

module.exports = {
  deleteDigit
};
