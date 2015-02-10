module.exports = (function () {
    var indexUtil = require('../util/index');
    var set = require('../util/bitSet');

    var getCellValues = function (cells, indexes) {
        var values = [], value, i;
        for (i = 0; i < indexes.length; i++) {
            value = cells[indexes[i]];
            values.push(value);
        }
        return values;
    };
    
    var getCellNotes = function (cells, index) {
        var cellNotes = set.create([ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]);
        cellNotes.removeAll(getCellValues(cells, indexUtil.getBoxIndexes(index)));
        cellNotes.removeAll(getCellValues(cells, indexUtil.getColumnIndexes(index)));
        cellNotes.removeAll(getCellValues(cells, indexUtil.getRowIndexes(index)));
        return cellNotes;
    };

    var initValues = function (values, cells) {
        var count = 0;
        var index, cellNotes;
        
        for (index = 0; index < cells.length; index++) {
            cellNotes = null;
            if (cells[index] === 0) {
                cellNotes = getCellNotes(cells, index);
                count++;
            }
            values.push(cellNotes);
        }
        return count;
    };
    
    return {
        create: function (cells) {
            var values = [];
            var count = initValues(values, cells);
            
            return {
                getCount: function () {
                    return count;
                },
                getSize: function () {
                    return values.length;
                },
                getAllValues: function () {
                    return values;
                },
                getValue: function (index) {
                    return values[index];
                },
                getValues: function (indexes) {
                    var i, indexValues;
                    indexValues = [];
                    for (i = 0; i < indexes.length; i++) {
                        indexValues.push(values[indexes[i]]);
                    }
                    return indexValues;
                },
                update: function (changedIndex, changedValue) {
                    var i, index, indexes;
                    if (values[changedIndex]) {
                        count--;
                    }
                    values[changedIndex] = null;
                    indexes = indexUtil.getBoxIndexes(changedIndex).concat(indexUtil.getColumnIndexes(changedIndex),
                                                                           indexUtil.getRowIndexes(changedIndex));
                    for (i = 0; i < indexes.length; i++) {
                        index = indexes[i];
                        if (values[index]) {
                            values[index].remove(changedValue);
                        }
                    }
                }
            };
        }
    };
}());
