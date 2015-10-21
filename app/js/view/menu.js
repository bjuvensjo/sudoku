module.exports = (function () {
    var React = require('react');

    var Brand = React.createClass({
        render: function() {
            return <li className="brand">Sudoku</li>;
        }
    });

    var Errors = React.createClass({
        render: function() {
            return <li className="errors">{this.props.errors}</li>;
        }
    });
    
    var Clock = React.createClass({        
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
    
    var Help = React.createClass({
        render: function() {
            return <li onClick={this.props.onClick} className="help">Help</li>;
        }
    });

    var New = React.createClass({
        render: function() {
            return <li onClick={this.props.onClick} className="new">New</li>;
        }
    });    
    
    return React.createClass({
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
}());
