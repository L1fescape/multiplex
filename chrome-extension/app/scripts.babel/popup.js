'use strict';

var port = chrome.extension.connect({
  name: 'Multiplex'
});

function sendMessage(type, data) {
  var payload = {
    type: type
  }
  if (data) {
    payload.data = data
  }

  port.postMessage(JSON.stringify(payload))
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('play').addEventListener('click', () => sendMessage('play'));
  document.getElementById('pause').addEventListener('click', () => sendMessage('pause'));
  document.getElementById('roomid').addEventListener('keydown', (event) => {
    const roomId = event.target.value
    if (roomId && event.keyCode === 13) {
      sendMessage('join', roomId)
    }
  });
});
