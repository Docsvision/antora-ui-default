;(function () {
  'use strict'

  // if (Math.max(window.screen.availHeight, window.screen.availWidth) > 769) return
  window.addEventListener('load', function () {
    var config = document.getElementById('feedback-script').dataset
    var script = document.createElement('script')
    // eslint-disable-next-line max-len
    script.src = '#' + config.collectorId // prettier-ignore
    document.body.appendChild(script)
  })
})()
