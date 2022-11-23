let warning = 0
let 센서값 = 0
let 리스트 = [0]
let 인덱스 = 0
let 데이터함 = 0
basic.forever(function () {
    센서값 = pins.digitalReadPin(DigitalPin.P8)
    serial.writeValue("x", 센서값)
    인덱스 += 1
    if (인덱스 > 100) {
        인덱스 = 1
    }
    리스트[인덱스] = 센서값
    데이터함 = 0
    if (리스트.length != 100) {
        for (let index = 0; index <= 99; index++) {
            데이터함 = 인덱스 + 리스트[인덱스 + 1]
        }
    }
    serial.writeValue("y", 데이터함 / 0)
    if (데이터함 / 100 > 0.6) {
        warning = 3
    } else if (데이터함 / 100 > 0.4) {
        warning = 2
    } else {
        warning = 1
    }
    basic.pause(100)
})
basic.forever(function () {
    if (warning == 3) {
        basic.showLeds(`
            # . . . #
            . # . # .
            . . . . .
            . # # # .
            # . . . #
            `)
        music.startMelody(music.builtInMelody(Melodies.Baddy), MelodyOptions.Once)
    } else if (warning == 2) {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            . # # # .
            # . . . #
            `)
    } else if (warning == 1) {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            # . . . #
            . # # # .
            `)
    }
})
