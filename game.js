// import { createImage } from '../mario-game/index.js'
// console.log(createImage)

const canvas = document.getElementById('canvas-el')
const c = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 800
const CANVAS_HEIGHT = canvas.height = 700

let gameSpeed = 3

function createImage(imageSrc) {
    const image = new Image();
    image.onload = function() {
        console.log("Image loaded successfully:", imageSrc);
    };
    image.onerror = function() {
        console.error("Error loading image:", imageSrc);
    };
    image.src = imageSrc; // Set the source inside the function
    return image;
}

let backgroundLayer1 = createImage('./assets/img/layer-1.png');
let backgroundLayer2 = createImage('./assets/img/layer-2.png');
let backgroundLayer3 = createImage('./assets/img/layer-3.png');
let backgroundLayer4 = createImage('./assets/img/layer-4.png');
let backgroundLayer5 = createImage('./assets/img/layer-5.png');

const slider = document.getElementById('slider')
slider.value = gameSpeed
const showGameSpeed = document.getElementById('showGameSpeed')
showGameSpeed.innerHTML = gameSpeed
slider.addEventListener('change', (e) => {
    gameSpeed = e.target.value
    showGameSpeed.innerHTML = e.target.value
})

class Layer {
   constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 2400
        this.height = 700
        this.x2 = this.width
        this.image = image
        this.speedModifier = speedModifier
        this.speed = gameSpeed * this.speedModifier
   } 
   update() {
        this.speed = gameSpeed * this.speedModifier
        if(this.x <= -this.width){
            this.x = this.width + this.x2 - this.speed;
        }
        if(this.x2 <= -this.width){
            this.x2 = this.width + this.x - this.speed;
        }
        this.x = Math.floor(this.x - this.speed)
        this.x2 = Math.floor(this.x2 - this.speed)
   }
   draw () {
        c.drawImage(this.image, this.x, this.y, this.width, this.height)
        c.drawImage(this.image, this.x2, this.y, this.width, this.height)

   }
}

const layer1 = new Layer(backgroundLayer1, 0.2)
const layer2 = new Layer(backgroundLayer2, 0.4)
const layer3 = new Layer(backgroundLayer3, 0.6)
const layer4 = new Layer(backgroundLayer4, 0.8)
const layer5 = new Layer(backgroundLayer5, 1)

const gameObject = [layer1, layer2, layer3, layer4, layer5]

function animate() {
    c.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    gameObject.forEach((object) => {
        object.update()
        object.draw()
    })
    requestAnimationFrame(animate)
}
animate()