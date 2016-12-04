define(function () {
    class Element {
        constructor() {
            this.nextLines = [];
            this.prevLines = [];
            this.id = -1;
        }
        nextElement(condition) {
            // NOTE: if there are a number of matches, the 1st matche will be returned...
            if (this.nextLines.length === 0)
                throw new RangeError("nextElement: empty nextLines");

            for (var line in this.nextLines) {
                if (line.matches(condition))
                    return line.nextEl;
            }
        }

        purgeElement() {
            // TODO: delete other links
            
            if (this.nextLines.length !== 0)
                for (var line in this.nextLines) {
                    line.purgeLine();
                }
            
            if (this.prevLines.length !== 0)
                for (var line in this.prevLines) {
                    line.purgeLine();
                }
        }
    }
    ;

    return Element;
})