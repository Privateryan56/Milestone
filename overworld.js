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
            //establish the camera for person
      const cameraPerson = this.map.gameObjects.hero;

      Object.values(this.map.gameObjects).forEach(object =>{
           object.update({
               arrow:this.directionInput.direction,
               map: this.map,
               })
           })
            //draws lower layer to context which is the canvas
      this.map.drawLowerImage(this.ctx, cameraPerson);


            //Draw game Objexts
    Object.values(this.map.gameObjects).forEach(object =>{
              object.sprite.draw(this.ctx, cameraPerson);
        })

            //draw Upper map
            this.map.drawUpperImage(this.ctx,cameraPerson);

            requestAnimationFrame(() =>{
                step();
            })
         }
         step(); // kick off function step
     }





    init() {
        this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
        console.log(this.map.walls);
        this.directionInput = new DirectionInput();
        this.directionInput.init();

        this.startGameLoop();
    }
       
}
