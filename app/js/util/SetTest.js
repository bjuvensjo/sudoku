var expect = require('expect.js');
var Set = require('./Set');

describe("combination", function () {

    it("constructor", function () {
        var set = new Set([ 1, 2, 3 ]);
        expect(set.containsAll([ 1, 2, 3 ])).to.be(true);
    });

    it("add", function () {
        var set = new Set();
        set.add(1);
        expect(set.contains(1)).to.be(true);
    });

    it("addAll", function () {
        var set = new Set();
        set.addAll([ 1, 2, 3 ]);
        expect(set.asArray().length).to.be(3);
        expect(set.containsAll([ 1, 2, 3 ])).to.be(true);
    });

    it("containsAll", function () {
        var set1 = new Set([ 1, 2, 3 ]);
        var set2 = new Set([ 1, 2 ]);

        expect(set1.containsAll(set2)).to.be(true);
        expect(set2.containsAll(set1)).to.be(false);
    });

});
