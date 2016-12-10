define(['./call'], function(CallElement) {
    class LetterCallElement extends CallElement {
        constructor() {
            super();
            this.letter = "";
        }
    };
    
    return LetterCallElement;
})