define(['./call'], function(CallElement) {
    class BasicCallElement extends CallElement {
        constructor() {
            super();
            this.name = null;
        }
    };
    
    return BasicCallElement;
})