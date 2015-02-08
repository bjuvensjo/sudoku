var expect = require('expect.js');
var combination = require('./combination');
var Set = require('./Set');

describe("combination", function () {
    var values = null;

    beforeEach(function () {
        values = [ 1, 2, 3, 4 ];
    });

    it("of length 1 should be as expected", function () {
        actual = combination.getCombinations(values, 1);
        expected = [ [ 1 ], [ 2 ], [ 3 ], [ 4 ] ];
        expect(actual).to.eql(expected);
    });

    it("of length 2 should be as expected", function () {
        actual = combination.getCombinations(values, 2);
        expected = [ [ 2, 1 ], [ 3, 1 ], [ 4, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ] ];
        expect(actual).to.eql(expected);
    });

    it("of length 3 should be as expected", function () {
        actual = combination.getCombinations(values, 3);
        expected = [ [ 3, 2, 1 ], [ 4, 2, 1 ], [ 4, 3, 1 ], [ 4, 3, 2 ] ];
        expect(actual).to.eql(expected);
    });

    it("of length 4 should be as expected", function () {
        actual = combination.getCombinations(values, 4);
        expected = [ [ 4, 3, 2, 1 ] ];
        expect(actual).to.eql(expected);
    });

});
