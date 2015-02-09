module.exports = (function () {    
    var persistence = require('../util/persistence');    

    return {
        create: function () {
            var lastUpdate = null;
            var stopped = false;
            var time = 0;
            var persistence = persistence.create();

            return {
                getTime: function () {
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
                load: function () {
                    var model, modelString;
                    modelString = persistence.getString('clock');
                    if (modelString) {
                        model = JSON.parse(modelString);
                        stopped = model.stopped;
                        time = model.time;
                    }
                },
                save: function () {
                    var modelString = JSON.stringify({
                        stopped: stopped,
                        time: time
                    });
                    persistence.putString('clock', modelString);
                },
                start: function (createNew) {
                    lastUpdate = new Date();
                    if (createNew) {
                        stopped = false;
                        time = 0;
                        this.save();
                    } else {
                        this.load();
                    }
                },
                stop: function () {
                    stopped = true;
                    this.save();
                },
                update: function () {
                    var now;
                    if (!stopped) {
                        now = new Date();
                        time += now.getTime() - lastUpdate.getTime();
                        lastUpdate = now;
                        this.save();
                    }
                }
            };
        }
    };
}());
