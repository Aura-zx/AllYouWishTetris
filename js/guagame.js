var GuaGame = function (fps, images) {
  // images is an object, contains images refname and path
  var g = {
    actions: {},
    keydowns: {},
    types: [],
    images: {},
  }
  var canvas = document.querySelector("#id-canvas")
  var context = canvas.getContext('2d')
  g.canvas = canvas
  g.context = context
  g.blocks = new Map()

  g.refresh = function () {

  }
  // draw
  g.drawImage = function (guaImage) {
    g.context.drawImage(guaImage.img, guaImage.x, guaImage.y)
  }
  g.drawImages = function (type) {
    type.blocks.forEach(function (block) {
      if (block.alive == true) {
        g.context.drawImage(block.img, block.x, block.y)
      }
    }, this)
  }
  // events
  window.addEventListener('keydown', function (event) {
    g.keydowns[event.key] = true
  })
  window.addEventListener('keyup', function (event) {
    g.keydowns[event.key] = false
  })
  // 
  g.registerAction = function (key, callback) {
    g.actions[key] = callback
  }

  g.imageByName = function (name) {
    var img = g.images[name]
    return img
  }

  var curtype = TypeI(g)
  // main loop
  var runloop = function () {
    // events
    var actions = Object.keys(g.actions)
    for (var i = 0; i < actions.length; i++) {
      var key = actions[i]
      if (g.keydowns[key]) {
        // 如果按键被按下, 调用注册的 action
        g.actions[key](curtype)
      }
    }

    if (curtype.stopped == true) {
      curtype.blocks.forEach(function (b) {
        if (g.blocks[b.y]) {
          g.blocks[b.y].push(b)
        } else {
          g.blocks[b.y] = []
          g.blocks[b.y].push(b)
        }
      })
      curtype = TypeI(g)
      g.types.push(curtype)
    }

    // draw
    g.updateType(curtype, g.types)
    // clear
    context.clearRect(0, 0, canvas.width, canvas.height)
    // draw
    g.drawType(curtype, g.types)
  }

  // pointer to already loaded images
  var loads = []
  // pre load all the images
  var names = Object.keys(images)
  for (var i = 0; i < names.length; i++) {
    var name = names[i]
    var path = images[name]
    var img = new Image()
    img.src = path
    img.onload = function () {
      // save in g.images
      g.images[name] = img
      // all images loaded, call run
      loads.push(1)
      if (loads.length == names.length) {
        // init first type
        curtype = TypeI(g)
        g.types.push(curtype)
        g.run()
      }
    }
  }

  // timer
  g.run = function () {
    setInterval(function () {
      runloop()
    }, 1000 / fps)
  }
  return g;
}