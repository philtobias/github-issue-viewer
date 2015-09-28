'use strict';

var UserMeta = React.createClass({
  render: function() {
    var model = this.props.model || {};
    var timeAgo = this.props.isShowingTimestamp ? Utils.timeAgo(new Date(this.props.created_at)) : '';

    return React.DOM.div({
      className: 'issue__userMeta'
    }, 
      React.DOM.a({
        className: 'issue__user',
        href: model.html_url,
        target: '_blank'
      }, 
        React.DOM.img({
          className: 'user__avatar', 
          src: model.avatar_url,
          alt: model.login
        }),
        React.DOM.span({
          className: 'user__name'
        }, model.login)
      ),
      React.DOM.span({
        className: 'user__createdAt'
      }, this.props.isShowingTimestamp ? 
          (this.props.timestampMessage || '') + timeAgo + ' ago' : ''
    ));
  }
});