let canvas = document.querySelector('canvas')
let context = canvas.getContext('2d')

let size = 320
let dpr = window.devicePixelRatio
canvas.width = size * dpr
canvas.height = size * dpr
context.scale(dpr, dpr)
context.lineWidth = 8
let step = size / 8
let white = '#F2F5F1'
let colors = ['#D40920', '#1356A2', '#F7D842', '#14080E', '#D40920', '#F7D842']

// start with a big square (the canvas) and divide it up.
// create an array of squares
let squares = [
  {
    x: 0,
    y: 0,
    width: size,
    height: size,
  },
]

// loop through squares, find if one should be split
function splitSquaresWith(coordinates) {
  // extracts the x and y variables out of the object we're passing in
  const { x, y } = coordinates

  // loop backwards through the squares because we're taking elements out of the loop and replacing them with 2 squares. Looping backwards means the order will stay the same and the new items won't be split again.
  for (let i = squares.length - 1; i >= 0; i--) {
    const square = squares[i]

    if (x && x > square.x && x < square.x + square.width) {
      if (Math.random() > 0.5) {
        squares.splice(i, 1)
        splitOnX(square, x)
      }
    }

    if (y && y > square.y && y < square.y + square.height) {
      if (Math.random() > 0.5) {
        squares.splice(i, 1)
        splitOnY(square, y)
      }
    }
  }
}

function splitOnX(square, splitAt) {
  // create two new squares from splitting the given one at the x coordinate given
  let squareA = {
    x: square.x,
    y: square.y,
    width: square.width - (square.width - splitAt + square.x),
    height: square.height,
  }

  let squareB = {
    x: splitAt,
    y: square.y,
    width: square.width - splitAt + square.x,
    height: square.height,
  }

  squares.push(squareA)
  squares.push(squareB)
}

function splitOnY(square, splitAt) {
  // create two new squares from splitting the given one at the y coordinate given
  let squareA = {
    x: square.x,
    y: square.y,
    width: square.width,
    height: square.height - (square.height - splitAt + square.y),
  }

  let squareB = {
    x: square.x,
    y: splitAt,
    width: square.width,
    height: square.height - splitAt + square.y,
  }

  squares.push(squareA)
  squares.push(squareB)
}

for (let i = 0; i < size; i += step) {
  splitSquaresWith({ y: i })
  splitSquaresWith({ x: i })
}

// create the draw function that loops through our squares and draws them on the canvas
function draw() {
  for (let i = 0; i < colors.length; i++) {
    squares[Math.floor(Math.random() * squares.length)].color = colors[i]
  }
  for (let i = 0; i < squares.length; i++) {
    context.beginPath()
    context.rect(
      squares[i].x,
      squares[i].y,
      squares[i].width,
      squares[i].height
    )
    if (squares[i].color) {
      context.fillStyle = squares[i].color
    } else {
      context.fillStyle = white
    }
    context.fill()
    context.strokeStyle = '#14080E'
    context.stroke()
  }
}

// call the draw function to see what we're making
draw()
