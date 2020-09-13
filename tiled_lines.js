let canvas = document.querySelector('canvas')
let context = canvas.getContext('2d')

// set up canvas
let size = 320
let step = 10
let dpr = window.devicePixelRatio
canvas.width = size * dpr
canvas.height = size * dpr
context.scale(dpr, dpr)
context.lineCap = 'square'
context.lineWidth = 3

function draw(x, y, width, height) {
  // creates a random number between 0 and 1 and verifies if it is greater than .5
  let leftToRight = Math.random() >= 0.5

  if (leftToRight) {
    context.moveTo(x, y)
    context.lineTo(x + width, y + height)
  } else {
    context.moveTo(x + width, y)
    context.lineTo(x, y + height)
  }

  context.stroke()
}

// runs while x and y are still less than the size of canvas
// incremented by step size
for (let x = 0; x < size; x += step) {
  for (let y = 0; y < size; y += step) {
    draw(x, y, step, step)
  }
}
