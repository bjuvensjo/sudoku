module.exports = (function () {
    'use strict';    

    var render = function() {
        var canvas, ctx, delta, dimension, i, x, y;
        
        canvas = document.createElement("canvas");
        ctx = canvas.getContext("2d");
        dimension = 320;
        delta = dimension / 9.0;

        canvas.width  = dimension;
        canvas.height = dimension;

        for (i = 0; i < 10; i++) {
            ctx.lineWidth = (i === 3 || i === 6) ? 3 : 1;

            x = delta * i;
            y = delta * i;
            
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, 320);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(320, y);
            ctx.stroke();
        }

        var sudokuElement = document.getElementsByClassName('sudoku')[0];        
        sudokuElement.style.backgroundImage = "url(" + canvas.toDataURL("image/grid") + ")";
    };    

    return {
        render: render
    };
}());


