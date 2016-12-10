define(['./model'], function (model) {
    // FUTURE : delegate to ./datafmt-versions/datafmt-X by requireing
    //          particular datafmt module depending on obj.version

    function parse(obj) {

        /** This function will create element and call other function to parse it
         * Also this function will be called recursively for some elements.
         * It`s needed to fill prevElement.
         * @function pickType
         * @argument {Object} projectPackage
         * @argument {String} elementId May be int or somthing for parseInt()
         */
        function pickType(projectPackage, elementId) {
            if (projectPackage.diagrams[diagram].elements[elementId]) {
                return null;
            }

            switch (obj.diagrams[diagram].elements[elementId].type) {
                case "enter":
                    projectPackage.diagrams[diagram].elements[elementId] =
                            new model.EnterElement();
                    createElement(projectPackage, elementId);
                    return projectPackage.diagrams[diagram].elements[elementId];
                case "exit":
                    projectPackage.diagrams[diagram].elements[elementId] =
                            new model.ExitElement();
                    createExit(projectPackage, elementId);
                    return projectPackage.diagrams[diagram].elements[elementId];
                case "basic":
                    projectPackage.diagrams[diagram].elements[elementId] =
                            new model.BasicCallElement();
                    createBasic(projectPackage, elementId);
                    return projectPackage.diagrams[diagram].elements[elementId];
                case "letter":
                    projectPackage.diagrams[diagram].elements[elementId] =
                            new model.LetterCallElement();
                    createLetter(projectPackage, elementId);
                    return projectPackage.diagrams[diagram].elements[elementId];
                case "subdiagram":
                    projectPackage.diagrams[diagram].elements[elementId] =
                            new model.SubdiagramCallElement();
                    createSubdiagram(projectPackage, elementId);
                    return projectPackage.diagrams[diagram].elements[elementId];
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
         * Will fill id, nextLines, create Lines, create next Elements and call pickType()
         * @function createElement
         * @argument {Object} projectPackage
         * @argument {String} elementIdStr Smth for parseInt()
         */
        function createElement(projectPackage, elementIdStr) {
            elementId = parseInt(elementIdStr);
            if (isNaN(elementId)) {
                throw new Error("elementId is NaN");
            }
            /** Short name for projectPackage.diagrams[diagram].elements */
            var ElementsParsed = projectPackage.diagrams[diagram].elements;

            /** Short name for projectPackage.diagrams[diagram].lines */
            var LinesParsed = projectPackage.diagrams[diagram].lines;

            /** Short name for obj.diagrams[diagram].elements[elementId]*/
            var elementJSON = obj.diagrams[diagram].elements[elementIdStr];

            ElementsParsed[elementId].id = elementId;
            if (isNaN(ElementsParsed[elementId].id)) {
                throw new Error("ElementsParsed[elementId].id is Nan");
            }
            if (elementJSON.type !== "exit") {
                /** Short name for obj.diagrams[diagram].elements.elementId.next_line_ids*/
                var nextLineIdsJSON = elementJSON.next_line_ids;

                for (var lineIdStr in nextLineIdsJSON) {
                    if (LinesParsed[nextLineIdsJSON[lineIdStr]]) {
                        throw new Error("LinesParsed[lineId] exists");
                        //continue;
                    }
                    var lineId = parseInt(nextLineIdsJSON[lineIdStr]);
                    LinesParsed[lineId] = new model.Line();
                    LinesParsed[lineId].prevElement = ElementsParsed[elementId];
                    ElementsParsed[elementId].nextLines.push(LinesParsed[lineId]);

                    /** Short name for obj.diagrams[diagram].lines[lineId] */
                    var lineJSON = obj.diagrams[diagram].lines[lineId.toString()];

                    LinesParsed[lineId].id = parseInt(lineId);
                    if (isNaN(LinesParsed[lineId].id)) {
                        throw new Error("LinesParsed[lineId].id is Nan");
                    }

                    LinesParsed[lineId].condition = lineJSON.condition;

                    if (!LinesParsed[lineId].nextElement) {
                        LinesParsed[lineId].nextElement =
                                pickType(projectPackage, lineJSON.next_el_id);

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
        function createExit(projectPackage, elementIdStr) {
            var elementId = parseInt(elementIdStr);
            if (isNaN(elementId)) {
                throw new Error("elementId is NaN");
            }

            var ElementsParsed = projectPackage.diagrams[diagram].elements;
            ElementsParsed[elementId].id = elementId;
        }

        /**
         * Call createElement() and parse BasikCallElement filds
         * @argument {Object} projectPackage 
         * @function createBasik
         * @argument {Object} elementIdStr Smth for parseInt()
         */
        function createBasic(projectPackage, elementIdStr) {
            createElement(projectPackage, elementIdStr);

            var elementId = parseInt(elementIdStr);
            if (isNaN(elementId)) {
                throw new Error("elementId is Nan");
            }
            var ElementsParsed = projectPackage.diagrams[diagram].elements;
            // TODO: There must be link to basic element, or smth like that
            ElementsParsed[elementId].name =
                    obj.diagrams[diagram].elements[elementId].name;
        }

        /**
         * Call createElement() and parse LetterCallElements filds
         * @argument {Object} projectPackage 
         * @function createLetter
         * @argument {Object} elementIdStr Smth for parseInt()
         */
        function createLetter(projectPackage, elementIdStr) {
            createElement(projectPackage, elementIdStr);

            var ElementsParsed = projectPackage.diagrams[diagram].elements;

            var elementId = parseInt(elementIdStr);
            if (isNaN(elementId)) {
                throw new Error("elementId is Nan");
            }

            ElementsParsed[elementId].letter =
                    obj.diagrams[diagram].elements[elementIdStr].letter;
        }


        /**
         * Call createElement() and parse SubdiagramCallElement filds
         * @argument {Object} projectPackage 
         * @function createSubdiagram
         * @argument {Object} elementIdStr Smth for parseInt()
         */
        function createSubdiagram(projectPackage, elementIdStr) {
            createElement(projectPackage, elementIdStr);

            var elementId = parseInt(elementIdStr);
            if (isNaN(elementId)) {
                throw new Error("elementId is Nan");
            }

            var elementLink = projectPackage.diagrams[diagram].elements[elementId];
            var subdiagramName = obj.diagrams[diagram].elements[elementIdStr].name;
            
            // Thats a little dirty hack, but it`s more readeble and easy to use
            // than other ways. elementLink.name will be deleted at the ann of parse()
            elementLink.name = subdiagramName;
            subdiagramsArray.push(elementLink);

        }


        //------------------ HERE CODE`S BEGINING -------------------------


        if (!obj.diagrams['main'])
            throw new Error("Main not found."); // they never read docs

        var projectPackage = new model.Package();

        

        /** Here will be saved subdiagrams to add links on objects later.
         * @type Object 
         */
        var subdiagramsArray = [];

        for (var diagram in obj.diagrams) {
            projectPackage.diagrams[diagram] = new model.Diagram();
            projectPackage.diagrams[diagram].name = diagram;

            // Element without lines can`t be found recursively
            for (var elementId in obj.diagrams[diagram].elements) {
                pickType(projectPackage, elementId);
            }
        }

        for (var linkOnSub in subdiagramsArray) {
            //subdiagramsArray[linkOnSub] = projectPackage.diagrams[subdiagramsArray[linkOnSub]];
            var diagramName = subdiagramsArray[linkOnSub].name;
            subdiagramsArray[linkOnSub].subdiagram = projectPackage.diagrams[diagramName];
            
            // name isn`t declared in madel/subdiagram, that is my hack. Look in createSubdiagram()
            delete subdiagramsArray[linkOnSub].name;
        }

        return projectPackage;
    }


    function serialize() {
        // TODO : implement
    }

    return {
        parse: parse,
        serialize: serialize,
    }
});