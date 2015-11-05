module.exports = (function () {
    var getBoxIndexes, getColumnIndexes, getRowIndexes;
    
    getBoxIndexes = function (index) {
        var indexes = [], boxIndex = Math.floor(index / 27) * 27 + Math.floor((index % 9) / 3) * 3, i;
        for (i = 0; i < 9; i++) {
            indexes.push(boxIndex);
            boxIndex++;
            if (boxIndex % 3 === 0) {
                boxIndex += 6;
            }
        }
        return indexes;
    };

    getColumnIndexes = function (index) {
        var indexes = [], columnIndex = index % 9, i;
        for (i = 0; i < 9; i++) {
            indexes.push(columnIndex);
            columnIndex += 9;
        }
        return indexes;
    };

    getRowIndexes = function (index) {
        var indexes = [], rowIndex = Math.floor(index / 9) * 9, i;
        for (i = 0; i < 9; i++) {
            indexes.push(rowIndex);
            rowIndex++;
        }
        return indexes;
    };
    
    return {
        getBoxIndexes: getBoxIndexes,
        getColumnIndexes: getColumnIndexes,
        getRowIndexes: getRowIndexes
    };
}());
