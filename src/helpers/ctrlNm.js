'use strict'

module.exports = function (path) {
  if (!path) return ''

  const parts = String(path).split('/')
  const last = parts[parts.length - 1]

  return last.replace(/\.adoc$/, '')
}
