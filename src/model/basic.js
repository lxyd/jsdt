define(['./call'], function(CallElement) {
    "use strict";
    class BasicCallElement extends CallElement {
        constructor() {
            super();
            this.name = null;
        }
    };
    
    return BasicCallElement;
})