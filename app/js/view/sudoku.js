module.exports = (function () {
    var React = require('react');
    var ReactDOM = require('react-dom');    

    var Note = React.createClass({
        render: function() {
            return <li className="note">{this.props.note}</li>;
        }
    });

    var Notes = React.createClass({
        render: function() {
            var items = [];
            for (var i = 1; i < 10; i++) {
                var note = this.props.notes.contains(i) ? i : "\u00a0";
                items.push(<Note key={i} note={note}/>);
            }            
            return <ul className="notes">{items}</ul>;
        }
    });    

    var Square = React.createClass({
        handleClick: function(event) {
            this.props.onClick(this.props.index);
        },                
        render: function() {
            var className = "square" + (this.props.errorIndex == this.props.index ? " error" : "");
            if (this.props.value) {
                return <li className={className}>{this.props.value}</li>;                                
            }
            if (this.props.notes) {
                return <li onClick={this.handleClick} className={className}><Notes notes={this.props.notes}/></li>;                                
            }
            return <li onClick={this.handleClick} className={className}>{"\u00a0"}</li>;
        }
    });    
    
    return React.createClass({
        render: function() {
            var items = [];
            for (var i = 0; i < 81; i++) {
                items.push(<Square key={i} index={i} value={this.props.sudoku[i]} notes={this.props.notes[i]} errorIndex={this.props.errorIndex} onClick={this.props.squareOnClick}/>);
            }
            return (
                    <div className="sudoku">
                    <ul>{items}</ul>
                    </div>
            );
        },
        componentDidMount: function() {
            var canvas, ctx, delta, dimension, i, x, y;
            dimension = 320;
            canvas = document.createElement("canvas");            
            canvas.width = dimension;
            canvas.height = dimension;
            ctx = canvas.getContext("2d");
            delta = dimension / 9.0;
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
            ReactDOM.findDOMNode(this).style.backgroundImage = "url(" + canvas.toDataURL("image/grid") + ")";            
        }
    });        
}());
