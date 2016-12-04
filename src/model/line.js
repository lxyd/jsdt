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
            
            for (var line in this.nextElement.prevLines) {
                if (line.id === this.id) {
                    delete line;
                    break;
                }
            }
            
            for (var line in this.prevElement.nextLines) {
                if (line.id === this.id) {
                    delete line;
                    break;
                }
            }
        }
    };
    
    return Line;
})