const utils = {
    withGrid(n) {
      return n * 16;
    },
    asGridCoords(x,y) {
      return `${x*16},${y*16}`
    },
    nextPlace(initialX, initialY, direction) {
      let x = initialX;
      let y = initialY;
      const size = 16;
      if (direction === "left") { 
        x -= size;
      } else if (direction === "right") {
        x += size;
      } else if (direction === "up") {
        y -= size;
      } else if (direction === "down") {
        y += size;
      }
      return {x,y};
    },
    oppositeDirection(direction) {
      if (direction === "left") { return "right" }
      if (direction === "right") { return "left" }
      if (direction === "up") { return "down" }
      return "up"
    },
    // short hand for person.js 
    emitEvent( name, detail){
      //if 0 then we finished the walk and will know its done moving
              //will help with hero check moving and will do a check to do like cutscenes n such
              // CustomEvent is a nativeJS function where in you basically create an addevent listener that can be used like any other addevent listener its crazy
              const event = new CustomEvent(name, {
                detail
              });
              document.dispatchEvent(event);
    }

  }