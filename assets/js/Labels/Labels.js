'use strict';

var Labels = React.createClass({
  render: function() {
    var labels = this.props.model;

    return React.DOM.span({
      className: 'labels'
    },
      labels ? labels.map(function(label, index) {
        return React.createElement(Label, {
            key: 'label' + index,
            model: label
        });
      }) : null
    ); 
  }
});