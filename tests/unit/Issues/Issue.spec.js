'use strict';

describe('Issue', function() {
  var testUtils = React.addons.TestUtils;
  var DOMNode, component;

  beforeEach(function() {
    component = testUtils.renderIntoDocument(React.createElement(Issue, {
      issueUrl: 'fakeIssueUrl'
    }));

    DOMNode = component.getDOMNode();
  });

  it('sets the initial state', function() {
    expect(component.getInitialState()).toEqual({
      loading: false,
      error: false,
      issue: null,
      xhr: null
    });
  });

  it('calls fetch() when mounted', function() {
    spyOn(component, 'fetch');
    component.componentWillMount();
    expect(component.fetch).toHaveBeenCalled();
  });

  describe('fetch()', function() {
    it('calls Utils.ajax with the correct state', function() {
      spyOn(Utils, 'ajax');
      component.fetch();
      expect(Utils.ajax).toHaveBeenCalledWith('GET', 'fakeIssueUrl', component.fetchSuccess, component.fetchFail);
    });
  });

  describe('fetchSuccess()', function() {
    it('updates the state with the response', function() {
      spyOn(component, 'setState');
      component.fetchSuccess('abc');

      expect(component.setState).toHaveBeenCalledWith({
        loading: false,
        error: false,
        xhr: null,
        issue: 'abc'
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

  describe('render: when there is an issue', function() {
    beforeEach(function() {
      component.setState({
        loading: false,
        error: false,
        issue: {}
      });

      DOMNode = component.getDOMNode();
    });

    it('has "issueDetail" CSS class', function() {
      expect(DOMNode.classList).toContain('issueDetail');
    });

    it('does not display comments when commentsCount is 0', function() {
      expect(DOMNode.querySelector('.comment')).toBe(null);
    });
  });
});