define(['./element', './line'], function(Element, Line) {
    class Diagram {
        constructor() {
            this.elements = {};
            this.lines = {};
            this.name = "";
        }
    };
    
    return Diagram;
})