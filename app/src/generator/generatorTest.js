var expect = require('expect.js');
var generator = require('./generator');
var validation = require('../util/validation');

describe("generator", function () {

    it("generate() should be valid", function () {
        var actual, cells, expected;

        expect(generator.generate).to.not.be(undefined);     

        // Test generate
        cells = generator.generate();
        actual = validation.isAllValid(cells);
        expected = true;
        expect(actual).to.be(expected);
    });

});
