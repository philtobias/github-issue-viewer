'use strict';

var Pagination = React.createClass({
  getPagesCount: function() {
    return Math.round(this.props.endIndex / this.props.step);
  },
  pages: function() {
    var pages = [];
    var currentPage = this.props.currentPage;
    var maxPages = this.getPagesCount();
    var start = currentPage;
    var end = Math.min(currentPage + this.props.visiblePages, maxPages);
    var half;
    var left;
    var disabled;

    if(maxPages > this.props.visiblePages) {
      half = parseInt((this.props.visiblePages - 1) / 2, 10);
      left = currentPage - half;
      if(left < 1) {
        left = 1;
      }
      else if(left > maxPages - this.props.visiblePages) {
        left = maxPages - this.props.visiblePages;
      }
      start = left - 1;
      end = left + this.props.visiblePages;
    }

    while(start < end) {
      // disable current page
      disabled = start + 1 === this.props.currentPage;
      
      pages.push(React.DOM.button({
        className: 'button button--pageNumber' + (disabled ? ' button--disabled' : ''),
        key: 'button' + (start + 1),
        onClick: disabled ? null : this.props.navigateToPage.bind(null, start + 1)
      }, '' + (start + 1)));

      start++;
    }

    return pages;
  },
  render: function() {
    var hasPrevPage = this.props.currentIndex + this.props.step < this.props.endIndex;
    var hasNextPage = this.props.currentIndex - this.props.step > 0;
    var currentPage = this.props.currentPage;
    var maxPages = this.getPagesCount();
    var prevPage = currentPage <= 1 ? 1 : currentPage - 1;
    var nextPage = currentPage < maxPages ? currentPage + 1 : maxPages;

    return React.DOM.div({
      className: 'pagination'
    }, 
      React.DOM.button({
        className: 'button button--firstPage' + (hasPrevPage ? '' : ' button--disabled'),
        onClick: hasPrevPage ? this.props.navigateToPage.bind(null, 1) : null,
        disabled: !hasPrevPage,
        title: 'First page'
      }, '\u21E4'),
      React.DOM.button({
        className: 'button button--prevPage' + (hasPrevPage ? '' : ' button--disabled'),
        onClick: hasPrevPage ? this.props.navigateToPage.bind(null, prevPage) : null,
        disabled: !hasPrevPage,
        title: 'Previous page'
      }, '\u2190'),
      this.pages(),
      React.DOM.button({
        className: 'button button--nextPage' + (hasNextPage ? '' : ' button--disabled'),
        onClick: hasNextPage ? this.props.navigateToPage.bind(null, nextPage) : null,
        disabled: !hasNextPage,
        title: 'Next page'
      }, '\u2192'),
      React.DOM.button({
        className: 'button button--lastPage' + (hasNextPage ? '' : ' button--disabled'),
        onClick: hasNextPage ? this.props.navigateToPage.bind(null, maxPages) : null,
        disabled: !hasNextPage,
        title: 'Last page'
      }, '\u21E5')
    );
  }
});