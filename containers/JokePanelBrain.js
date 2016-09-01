var types = require('../constants/ActionTypes');
var actions = require('../actions');
var connect = require('react-redux/lib/components/connect').default;
var JokePanel = require('../components/JokePanel');

var mapStateToProps = function(state) {
    return {
        title: state.joke.title,
        joke: state.joke.body
    };
};

var mapDispatchToProps = function(dispatch) {
    return {
        refresh: function(e) {
            dispatch(actions.refresh());
        }
    };
};

module.exports = connect(
                     mapStateToProps,
                     mapDispatchToProps
                 )(JokePanel);
