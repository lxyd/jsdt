define(['./call'], function(CallElement) {
    "use strict";
    class LetterCallElement extends CallElement {
        constructor() {
            super();
            this.letter = "";
        }
    };
    
    return LetterCallElement;
})