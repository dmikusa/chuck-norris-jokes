var React = require('react');
var ReactDOM = require('react-dom');
var JokePanel = require('./components/JokePanel');

ReactDOM.render(
    <JokePanel title="The Internet Chuck Norris Database"
               joke="Chuck Norris once shot down a German fighter plane with his finger. By yelling Bang!" />,
    document.getElementById('jokes')
);
