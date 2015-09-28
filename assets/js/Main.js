'use strict';

var Main = React.createClass({
  getInitialState: function() {
    return {
      loading: false,
      error: false,
      issues: [],
      xhr: null,
      page: 'all',
      issueUrl: null,
      commentsUrl: null,
      commentsCount: null,
      endIndex: 0,
      currentIndex: 0,
      visiblePages: 5,
      pageStep: 25,
      currentPage: 1
    };
  },
  componentWillMount: function() {
    this.fetch();
  },
  /*
    only update component if:
      - loading state has changed
      - changing page type ('all' vs 'single')
      - issues array is different from changing pages in pagination
  */
  shouldComponentUpdate: function(nextProps, nextState) {
    return  nextState.loading !== this.state.loading ||
            nextState.page !== this.state.page || 
            nextState.issues !== this.state.issues;
  },
  fetch: function() {
    var url = 'https://api.github.com/repos/npm/npm/issues?filter=all&state=all&page=' + this.state.currentPage + '&per_page=' + this.state.pageStep;

    var request = Utils.ajax('GET', url, this.fetchSuccess, this.fetchFail);

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
      issues: json,
      currentIndex: json.length ? json[0].number : 0,
      endIndex: Math.max(this.state.endIndex, json.length ? json[0].number : 0)
    });
  },
  fetchFail: function(xhr, status, reason) {
    this.setState({
      loading: false,
      error: reason
    });
  },
  onIssueClick: function(evt) {
    var targetElt = evt.target;
    var issueElt;
    var issueIndex;
    var issue;

    while(targetElt && targetElt.className !== 'issue') {
      if(targetElt.className === 'issue__userMeta') {
        return;
      }
      targetElt = targetElt.parentElement;
    }
    
    issueElt = targetElt;

    if(issueElt) {
      issueIndex = issueElt.dataset.issueIndex;      
      if(issueIndex < this.state.issues.length) {
        issue = this.state.issues[issueIndex];
        if(issue) {
          this.setState({
            page: 'single',
            issueUrl: issue.url,
            commentsUrl: issue.comments_url,
            commentsCount: issue.comments
          });
        }
      }
    }
  },
  onBackButtonClick: function(evt) {
    if(evt) {
      evt.preventDefault();
    }

    this.setState({
      page: 'all',
      issueUrl: null
    });
  },
  navigateToPage: function(pageNumber) {
    if(pageNumber && pageNumber !== this.state.currentPage && pageNumber > 0) {
      this.setState({
        currentPage: pageNumber
      }, this.fetch);
    }
  },
  render: function() {
    var statePage = this.state.page;
    var view;

    if(this.state.loading) { // is loading?
      view = React.createElement(Spinner);
    } else if(this.state.error) { // is there an error?
      view = React.createElement(ErrorMessage, {
        message: this.state.error
      });
    } else if(statePage === 'single') { // single issue view
      view = React.DOM.div(null,
        React.DOM.button({
          className: 'button button--back',
          onClick: this.onBackButtonClick,
          title: 'Back'
        }, '\u21A9 Back'),
        React.createElement(Issue, {
          issueUrl: this.state.issueUrl,
          commentsUrl: this.state.commentsUrl,
          commentsCount: this.state.commentsCount
        })
      );
    } else { // is showing a page of issues
      if(this.state.issues.length > 0) {
        var paginationProps = {
          endIndex: this.state.endIndex,
          currentIndex: this.state.currentIndex,
          currentPage: this.state.currentPage,
          step: this.state.pageStep,
          visiblePages: this.state.visiblePages,
          navigateToPage: this.navigateToPage
        };

        view = React.DOM.div(null,
          React.DOM.h1({
            className: 'textCenter'
          }, 'GitHub Issues for NPM'),
          React.createElement(Pagination, paginationProps),
          React.DOM.div(
            { onClick: this.onIssueClick },
            React.createElement(Issues, {
              issues: this.state.issues
            })
          ),
          React.createElement(Pagination, paginationProps)
        );
      } else { // no issues found in response
        view = React.DOM.h1({
          className: 'textCenter'
        }, 'No issues found for NPM.');
      }
    } 

    return view;
  }
});