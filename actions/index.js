var types = require('../constants/ActionTypes');

module.exports = {
    'fetchJoke': function() {
        return { type: types.FETCH_JOKE };
    },
    'fetchJokeFailed': function(error) {
        return { type: types.FETCH_JOKE, status: 'error', error: error };
    },
    'fetchJokeSuccess': function(response) {
        return { type: types.FETCH_JOKE, status: 'success', response: response };
    }
};
