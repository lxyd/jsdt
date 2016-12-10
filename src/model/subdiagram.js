define(['./call'], function(CallElement) {
    class SubdiagramCallElement extends CallElement {
        constructor() {
            super();
            this.subdiagram = null; // not this.name becouse of tests
        }
    };
    
    return SubdiagramCallElement;
})