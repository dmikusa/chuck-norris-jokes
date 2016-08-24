var React = require('react');
var ReactDOM = require('react-dom');
var Provider = require('react-redux/lib/components/Provider').default;
var store = require('./store');
var JokePanelBrain = require('./containers/JokePanelBrain');

ReactDOM.render(
    <Provider store={store}>
        <JokePanelBrain />
    </Provider>,
    document.getElementById('jokes')
);
