module.exports = (function () {
    var $ = require('jquery');

    var selectNumber = function () {
        if (numbers.$selectedNumber) {
            numbers.$selectedNumber.removeClass('selected-number');
        }
        numbers.$selectedNumber = $(this);
        numbers.selectedNumber = parseInt(numbers.$selectedNumber.html());
        numbers.$selectedNumber.addClass('selected-number');
    };

    var toggleNumberNotes = function () {
        numbers.notes = !numbers.notes;
        $(this).toggleClass('notes-toggle');
        $(this).html(numbers.notes ? 'N' : 'V');
    };

    var numbers = {
        notes: false,
        $selectedNumber: null,
        selectedNumber: null,
        initialize: function () {
            $('.number').click(selectNumber);
            $('.toggle').click(toggleNumberNotes);            
        }
    };
        
    return numbers;
}());
