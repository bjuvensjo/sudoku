'use strict';

module.exports = (function () {
    var model = require('./view/model');
    var view = require('./view/view');

    var aView = view.create(model.create());

    aView.initialize();
    
    return aView;
}());
