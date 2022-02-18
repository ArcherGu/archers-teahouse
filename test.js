let app = new PIXI.Application({
    resizeTo: document.getElementById("canvas-pixi"),
    view: document.getElementById("canvas-pixi"),
    backgroundColor: 0x000000,
    backgroundAlpha: 1.0,
    resolution: 1,
    antialias: true
});

const fps = 60;
const numFluidPoints = 32; // num points in top spline
var yTop = 0.1 * app.screen.height;
var yBottom = 0.5 * app.screen.height;
var xLeft = 0;
var xRight = app.screen.width;
var topVertices = new Array(numFluidPoints);
var bottomVertices = [new PIXI.Point(xRight, yBottom), new PIXI.Point(xLeft, yBottom)];

// top vertices spline
for (var iVertex = 0; iVertex < numFluidPoints; iVertex++) {
    var vertex = new PIXI.Point(
        (iVertex / (numFluidPoints - 1)) * xRight, yTop
    );
    vertex.origin = vertex.clone();
    topVertices[iVertex] = vertex;

}

var wave = new PIXI.Graphics();
app.stage.addChild(wave);

const songTempo = 120;
var theta = 0;                                      // sine offset
var waveAmplitude = app.screen.height / 15;          // magic number that looks nice
const beatsPerSecond = parseInt(songTempo) / 60;      // affects sine rate based on song tempo

app.ticker.add(delta => gameLoop(delta));
function gameLoop(delta) {
    // animate background music visualization
    for (var i = 0; i < topVertices.length; i++) {
        var vertex = topVertices[i];
        var pct = i / (topVertices.length - 1);
        // 1/4 * bps to quarter speed slow down the animation so it doesn't get too distracting
        vertex.y = vertex.origin.y + waveAmplitude * Math.sin(2 * Math.PI * pct + theta * 0.25 * Math.PI * beatsPerSecond);
    }

    // draw wave
    wave.clear()
        .beginFill(0x0000ff)
        .drawPolygon(topVertices.concat(bottomVertices).flat())
        .endFill();

    theta += 1 / fps;                                 // update offset so we go through 1 wavelength per second
}