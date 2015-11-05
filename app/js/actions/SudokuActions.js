module.exports = (function () {
    var AppDispatcher = require('../dispatcher/AppDispatcher');
    var SudokuConstants = require('../constants/SudokuConstants');

    var SudokuActions = {

        create: function() {
            AppDispatcher.dispatch({
                type: SudokuConstants.ACTION_CREATE
            });
        },

        help: function() {
            AppDispatcher.dispatch({
                type: SudokuConstants.ACTION_HELP
            });
        },

        number: function(number) {
            AppDispatcher.dispatch({
                type: SudokuConstants.ACTION_NUMBER,
                number: number
            });
        },

        selector: function(selector) {
            AppDispatcher.dispatch({
                type: SudokuConstants.ACTION_SELECTOR,
                selector: selector == SudokuConstants.SELECTOR_N ? SudokuConstants.SELECTOR_V : SudokuConstants.SELECTOR_N
            });            
        },

        square: function(id) {
            AppDispatcher.dispatch({
                type: SudokuConstants.ACTION_SQUARE,
                id: id
            });            
        }
        
    };

    return SudokuActions;
}());
