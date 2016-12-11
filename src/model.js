/**
 * Модуль, объединяющий все классы модели для упрощения импорта
 */
define(function(require) {
    "use strict";
    return {
        Package               : require('./model/package'),
        Diagram               : require('./model/diagram'),
        Line                  : require('./model/line'),
        Element               : require('./model/element'),
        EnterElement          : require('./model/enter'),
        ExitElement           : require('./model/exit'),
        CallElement           : require('./model/call'),
        BasicCallElement      : require('./model/basic'),
        LetterCallElement     : require('./model/letter'),
        SubdiagramCallElement : require('./model/subdiagram'),
    }
});