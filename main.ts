input.onButtonPressed(Button.A, function () {
    AnzahlPixel += -1
})
input.onButtonPressed(Button.B, function () {
    AnzahlPixel += 1
})
// Initialisierung
let blau = 0
let gruen = 0
let stripLaenge = 60
let strip = neopixel.create(DigitalPin.P0, stripLaenge, NeoPixelMode.RGB)
let range = strip.range(1, 4)
let AnzahlPixel = 6
let Position = stripLaenge / 2
let rot = randint(2, 255)
basic.forever(function () {
    strip.clear()
    // Neigung links - rechts = -1023 bis 1023
    // waagrecht = 0
    // wird umgewandelt in Positionsänderung
    Position += pins.map(
    input.acceleration(Dimension.X),
    0,
    1023,
    0,
    2
    )
    // Beschränkungen nach oben und unten
    if (Position > stripLaenge - AnzahlPixel) {
        Position = stripLaenge - AnzahlPixel - 1
    }
    if (Position < 0) {
        Position = 0
    }
    if (input.isGesture(Gesture.Shake)) {
        // Schütteln erzeugt eine zufällige Farbe
        rot = randint(2, 255)
        gruen = randint(2, 255)
        blau = randint(2, 255)
    }
    // AnzahlPixel auswählen und aktivieren
    for (let Index = 0; Index <= AnzahlPixel - 1; Index++) {
        strip.setPixelColor(Index + Position, neopixel.rgb(rot, gruen, blau))
    }
    strip.show()
    basic.pause(3)
})
