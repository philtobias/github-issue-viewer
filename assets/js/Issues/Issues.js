'use strict';

var Issues = React.createClass({
  render: function() {
    var issues = this.props.issues;

    return React.DOM.ul({
      className: 'issueList'
    }, issues ? issues.map(function(issue, index) {
        return React.DOM.li({
          className: 'issueListItem', 
          key: 'issueListItem' + index
        },
          React.createElement(IssueListItem, {
            model: issue,
            index: index,
            isDetailedView: false
          })
        );
      }) : null
    );
  }
});