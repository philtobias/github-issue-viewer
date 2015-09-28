'use strict';

var Label = React.createClass({
  render: function() {
    var yiq = Utils.getContrastYIQ(this.props.model.color);
    var fontColor = (yiq === 'black') ? '000' : 'FFF';

    return React.DOM.span({ 
      className: 'label',
      key: 'label' + this.props.model.name,
      style: {
        backgroundColor: '#' + this.props.model.color,
        color: '#' + fontColor 
      }
    }, this.props.model.name);
  }
});