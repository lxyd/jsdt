define(['./diagram'], function(Diagram) {
    class Package {
        constructor() {
            this.version = -1;
            this.diagrams = {};
        }
    };
    
    return Package;
})