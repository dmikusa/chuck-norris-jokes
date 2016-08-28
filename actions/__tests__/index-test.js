jest.disableAutomock();

var types = require('../../constants/ActionTypes');
var actions = require('../');

describe("action creators work", function() {
    it("creates a fetch joke action", function() {
        expect(actions.fetchJoke()).toEqual({ type: types.FETCH_JOKE });
    });
    it("creates a fetch joke failed action", function() {
        expect(actions.fetchJokeFailed('I failed :('))
            .toEqual({ type: types.FETCH_JOKE, status: 'error', error: 'I failed :(' });
    });
    it("creates a fetch joke succeeded action", function() {
        var now = Date.now();
        var joke = { title: 'Hello World!', body: 'I worked :)'};
        expect(actions.fetchJokeSuccess(joke, now))
            .toEqual({ type: types.FETCH_JOKE, status: 'success',
                       joke: joke, receivedAt: now });
    });
});
