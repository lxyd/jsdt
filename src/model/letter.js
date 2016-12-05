define(['./call'], function(Call) {
    class LetterCallElement extends Call {
        constructor() {
            this.letter = "";
        }
    };
    
    return LetterCallElement;
})