module.exports = (function () {
    var aSolver = require('solver/solver');
    var compellingStrategy = require(solver/strategy/compellingStrategy);
    var completeStrategy = require('solver/strategy/completeStrategy');
    var partnershipStrategy = require('solver/strategy/partnershipStrategy');
    
    var solver, solution, besvarlig, easy, plagsam, mordande, dodlig, time;
    
    easy = [0, 5, 0, 0, 7, 0, 2, 9, 0,
            0, 0, 1, 0, 8, 3, 0, 6, 4,
            4, 2, 0, 6, 0, 0, 0, 7, 0,
            7, 4, 0, 0, 0, 6, 9, 0, 0,
            1, 3, 0, 5, 0, 8, 0, 4, 6,
            0, 0, 9, 4, 0, 0, 0, 1, 5,
            0, 9, 0, 0, 0, 1, 0, 5, 2,
            5, 6, 0, 9, 3, 0, 1, 0, 0,
            0, 1, 7, 0, 6, 0, 0, 3, 0];
    besvarlig = [0, 0, 0, 0, 1, 0, 6, 0, 0,
                 2, 0, 0, 0, 0, 0, 5, 7, 0,
                 0, 6, 0, 0, 0, 5, 0, 1, 0,
                 0, 0, 0, 0, 0, 7, 0, 5, 0,
                 8, 0, 0, 2, 0, 1, 0, 0, 9,
                 0, 4, 0, 6, 0, 0, 0, 0, 0,
                 0, 5, 0, 4, 0, 0, 0, 6, 0,
                 0, 1, 7, 0, 0, 0, 0, 0, 2,
                 0, 0, 4, 0, 3, 0, 0, 0, 0];
    plagsam = [0, 0, 1, 0, 0, 0, 0, 0, 3,
                0, 5, 0, 0, 0, 6, 0, 7, 0,
                0, 8, 0, 4, 3, 0, 0, 5, 0,
                0, 0, 6, 0, 0, 0, 0, 0, 9,
                0, 0, 5, 2, 0, 7, 8, 0, 0,
                9, 0, 0, 0, 0, 0, 3, 0, 0,
                0, 6, 0, 0, 5, 3, 0, 9, 0,
                0, 4, 0, 6, 0, 0, 0, 8, 0,
                5, 0, 0, 0, 0, 0, 2, 0, 0];
    mordande = [5, 4, 0, 0, 0, 6, 3, 0, 0,
                0, 9, 0, 0, 2, 0, 0, 0, 5,
                1, 0, 0, 0, 0, 0, 0, 8, 0,
                0, 2, 0, 1, 0, 7, 0, 0, 0,
                9, 0, 0, 0, 0, 0, 0, 0, 6,
                0, 0, 0, 4, 0, 9, 0, 5, 0,
                0, 6, 0, 0, 0, 0, 0, 0, 8,
                4, 0, 0, 0, 9, 0, 0, 2, 0,
                0, 0, 8, 5, 0, 0, 0, 6, 7];
    dodlig = [0, 0, 0, 0, 0, 0, 5, 4, 0,
              0, 0, 6, 0, 0, 0, 0, 0, 8,
              4, 2, 0, 7, 0, 0, 0, 0, 0,
              0, 0, 3, 6, 7, 0, 0, 0, 2,
              0, 0, 0, 1, 0, 8, 0, 0, 0,
              9, 0, 0, 0, 4, 2, 1, 0, 0,
              0, 0, 0, 0, 0, 3, 0, 6, 7,
              5, 0, 0, 0, 0, 0, 9, 0, 0,
              0, 9, 2, 0, 0, 0, 0, 0, 0];
    myGenerated = [6, 0, 0, 0, 0, 0, 0, 0, 3, 
                9, 0, 0, 0, 6, 0, 0, 0, 0, 
                2, 0, 0, 0, 0, 4, 9, 0, 0, 
                0, 0, 0, 0, 0, 3, 0, 0, 5, 
                0, 1, 0, 0, 0, 9, 0, 0, 0, 
                0, 0, 0, 2, 0, 0, 3, 0, 8, 
                0, 0, 0, 0, 4, 5, 8, 0, 0, 
                0, 2, 4, 0, 0, 1, 0, 7, 0, 
                0, 0, 0, 3, 0, 2, 1, 0, 4];
    
    //aSolver = solver.create([compellingStrategy, completeStrategy]);
    //aSolver = solver.create([completeStrategy, compellingStrategy]);
    //TODO Are both compelling- and completeStrategy needed?!
    //aSolver = solver.create([compellingStrategy, partnershipStrategy]);
    aSolver = solver.create([completeStrategy, compellingStrategy, partnershipStrategy]);
    time = new Date().getTime();
    //solution = aSolver.solve(easy);
    //solution = aSolver.solve(besvarlig);
    //solution = aSolver.solve(plagsam);
    solution = aSolver.solve(mordande);
    //solution = aSolver.solve(dodlig);
    //solution = aSolver.solve(myGenerated);
    time = new Date().getTime() - time;
    var s = solution.valid + '\n';
    for (var i = 0; i < solution.cells.length; i++) {
        if (i > 0 && i % 9 === 0) {
            s += '\n';
        }
        s += solution.cells[i] + ' ';
    }
    console.log(s);
    console.log('time: ' + time + ' ms.');

    return;
});
