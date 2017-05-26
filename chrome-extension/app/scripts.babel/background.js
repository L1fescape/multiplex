'use strict';

const socket = io('http://localhost:8080')

var currentRoomId = null

socket.on('play', () => sendMessage({type: 'play'}))
socket.on('pause', () => sendMessage({type: 'pause'}))
socket.on('seek', (data) => sendMessage({type: 'setSeekPercent', payload: data}))

chrome.extension.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
    console.log('message recieved', msg);
    const payload = JSON.parse(msg)

    switch (payload.type) {
      case 'play':
        onPlay()
        return

      case 'pause':
        onPause()
        return

      case 'join':
        onJoinRequest(payload.data)
        return

      default:
        return
    }
  });
})

function sendMessage(message) {
  console.log('send message', message)
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    console.log(tabs[0])
    chrome.tabs.sendMessage(tabs[0].id, message)
  });
}

function onPlay() {
  socket.emit('play', currentRoomId)
}

function onPause() {
  socket.emit('pause', currentRoomId)
}

function onJoinRequest(roomId) {
  socket.emit('join', roomId)
  currentRoomId = roomId
}

function onLeaveRequest(roomId) {
  socket.emit('leave', roomId)
  currentRoomId = null
}

function onRoomInputPress(event) {
  const roomId = event.target.value
  if (roomId && event.keyCode === 13) {
    onJoinRequest(roomId)
  }
}

chrome.browserAction.setBadgeText({text: '\'Allo'});
