var Block = function (game) {
  var image = game.imageByName('red')
  var o = {
    img: image,
    x: 100,
    y: 20,
    w: 10,
    h: 10,
    speedX: 10,
    speedY: 10,
    stopped: false,
    alive: true,
  }

  o.movedown = function () {
    o.y += o.speedY
  }
  o.moveleft = function () {
    o.x -= o.speedX
  }
  o.moveright = function () {
    o.x += o.speedX
  }
  o.stop = function () {
    o.stopped = true
  }
  o.hasPoint = function (x, y) {
    var xIn = x >= o.x - o.w && x <= o.x + o.w
    var yIn = y >= o.y - o.h && y <= o.y + o.h

    return xIn && yIn
  }

  return o
}