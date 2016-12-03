/**
 * Модуль, объединяющий все классы модели для упрощения импорта
 */
define(function(require) {
    return {
        Package    : require('./model/package'),
        Diagram    : require('./model/diagram'),
        Line       : require('./model/line'),
        Element    : require('./model/element'),
        Enter      : require('./model/enter'),
        Exit       : require('./model/exit'),
        Call       : require('./model/call'),
        Basic      : require('./model/basic'),
        Letter     : require('./model/letter'),
        Subdiagram : require('./model/subdiagram'),
    }
});