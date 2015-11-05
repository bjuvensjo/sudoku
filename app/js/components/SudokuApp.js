module.exports = (function () {
    var React = require('react');
    var Controls = require('./controls');
    var Menu = require('./menu');
    var Sudoku = require('./sudoku');

    var SudokuStore = require('../stores/SudokuStore');    

    function getSudokuState() {
        return SudokuStore.getState();
    }
    
    var SudokuApp = React.createClass({

        getInitialState: function() {
            return getSudokuState();
        },

        componentDidMount: function() {
            SudokuStore.addChangeListener(this._onChange);
        },

        componentWillUnmount: function() {
            SudokuStore.removeChangeListener(this._onChange);
        },

        /**
         * @return {object}
         */
        render: function() {
            return (
                    <div className={"container" + (this.state.model.isSolved() ? " container-solved" : "")}>
                    <Menu errors={this.state.model.getErrors()} clock={this.state.clock} newOnClick={this.state.newOnClick} helpOnClick={this.state.helpOnClick}/>
                    <Sudoku sudoku={this.state.model.getSudoku()} notes={this.state.model.getNotes()} errorIndex={this.state.errorIndex} squareOnClick={this.state.squareOnClick}/>
                    <Controls selectedNumber={this.state.selectedNumber} numberOnClick={this.state.numberOnClick} selectedSelector={this.state.selectedSelector} selectorOnClick={this.state.selectorOnClick}/>
                    <div className={this.state.load ? "loader" : ""}/>
                    </div>
            );
        },

        _onChange: function() {
            this.setState(getSudokuState());
        }

    });

    return SudokuApp;
}());
