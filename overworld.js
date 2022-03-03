class OverWorld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d")
    }

    init() {
        const image = new Image();
        image.onload = () => {
          this.ctx.drawImage(image,0,0)
        };
        image.src = "./assets/mapos/DemoLower.png";
     
        //Place some Game Objects!
        const hero = new GameObject({
          x: 5,
          y: 6,
        })
        
        const box = new GameObject({
            x : 7,
            y : 9,
            src: "./assets/objects/box.png"
        })
       setTimeout(() => {
         hero.sprite.draw(this.ctx);
        box.sprite.draw(this.ctx);
       }, 200)
     
     
      }
}
