module.exports = (function () {
    var React = require('react');
    var ReactDOM = require('react-dom');
    var Controls = require('./controls');
    var Menu = require('./menu');
    var Sudoku = require('./sudoku');
    
    var Container = React.createClass({
        render: function() {
            return (
                    <div className={"container" + (this.props.model.isSolved() ? " container-solved" : "")}>
                    <Menu errors={this.props.model.getErrors()} clock={this.props.clock} newOnClick={this.props.newOnClick} helpOnClick={this.props.helpOnClick}/>
                    <Sudoku sudoku={this.props.model.getSudoku()} notes={this.props.model.getNotes()} errorIndex={this.props.errorIndex} squareOnClick={this.props.squareOnClick}/>
                    <Controls selectedNumber={this.props.selectedNumber} numberOnClick={this.props.numberOnClick} selectedSelector={this.props.selectedSelector} selectorOnClick={this.props.selectorOnClick}/>
                    <div className={this.props.load ? "loader" : ""}/>
                    </div>
            );
        }
    });    

    return {
        render: function(props) {
            ReactDOM.render(<Container {...props}/>, document.getElementById("content"));        
        }
    };
}());
