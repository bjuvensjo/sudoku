require(['view/Model', 'view/View'], function (Model, View) {
    'use strict';
    
    var model = new Model();
    var view = new View(model);

    view.initialize();
});
