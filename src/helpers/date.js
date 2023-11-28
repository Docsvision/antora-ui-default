'use strict'

var options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

module.exports = () => new Date().toLocaleString('ru-RU', options)
