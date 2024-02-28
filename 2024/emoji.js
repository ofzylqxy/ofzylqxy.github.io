var stage = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(window.innerWidth - 4, window.innerHeight - 4, {
    transparent: true
});
var particles = [];
var width, height, fontSize, textPixels, yOffset, canvasHeight;
var textCanvas, textCtx;
var htmlText = document.getElementById("html-text");
var fireworks = [];
document.body.appendChild(renderer.view);


function startRender() {

    initText();
    initCanvas();
    WebFont.load({
        google: {
            families: ['Kalam']
        },
        active: begin
    });
}

function showQrCode(){
    var qrDiv = document.getElementById("qr");
    qrDiv.classList.add('fade-in');
    qrDiv.style.opacity = 0.8;
}

// canvas
function initText() {
    htmlText.style.display = "block";
}


// canvas
function initCanvas() {
    textCanvas = document.getElementById('text');
    textCtx = textCanvas.getContext('2d');
}


function begin() {
    resize();
    initFireworks();
    requestAnimationFrame(animate);
}

var textures = [
    PIXI.Texture.fromImage("./pic/heart.png"),
    PIXI.Texture.fromImage("./pic/sparkles.png"),
    PIXI.Texture.fromImage("./pic/kissing_heart.png"),
    PIXI.Texture.fromImage("./pic/dizzy.png"),
    PIXI.Texture.fromImage("./pic/crescent_moon.png"),
    PIXI.Texture.fromImage("./pic/rainbow.png"),
    PIXI.Texture.fromImage("./pic/star2.png")
];

//create stars
function initFireworks() {
    shuffle(textPixels);
    for (var i = 0, l = textPixels.length; i < l; i++) {
        createEmojiFirework(textures[i % 7], textPixels[i], i);
    }
}

function createEmojiFirework(text, pos, i) {
    setTimeout(function () {
        var size = fontSize / 10 + Math.random() * fontSize / 10;
        var firework = new PIXI.Sprite(text);
        firework.explodePosition = {
            x: pos.x,
            y: pos.y + yOffset
        };
        firework.position.x = Math.random() * width;
        firework.position.y = height + Math.random() * 40;
        firework.width = size;
        firework.height = size;
        firework.lerpSpeed = 0.001 + Math.random() * 0.05;
        firework.image = text;
        fireworks.push(firework);
        stage.addChild(firework);
    }, i * 20 + Math.random() * 30);
};

function explodeFirework(firework) {
    for (var i = 0; i < 7; i++) {
        var size = fontSize / 10 + Math.random() * fontSize / 10;
        var emoji = new PIXI.Sprite(firework.image);
        var angle = Math.random() * (2 * Math.PI);
        emoji.velocity = {
            x: (Math.cos(angle) * (2 + Math.random() * 10) * 0.4),
            y: (Math.sin(angle) * (2 + Math.random() * 10) * 0.4)
        };
        emoji.position.x = firework.position.x;
        emoji.position.y = firework.position.y;
        emoji.width = size;
        emoji.height = size;
        particles.push(emoji);
        stage.addChild(emoji);
    }
}

function animate() {
    requestAnimationFrame(animate);

    for (var i = 0, l = particles.length; i < l; i++) {
        particles[i].position.x += particles[i].velocity.x;
        particles[i].position.y += particles[i].velocity.y;
        particles[i].velocity.y += 0.03;
        particles[i].alpha -= 0.01;
    }

    for (var i = 0, l = fireworks.length; i < l; i++) {
        fireworks[i].position.x += (fireworks[i].explodePosition.x - fireworks[i].position.x) * fireworks[i].lerpSpeed;
        fireworks[i].position.y += (fireworks[i].explodePosition.y - fireworks[i].position.y) * fireworks[i].lerpSpeed;

        if (!fireworks[i].exploded) {
            var size = fireworks[i].width;
            fireworks[i].width += (fontSize * 0.09 - size) * 0.1;
            fireworks[i].height += (fontSize * 0.09 - size) * 0.1;

            if (Math.abs(fireworks[i].position.x - fireworks[i].explodePosition.x) + Math.abs(fireworks[i].position.y - fireworks[i].explodePosition.y) < 10) {
                fireworks[i].exploded = true;
                explodeFirework(fireworks[i]);
            }
        }
    }
    // render the stage
    renderer.render(stage);
}

function sampleCanvas() {
    textCanvas.style.width = width + 'px';
    textCanvas.style.height = canvasHeight + 'px';
    textCanvas.style.marginTop = -(canvasHeight / 2) + 'px';
    textCanvas.width = width;
    textCanvas.height = canvasHeight;
    textCtx.textAlign = 'center';
    textCtx.textBaseline = "top";
    textCtx.font = fontSize + 'px "Kalam"';
    textCtx.fillStyle = '#eee';
    textCtx.clearRect(0, 0, width, canvasHeight);

    textCtx.fillText('Love You', width / 2, 0);

    var pix = textCtx.getImageData(0, 0, width, canvasHeight).data;
    textPixels = [];
    for (var i = pix.length; i >= 0; i -= 4) {
        if (pix[i] != 0) {
            var x = (i / 4) % width;
            var y = Math.floor(Math.floor(i / width) / 4);

            if ((x && x % 6 == 0) && (y && y % 6 == 0)) textPixels.push({
                x: x,
                y: y
            });
        }
    }
}

// window.addEventListener('resize', resize);

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    fontSize = width * 0.2;
    if (fontSize > 140) fontSize = 140;
    canvasHeight = fontSize * 1.8;
    yOffset = height * 0.5 - (canvasHeight / 2);
    renderer.resize(width, height);
    sampleCanvas();
    htmlText.style.top = (height * 0.5 + canvasHeight * 0.3) + "px";
    htmlText.style.fontSize = fontSize * 0.2 + "px";
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}