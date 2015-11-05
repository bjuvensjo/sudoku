module.exports = (function () {
    var apply;

    apply = function (cells, notes) {
        var i, value, updated;
        updated = [];
        for (i = 0; i < notes.getSize(); i++) {
            value = notes.getValue(i);
            if (value) {
                if (value.getSize() === 1) {
                    cells[i] = value.asArray()[0];
                    notes.update(i, cells[i]);
                    updated.push(i);
                }
            }
        }
        return updated;
    };
    
    return {
        apply: apply
    };
}());
