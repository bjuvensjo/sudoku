module.exports = (function () {
    var generator = require('../generator/generator');
    var indexUtil = require('../util/index');
    var notes = require('../solver/notes');
    var set = require('../util/bitSet');
    var persistence = require('../util/persistence');

    var thePersistence = persistence.create();    
    
    var Model = function () {
        if (!(this instanceof Model)) {
            return new Model();
        }
        this.cells = null;
        this.sudoku = null;
        this.notes = null;
        this.remaining = -1;
        this.errors = -1;
        return this;
    };

    Model.prototype.getErrors = function () {
        return this.errors;
    };

    Model.prototype.getNotes = function () {
        return this.notes;
    };

    Model.prototype.getSolution = function () {
        return this.cells;
    };

    Model.prototype.getSudoku = function () {
        return this.sudoku;
    };

    Model.prototype.initialize = function () {
        var i;
        this.cells = generator.generate();
        this.sudoku = generator.generateSudoku(this.cells);
        this.notes = [];
        this.notes.length = 81;
        this.remaining = 0;
        this.errors = 0;
        for (i = 0; i < this.sudoku.length; i++) {
            if (this.sudoku[i] === 0) {
                this.remaining++;
            }
        }
    };

    Model.prototype.isSolved = function () {
        return this.remaining === 0;
    };

    Model.prototype.createNotes = function () {
        this.notes = notes.create(this.sudoku).getAllValues();
        return this.notes;
    };

    Model.prototype.removeNotes = function (index, value) {
        var cellIndexes, i, theIndex, indexes, theNotes;
        cellIndexes = indexUtil.getBoxIndexes(index).concat(indexUtil.getColumnIndexes(index), indexUtil.getRowIndexes(index));
        indexes = [];
        for (i = 0; i < cellIndexes.length; i++) {
            theIndex = cellIndexes[i];
            theNotes = this.notes[theIndex];
            if (theNotes && theNotes.remove(value)) {
                indexes.push(theIndex);
                if (theNotes.isEmpty()) {
                    this.notes[theIndex] = null;
                }
            }
        }
        return indexes;
    };

    Model.prototype.load = function () {
        var i, model, modelString;
        modelString = thePersistence.getString('model');
        if (modelString) {
            model = JSON.parse(modelString);
            this.cells = model.cells;
            this.sudoku = model.sudoku;
            this.notes = [];
            this.notes.length = model.notes.length;
            for (i = 0; i < model.notes.length; i++) {
                if (model.notes[i]) {
                    this.notes[i] = set.create(model.notes[i].value);
                } else {
                    this.notes[i] = null;
                }
            }
            this.remaining = model.remaining;
            this.errors = model.errors | 0;
            return true;
        }
        return false;
    };

    Model.prototype.save = function () {
        var modelString = JSON.stringify(this);
        thePersistence.putString('model', modelString);
    };

    Model.prototype.updateNote = function (index, note) {
        var aSet;
        if (!this.notes[index]) {
            aSet = set.create([ note ]);
            this.notes[index] = aSet;
        } else {
            aSet = this.notes[index];
            if (aSet.contains(note)) {
                aSet.remove(note);
            } else {
                aSet.add(note);
            }
        }
        return aSet;
    };

    Model.prototype.updateSudoku = function (index, value) {
        if (value !== this.cells[index]) {
            this.errors++;
            return false;
        } else {
            this.sudoku[index] = value;
            this.remaining--;
            return true;
        }
    };

    return {
        create: function () {
            return new Model();
        }
    };
}());
