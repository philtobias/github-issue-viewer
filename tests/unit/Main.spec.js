'use strict';

describe('Main', function() {
  var testUtils = React.addons.TestUtils;
  var DOMNode, component;

  beforeEach(function() {
    component = testUtils.renderIntoDocument(React.createElement(Main));
    DOMNode = component.getDOMNode();
  });

  it('sets the initial state', function() {
    expect(component.getInitialState()).toEqual({
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
    });
  });

  it('calls fetch() when mounted', function() {
    spyOn(component, 'fetch');
    component.componentWillMount();
    expect(component.fetch).toHaveBeenCalled();
  });

  describe('shouldComponentUpdate()', function() {
    it('updates when loading state changes', function() {
      expect(component.shouldComponentUpdate(null, {loading: true})).toBe(true);
    });
    
    it('updates when page state changes', function() {
      expect(component.shouldComponentUpdate(null, {page: 'single'})).toBe(true);
    });

    it('updates when issues state changes', function() {
      expect(component.shouldComponentUpdate(null, {issues: ['a', 'b']})).toBe(true);
    });   
  });

  describe('fetch()', function() {
    it('calls Utils.ajax with the correct state', function() {
      spyOn(Utils, 'ajax');
      component.fetch();

      var url = 'https://api.github.com/repos/npm/npm/issues?filter=all&state=all&page=1&per_page=25';
      expect(Utils.ajax).toHaveBeenCalledWith('GET', url, component.fetchSuccess, component.fetchFail);
    });
  });

  describe('fetchSuccess()', function() {
    it('updates the state with the response', function() {
      spyOn(component, 'setState');
      component.fetchSuccess([{
          number: 100
        }, {
          number: 99
        }]);

      expect(component.setState).toHaveBeenCalledWith({
        loading: false,
        error: false,
        xhr: null,
        issues: [{
          number: 100
        }, {
          number: 99
        }],
        currentIndex: 100,
        endIndex: 100
      });
    });
  });

  describe('fetchFail()', function() {
    it('sets the error state', function() {
      spyOn(component, 'setState');
      component.fetchFail(null, 400, 'failed to load');

      expect(component.setState).toHaveBeenCalledWith({
        loading: false,
        error: 'failed to load'
      });
    });
  });

  describe('onBackButtonClick', function() {
    it('changes the page state to all', function() {
      spyOn(component, 'setState');
      component.onBackButtonClick();

      expect(component.setState).toHaveBeenCalledWith({
        page: 'all',
        issueUrl: null
      });
    });
  });

  describe('navigateToPage', function() {
    it('changes the currentPage state if a new page number is passed in', function() {
      spyOn(component, 'setState');
      component.navigateToPage(3);

      expect(component.setState).toHaveBeenCalledWith({
        currentPage: 3
      }, component.fetch);
    });

    it('calls fetch() after setting the state', function() {
      spyOn(component, 'fetch');
      component.navigateToPage(4);

      expect(component.fetch).toHaveBeenCalled();
    });

    it('does not change the state if the pageNumber is the same as the currentPage', function() {
      spyOn(component, 'setState');
      component.navigateToPage(1);

      expect(component.setState).not.toHaveBeenCalled();
    });

    it('does not change the state if the pageNumber is less than 1', function() {
      spyOn(component, 'setState');
      component.navigateToPage(0);

      expect(component.setState).not.toHaveBeenCalled();
    });
  });

  describe('render: loading', function() {
    beforeEach(function() {
      component.setState({
        loading: true,
        error: false
      });
    });

    it('shows only loading component', function() {
      expect(DOMNode.classList).toContain('spinner');
      expect(DOMNode.children.length).toBe(0);
    });
  });

  describe('render: error', function() {
    beforeEach(function() {
      component.setState({
        loading: false,
        error: 'Failure to load'
      });

      DOMNode = component.getDOMNode();
    });

    it('shows only error message component', function() {
      expect(DOMNode.classList).toContain('error');
      expect(DOMNode.children.length).toBe(0);
    });

    it('sets the correct error message', function() {
      expect(DOMNode.textContent).toBe('Failure to load');
    });
  });

  describe('render: when there are issues', function() {
    beforeEach(function() {
      component.setState({
        loading: false,
        error: false,
        page: 'all',
        issues: [1, 2, 3]
      });

      DOMNode = component.getDOMNode();
    });

    it('has two pagination components', function() {
      expect(DOMNode.querySelectorAll('.pagination').length).toBe(2);
    });

    it('shows the issues list', function() {
      expect(DOMNode.querySelector('.issueList')).not.toBe(null);
    });
  });

  describe('render: when there are no issues', function() {
    beforeEach(function() {
      component.setState({
        loading: false,
        error: false,
        page: 'all',
        issues: []
      });

      DOMNode = component.getDOMNode();
    });

    it('displays a header with a message', function() {
      expect(DOMNode.textContent).toBe('No issues found for NPM.');
    });
  });

  describe('render: single issue', function() {
    beforeEach(function() {
      component.setState({
        loading: false,
        error: false,
        page: 'single'
      });
      
      DOMNode = component.getDOMNode();
    });

    it('displays a back button', function() {
      expect(DOMNode.querySelector('.button--back')).not.toBe(null);
    });

    it('displays the loading issue component', function() {
      expect(DOMNode.querySelector('.spinner')).not.toBe(null);
    });
  });
});