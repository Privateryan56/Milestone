class KeyPressListener {
    constructor (keyCode, callback) {
        let keySafe = true;
        this.keydownFunction = function (event) {
            if(event.code === keyCode){
                if (keySafe) {
                    keySafe = false;
                    callback();
                }
            }
        };
        this.keyupFunction = function (event) {
            if(event.code === keyCode){
                keySafe = true;
            }  
        };
    
      document.addEventListener("keydown", this.keydownFunction);
      document.addEventListener("keyup", this.keyupFunction);
    }

    unbind(){
        document.removeEventListener("keyup", this.keyupFunction);
        document.removeEventListener("keydown", this.keydownFunction);
    }


}



// this is code to have a certain key pressed and for it to fire off once and not again until its released and this will give it more of that type of old gameboy feel
