'use strict';

var Model = require('./view/Model');
var View = require('./view/View');

module.exports = (function () {

    var model = new Model();
    var view = new View(model);

    view.initialize();
    
    return view;
}());
