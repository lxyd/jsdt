define(function() {
    class Line {
        constructor() {
            this.condition = "";
            this.nextElement = null;
            this.prevElement = null;
            this.id = -1;
        }
        
        matches(condition) {
            return this.condition.indexOf(condition) >= 0;
        }
        
        purgeLine() {
            // TODO: impliment
            // ALLAHU AKBAR!!!s
        }
    };
    
    return Line;
})