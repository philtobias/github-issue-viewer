'use strict';

var Comments = React.createClass({
  getInitialState: function() {
    return {
      loading: false,
      error: false,
      comments: null,
      xhr: null
    };
  },
  componentWillMount: function() {
    this.fetch();
  },
  fetch: function() {
    var request = Utils.ajax('GET', this.props.commentsUrl, this.fetchSuccess, this.fetchFail);

    this.setState({
      error: false,
      loading: true,
      xhr: request
    });
  },
  fetchSuccess: function(json) {
    this.setState({
      loading: false,
      error: false,
      xhr: null,
      comments: json || []
    });
  },
  fetchFail: function(xhr, status, reason) {
    this.setState({
      loading: false,
      error: reason
    });
  },
  render: function() {
    var view;
    var comments;

    if(this.state.loading) {
      view = React.createElement(Spinner);
    } else if(this.state.error) {
      view = React.createElement(ErrorMessage, {
        message: this.state.error
      });
    } else {
      comments = this.state.comments;

      view = React.DOM.ul({
        className: 'commentList'
      }, comments ? comments.map(function(comment, index) {
          return React.DOM.li({
            className: 'commentListItem',
            key: 'commentListItem' + index
          },
            React.createElement(CommentListItem, {
              model: comment
            })
          );
      }) : null);
    }

    return view;
  }
});