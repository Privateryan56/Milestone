class OverWorld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d")
        this.map = null;
    }

     startGameLoop() {
         const step = () => {

                //clear off cnvas
            this.ctx.clearRect(0 , 0, this.canvas.width, this.canvas.height);

          const cameraPerson = this.map.gameObjects.hero;

            //draws lower layer to context which is the canvas
            this.map.drawLowerImage(this.ctx, cameraPerson);
            //Draw game Objexts
            Object.values(this.map.gameObjects).forEach(object =>{
                object.update({
                    arrow:this.directionInput.direction

                })
                object.sprite.draw(this.ctx, cameraPerson);
            })
            //draw Upper map
            this.map.drawUpperImage(this.ctx,cameraPerson);

             console.log("stepping it up in here!")
            requestAnimationFrame(() =>{
                step();
            })
         }
         step(); // kick off function step
     }





    init() {
        this.map = new OverworldMap(window.OverworldMaps.DemoRoom);

        this.directionInput = new DirectionInput();
        this.directionInput.init();

        this.startGameLoop();
    }
       
}
