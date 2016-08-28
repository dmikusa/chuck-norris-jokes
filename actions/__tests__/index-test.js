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
        expect(actions.fetchJokeSuccess('I worked :)'))
            .toEqual({ type: types.FETCH_JOKE, status: 'success', response: 'I worked :)' });
    });
});
