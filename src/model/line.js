define(function() {
    class Line {
        constructor() {
            this.condition = "";
            this.nextEl = null;
        }
        
        matches(condition) {
            return this.condition.indexOf(condition) >= 0;
        }
    };
    
    return Line;
})