self.onmessage = function (e) {
    var model = require('./view/model');
    var aModel = model.create();
    aModel.initialize();
    self.postMessage(aModel);
};
