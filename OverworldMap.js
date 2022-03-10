class OverworldMap {
    constructor (config) {
        this.gameObjects = config.gameObjects
        this.walls = config.walls || {}
        this.lowerImage = new Image();
        this.lowerImage.src= config.lowerSrc; //tiles
        this.cutsceneSpaces = config.cutsceneSpaces || {}

        this.upperImage = new Image();
        this.upperImage.src= config.upperSrc;//rooftops and stuff above the characters

        this.isCutscenePlaying = false;
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


   async startCutscene(events) {
    this.isCutscenePlaying = true;

    for (let i=0; i<events.length; i++) {
      const eventHandler = new OverworldEvent({
        event: events[i],
        map: this,
      })
      await eventHandler.init();
    }

    this.isCutscenePlaying = false;

    // have them resume their dumb loops
    Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this))


  }

  
  checkForActionCutscene() {
      const hero = this.gameObjects["hero"];
      //we are gonna use the utils.nextPlace to determine if there is a person to talk to infront of the player controlled character
      const nextCoords = utils.nextPlace(hero.x, hero.y, hero.direction);
      const match = Object.values(this.gameObjects).find(object =>{
          return `${object.x}, ${object.y}` === `${nextCoords.x}, ${nextCoords.y}`
        });
        if (!this.isCutscenePlaying && match && match.talking.length) {
            this.startCutscene(match.talking[0].events)
        }
    }
    
    checkForFootstepCutscene() {
        const hero = this.gameObjects["hero"];
        const match = this.cutsceneSpaces[ `${hero.x},${hero.y}` ];
        if (!this.isCutscenePlaying && match) {
          this.startCutscene( match[0].events )
        }
      }


mountObjects() {
    Object.keys(this.gameObjects).forEach (key =>{
        let object = this.gameObjects[key];
        object.id = key;
        // determine if this object should actually mount
        object.mount(this)
    })
}
//
// this is for npcs so you cannot run into them or through them

   addWall(x,y) {
       this.walls [`${x},${y}`] = true;
   }

   // if a wall is at this position, delete the "wall"
   removeWall(x,y) {
    delete this.walls [`${x},${y}`] 
}


moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY)
    const {x,y} = utils.nextPlace(wasX, wasY, direction);
    this.addWall(x,y)
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
            npcA: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                src: "./assets/sprite/npc4.png",
                behaviorLoop: [
                    {type: "stand", direction: "left", time:800},
                    {type: "stand", direction: "down", time:800},
                    {type: "stand", direction: "right", time:800},
                    {type: "stand", direction: "up", time:800},
                ],
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "you gotta escape", faceHero:"npcA"},
                            { type: "textMessage", text: "Go away"},
                            {who: "hero", type: "walk", direction: "up"},
                        ]
                    },
                    {
                    events: [
                        { type: "textMessage", text: "somethi nelse"},
                    ]
                }
                ],
          
            }),
            npcB: new Person({
                x: utils.withGrid(3),
                y: utils.withGrid(6),
                src: "./assets/sprite/npc3.png" ,
                // this is a loop that the npc will perform regardless of user input and will repeat
                behaviorLoop: [
                    { type: "walk", direction: "left"},
                    {type: "stand", direction: "up", time: 800},
                    { type: "walk", direction: "up" },
                    { type: "walk", direction: "right" },
                    {type:"walk", direction:"down"},
                ],
                talking: [
                    {
                        events: [
                    {type: "textMessage", text:"the way out is in the closet", faceHero: "npcB"},
                    {type: "textMessage", text:"Weirdo why are you still here??"},
                    {type: "textMessage", text:"Back up bro i gotta count these tiles"},
                    { who: "hero", type: "walk", direction: "right"},
                    { who: "hero", type: "walk", direction: "right"},
                        ]
                    },

                ]
            }),
        },
        walls: {
          //dynamic keys will evaluate to string. basically its coordinates on the map that will evaluate to a true or false statement 
          //and will determine if the space is empty or not and that is based on these "walls"
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
         [utils.asGridCoords(4,3)]: true,
         [utils.asGridCoords(3,3)]: true,
         [utils.asGridCoords(2,3)]: true,
         [utils.asGridCoords(1,3)]: true,
       },

        cutsceneSpaces:{
            [utils.asGridCoords(7,4)]:[
                {
                    events: [
                        { type:"textMessage", text:"Damn, you really listened to the guy running in circles on how to get out?"},
                        {who: "hero", type: "walk", direction: "down"},
                    ]
                }
            ] ,
            [utils.asGridCoords(3,4)] :[
                {
                    events:[
                        { type: "textMessage", text: "There's a book on how to solve Skill Issues in video games"},
                        { type: "textMessage", text: "You open it and it says 'Get good chump'"},
                        { type: "textMessage", text: "You've never been one to argue with the wisdom that books can provide, So you take it at face value"}

                    ]
                },
            ],
            [utils.asGridCoords(5,10)] :[
                {
                    events: [
                        {type: "textMessage", text:"You are now the real Winner Winner Chicken Dinner"}
                    ]
                }
            ]
        },

      },
     
}