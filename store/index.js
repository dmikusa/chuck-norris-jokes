var thunkMiddleware = require('redux-thunk').default;
var createStore = require('redux/lib/createStore').default;
var applyMiddleware = require('redux/lib/applyMiddleware').default;
var rootReducer = require('../reducers/root');

var store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware // lets us dispatch() functions
    ));

module.exports = store;
