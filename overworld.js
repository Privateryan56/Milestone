class overWorld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d")
    }

    init() {
        console.log("HEllo from the Overworld", this);
        const image = new Image();
        image.onload = () => {
           this.ctx.drawImage(image, 0,0)
        }
        image.src = "./assets/mapos/DemoLower.png";
    }
}
