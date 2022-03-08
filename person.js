class Person extends GameObject {
    constructor(config) {
        super(config);
        this.movingProgressRemaining =0; //this translates to pixels that thye mobe and i will probably add this to npcs and such later on down the road


        this.isPlayerControlled = config.isPlayerControlled || false;

        this.directionUpdate ={
            "up":[ "y", -1],
            "down":["y", 1],
            "left": ["x", -1],
            "right":[ "x", 1],
        }
        
    }
    update(state) {
        if (this.movingProgressRemaining > 0) {
        this.updatePosition();
   }else { 
    //ready for more walk cases



    //ready for player input
     if(this.isPlayerControlled && state.arrow){
        this.startBehavior(state, {
           type: "walk",
           direction: state.arrow
 })
}
   this.updateSprite(state);

    }
 }
    
    // fire a walk command without use of user input possibly for future npcs
    startBehavior(state,behavior) {
      //setting character direction to whatever behavior has be nset to 
      this.direction = behavior.direction; 
      if(behavior.type === "walk"){
        //willstop if space is not free or "true"
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)){
        return;
      }
       this.movingProgressRemaining = 16;
      }
    }

    updatePosition() {
            const [property, change] = this.directionUpdate[this.direction] ;
            this[property] += change;
            this.movingProgressRemaining -= 1;
        }
    


    updateSprite() {
      
      if (this.movingProgressRemaining > 0) {
        this.sprite.setAnimation("walk-"+this.direction);
        return
      }
          this.sprite.setAnimation("idle-"+this.direction);
   }
  }
    
    