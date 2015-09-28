'use strict';

var IssueListItem = React.createClass({
  onClick: function(evt) {
    if(!this.props.isDetailedView) {
      evt.preventDefault();
    }
  },
  render: function() {
    var model = this.props.model || {};
    var maxCharsInTrucatedBody = 140;
    var numComments = model.comments ? model.comments : 0;
    var commentsText = '';
    var issueBody = '';

    if(model.body) {
      if(this.props.isDetailedView) {
        issueBody = Utils.formatBody(model.body);
      } else {
        issueBody = Utils.formatTruncatedBody(model.body, maxCharsInTrucatedBody);
      }
    }                  

    if(numComments === 1) {
      commentsText = '1 comment';
    } else if(numComments > 1) {
      commentsText = numComments + ' comments';
    }

    return (
      React.DOM.div({
        className: 'issue', 
        'data-issue-index': this.props.index || 0 
      },
        React.DOM.div({
          className: 'issue__info'
        }, 
          React.DOM.a({
            className: 'issue__header',
            href: model.html_url,
            onClick: this.onClick
          }, 
            React.DOM.span({
              className: 'issue__id'
            }, '#' + model.number),
            React.DOM.span({
              className: 'label issue__state issue__state-' + model.state
            }, model.state),
            React.DOM.span({
              className: 'issue__title'
            }, model.title),
            React.createElement(Labels, {
              model: model.labels
            })
          ),
          React.createElement(UserMeta, {
            model: model.user,
            created_at: model.created_at,
            isShowingTimestamp: true,
            timestampMessage: 'reported this issue '
          }),
          React.DOM.div({
            className: 'issue__summary'
          }, issueBody),
          React.DOM.div({
            className: 'issue__commentCount'
          }, commentsText)
        ),
        React.createElement(UserMeta, {
          model: model.user,
          isShowingTimestamp: false
        })
      )
    );
  }
});