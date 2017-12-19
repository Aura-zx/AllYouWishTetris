var TypeI = function (game) {
  var o = {
    blocks: [],
    x: 100,
    y: 20,
    speedX: 10,
    speedY: 10,
    stopped: false,
    top: [],
    bottom: [],
    left: [],
    right: [],
    status: 1,
    itarget: 0,
  }

  o.blocks[0] = Block(game)
  for (var i = 1; i < 4; i++) {
    var block = Block(game)
    o.blocks.push(block)
    o.blocks[i].x = o.blocks[i - 1].x + 10
  }
  // 获得左右的块
  o.blocks.sort(function (a, b) {
    return b.x - a.x
  })
  o.right = o.blocks[0]
  o.left = o.blocks[3]
  // 获得上下的块
  o.blocks.sort(function (a, b) {
    return b.y - a.y
  })
  o.blocks.forEach(function (b) {
    var max = o.blocks[0].y
    var min = o.blocks[3].y
    if (b.y == min) {
      o.top.push(b)
    }
    if (b.y == max) {
      o.bottom.push(b)
    }
  })

  o.movedown = function () {
    o.blocks.forEach(function (o) {
      o.y += o.speedY
    }, this)
  }
  o.moveleft = function () {
    log(o.left.x)
    if (o.left.x - o.speedX == 50) {
      return
    }
    o.blocks.forEach(function (o) {
      o.x -= o.speedX
    }, this)
  }
  o.moveright = function () {
    log(o.right.x)
    if (o.right.x + o.speedX == 200) {
      return
    }
    o.blocks.forEach(function (o) {
      o.x += o.speedX
    }, this)
  }
  o.rotate = function () {
    if (o.status == 1) {
      o.status = 2
      for (var i = 1; i < 4; i++) {
        o.blocks[i].x = o.blocks[0].x;
        o.blocks[i].y = o.blocks[i - 1].y + 10;
      }
      o.blocks.sort(function (a, b) {
        return b.y - a.y
      })
      // reset top & bottom
      o.top = []
      o.bottom = []
      var max = o.blocks[0].y
      var min = o.blocks[3].y
      o.blocks.forEach(function (b) {
        if (b.y == min) {
          o.top.push(b)
        }
        if (b.y == max) {
          o.bottom.push(b)
        }
      })
    } else if (o.status == 2) {
      o.status = 1
      for (var i = 1; i < 4; i++) {
        o.blocks[i].y = o.blocks[0].y
        o.blocks[i].x = o.blocks[i - 1].x + 10;
      }
      o.blocks.sort(function (a, b) {
        return b.x - a.x // desc
      })
      // reset top & bottom
      o.top = []
      o.bottom = []
      var max = o.blocks[0].x
      var min = o.blocks[3].x
      o.blocks.forEach(function (b) {
        if (b.x == min) {
          o.top.push(b)
        }
        if (b.x == max) {
          o.bottom.push(b)
        }
      })
    }
  }
  o.stop = function () {
    o.stopped = true
  }
  o.hasPoint = function (x, y) {
    for (var i = 0; i < 4; i++) {
      if (o.blocks[i].hasPoint(x, y)) {
        o.itarget = i
        return true
      }
    }

    return false
  }
  o.reset = function (x, y) {
    var offsetx = x - o.blocks[o.itarget].x
    var offsety = y - o.blocks[o.itarget].y
    for(var i = 0; i < 4; i++) {
      if (i == o.itarget) {
        o.blocks[i].x = x
        o.blocks[i].y = y
      } else {
        o.blocks[i].x += offsetx
        o.blocks[i].y += offsety 
      }
    }
  }

  return o
}