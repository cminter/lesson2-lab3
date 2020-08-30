function drawPaddle (col: number) {
    led.unplot(oldPaddleCol, 4)
    led.plot(col, 4)
    oldPaddleCol = col
}
function gameStep () {
    ballCol = randint(0, 4)
    ballRow = -1
    dropState = 0
    basic.clearScreen()
    while (dropState == 0) {
        paddleCol = readPaddle()
        dropState = moveBall(ballCol, paddleCol)
        drawPaddle(paddleCol)
        basic.pause(200)
        if (dropState == 1) {
            catches += 1
            if (catches >= catchGoal) {
                score = missLimit - misses
                showScore(score)
                playState = 1
            }
        } else if (dropState == -1) {
            misses += 1
            if (misses >= missLimit) {
                playState = -1
            }
        }
    }
}
function showScore (n: number) {
    basic.showNumber(n)
    basic.pause(500)
}
function gameRestart () {
    if (playState != 0) {
        playState = 0
    }
}
function readPaddle () {
    quantPaddle = Math.round(input.acceleration(Dimension.X) / 400)
    quantPaddle = Math.constrain(quantPaddle, -2, 2)
    return quantPaddle + 2
}
function gameInit () {
    score = 0
    catches = 0
    misses = 0
    catchGoal = 5
    missLimit = 10
    oldPaddleCol = 0
}
input.onButtonPressed(Button.AB, function () {
    gameRestart()
})
function moveBall (bCol: number, pCol: number) {
    led.unplot(bCol, ballRow)
    ballRow += 1
    led.plotBrightness(bCol, ballRow, 100)
    if (ballRow < 4) {
        return 0
    } else {
        if (bCol == pCol) {
            return 1
        }
        return -1
    }
}
function appForever () {
    if (playState == 0) {
        gameInit()
        while (playState == 0) {
            gameStep()
        }
    } else if (playState == 1) {
        basic.showIcon(IconNames.Yes)
        showScore(score)
    } else if (playState == -1) {
        basic.showIcon(IconNames.No)
    }
}
function appInit () {
    playState = -2
    basic.showString("Catch")
}
let quantPaddle = 0
let playState = 0
let misses = 0
let missLimit = 0
let score = 0
let catchGoal = 0
let catches = 0
let paddleCol = 0
let dropState = 0
let ballRow = 0
let ballCol = 0
let oldPaddleCol = 0
appInit()
basic.forever(function () {
    appForever()
})
