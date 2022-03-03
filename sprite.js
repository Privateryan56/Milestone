class Sprite {
    constructor(config) {
        //set up image
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () =>{
            this.isLoaded = true;
        }

        this.shadow= new Image()
        this.shadow.src = "./assets/sprite/shadow.png"
        this.useShadow = true; 
        this.shadow.onload = () =>{
            this.isShadowLoaded = true;
        }


        //config animations and initial states
        this.animations = config.animations || {
            idleDown : [ //an array of frames 
                [0,0]
            ],
            
        }
        this.currentAnimation = config.currentAnimation||"idleDown";
        this.currentAnimationFrame = 0;
        //references the game object
        this.gameObject= config.gameObject;
    }

    //drawing objects to the canvas and automatically putting them in the middle of the gridcell
    draw(ctx) {
        const x = this.gameObject.x *16-8;
        const y = this.gameObject.y * 16-18;
        this.isShadowLoaded && ctx.drawImage(this.shadow, x, y)
        this.isLoaded && ctx.drawImage(this.image ,
            0,0,
            32,32,
            x,y,
            32,32)

    }



}