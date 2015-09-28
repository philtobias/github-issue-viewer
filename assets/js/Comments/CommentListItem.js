'use strict';

var CommentListItem = React.createClass({
  render: function() {
    var model = this.props.model;

    return (
      React.DOM.div({
        className: 'comment',
      },
        React.createElement(UserMeta, {
          model: model.user,
          created_at: model.created_at,
          isShowingTimestamp: true,
          timestampMessage: 'commented on this issue '
        }),
        React.DOM.div({
          className: 'issue__summary'
        }, Utils.formatBody(model.body))
      )
    );
  }
});