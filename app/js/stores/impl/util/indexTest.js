var expect = require('expect.js');
var index = require('./index');

describe("index", function () {

    it("of a specfied box should be as expected", function () {
        expect(index.getBoxIndexes(40)).to.eql([ 30, 31, 32, 39, 40, 41, 48, 49, 50 ]);
    });

    it("of a specfied column should be as expected", function () {
        expect(index.getColumnIndexes(16)).to.eql([ 7, 16, 25, 34, 43, 52, 61, 70, 79 ]);
    });

    it("of a specfied row should be as expected", function () {
        expect(index.getRowIndexes(65)).to.eql([ 63, 64, 65, 66, 67, 68, 69, 70, 71 ]);
    });

});
