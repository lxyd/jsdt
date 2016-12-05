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
            
            // To delete an object we have delete every link on it
            // TODO: delete other links
            
            
            for (var i = 0; i < this.nextElement.prevLines.length; ++i) {
                if (this.nextElement.prevLines[i] === this) {
                    this.nextElement.prevLines.splice(i, 1);
                    break;
                }
            }
            
            for (var i = 0; i < this.prevElement.nextLines.length; ++i) {
                if (this.prevElement.nextLines[i] === this) {
                    this.prevElement.nextLines.splice(i, 1);
                    break;
                }
            }
        }
    };
    
    return Line;
})