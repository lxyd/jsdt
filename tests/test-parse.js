define(['bunit', 'assert', 'must-throw', 'src/parse', 'src/model'], function(bunit, assert, mustThrow, parse, model) {
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

    var d_trivial = {
        version: 0,
        diagrams: {
            main: {
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
        }),//, "Парсер должен падать, если нет диаграммы main"),
        versionIsPreserved: function(parsed) {
            assert(parsed.version).equals(d_trivial.version);
        },
    });
    
    bunit("Парсер парсит правильные типы данных", {
        setUp: function() {
            return [parse(d_trivial)];
        },
        diagramsAreArray: function(parsed) {
            assert(parsed.diagrams).is('array');
        },
        diagramHasRightClass: function(parsed) {
            assert(parsed.diagrams[0]).isDefined();
            assert(parsed.diagrams[0].constructor).equals(model.Diagram);
        },
        // TODO : add oter data types
    });
});