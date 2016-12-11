define(['./call'], function(CallElement) {
    "use strict";
    class SubdiagramCallElement extends CallElement {
        constructor() {
            super();
            this.subdiagram = null; // not this.name becouse of tests
        }
    };
    
    return SubdiagramCallElement;
})