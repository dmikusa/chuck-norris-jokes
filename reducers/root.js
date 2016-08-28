var types = require('../constants/ActionTypes');
var actions = require('../actions');
var Immutable = require('immutable');

var initialState = Immutable.Map({
    joke: {
        title: 'Loading...',
        body: 'Coming soon'
    },
    lastUpdated: 0,
    isFetching: false,
    didInvalidate: false
});

module.exports = function(state, action) {
    if (typeof state == 'undefined') {
        return initialState.toObject();
    }
    state = Immutable.Map(state);
    if (action.type == types.FETCH_JOKE) {
        if (action.error) {
            return state.set('isFetching', false)
                        .set('didInvalidate', false)
                        .set('joke', {
                            title: 'Error Fetching Joke',
                            body: action.error.message
                        }).toObject();
        } else if (action.joke) {
            return state.set('isFetching', false)
                        .set('didInvalidate', false)
                        .set('joke', action.joke)
                        .set('lastUpdated', action.receivedAt)
                        .toObject();
        } else {
            return state.set('isFetching', true)
                        .set('didInvalidate', false)
                        .toObject();
        }
    }
    return state;
}
