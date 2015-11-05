module.exports = (function () {
    var React = require('react');
    var SudokuActions = require('../actions/SudokuActions');
    
    var NumberControl = React.createClass({
        handleClick: function(event) {
            SudokuActions.number(this.props.value);            
        },        
        render: function() {
            return <li onClick={this.handleClick} className={"number" + (this.props.selected ? " selected-number" : "")}>{this.props.value}</li>;            
        }
    });

    var SelectorControl = React.createClass({
        handleClick: function(event) {
            SudokuActions.selector(this.props.selected);
        },
        render: function() {
            return <li onClick={this.handleClick} className={"selector-" + this.props.selected}>{this.props.selected}</li>;
        }
    });

    return React.createClass({
        render: function() {
            var items = [];
            for (var i = 1; i < 10; i++) {
                items.push(<NumberControl key={i} value={i} selected={this.props.selectedNumber == i}/>);
            }
            return (
                    <div className="controls">
                    <ul>
                    {items}
                    <SelectorControl selected={this.props.selectedSelector}/>
                    </ul>
                    </div>
            );
        }
    });        
}());
