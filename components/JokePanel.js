var React = require('react');
var Panel = require('react-bootstrap/lib/Panel');
var Button = require('react-bootstrap/lib/Button');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');

var JokePanel = React.createClass({
    componentDidMount: function() {
        this.props.refresh();
    },
    render: function() {
        var title = (
            <div>
                <h4>{this.props.title}</h4>
                <Button bsSize="xsmall" onClick={this.props.refresh}>
                    <Glyphicon glyph="refresh" />
                </Button>
            </div>
        );
        return (
            <Panel header={title}>
                <span className="joke">{this.props.joke}</span>
            </Panel>
        );
    }
});

module.exports = JokePanel
