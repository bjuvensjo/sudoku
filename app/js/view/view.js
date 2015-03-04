module.exports = (function () {
    var $ = require('zepto-browserify').$;
    var clock = require('./clock');
    var model = require('./model');
    var numbers = require('./numbers');

    var view;
    var clockInterval = null, formatNotes, methods, writeNumber;
    
    formatNotes = function (set) {
        var $ul, $li, i, n, sortedArray, value;
        sortedArray = set ? set.asArray().sort() : [];
        $ul = $('<ul class="notes"></ul>');
        i = 0;
        for (n = 1; n < 10; n++) {
            value = '&nbsp;';
            if (n === sortedArray[i]) {
                value = n;
                i++;
            }
            $li = $('<li class="note">' + value + '</li>');
            $ul.append($li);
        }
        return $ul;
    };
    
    writeNumber = function ($sudoku) {
        var $this = $(this), $modelIndex, i, modelIndex, modelIndexes, modelIndexNotes, set, sudoku, value;
        if (numbers.$selectedNumber) {
            modelIndex = parseInt($this.attr('id'));
            if (numbers.notes) {
                set = view.model.updateNote(modelIndex, numbers.selectedNumber);
                view.model.save();
                $this.empty().append(formatNotes(set));
            } else {
                if (view.model.updateSudoku(modelIndex, numbers.selectedNumber)) {
                    $this.off('click');
                    modelIndexes = view.model.removeNotes(modelIndex, numbers.selectedNumber);
                    view.model.save();
                    sudoku = view.model.getSudoku();
                    for (i = 0; i < modelIndexes.length; i++) {
                        value = sudoku[modelIndexes[i]];
                        $modelIndex = $('#' + modelIndexes[i]);
                        if (value === 0 && $modelIndex.find('.notes')) {
                            modelIndexNotes = view.model.getNotes()[modelIndexes[i]];
                            $modelIndex.empty().append(formatNotes(modelIndexNotes));
                        }
                    }
                    $this.empty();
                    $this.html(numbers.selectedNumber);
                    if (view.model.isSolved()) {
                        view.clock.stop();
                        $('.container').addClass('container-solved');
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
                $square.empty().append(formatNotes(value));
            }
        });
    };

    var start = function (createNew) {
        var $sudoku, $square, modelIndex, notes, squareNotes, sudoku, value;
        $sudoku = $('.sudoku');
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
                        $square.on('click', ((function () {
                            var $that = $square;                            
                            return function (e) {
                                writeNumber.call($that, $sudoku);                                
                            };
                        })()));
                        squareNotes = notes[modelIndex];
                        if (squareNotes) {
                            $square.empty().append(formatNotes(squareNotes));
                        } else {
                            $square.html('');
                        }
                    } else {
                        $square.html(value);
                    }
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
            $('.container').removeClass('container-solved');
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
            numbers.initialize();
            start(false);
            $('.new').click(function () {
                start(true);
            });
            $('.help').click(function () {
                help();
            });
            $('.container').show();
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
