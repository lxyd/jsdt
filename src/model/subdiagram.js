define(['./call'], function(Call) {
    class SubdiagramCallElement extends Call {
        constructor() {
            super();
            this.subdiagram = null; // not this.name becouse of tests
        }
    };
    
    return Subdiagram;
})