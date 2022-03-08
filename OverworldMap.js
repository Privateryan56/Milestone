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
       return this.walls [`${x},${y}`] || false
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
          //dynamic keys will evaluate to string 
         [utils.asGridCoords(7,6)]: true,
         [utils.asGridCoords(8,6)]: true,
         [utils.asGridCoords(7,7)]: true,
         [utils.asGridCoords(8,7)]: true,
         [utils.asGridCoords(0,6)]: true,
         [utils.asGridCoords(0,5)]: true,
         [utils.asGridCoords(0,4)]: true,
         [utils.asGridCoords(0,7)]: true,
         [utils.asGridCoords(0,8)]: true,
         [utils.asGridCoords(0,9)]: true,
         [utils.asGridCoords(1,10)]: true,
         [utils.asGridCoords(2,10)]: true,
         [utils.asGridCoords(3,10)]: true,
         [utils.asGridCoords(4,10)]: true,
         [utils.asGridCoords(5,11)]: true,
         [utils.asGridCoords(6,10)]: true,
         [utils.asGridCoords(7,10)]: true,
         [utils.asGridCoords(8,10)]: true,
         [utils.asGridCoords(9,10)]: true,
         [utils.asGridCoords(10,10)]: true,
         [utils.asGridCoords(11,9)]: true,
         [utils.asGridCoords(11,8)]: true,
         [utils.asGridCoords(11,7)]: true,
         [utils.asGridCoords(11,6)]: true,
         [utils.asGridCoords(11,5)]: true,
         [utils.asGridCoords(11,4)]: true,
         [utils.asGridCoords(10,3)]: true,
         [utils.asGridCoords(9,3)]: true,
         [utils.asGridCoords(8,4)]: true,
         [utils.asGridCoords(6,4)]: true,
         [utils.asGridCoords(5,3)]: true,
         [utils.asGridCoords(4,4)]: true,
         [utils.asGridCoords(3,4)]: true,
         [utils.asGridCoords(2,3)]: true,
         [utils.asGridCoords(1,3)]: true,
       },
      },
}