class OverworldMap {
    constructor (config) {
        this.gameObjects = config.gameObjects

        this.lowerImage = new Image();
        this.lowerImage.src= config.lowerSrc; //tiles

        this.upperImage = new Image();
        this.upperImage.src= config.upperSrc;//rooftops and stuff above the characters
    }

    drawLowerImage(ctx) {
        ctx.drawImage(this.lowerImage , 0 , 0)
    }
    drawUpperImage(ctx) {
        ctx.drawImage(this.upperImage , 0 , 0)
    }
}

//this is where configs for the images go VVVV
window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "./assets/mapos/DemoLower.png",
        upperSrc: "./assets/mapos/DemoUpper.png",
        gameObjects: {
            hero: new GameObject({
                x: 5,
                y: 6,
            }),
            box: new GameObject({
                x : 7,
                y : 9,
                src: "./assets/objects/box.png"
            })
        }
    }



}