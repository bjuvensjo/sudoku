module.exports = (function () {
    var React = require('react');
    var ReactDOM = require('react-dom');

    var Brand;
    var Clock;
    var Container;
    var Controls;
    var Errors;
    var Help;
    var Loader;
    var Menu;
    var New;
    var Note;
    var Notes;
    var NumberControl;
    var SelectorControl;
    var Square;
    var Sudoku;

    var domElement = document.getElementById("content");

    Brand = React.createClass({
        render: function() {
            return <li className="brand">Sudoku</li>;
        }
    });

    Errors = React.createClass({
        render: function() {
            return <li className="errors">{this.props.errors}</li>;
        }
    });
    
    Clock = React.createClass({        
        render: function() {
            var s, time;
            s = '';
            time = this.props.clock.getTime();
            if (time.hours < 10) {
                s += '0';
            }
            s += time.hours;
            s += ':';
            if (time.minutes < 10) {
                s += '0';
            }
            s += time.minutes;
            s += ':';
            if (time.seconds < 10) {
                s += '0';
            }
            s += time.seconds;
            
            return <li className="clock">{s}</li>;
        }
    });
    
    Help = React.createClass({
        render: function() {
            return <li onClick={this.props.onClick} className="help">Help</li>;
        }
    });

    New = React.createClass({
        render: function() {
            return <li onClick={this.props.onClick} className="new">New</li>;
        }
    });    
    
    Menu = React.createClass({
        render: function() {
            return (
                <div className="menu">
                    <ul>
                    <Brand/>
                    <Errors errors={this.props.errors}/>
                    <Clock clock={this.props.clock}/>
                    <Help onClick={this.props.helpOnClick}/>
                    <New onClick={this.props.newOnClick}/>
                    </ul>
                </div>
            );
        }
    });

    Note = React.createClass({
        render: function() {
            return <li className="note">{this.props.note}</li>;
        }
    });

    Notes = React.createClass({
        render: function() {
            var items = [];
            for (var i = 1; i < 10; i++) {
                var note = this.props.notes.contains(i) ? i : "\u00a0";
                items.push(<Note key={i} note={note}/>);
            }            
            return <ul className="notes">{items}</ul>;
        }
    });    

    Square = React.createClass({
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
    
    Sudoku = React.createClass({
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

    NumberControl = React.createClass({
        handleClick: function(event) {
            this.props.onClick(this.props.value);
        },        
        render: function() {
            return <li onClick={this.handleClick} className={"number" + (this.props.selected ? " selected-number" : "")}>{this.props.value}</li>;            
        }
    });

    SelectorControl = React.createClass({
        handleClick: function(event) {
            this.props.onClick(this.props.selected);
        },
        render: function() {
            return <li onClick={this.handleClick} className={"selector-" + this.props.selected}>{this.props.selected}</li>;
        }
    });        

    Controls = React.createClass({
        render: function() {
            var items = [];
            for (var i = 1; i < 10; i++) {
                items.push(<NumberControl key={i} value={i} selected={this.props.selectedNumber == i} onClick={this.props.numberOnClick}/>);
            }
            return (
                    <div className="controls">
                    <ul>
                    {items}
                    <SelectorControl selected={this.props.selectedSelector} onClick={this.props.selectorOnClick}/>
                    </ul>
                    </div>
            );
        }
    });

    Loader = React.createClass({
        render: function() {
            if (this.props.load) {
                return <div className="loader"></div>;
            } else {
                return <div></div>;
            }
        }
    });

    Container = React.createClass({
        render: function() {
            return (
                    <div className={"container" + (this.props.model.isSolved() ? " container-solved" : "")}>
                    <Menu errors={this.props.model.getErrors()} clock={this.props.clock} newOnClick={this.props.newOnClick} helpOnClick={this.props.helpOnClick}/>
                    <Sudoku sudoku={this.props.model.getSudoku()} notes={this.props.model.getNotes()} errorIndex={this.props.errorIndex} squareOnClick={this.props.squareOnClick}/>
                    <Controls selectedNumber={this.props.selectedNumber} numberOnClick={this.props.numberOnClick} selectedSelector={this.props.selectedSelector} selectorOnClick={this.props.selectorOnClick}/>
                    <Loader load={this.props.load}/>
                    </div>
            );
        }
    });    

    return {
        render: function(props) {
            ReactDOM.render(<Container {...props}/>, domElement);        
        }
    };
}());
