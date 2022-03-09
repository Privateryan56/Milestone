class GameObject {
    constructor(config) {
      this.id = null;
      this.isMounted = false;
      this.x = config.x || 0;
      this.y = config.y || 0;
      this.direction = config.direction || "down";
      this.sprite = new Sprite({
        gameObject: this,
        src: config.src || "./assets/sprite/hero.png",
      });
       this.behaviorLoop = config.behaviorLoop || [];
       this.behaviorLoopIndex = 0;
      
    }
  
    mount(map) {
      console.log("mounting!")
      this.isMounted = true;
      map.addWall(this.x, this.y);
      
      // if we have a behvaior kick off after a delay
      setTimeout( () =>{
        this.doBehaviorEvent(map)
      }, 10)
   
    }
  
    update() {
    }
  
   
  async doBehaviorEvent(map){

    //basically if there is a cutscene going on, dont fire off the global behaviors 
    if(map.isCutscenePlaying || this.behaviorLoop.length === 0 || this.isStanding){
      return
    }
    //setting up event with relevant info
    let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
    eventConfig.who = this.id;


    // will hold events for things like cutscenes, map changes, and texts 
    const eventHandler = new OverworldEvent ({map, event: eventConfig});
    await eventHandler.init();

    //setting next event to fire
    this.behaviorLoopIndex += 1;
    if( this.behaviorLoopIndex === this.behaviorLoop.length) {
      this.behaviorLoopIndex= 0;
    }
    // after the loop on line 42 is done then do it again

    this.doBehaviorEvent(map);



  }
  
  }