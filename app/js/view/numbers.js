module.exports = (function () {
    var $ = require('jquery');

    var selectNumber = function () {
        if (numbers.$selectedNumber) {
            numbers.$selectedNumber.toggleClass('selected-number');
        }
        numbers.$selectedNumber = $(this);
        numbers.selectedNumber = parseInt(numbers.$selectedNumber.html());
        numbers.$selectedNumber.toggleClass('selected-number');
    };

    var toggleNumberNotes = function () {
        numbers.notes = !numbers.notes;
        $(this).toggleClass('selector-N');
        $(this).toggleClass('selector-V');
        $(this).html(numbers.notes ? 'N' : 'V');
    };

    var numbers = {
        notes: false,
        $selectedNumber: null,
        selectedNumber: null,
        initialize: function () {
            $('.number').click(selectNumber);
            $('.selector-V').click(toggleNumberNotes);            
        }
    };
        
    return numbers;
}());
