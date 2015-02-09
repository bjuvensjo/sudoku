var model = require('./view/model');
self.onmessage = function (e) {
    var aModel = model.create();
    aModel.initialize();
    self.postMessage(aModel);
};
