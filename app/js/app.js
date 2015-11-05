module.exports = (function () {
    'use strict';    

    var React = require('react');
    var ReactDOM = require('react-dom');
    var SudokuApp = require('./components/SudokuApp');
    
    ReactDOM.render(<SudokuApp />, document.getElementById("SudokuApp"));

    return;
}());
