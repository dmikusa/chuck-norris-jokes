jest.disableAutomock();

var configureMockStore = require('redux-mock-store');
var thunk = require('redux-thunk').default;
var types = require('../../constants/ActionTypes');
var actions = require('../');
var nock = require('nock');

var middlewares = [thunk];
var mockStore = configureMockStore(middlewares);

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

describe("async actions", function() {
    afterEach(function() {
        nock.cleanAll();
    });

    it("fetches joke successfully", function() {
        nock('http://api.icndb.com')
            .get('/jokes/random')
            .reply(200, { "type": "success", "value": { "id": 5, "joke": 'JOKE'} });

        var now = Date.now();
        var expectedActions = [
            actions.fetchJoke(),
            actions.fetchJokeSuccess({title: 'The Internet Chuck Norris Database',
                                      joke: 'JOKE'}, now)
        ];
        var store = mockStore({});
        var promise = store.dispatch(actions.refresh());
        promise.then(function() {
                var newActions = store.getActions();
                expect(newActions[0]).toEqual(expectedActions[0]);
                expect(newActions[1].type).toEqual(expectedActions[1].type);
                expect(newActions[1].status).toEqual(expectedActions[1].status);
                expect(newActions[1].joke).toEqual(expectedActions[1].joke);
                // don't check receivedAt, it won't match
            });
        return promise;
    });

    it("fails to fetch a joke, end point not found", function() {
        nock('http://api.icndb.com')
            .get('/jokes/random')
            .reply(404, {});

        var expectedActions = [
            actions.fetchJoke(),
            actions.fetchJokeFailed(new Error("Unexpected response from server: 404"))
        ];
        var store = mockStore({});
        var promise = store.dispatch(actions.refresh());
        promise.then(function() {
                expect(store.getActions()).toEqual(expectedActions);
            });
        return promise;
    });

    it("fails to fetch a joke, some error", function() {
        nock('http://api.icndb.com')
            .get('/jokes/random')
            .replyWithError('something awful happened');

        var expectedActions = [
            actions.fetchJoke(),
            actions.fetchJokeFailed({
                "name": "FetchError",
                "message": "request to http://api.icndb.com/jokes/random failed, reason: something awful happened",
                "type": "system"})
        ];
        var store = mockStore({});
        var promise = store.dispatch(actions.refresh());
        promise.then(function() {
                expect(store.getActions()).toEqual(expectedActions);
            });
        return promise;
    });
});
