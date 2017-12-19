var __main = function () {

  enableDebugMode(true)

  window.paused = false
  var images = {
    red: 'imgs/red.png'
  }
  var game = GuaGame(10, images)

  // mouse event
  var enableDrag = false
  game.canvas.addEventListener('mousedown', function (event) {
    var x = event.offsetX
    var y = event.offsetY
    // check if point in types
    if (game.curtype.hasPoint(x, y)) {
      // set dragflag
      enableDrag = true
    }
  })

  game.canvas.addEventListener('mousemove', function (event) {
    var x = event.offsetX
    var y = event.offsetY
    // change position of type
    if (enableDrag){
      game.curtype.reset(x, y)
    }
  })

  game.canvas.addEventListener('mouseup', function (event) {
    var x = event.offsetX
    var y = event.offsetY
    enableDrag = false

  })

  game.registerAction('a', function (block) {
    block.moveleft()
  })
  game.registerAction('d', function (block) {
    block.moveright()
  })
  game.registerAction('w', function (type) {
    type.rotate()
  })

  game.update = function (block, blocks) {
    if (window.paused) {
      return
    }
    // update
    block.movedown()
    //log(block.y)
    for (var i = 0; i < blocks.length - 1; i++) {
      if ((block.x == blocks[i].x) && (block.y + block.h / 2) == (blocks[i].y - blocks[i].h / 2)) {
        block.stop()
      }
    }
    if (block.y > 300) {
      block.stop()
    }
  }

  game.draw = function (block, blocks) {
    for (var i = 0; i < blocks.length; i++) {
      game.drawImage(blocks[i])
    }
  }

  game.updateType = function (type, types) {
    if (window.paused) {
      return
    }
    // update
    type.movedown()
    //log(type.bottom[0].y)
    for (var i = 0; i < types.length - 1; i++) {
      if (game.collide(type, types[i])) {
        type.stop()
        game.refresh()
      }
    }
    if (type.bottom[0].y > 300) {
      type.stop()
      game.refresh()
    }
  }

  game.drawType = function (type, types) {
    for (var i = 0; i < types.length; i++) {
      game.drawImages(types[i])
    }
  }

  game.collide = function (move, fixed) {
    var h = move.bottom[0].h
    // 底部碰到顶部

    for (var i = 0; i < move.bottom.length; i++) {
      for (var j = 0; j < fixed.top.length; j++) {
        if (move.bottom[i].x == fixed.top[j].x) {
          if (move.bottom[i].y + h / 2 == fixed.top[j].y - h / 2) {
            return true
          }
        }
      }
    }
    // 顶部碰到顶部
  }


}