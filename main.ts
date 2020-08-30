let ballCol = 0
let ballRow = 0
let dropState = 0
function dropInit () {
    ballCol = randint(0, 4)
    ballRow = -1
    dropState = 0
}
function testDrop () {
    dropInit()
    basic.clearScreen()
    while (dropState == testDropStep(ballCol)) {
        dropState = 0
        basic.pause(200)
    }
}
function testDropStep (bCol: number) {
    led.unplot(bCol, ballRow)
    ballRow += 1
    led.plotBrightness(bCol, ballRow, 100)
    if (ballRow < 4) {
        return 0
    } else {
        return -1
    }
}
basic.forever(function () {
    testDrop()
})
