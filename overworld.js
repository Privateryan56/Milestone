class Overworld {
    constructor(config) {
      this.element = config.element;
      this.canvas = this.element.querySelector(".game-canvas");
      this.ctx = this.canvas.getContext("2d");
      this.map = null;
    }
   
     startGameLoop() {
       const step = () => {
         //Clear off the canvas
         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
   
         //Establish the camera person
         const cameraPerson = this.map.gameObjects.hero;
   
         //Update all objects
         Object.values(this.map.gameObjects).forEach(object => {
           object.update({
             arrow: this.directionInput.direction,
             map: this.map,
           })
         })
   
         //Draw Lower layer
         this.map.drawLowerImage(this.ctx, cameraPerson);
   
         //Draw Game Objects
         // reorders array so more northern characters are layered differently from southern
         Object.values(this.map.gameObjects).sort((a,b) => {
           return a.y - b.y;
         }).forEach(object => {
           object.sprite.draw(this.ctx, cameraPerson);
         })
   
         //Draw Upper layer
         this.map.drawUpperImage(this.ctx, cameraPerson);
         
         requestAnimationFrame(() => {
           step();   
         })
       }
       step();
    }

    bindActionInput() {
      new KeyPressListener("Enter", () => {
        //Is there a person here to talk to ???
        this.map.checkForActionCutscene()
      });
    }

    bindHeroPositionCheck() {
      document.addEventListener("PersonWalkingComplete", e => {
        if (e.detail.whoId === "hero") {
          //Hero's position has changed
          this.map.checkForFootstepCutscene()
        }
      })
    }

    startMap(){
      
    }


    init() {
     this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
     this.map.mountObjects();
   
     this.bindActionInput();
     this.bindHeroPositionCheck();

     this.directionInput = new DirectionInput();
     this.directionInput.init();
   
     this.startGameLoop();
   
    /*  this.map.startCutscene([
        { who: "hero", type: "walk", direction: "down"},
        { who: "hero", type: "walk", direction: "down"},
        { who: "npcA", type: "walk", direction: "up"},
        { who: "npcA", type: "walk", direction: "left"},
        { who: "hero", type: "stand", direction: "right",time:200},
        { type: "textMessage", text: "you gotta escape"},
      ]) */

    }
   }
