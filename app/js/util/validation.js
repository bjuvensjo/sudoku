module.exports = (function () {
    var indexUtil = require('./index');
    var hasDuplicate, isAllValid, isValid;
    
    hasDuplicate = function (cells, indexes) {
        var values = {}, value, i;
        for (i = 0; i < indexes.length; i++) {
            value = cells[indexes[i]];
            if (value) {
                if (values[value]) {
                    return true;
                } else {
                    values[value] = value;
                }
            }
        }
        return false;
    };

    isAllValid = function (cells) {
        var index, indexes;
        // Check that all cells have a value
        for (index = 0; index < 81; index++) {
            if (cells[index] === 0) {
                return false;
            }
        }
        // Check duplicates in all rows, columns and boxes
        indexes = [ 0, 12, 24, 28, 40, 52, 56, 68, 80 ];
        for (index = 0; index < indexes.length; index++) {
            if (hasDuplicate(cells, indexUtil.getBoxIndexes(indexes[index])) ||
                hasDuplicate(cells, indexUtil.getColumnIndexes(indexes[index])) ||
                hasDuplicate(cells, indexUtil.getRowIndexes(indexes[index]))) {
                return false;
            }
        }
        return true;
    };

    isValid = function (cells, index) {
        return !(cells[index] === 0 || hasDuplicate(cells, indexUtil.getBoxIndexes(index)) ||
                 hasDuplicate(cells, indexUtil.getColumnIndexes(index)) ||
                 hasDuplicate(cells, indexUtil.getRowIndexes(index)));
    };

    return {
        isValid: isValid,
        isAllValid: isAllValid
    };
}());
