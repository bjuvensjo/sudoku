module.exports = (function () {    
    var persistence = require('../util/persistence');    

    return {
        create: function () {
            var lastUpdate = null;
            var stopped = false;
            var time = 0;
            var thePersistence = persistence.create();

            var update = function () {
                var now;
                if (!stopped) {
                    now = new Date();
                    time += now.getTime() - lastUpdate.getTime();
                    lastUpdate = now;
                    save();
                }
            };

            var save = function () {
                var modelString = JSON.stringify({
                    stopped: stopped,
                    time: time
                });
                thePersistence.putString('clock', modelString);
            };

            
            var load = function () {
                var model, modelString;
                modelString = thePersistence.getString('clock');
                if (modelString) {
                    model = JSON.parse(modelString);
                    stopped = model.stopped;
                    time = model.time;
                }
            };            
            
            return {
                getTime: function () {
                    update();
                    var hours, minutes, seconds, tmp;
                    tmp = Math.round(time / 1e3);
                    hours = Math.floor(tmp / 3600);
                    tmp = tmp - hours * 3600;
                    minutes = Math.floor(tmp / 60);
                    seconds = tmp % 60;
                    return {
                        hours : hours,
                        minutes : minutes,
                        seconds : seconds
                    };
                },
                start: function (reset) {
                    lastUpdate = new Date();
                    if (reset) {
                        stopped = false;
                        time = 0;
                        save();
                    } else {
                        load();
                    }
                },
                stop: function () {
                    stopped = true;
                    save();
                }
            };
        }
    };
}());
