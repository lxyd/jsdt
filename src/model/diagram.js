define(['./element', './line'], function(Element, Line) {
    "use strict";
    class Diagram {
        constructor() {
            this.elements = {};
            this.lines = {};
            this.name = "";
        }
    };
    
    return Diagram;
})