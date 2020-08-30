let oldPaddleCol = 0
let paddleCol = 0
let quantPaddle = 0
function drawPaddle (col: number) {
    led.unplot(oldPaddleCol, 4)
    led.plot(col, 4)
    oldPaddleCol = col
}
function testPaddle () {
    paddleCol = readPaddle()
    drawPaddle(paddleCol)
    basic.pause(200)
}
function readPaddle () {
    quantPaddle = Math.round(input.acceleration(Dimension.X) / 400)
    quantPaddle = Math.constrain(quantPaddle, -2, 2)
    return quantPaddle + 2
}
basic.forever(function () {
    testPaddle()
})
