var expect = require('expect.js');
var bitSet = require('./bitSet');

describe("combination", function () {

    it("constructor", function () {
        var set = bitSet.create([ 1, 2, 3, 3 ]);
        expect(set.containsAll([ 1, 2, 3 ])).to.be(true);
    });

    it("add", function () {
        var set = bitSet.create();
        set.add(1);
        set.add(2);
        set.add(3);
        expect(set.contains(1)).to.be(true);
        expect(set.contains(2)).to.be(true);
        expect(set.contains(3)).to.be(true);
    });

    it("addAll", function () {
        var set = bitSet.create([ 1, 2, 3 ]);
        set.addAll([ 4, 5, 6 ]);
        set.addAll(bitSet.create([ 4, 5, 6, 7, 8, 9 ]));
        expect(set.asArray().length).to.be(9);
        expect(set.containsAll([ 1, 2, 3 ])).to.be(true);
    });

    it("containsAll", function () {
        var set1 = bitSet.create([ 1, 2, 3 ]);
        var set2 = bitSet.create([ 1, 2 ]);
        expect(set1.containsAll(set2)).to.be(true);
        expect(set2.containsAll(set1)).to.be(false);
    });

    it("asArray", function () {
        var set = bitSet.create([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]);
        expect(set.asArray().length).to.be(10);
        expect(set.asArray()).to.eql([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]);
    });

    it("contains", function () {
        var i;
        var set = bitSet.create([ 1, 2, 3 ]);
        set.addAll([ 4, 5, 6 ]);
        set.addAll(bitSet.create([ 7, 8 ]));
        set.add(9);
        for (i = 1; i < 10; i++) {
            expect(set.contains(i)).to.be(true);
        }
        expect(set.contains(0)).to.be(false);
        expect(set.contains(10)).to.be(false);
    });

    it("getSize", function () {
        var set = bitSet.create([ 1, 2, 3, 4, 5 ]);
        set.removeAll([ 1, 2 ]);
        set.remove(3);
        expect(set.getSize()).to.be(2);
    });

    it("isEmpty", function () {
        var set = bitSet.create([ 1, 2, 3, 4, 5 ]);
        set.removeAll([ 1, 2 ]);
        set.remove(3);
        expect(set.isEmpty()).to.be(false);

        set = bitSet.create();
        expect(set.isEmpty()).to.be(true);
    });

    it("remove", function () {
        var set = bitSet.create();
        set.add(1);
        set.add(2);
        set.add(3);
        set.remove(1);
        set.remove(2);
        expect(set.contains(1)).to.be(false);
        expect(set.contains(2)).to.be(false);
        expect(set.contains(3)).to.be(true);
    });

    it("removeAll", function () {
        var set = bitSet.create([ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]);
        set.removeAll([ 4, 5, 6 ]);
        expect(set.getSize()).to.be(6);
        expect(set.containsAll([ 1, 2, 3, 7, 8, 9 ])).to.be(true);
        expect(set.contains(4)).to.be(false);
        expect(set.contains(5)).to.be(false);
        expect(set.contains(6)).to.be(false);
    });

});
