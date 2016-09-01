var types = require('../constants/ActionTypes');
var fetch = require('isomorphic-fetch');

function fetchJoke () {
    return { type: types.FETCH_JOKE };
}

function fetchJokeFailed(error) {
    return { type: types.FETCH_JOKE, status: 'error', error: error };
}

function fetchJokeSuccess(joke, receivedAt) {
    return { type: types.FETCH_JOKE, status: 'success',
             joke: joke, receivedAt: receivedAt };
}

function refresh() {
    return function(dispatch) {
        dispatch(fetchJoke());
        return fetch('http://api.icndb.com/jokes/random')
                .then(function(response) {
                    if (response.status >= 400) {
                        throw new Error("Unexpected response from server: " + response.status);
                    } else {
                        return response.json();
                    }
                })
                .then(function(json) {
                    dispatch(fetchJokeSuccess({
                        title: 'The Internet Chuck Norris Database',
                        body: json.value.joke
                    }, Date.now()));
                })
                .catch(function(ex) {
                    dispatch(fetchJokeFailed(ex));
                });
    };
}

module.exports = {
    'fetchJoke': fetchJoke,
    'fetchJokeFailed': fetchJokeFailed, 
    'fetchJokeSuccess': fetchJokeSuccess,
    'refresh': refresh
};
