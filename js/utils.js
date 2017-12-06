var log = console.log.bind(console)

var imgFromPath = function (path) {
  var img = new Image()
  img.src = path
  return img
}

var enableDebugMode = function (enable) {
  if (!enable) {
    return
  }
  // pasue key DebugMode only
  window.addEventListener('keydown', function (event) {
    if (event.key == 'p') {
      paused = !paused
    }
  })
}