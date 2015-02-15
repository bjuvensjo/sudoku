module.exports = (function () {
    var $ = require('jquery'); 
    var clock = require('./clock');
    var model = require('./model');

    var view;
    var clockInterval = null, formatNotes, methods, $selectedNumber = null, selectedNumber = null, writeNumber, notes = false;
    
    formatNotes = function (set) {
        var formatedNotes, i, sortedArray;
        formatedNotes = '';
        if (set) {
            sortedArray = set.asArray().sort();
            for (i = 0; i < sortedArray.length; i++) {
                if (i > 0) {
                    formatedNotes += ' ';
                }
                formatedNotes += sortedArray[i];
            }
        } else {
            formatedNotes += '&nbsp;';
        }
        return formatedNotes;
    };
    
    writeNumber = function ($sudoku) {
        var $this = $(this), $modelIndex, i, modelIndex, modelIndexes, set;
        if ($selectedNumber) {
            modelIndex = parseInt($this.attr('id'));
            if (notes) {
                if (!($this.hasClass('notes'))) {
                    $this.addClass('notes');
                }
                set = view.model.updateNote(modelIndex, selectedNumber);
                view.model.save();
                $this.html(formatNotes(set));
            } else {
                if (view.model.updateSudoku(modelIndex, selectedNumber)) {
                    $this.off('click');
                    $this.removeClass('notes');
                    $this.html(selectedNumber);
                    modelIndexes = view.model.removeNotes(modelIndex, selectedNumber);
                    view.model.save();
                    for (i = 0; i < modelIndexes.length; i++) {
                        $modelIndex = $('#' + modelIndexes[i]);
                        if ($modelIndex.hasClass('notes')) {
                            $modelIndex.html(formatNotes(view.model.getNotes()[modelIndexes[i]]));
                        }
                    }
                    if (view.model.isSolved()) {
                        view.clock.stop();
                        $sudoku.addClass('sudoku-solved');
                    }
                } else {
                    $this.addClass('error');
                    setTimeout(function () {
                        $this.removeClass('error');
                    }, 300);
                }
                view.model.save();
                $('.errors').html(view.model.getErrors() || '');
            }
        }
    };    



    
    var help = function () {
        var $square, modelIndex, notes, value;
        notes = view.model.createNotes();
        view.model.save();
        $.each($('.square'), function (index, html) {
            $square = $(html);
            modelIndex = parseInt($square.attr('id'));
            value = notes[modelIndex];
            if (value) {
                if (!($square.hasClass('notes'))) {
                    $square.addClass('notes');
                }
                $square.html(formatNotes(value));
            }
        });
    };

    var numbers = function () {
        var selectNumber = function () {
            if ($selectedNumber) {
                $selectedNumber.removeClass('selected-number');
            }
            $selectedNumber = $(this);
            selectedNumber = parseInt($selectedNumber.html());
            $selectedNumber.addClass('selected-number');
        };

        var toggleNumberNotes = function () {
            notes = !notes;
            $(this).toggleClass('notes-toggle');
            $(this).html(notes ? 'N' : 'V');
        };
        
        $('.number').click(selectNumber);
        $('.toggle').click(toggleNumberNotes);
    };

    var start = function (createNew) {
        var $game, $square, modelIndex, notes, squareNotes, sudoku, value;
        $game = $('.game');
        // TODO Refactor!
        var updateSudoku = function () {
            sudoku = view.model.getSudoku();
            notes = view.model.getNotes();
            if (sudoku) {
                $.each($('.square'), function (index, html) {
                    $square = $(html);
                    modelIndex = parseInt($square.attr('id'));
                    value = sudoku[modelIndex];
                    $square.off('click');
                    if (value === 0) {
                        $square.click(function (e) {
                            writeNumber.call(e.target, $game);
                        });
                        squareNotes = notes[modelIndex];
                        if (squareNotes) {
                            value = formatNotes(squareNotes);
                            $square.addClass('notes');
                        } else {
                            value = '&nbsp;';
                        }
                    } else {
                        $square.removeClass('notes');
                    }
                    $square.html(value);
                });
                view.clock.start(createNew);
                // TODO Move below to appropriate place...
                if (clockInterval) {
                    clearInterval(clockInterval);
                }
                var updateClock = function () {
                    var s, time;
                    s = '';
                    view.clock.update();
                    time = view.clock.getTime();
                    if (time.hours < 10) {
                        s += '0';
                    }
                    s += time.hours;
                    s += ':';
                    if (time.minutes < 10) {
                        s += '0';
                    }
                    s += time.minutes;
                    s += ':';
                    if (time.seconds < 10) {
                        s += '0';
                    }
                    s += time.seconds;
                    $('.clock').html(s);
                };
                updateClock();
                clockInterval = setInterval(function () {
                    updateClock();
                }, 1000);
            }
            $('.loader').hide();
            $game.removeClass('sudoku-solved');
            $('.errors').html(view.model.getErrors() || '');
        };
        $('.loader').show();
        if (createNew) {
            if (typeof (Worker) !== "undefined") {
                var worker = new Worker('initializeWorker.min.js');
                // receive messages from web worker
                worker.onmessage = function (e) {
                    view.model.cells = e.data.cells;
                    view.model.errors = e.data.errors;
                    view.model.notes = e.data.notes;
                    view.model.remaining = e.data.remaining;
                    view.model.sudoku = e.data.sudoku;
                    view.model.save();
                    updateSudoku();
                };
                // send message to web worker
                worker.postMessage('createNew');
            } else {
                view.model = model.create();
                view.model.initialize();
                view.model.save();
                updateSudoku();
            }
        } else {
            view.model.load();
            updateSudoku();
        }
    };    
    
    var initialize = function () {        
        $(function () {
            numbers();
            start(false);
            $('.new').click(function () {
                start(true);
            });
            $('.help').click(function () {
                help();
            });
            $('.sudoku').show();
        });
    };

    return {
        create: function (model) {
            view =  {
                model: model,
                clock: clock.create(),
                initialize: initialize
            };
            view.initialize();
            return;
        }
    };
}());
