module.exports = (function () {
    var AppDispatcher = require('../dispatcher/AppDispatcher');
    var EventEmitter = require('events').EventEmitter;
    var SudokuConstants = require('../constants/SudokuConstants');
    var assign = require('object-assign');

    var clock = require('./impl/model/clock');
    var model = require('./impl/model/model');    
    var clockInterval;

    var CHANGE_EVENT = 'change';

    var state = {
        clock: clock.create(),
        errorIndex: -1,
        load: false,
        model: model.create(),
        selectedNumber: -1,
        selectedSelector: SudokuConstants.SELECTOR_V 
    };

    var startClock = function(isNew) {
        state.clock.start(isNew);
        SudokuStore.emitChange();
        if (clockInterval) {
            clearInterval(clockInterval);
        }        
        clockInterval = setInterval(function() {
            SudokuStore.emitChange();
        }, 1000);
    };
    
    function create() {
        state.model = model.create();
        state.model.initialize();
        state.model.save();
    }

    function help() {
        state.model.createNotes();
        state.model.save();
    };

    function number(number) {
        state.selectedNumber = number;
    };
    
    function selector(selector) {
        state.selectedSelector = selector;
    };

    function square(id) {
        if (state.selectedSelector == SudokuConstants.SELECTOR_N) {
            state.model.updateNote(id, state.selectedNumber);
        } else {
            if (state.model.updateSudoku(id, state.selectedNumber)) {
                state.model.removeNotes(id, state.selectedNumber);
                if (state.model.isSolved()) {
                    state.clock.stop();
                }
            } else {
                state.errorIndex = id;
                SudokuStore.emitChange();
                setTimeout(function () {
                    state.errorIndex = -1;
                    SudokuStore.emitChange();
                }, 300);
            }
        }
        state.model.save();
    };    

    var SudokuStore = assign({}, EventEmitter.prototype, {
        getState: function() {
            return state;
        },

        emitChange: function() {
            this.emit(CHANGE_EVENT);
        },

        addChangeListener: function(callback) {
            this.on(CHANGE_EVENT, callback);
        },

        removeChangeListener: function(callback) {
            this.removeListener(CHANGE_EVENT, callback);
        }
    });

    // Register callback to handle all updates
    AppDispatcher.register(function(action) {
        switch(action.type) {
        case SudokuConstants.ACTION_CREATE:
            state.load = true;
            SudokuStore.emitChange();                    
            create();
            startClock(true);            
            state.load = false;            
            SudokuStore.emitChange();
            break;

        case SudokuConstants.ACTION_HELP:
            help();
            SudokuStore.emitChange();
            break;

        case SudokuConstants.ACTION_NUMBER:
            number(action.number);
            SudokuStore.emitChange();
            break;

        case SudokuConstants.ACTION_SELECTOR:
            selector(action.selector);
            SudokuStore.emitChange();
            break;

        case SudokuConstants.ACTION_SQUARE:
            square(action.id);
            SudokuStore.emitChange();
            break;

        default:
            // no op
        }
    });

    if (state.model.load()) {
        startClock(false);
    } else {
        create();
        startClock(true);        
    }
    
    return SudokuStore;
}());
