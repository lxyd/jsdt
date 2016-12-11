define(['./diagram'], function(Diagram) {
    "use strict";
    class Package {
        constructor() {
            this.diagrams = {};
        }
    };
    
    return Package;
})