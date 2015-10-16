module.exports = (function () {
    'use strict';    
    
    var clock = require('./view/clock');
    var grid = require('./view/grid');    
    var model = require('./view/model');    
    var view = require('./view/view');
    var clockInterval;
    
    var updateSudoku = function(isNew) {
        props.clock.start(isNew);
        props.load = false;
        view.render(props);
        if (clockInterval) {
            clearInterval(clockInterval);
        }        
        clockInterval = setInterval(function() {
            view.render(props);
        }, 1000);
    };
    
    var props = {
        clock: clock.create(),
        errorIndex: -1,
        load: false,
        model: model.create(),
        selectedNumber: -1,
        selectedSelector: "V"
    };    
    
    props.helpOnClick = function() {
        props.model.createNotes();
        props.model.save();
        view.render(props);
    };

    props.newOnClick = function() {
        props.load = true;
        view.render(props);
        if (typeof (Worker) !== "undefined") {
            var worker = new Worker('initializeWorker.min.js');
            // receive messages from web worker
            worker.onmessage = function (e) {
                props.model.cells = e.data.cells;
                props.model.errors = e.data.errors;
                props.model.notes = e.data.notes;
                props.model.remaining = e.data.remaining;
                props.model.sudoku = e.data.sudoku;
                props.model.save();
                updateSudoku(true);
            };
            // send message to web worker
            worker.postMessage('createNew');
        } else {
            props.model = model.create();
            props.model.initialize();
            props.model.save();
            updateSudoku(true);
        }
    };    

    props.numberOnClick = function(number) {
        props.selectedNumber = number;
        view.render(props);
    };

    props.selectorOnClick = function(selector) {
        props.selectedSelector = selector == "N" ? "V" : "N";
        view.render(props);
    };

    props.squareOnClick = function(id) {
        if (props.selectedSelector == "N") {
            props.model.updateNote(id, props.selectedNumber);
        } else {
            if (props.model.updateSudoku(id, props.selectedNumber)) {
                props.model.removeNotes(id, props.selectedNumber);
                if (props.model.isSolved()) {
                    props.clock.stop();
                }
            } else {
                props.errorIndex = id;
                view.render(props);
                setTimeout(function () {
                    props.errorIndex = -1;
                    view.render(props);
                }, 300);
            }
        }
        props.model.save();
        view.render(props);
    };

    if (props.model.load()) {
        updateSudoku(false);
    } else {
        props.newOnClick();
    }
    grid.render();

    return;
}());
