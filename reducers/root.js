var types = require('../constants/ActionTypes');
var actions = require('../actions');

var initialState = {
    joke: {
        title: 'Loading...',
        body: 'Coming soon'
    },
    lastUpdated: 0
};

module.exports = function(state, action) {
    if (typeof state == 'undefined') {
        return initialState;
    }

    return state;
}
