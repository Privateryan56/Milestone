class OverworldMap {
    constructor (config) {
        this.gameObjects = config.gameObjects
        this.walls = config.walls || {}
        this.lowerImage = new Image();
        this.lowerImage.src= config.lowerSrc; //tiles

        this.upperImage = new Image();
        this.upperImage.src= config.upperSrc;//rooftops and stuff above the characters
    }

    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.lowerImage ,
            utils.withGrid(10.5) - cameraPerson.x , 
             utils.withGrid(6) - cameraPerson.y)
    }

    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.upperImage , 
            utils.withGrid(10.5) - cameraPerson.x ,
              utils.withGrid(6) - cameraPerson.y)
    }

   isSpaceTaken(currentX, currentY, direction) {
       const {x,y} = utils.nextPlace(currentX, currentY, direction);
       
       return this.walls [`${x}, ${y}`] || false

   }





}

//this is where configs for the images go VVVV
window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "./assets/mapos/DemoLower.png",
        upperSrc: "./assets/mapos/DemoUpper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(6),
            }),
            box: new GameObject({
                x: utils.withGrid(9),
                y: utils.withGrid(7),
                src: "./assets/objects/box.png"
            })
        },
     walls: {
      [utils.asGridCoords(7,6)] : true,
      [utils.asGridCoords(8,6)] : true,
      [utils.asGridCoords(7,7)] : true,
      [utils.asGridCoords(8,7)] : true,
    }
    }



}