define(['./call'], function(Call) {
    class BasicCallElement extends Call {
        constructor() {
            this.name = null;
        }
    };
    
    return BasicCallElement;
})