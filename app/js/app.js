module.exports = (function () {
    'use strict';    

    var model = require('./view/model');
    var view = require('./view/view');

    var aView = view.create(model.create());
    
    return aView;
}());
