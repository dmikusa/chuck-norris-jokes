var createStore = require('redux/lib/createStore').default;
var rootReducer = require('../reducers/root');

module.exports = createStore(rootReducer);
