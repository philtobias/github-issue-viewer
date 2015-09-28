'use strict';

var ErrorMessage = React.createClass({
  render: function() {
    return React.DOM.div({
      className: 'textCenter error'
    }, this.props.message);
  }
});