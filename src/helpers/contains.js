'use strict'

module.exports = function (string, substring) {
  if (!string || !substring) return false
  return String(string).includes(String(substring))
}
