module.exports = (function () {
    var assign = require('object-assign');    
    var keyMirror = require('keymirror');

    var constants= keyMirror({
        ACTION_CREATE: null,
        ACTION_HELP: null,
        ACTION_NUMBER: null,
        ACTION_SELECTOR: null,
        ACTION_SQUARE: null
    });

    assign(constants, {
        SELECTOR_V: "V",
        SELECTOR_N: "N"        
    });

    return constants;
}());
