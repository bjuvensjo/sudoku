var Model = require('./view/Model');
self.onmessage = function (e) {
    var model = new Model();
    model.initialize();
    self.postMessage(model);
};
