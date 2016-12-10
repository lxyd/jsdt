define(['bunit', 'assert', 'must-throw', 'src/datafmt', 'src/model'], function(bunit, assert, mustThrow, datafmt, model) {
    var parse = datafmt.parse,
        serialize = datafmt.serialize;

    var d_no_main = {
        version: 0,
        diagrams: { },
    };
    
    var d_empty = {
        version: 0,
        diagrams: {
            main: {
                elements: { },
                lines: { },
            },
        },
    };

    var d_simple = {
        version: 0,
        diagrams: {
            main: {
                elements: {
                    "0": { type: "enter", next_line_ids: [0] },
                    "1": { type: "basic", name: "r", next_line_ids: [1] },
                    "2": { type: "letter", letter: "x", next_line_ids: [2] },
                    "3": { type: "subdiagram", name: "trivial", next_line_ids: [3] },
                    "4": { type: "exit" },
                },
                lines: {
                    "0": { condition: "", next_el_id : 1 },
                    "1": { condition: "", next_el_id : 2 },
                    "2": { condition: "", next_el_id : 3 },
                    "3": { condition: "", next_el_id : 4 },
                },
            },
            trivial: {
                elements: {
                    "0": { type: "enter", next_line_ids: [0] },
                    "1": { type: "exit" },
                },
                lines: {
                    "0": { condition: " ", next_el_id : 1 },
                },
            },
        },
    };

    bunit("Разные тесты парсера", {
        throwIfNoMain: mustThrow(function() {
            parse(d_no_main);
        }, "Парсер должен падать, если нет диаграммы main"),
        versionMustNotBePreserved: function(parsed) {
            assert(parsed.version).not().isDefined();
        },
    });
    
    bunit("Парсер парсит правильные типы данных", {
        setUp: function() {
            return [parse(d_simple)];
        },
        versionMustNotBePreserved: function(parsed) {
            assert(parsed.version).not().isDefined();
        },
        diagramsAreObject: function(parsed) {
            assert(parsed.diagrams).is('object');
            assert(parsed.diagrams).not().equals(null);
        },
        diagramHasRightType: function(parsed) {
            var d = parsed.diagrams["main"];
            assert(d).isDefined();
            assert(d.constructor).equals(model.Diagram);
        },
        elementsAreObject: function(parsed) {
            var d = parsed.diagrams["main"];
            assert(d.elements).is('object');
            assert(d.elements).not().equals(null);
        },
        linesAreObject: function(parsed) {
            var d = parsed.diagrams["main"];
            assert(d.lines).is('object');
            assert(d.lines).not().equals(null);
        },
        lineHasRightType: function(parsed) {
            var d = parsed.diagrams["main"];
            assert(d.lines[0].constructor).equals(model.Line);
        },
        enterHasRightType: function(parsed) {
            var d = parsed.diagrams["main"];
            assert(d.elements[0].constructor).equals(model.EnterElement);
        },
        basicHasRightType: function(parsed) {
            var d = parsed.diagrams["main"];
            assert(d.elements[1].constructor).equals(model.BasicCallElement);
        },
        letterHasRightType: function(parsed) {
            var d = parsed.diagrams["main"];
            assert(d.elements[2].constructor).equals(model.LetterCallElement);
        },
        subdiagramHasRightType: function(parsed) {
            var d = parsed.diagrams["main"];
            assert(d.elements[3].constructor).equals(model.SubdiagramCallElement);
        },
        exitHasRightType: function(parsed) {
            var d = parsed.diagrams["main"];
            assert(d.elements[4].constructor).equals(model.ExitElement);
        },
    });
    
    bunit("При парсинге id и name прописываются внутрь объектов", {
        setUp: function() {
            return [parse(d_simple)];
        },
        diagramHasName: function(parsed) {
            var d = parsed.diagrams["main"];
            assert(d.name).equals("main");
        },
        elementHasIntegerId: function(parsed) {
            var d = parsed.diagrams["main"];
            // Тут внимательно, "0" как строка не подойдёт:
            // после парсинга поле id должно быть целым числом
            assert(d.elements[0].id).equals(0);
            assert(d.elements[1].id).equals(1);
            assert(d.elements[2].id).equals(2);
            assert(d.elements[3].id).equals(3);
            assert(d.elements[4].id).equals(4);
        },
        lineHasIntegerId: function(parsed) {
            var d = parsed.diagrams["main"];
            // Тут внимательно, "0" как строка не подойдёт:
            // после парсинга поле id должно быть целым числом
            assert(d.lines[0].id).equals(0);
            assert(d.lines[1].id).equals(1);
            assert(d.lines[2].id).equals(2);
            assert(d.lines[3].id).equals(3);
        },
    });
    
    bunit("При парсинге id заменяются на ссылки", {
        setUp: function() {
            return [parse(d_simple)];
        },
        elementNextLineIdsChangedToLinks: function(parsed) {
            var d = parsed.diagrams["main"];
            
            assert(d.elements[0].next_line_ids).not().isDefined();
            assert(d.elements[0].nextLines).is("array");
            assert(d.elements[0].nextLines).not().equals(null);
            assert(d.elements[0].nextLines[0]).equals(d.lines[0]);
        },
        elementHasPrevLines: function(parsed) {
            var d = parsed.diagrams["main"];
            
            assert(d.elements[1].prevLines).is("array");
            assert(d.elements[1].prevLines).not().equals(null);
            assert(d.elements[1].prevLines[0]).equals(d.lines[0]);
        },
        lineNextElementIdChangedToLinks: function(parsed) {
            var d = parsed.diagrams["main"];
            
            assert(d.lines[0].next_element_id).not().isDefined();
            assert(d.lines[0].nextElement).is("object");
            assert(d.lines[0].nextElement).equals(d.elements[1]);
        },
        lineHasPrevElement: function(parsed) {
            var d = parsed.diagrams["main"];
            
            assert(d.lines[0].prevElement).is("object");
            assert(d.lines[0].prevElement).equals(d.elements[0]);
        },
        subdiagramNamesChangedToLinks: function(parsed) {
            var d1 = parsed.diagrams["main"];
            var d2 = parsed.diagrams["trivial"];
            assert(d1.elements[3].name).not().isDefined();
            assert(d1.elements[3].subdiagram).equals(d2);
        },
    });
    
    
    // TODO : test serialize function
});