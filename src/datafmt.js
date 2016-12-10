define(['./model'], function (model) {
    "use strict";
    // FUTURE : delegate to ./datafmt-versions/datafmt-X by requireing
    //          particular datafmt module depending on this.obj.version


    class Parser {

        /** This function will create element and call other function to parse it
         * Also this function will be called recursively for some elements.
         * It`s needed to fill prevElement.
         * @function pickType
         * @argument {Object} projectPackage
         * @argument {String} elementId May be int or somthing for parseInt()
         */
        pickType(projectPackage, elementId) {
            if (projectPackage.diagrams[this.diagram].elements[elementId]) {
                return null;
            }

            switch (this.obj.diagrams[this.diagram].elements[elementId].type) {
                case "enter":
                    projectPackage.diagrams[this.diagram].elements[elementId] =
                            new model.EnterElement();
                    this.createElement(projectPackage, elementId);
                    return projectPackage.diagrams[this.diagram].elements[elementId];
                case "exit":
                    projectPackage.diagrams[this.diagram].elements[elementId] =
                            new model.ExitElement();
                    this.createExit(projectPackage, elementId);
                    return projectPackage.diagrams[this.diagram].elements[elementId];
                case "basic":
                    projectPackage.diagrams[this.diagram].elements[elementId] =
                            new model.BasicCallElement();
                    this.createBasic(projectPackage, elementId);
                    return projectPackage.diagrams[this.diagram].elements[elementId];
                case "letter":
                    projectPackage.diagrams[this.diagram].elements[elementId] =
                            new model.LetterCallElement();
                    this.createLetter(projectPackage, elementId);
                    return projectPackage.diagrams[this.diagram].elements[elementId];
                case "subdiagram":
                    projectPackage.diagrams[this.diagram].elements[elementId] =
                            new model.SubdiagramCallElement();
                    this.createSubdiagram(projectPackage, elementId);
                    return projectPackage.diagrams[this.diagram].elements[elementId];
                default:
                    // It`s immposible, but let it be
                    // 
                    // Do The Impossible
                    // See The Invisible
                    // Row! Row!
                    // Fight The Power!
                    throw new Error("Anknown type of element");
            }
        }

        /**
         * Elements attributes only. CallElements and ExitElement parsing in other functions.
         * elements.elementId must be initialized witn new ...Element();
         * Will fill id, nextLines, create Lines, create next Elements and call this.pickType()
         * @function createElement
         * @argument {Object} projectPackage
         * @argument {String} elementIdStr Smth for parseInt()
         */
        createElement(projectPackage, elementIdStr) {
            var elementId = parseInt(elementIdStr);
            if (isNaN(elementId)) {
                throw new Error("elementId is NaN");
            }
            /** Short name for projectPackage.diagrams[diagram].elements */
            var ElementsParsed = projectPackage.diagrams[this.diagram].elements;
            /** Short name for projectPackage.diagrams[diagram].lines */
            var LinesParsed = projectPackage.diagrams[this.diagram].lines;
            /** Short name for this.obj.diagrams[diagram].elements[elementId]*/
            var elementJSON = this.obj.diagrams[this.diagram].elements[elementIdStr];
            ElementsParsed[elementId].id = elementId;
            if (isNaN(ElementsParsed[elementId].id)) {
                throw new Error("ElementsParsed[elementId].id is Nan");
            }
            if (elementJSON.type !== "exit") {
                /** Short name for this.obj.diagrams[diagram].elements.elementId.next_line_ids*/
                var nextLineIdsJSON = elementJSON.next_line_ids;
                for (var lineIdStr in nextLineIdsJSON) {
                    if (LinesParsed[nextLineIdsJSON[lineIdStr]]) {
                        throw new Error("LinesParsed[lineId] exists");
                    }

                    var lineId = parseInt(nextLineIdsJSON[lineIdStr]);
                    LinesParsed[lineId] = new model.Line();
                    LinesParsed[lineId].prevElement = ElementsParsed[elementId];
                    ElementsParsed[elementId].nextLines.push(LinesParsed[lineId]);

                    /** Short name for this.obj.diagrams[diagram].lines[lineId] */
                    var lineJSON = this.obj.diagrams[this.diagram].lines[lineId.toString()];
                    LinesParsed[lineId].id = parseInt(lineId);
                    if (isNaN(LinesParsed[lineId].id)) {
                        throw new Error("LinesParsed[lineId].id is Nan");
                    }

                    LinesParsed[lineId].condition = lineJSON.condition;
                    if (!LinesParsed[lineId].nextElement) {
                        LinesParsed[lineId].nextElement =
                                this.pickType(projectPackage, lineJSON.next_el_id);
                    }
                    LinesParsed[lineId].nextElement.prevLines.push(LinesParsed[lineId]);
                }
            } else {
                // Now this code will never be executed.
                // But I already wrote that if so...
                throw new Error("Exit in Element parser");
            }
        }

        /**
         * Exit dotsn`t have next line so it has it`s own function to avoid errors
         * @function createExit
         * @argument {Object} projectPackage 
         * @argument {String} elementIdStr Smth for parseInt() 
         */
        createExit(projectPackage, elementIdStr) {
            var elementId = parseInt(elementIdStr);
            if (isNaN(elementId)) {
                throw new Error("elementId is NaN");
            }

            var ElementsParsed = projectPackage.diagrams[this.diagram].elements;
            ElementsParsed[elementId].id = elementId;
        }

        /**
         * Call this.createElement() and parse BasikCallElement filds
         * @argument {Object} projectPackage 
         * @function createBasik
         * @argument {Object} elementIdStr Smth for parseInt()
         */
        createBasic(projectPackage, elementIdStr) {
            this.createElement(projectPackage, elementIdStr);
            var elementId = parseInt(elementIdStr);
            if (isNaN(elementId)) {
                throw new Error("elementId is Nan");
            }
            var ElementsParsed = projectPackage.diagrams[this.diagram].elements;
            // TODO: There must be link to basic element, or smth like that
            ElementsParsed[elementId].name =
                    this.obj.diagrams[this.diagram].elements[elementId].name;
        }

        /**
         * Call this.createElement() and parse LetterCallElements filds
         * @argument {Object} projectPackage 
         * @function createLetter
         * @argument {Object} elementIdStr Smth for parseInt()
         */
        createLetter(projectPackage, elementIdStr) {
            this.createElement(projectPackage, elementIdStr);
            var ElementsParsed = projectPackage.diagrams[this.diagram].elements;
            var elementId = parseInt(elementIdStr);
            if (isNaN(elementId)) {
                throw new Error("elementId is Nan");
            }

            ElementsParsed[elementId].letter =
                    this.obj.diagrams[this.diagram].elements[elementIdStr].letter;
        }

        /**
         * Call this.createElement() and parse SubdiagramCallElement filds
         * @argument {Object} projectPackage 
         * @function createSubdiagram
         * @argument {Object} elementIdStr Smth for parseInt()
         */
        createSubdiagram(projectPackage, elementIdStr) {
            this.createElement(projectPackage, elementIdStr);
            var elementId = parseInt(elementIdStr);
            if (isNaN(elementId)) {
                throw new Error("elementId is Nan");
            }

            var elementLink = projectPackage.diagrams[this.diagram].elements[elementId];
            var subdiagramName = this.obj.diagrams[this.diagram].elements[elementIdStr].name;
            // Thats a little dirty hack, but it`s more readeble and easy to use
            // than other ways. elementLink.name will be deleted at the ann of parse()
            elementLink.name = subdiagramName;
            this.subdiagramsArray.push(elementLink);
        }

        /** Main guy of class Parse().
         * He will initialized all variables and call other functions.
         * @argument {Object} objJSON JSON parsed into object. 
         */
        parse(objJSON) {

            this.obj = objJSON;
            if (!this.obj.diagrams['main'])
                throw new Error("Main not found."); // they never read docs

            var projectPackage = new model.Package();
            /** Here will be saved subdiagrams to add links on objects later.
             * @type Object 
             */
            this.subdiagramsArray = [];
            for (this.diagram in this.obj.diagrams) {
                projectPackage.diagrams[this.diagram] = new model.Diagram();
                projectPackage.diagrams[this.diagram].name = this.diagram;
                // Element without lines can`t be found recursively
                for (var elementId in this.obj.diagrams[this.diagram].elements) {
                    this.pickType(projectPackage, elementId);
                }
            }

            for (var linkOnSub in this.subdiagramsArray) {
                //this.subdiagramsArray[linkOnSub] = projectPackage.diagrams[this.subdiagramsArray[linkOnSub]];
                var diagramName = this.subdiagramsArray[linkOnSub].name;
                this.subdiagramsArray[linkOnSub].subdiagram = projectPackage.diagrams[diagramName];
                // name isn`t declared in madel/subdiagram, that is my hack. Look in this.createSubdiagram()
                delete this.subdiagramsArray[linkOnSub].name;
            }

            return projectPackage;
        }
    }
    ;

    function parse(obj) {
        return new Parser().parse(obj);
    }

    function serialize() {
// TODO : implement
    }

    return {
        parse: parse,
        serialize: serialize,
    }
});