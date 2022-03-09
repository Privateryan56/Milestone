class TextMessage {
    constructor({ text, onComplete}) {
        this.text = text;
        this.onComplete = onComplete;
        this.element = null;
    }
    // create a div and populate it with stuff from scratch 
 createElement() {
        //create the element here
        this.element = document.createElement("div");
        this.element.classList.add("TextMessage");


        this.element.innerHTML = (`
        <p class="TextMessage_p">${this.text}</p>
        <button class="TextMessage_button">Next</button>
         ` )

        this.element.querySelector("button").addEventListener("click", () =>{
            //close text message ez
            this.done();
        });

        this.actionListener = new KeyPressListener("Enter", () =>{
            //not always neccessary for this to have the unbind just in this case it is 
            this.actionListener.unbind();
            this.done();
        });

 }
 done(){
     this.element.remove();
    this.onComplete();
 }

    init(container) {
        this.createElement();
        container.appendChild(this.element);
    }


}