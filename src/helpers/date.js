'use strict'

var options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
}

module.exports = () => new Date().toLocaleString('ru-RU', options)
