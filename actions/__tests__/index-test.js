jest.disableAutomock();

var types = require('../../constants/ActionTypes');
var actions = require('../');

describe("action creators work", function() {
    it("creates a refresh action", function() {
        expect(actions.refresh()).toEqual({ 'type': types.REFRESH });
    });
});
