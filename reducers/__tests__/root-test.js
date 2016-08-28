jest.disableAutomock();

var types = require('../../constants/ActionTypes');
var actions = require('../../actions');
var root = require('../root');

describe("root reducer works", function() {
    it("shows the initial state", function() {
        var state = root(undefined, {});
        expect(state).toEqual({
            joke: {
                title: 'Loading...',
                body: 'Coming soon'
            },
            lastUpdated: 0,
            isFetching: false,
            didInvalidate: false
        });
    });
    it("fetch is started", function() {
        var state = root({
            joke: {
                title: 'Loading...',
                body: 'Coming soon'
            },
            lastUpdated: 0,
            isFetching: false,
            didInvalidate: false
        }, actions.fetchJoke());
        expect(state).toEqual({
            joke: {
                title: 'Loading...',
                body: 'Coming soon'
            },
            lastUpdated: 0,
            isFetching: true,
            didInvalidate: false
        });
    });
    it("fetch succeeds", function() {
        var now = Date.now();
        var joke = { title: 'The Internet Chuck Norris Database', 
                     body: 'Chuck Norris can write infinite recursion functions and have them return.'};
        var state = root({
            joke: {
                title: 'Loading...',
                body: 'Coming soon'
            },
            lastUpdated: 0,
            isFetching: true,
            didInvalidate: false
        }, actions.fetchJokeSuccess(joke, now));
        expect(state).toEqual({
            joke: {
                title: 'The Internet Chuck Norris Database',
                body: 'Chuck Norris can write infinite recursion functions and have them return.'
            },
            lastUpdated: now,
            isFetching: false,
            didInvalidate: false
        });
    });
    it("fetch fails", function() {
        var error = Error("Test failure");
        var state = root({
            joke: {
                title: 'Loading...',
                body: 'Coming soon'
            },
            lastUpdated: 0,
            isFetching: true,
            didInvalidate: false
        }, actions.fetchJokeFailed(error));
        expect(state).toEqual({
            joke: {
                title: 'Error Fetching Joke',
                body: 'Test failure'
            },
            lastUpdated: 0,
            isFetching: false,
            didInvalidate: false
        });
    });
});
