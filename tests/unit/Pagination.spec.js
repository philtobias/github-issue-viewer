'use strict';

describe('Pagination', function() {
  var testUtils = React.addons.TestUtils;
  var pageNumber = null;
  var DOMNode, component,
      firstPage, prevPage, nextPage, lastPage;

  function assignDOMVariables(component) {
    DOMNode = component.getDOMNode();
    firstPage = DOMNode.querySelector('.button--firstPage');
    prevPage = DOMNode.querySelector('.button--prevPage');
    nextPage = DOMNode.querySelector('.button--nextPage');
    lastPage = DOMNode.querySelector('.button--lastPage');
  }

  function navigateToPage(num) {
    pageNumber = num;
  }

  describe('initial render', function() {
    beforeEach(function() {
      component = testUtils.renderIntoDocument(React.createElement(Pagination, {
        endIndex: 10,
        currentIndex: 10,
        currentPage: 1,
        step: 1,
        visiblePages: 3,
        navigateToPage: navigateToPage
      }));
      assignDOMVariables(component);
    });

    it('has "pagination" CSS class', function() {
      expect(DOMNode.classList).toContain('pagination');
    });

    it('contains first, prev, next, last buttons', function() {
      expect(firstPage).not.toBe(null);
      expect(prevPage).not.toBe(null);
      expect(nextPage).not.toBe(null);
      expect(lastPage).not.toBe(null);
    });

    it('contains correct number of pageNumber buttons', function() {
      expect(DOMNode.querySelectorAll('.button--pageNumber').length).toBe(4);
    });

    it('disables current pageNumber button', function() {
      expect(DOMNode.querySelectorAll('.button--pageNumber')[0].classList).toContain('button--disabled');
      expect(DOMNode.querySelectorAll('.button--pageNumber')[1].classList).not.toContain('button--disabled');
    });

    it('disables first and previous buttons when currentPage is first', function() {
      expect(firstPage.classList).toContain('button--disabled');
      expect(prevPage.classList).toContain('button--disabled');
    });

    it('enables last and next buttons when currentPage is first', function() {
      expect(lastPage.classList).not.toContain('button--disabled');
      expect(nextPage.classList).not.toContain('button--disabled');
    });

    it('navigates to the correct page number for firstPage', function() {
      testUtils.Simulate.click(firstPage);
      expect(pageNumber).toBe(null);
    });

    it('navigates to the correct page number for prevPage', function() {
      testUtils.Simulate.click(prevPage);
      expect(pageNumber).toBe(null);
    });

    it('navigates to the correct page number for nextPage', function() {
      testUtils.Simulate.click(nextPage);
      expect(pageNumber).toBe(2);
    });

    it('navigates to the correct page number for lastPage', function() {
      testUtils.Simulate.click(lastPage);
      expect(pageNumber).toBe(10);
    });
  });

  describe('render when current page is in middle of pagination', function() {
    beforeEach(function() {
      component = testUtils.renderIntoDocument(React.createElement(Pagination, {
        endIndex: 10,
        currentIndex: 5,
        currentPage: 5,
        step: 1,
        visiblePages: 3,
        navigateToPage: navigateToPage
      }));
      assignDOMVariables(component);
      pageNumber = null;
    });

    it('disables current pageNumber button', function() {
      expect(DOMNode.querySelectorAll('.button--pageNumber')[1].classList).toContain('button--disabled');
      expect(DOMNode.querySelectorAll('.button--pageNumber')[2].classList).not.toContain('button--disabled');
    });

    it('enables first and previous buttons when currentPage is in the middle', function() {
      expect(firstPage.classList).not.toContain('button--disabled');
      expect(prevPage.classList).not.toContain('button--disabled');
    });

    it('enables last and next buttons when currentPage is in the middle', function() {
      expect(lastPage.classList).not.toContain('button--disabled');
      expect(nextPage.classList).not.toContain('button--disabled');
    });

    it('navigates to the correct page number for firstPage', function() {
      testUtils.Simulate.click(firstPage);
      expect(pageNumber).toBe(1);
    });

    it('navigates to the correct page number for prevPage', function() {
      testUtils.Simulate.click(prevPage);
      expect(pageNumber).toBe(4);
    });

    it('navigates to the correct page number for nextPage', function() {
      testUtils.Simulate.click(nextPage);
      expect(pageNumber).toBe(6);
    });

    it('navigates to the correct page number for lastPage', function() {
      testUtils.Simulate.click(lastPage);
      expect(pageNumber).toBe(10);
    });
  });

  describe('render when current page is the last page', function() {
    beforeEach(function() {
      component = testUtils.renderIntoDocument(React.createElement(Pagination, {
        endIndex: 10,
        currentIndex: 1,
        currentPage: 10,
        step: 1,
        visiblePages: 3,
        navigateToPage: navigateToPage
      }));
      assignDOMVariables(component);
      pageNumber = null;
    });

    it('disables current pageNumber button', function() {
      expect(DOMNode.querySelectorAll('.button--pageNumber')[3].classList).toContain('button--disabled');
      expect(DOMNode.querySelectorAll('.button--pageNumber')[2].classList).not.toContain('button--disabled');
    });

    it('enables first and previous buttons when currentPage is last', function() {
      expect(firstPage.classList).not.toContain('button--disabled');
      expect(prevPage.classList).not.toContain('button--disabled');
    });

    it('disables last and next buttons when currentPage is last', function() {
      expect(lastPage.classList).toContain('button--disabled');
      expect(nextPage.classList).toContain('button--disabled');
    });

    it('navigates to the correct page number for firstPage', function() {
      testUtils.Simulate.click(firstPage);
      expect(pageNumber).toBe(1);
    });

    it('navigates to the correct page number for prevPage', function() {
      testUtils.Simulate.click(prevPage);
      expect(pageNumber).toBe(9);
    });

    it('navigates to the correct page number for nextPage', function() {
      testUtils.Simulate.click(nextPage);
      expect(pageNumber).toBe(null);
    });

    it('navigates to the correct page number for lastPage', function() {
      testUtils.Simulate.click(lastPage);
      expect(pageNumber).toBe(null);
    });
  });
});