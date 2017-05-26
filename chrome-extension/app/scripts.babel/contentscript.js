'use strict';

console.log('\'Allo \'Allo! Content script');

(function() {
  function play() {
    document.getElementsByClassName('play-btn')[0].click()
  }

  function pause() {
    document.getElementsByClassName('pause-btn')[0].click()
  }

  function setSeekPercent(percent) {
    // const currentTime = $('.player-position').innerHTML
    // const duration = $('.player-duration').innerHTML
    const node = document.getElementsByClassName('player-slider-thumb')[1]
    setSeeker(node, percent)
  }

  function setSeeker(node, percent) {
    const clickEvent = document.createEvent('MouseEvents');
    clickEvent.initMouseEvent('mousedown', true, true, window, 0, 0, 0, 80, 0, false, false, false, false, 0, null);
    node.dispatchEvent(clickEvent);
  }

  function handleCommand(request, sender, sendResponse) {
    const command = request.type
    const payload = request.payload
    const handlers = {
      play: play,
      pause: pause,
      setSeekPercent: setSeekPercent
    }

    if (handlers[command]) {
      handlers[command](payload)
    }
  }


  chrome.runtime.onMessage.addListener(handleCommand)
})()
