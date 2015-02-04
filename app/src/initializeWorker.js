self.onmessage = function (e) {        
    importScripts('../components/requirejs/require.js');
    require({
        baseUrl : './'
    }, [ 'view/Model' ], function (Model) {
        var model = new Model();
        model.initialize();
        self.postMessage(model);
    });
};
