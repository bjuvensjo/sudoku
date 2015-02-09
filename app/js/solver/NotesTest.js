var expect = require('expect.js');
var notes = require('./notes');
var set = require('../util/bitSet');

describe("notes", function () {
    it("should be empty when all cells have values", function () {
        var cells = [ 8, 5, 6, 1, 7, 4, 2, 9, 3, 9, 7, 1, 2, 8, 3, 5, 6, 4, 4, 2, 3, 6, 5, 9, 8, 7, 1, 7, 4, 5, 3, 1, 6, 9, 2, 8, 1, 3,
                      2, 5, 9, 8, 7, 4, 6, 6, 8, 9, 4, 2, 7, 3, 1, 5, 3, 9, 8, 7, 4, 1, 6, 5, 2, 5, 6, 4, 9, 3, 2, 1, 8, 7, 2, 1, 7, 8, 6, 5,
                      4, 3, 9 ];
        var aNotes = notes.create(cells);

        expect(aNotes.getValues([ 0 ])).to.eql([ null ]);
    });

    describe("for first cell", function () {
        var cells = null;

        beforeEach(function () {
            cells = [ 0, 5, 6, 1, 7, 4, 2, 9, 3, 9, 7, 1, 2, 8, 3, 5, 6, 4, 4, 2, 3, 6, 5, 9, 8, 7, 1, 7, 4, 5, 3, 1, 6, 9, 2, 8, 1, 3,
                      2, 5, 9, 8, 7, 4, 6, 6, 8, 9, 4, 2, 7, 3, 1, 5, 3, 9, 8, 7, 4, 1, 6, 5, 2, 5, 6, 4, 9, 3, 2, 1, 8, 7, 2, 1, 7, 8,
                      6, 5, 4, 3, 9 ];
        });

        it("should contain an 8 when that is the value that that cell must contain", function () {
            var aNotes = notes.create(cells);

            expect(aNotes.getValues([ 0 ])).to.eql([ set.create([ 8 ]) ]);
        });

        it("should be empty when updated with a value", function () {
            var aNotes = notes.create(cells);
            aNotes.update(0, 8);

            expect(aNotes.getValues([ 0 ])).to.eql([ null ]);
        });
    });
});
