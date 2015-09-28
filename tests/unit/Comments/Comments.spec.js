'use strict';

describe('Comments', function() {
  var testUtils = React.addons.TestUtils;
  var DOMNode, component;

  beforeEach(function() {
    component = testUtils.renderIntoDocument(React.createElement(Comments, {
      commentsUrl: 'fakeCommentsUrl'
    }));

    DOMNode = component.getDOMNode();
  });

  it('sets the initial state', function() {
    expect(component.getInitialState()).toEqual({
      loading: false,
      error: false,
      comments: null,
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
      expect(Utils.ajax).toHaveBeenCalledWith('GET', 'fakeCommentsUrl', component.fetchSuccess, component.fetchFail);
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
        comments: 'abc'
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

  describe('render: when there are no comments', function() {
    beforeEach(function() {
      component.setState({
        loading: false,
        error: false,
        comments: null
      });

      DOMNode = component.getDOMNode();
    });

    it('has "commentList" CSS class', function() {
      expect(DOMNode.classList).toContain('commentList');
    });

    it('has an empty commentList', function() {
      expect(DOMNode.children.length).toBe(0);
    });
  });

  describe('render: when there are comments', function() {
    beforeEach(function() {
      component.setState({
        loading: false,
        error: false,
        comments: [{
          user: {
            html_url: 'user1-url'
          }
        }, {
          user: {
            html_url: 'user2-url'
          }
        }, {
          user: {
            html_url: 'user3-url'
          }
        }]
      });

      DOMNode = component.getDOMNode();
    });

    it('has "commentList" CSS class', function() {
      expect(DOMNode.classList).toContain('commentList');
    });

    it('displays comments in commentList', function() {
      expect(DOMNode.children.length).toBe(3);
    });

    it('has "commentListItem" CSS class for each comment', function() {
      expect(DOMNode.children[0].classList).toContain('commentListItem');
      expect(DOMNode.children[1].classList).toContain('commentListItem');
      expect(DOMNode.children[2].classList).toContain('commentListItem');
    });

    it('renders a comment component for each comment', function() {
      expect(DOMNode.children[0].children[0].classList).toContain('comment');
    });
  });
});