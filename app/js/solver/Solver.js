module.exports = (function () {    
    var validation = require('../util/validation');
    var notes = require('./notes');

    return {
        create: function (strategies) {
            return {
                solve: function (cells) {
                    var i, aNotes, totalProgress, strategyProgress;
                    aNotes = notes.create(cells);

                    totalProgress = 1;
                    while (aNotes.getCount() > 0 && totalProgress > 0) {
                        totalProgress = 0;
                        for (i = 0; aNotes.getCount() > 0 && i < strategies.length; i++) {
                            strategyProgress = strategies[i].apply(cells, aNotes);
                            // console.log(i + ' strategyProgress: ' + strategyProgress);
                            totalProgress += strategyProgress.length;
                        }
                    }

                    return {
                        valid : validation.isAllValid(cells),
                        cells : cells
                    };
                }
            };
        }
    };
}());
