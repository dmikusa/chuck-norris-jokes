var types = require('../constants/ActionTypes');

module.exports = {
    'refresh': function() {
        return { type: types.REFRESH };
    }
};
