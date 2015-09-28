'use strict';

var Issue = React.createClass({
  getInitialState: function() {
    return {
      loading: false,
      error: false,
      issue: null,
      xhr: null
    };
  },
  componentWillMount: function() {
    this.fetch();
  },
  fetch: function() {
    var request = Utils.ajax('GET', this.props.issueUrl, this.fetchSuccess, this.fetchFail);

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
      issue: json
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
        
    if(this.state.loading) {
      view = React.createElement(Spinner);
    } else if(this.state.error) { // is there an error?
      view = React.createElement(ErrorMessage, {
        message: this.state.error
      });
    } else {
      view = React.DOM.div({
        className: 'issueDetail'
      }, React.createElement(IssueListItem, {
          model: this.state.issue,
          isDetailedView: true
        }), 
          // render comments if there are comments for this issue
          this.props.commentsCount > 0 ? 
            React.createElement(Comments, {
              commentsUrl: this.props.commentsUrl 
            }) : null 
      );
    }

    return view;
  }
});