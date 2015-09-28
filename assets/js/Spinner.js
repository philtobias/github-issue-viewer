'use strict';

var Spinner = React.createClass({
  render: function() {
    return React.DOM.div({
      className: 'spinner'
    }, 'Loading');
  }
});