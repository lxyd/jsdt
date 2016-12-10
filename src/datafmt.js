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
                            new model.ExitElement;
                    createExit(projectPackage);
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
                    break;
            }
        }


        /**
         * Elements attributes only. CallElements and ExitElement parsing in other functions.
         * elements.elementId must be initialized witn new ...Element();
         * Will fill id, nextLines, create Lines, create next Elements and call pickType()
         * @function createElement
         * @argument {Object} projectPackage
         */
        function createElement(projectPackage, elementId) {
            /** Short name for projectPackage.diagrams[diagram].elements */
            var ElementsParsed = projectPackage.diagrams[diagram].elements;

            /** Short name for projectPackage.diagrams[diagram].lines */
            var LinesParsed = projectPackage.diagrams[diagram].lines;

            /** Short name for obj.diagrams[diagram].elements[elementId]*/
            var elementJSON = obj.diagrams[diagram].elements[elementId];

            ElementsParsed[elementId].id = parseInt(elementId);
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
                    var lineId = parseInt(lineIdStr);
                    LinesParsed[lineId] = new model.Line();
                    LinesParsed[lineId].prevElement = ElementsParsed[elementId];
                    ElementsParsed[elementId].nextLines.push(LinesParsed[lineId]);

                    /** Short name for obj.diagrams[diagram].lines[lineId] */
                    var lineJSON = obj.diagrams[diagram].lines[lineIdStr];

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
         */
        function createExit(projectPackage) {
            var ElementsParsed = projectPackage.diagrams[diagram].elements;
            ElementsParsed[elementId].id = parseInt(elementId);
            if (isNaN(ElementsParsed[elementId].id)) {
                throw new Error("ElementsParsed[elementId].id is Nan");
            }
        }

        /**
         * Call createElement() and parse BasikCallElement filds
         * @argument {Object} projectPackage 
         * @function createBasik
         */
        function createBasic(projectPackage, elementId) {
            createElement(projectPackage, elementId);

            var ElementsParsed = projectPackage.diagrams[diagram].elements;
            // TODO: There must be link to basic element, or smth like that
            ElementsParsed[elementId].name =
                    obj.diagrams[diagram].elements[elementId].name;
        }

        /**
         * Call createElement() and parse LetterCallElements filds
         * @argument {Object} projectPackage 
         * @function createLetter
         */
        function createLetter(projectPackage, elementId) {
            createElement(projectPackage, elementId);

            var ElementsParsed = projectPackage.diagrams[diagram].elements;

            ElementsParsed[elementId].letter =
                    obj.diagrams[diagram].elements[elementId].letter;
        }


        /**
         * Call createElement() and parse SubdiagramCallElement filds
         * @argument {Object} projectPackage 
         * @function createSubdiagram
         */
        function createSubdiagram(projectPackage, elementId) {
            createElement(projectPackage, elementId);

            var subdiagramLink = projectPackage.diagrams[diagram].elements[elementId].subdiagram;
            var subDiagName = obj.diagrams[diagram].elements[elementId].name;

            subdiagramsObj[subdiagramLink] = subDiagName;

        }


        //------------------ HERE CODE`S BEGINING -------------------------


        if (!obj.diagrams['main'])
            throw new Error("Main not found."); // they never read docs

        var projectPackage = new model.Package();

        /** Here will be saved subdiagrams to add links on objects later.
         * Link on elements[elementId].subdiagram : diagram name as string.
         * @type Object 
         */
        var subdiagramsObj = {};

        for (var diagram in obj.diagrams) {
            projectPackage.diagrams[diagram] = new model.Diagram();

            // Element without lines can`t be found recursively
            for (var elementId in obj.diagrams[diagram].elements) {
                pickType(projectPackage, elementId);
            }
        }

        for (var linkOnSub in subdiagramsObj) {
            linkOnSub = projectPackage.diagrams[subdiagramsObj[linkOnSub]];
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