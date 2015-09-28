'use strict';

describe('IssueListItem', function() {
  var testUtils = React.addons.TestUtils;
  var DOMNode, component;

  beforeEach(function() {
    component = testUtils.renderIntoDocument(React.createElement(IssueListItem, {
      model: {
        html_url: 'http://fakeUrl',
        number: 123,
        state: 'open',
        title: 'foo bar title',
        labels: [],
        user: {},
        body: 'foo bar body',
        comments: 1
      },
      index: 9,
      isDetailedView: false
    }));

    DOMNode = component.getDOMNode();
  });

  it('calls evt.preventDefault() when it is not the detailed view', function() {
    var evt = jasmine.createSpyObj('evt', [ 'preventDefault' ]);
    component.onClick(evt);
    expect(evt.preventDefault).toHaveBeenCalled();
  });

  it('calls does not call evt.preventDefault() when it is the detailed view', function() {
    var tempComponent = testUtils.renderIntoDocument(React.createElement(IssueListItem, {
      model: {},
      index: 1,
      isDetailedView: true
    }));

    var tempDOMNode = tempComponent.getDOMNode();

    var evt = jasmine.createSpyObj('evt', [ 'preventDefault' ]);
    tempComponent.onClick(evt);
    expect(evt.preventDefault).not.toHaveBeenCalled();
  });

  it('has "issue" CSS classname', function() {
    expect(DOMNode.classList).toContain('issue');
  });

  it('has data-issue-index attribute', function() {
    expect(DOMNode.dataset.issueIndex).toBe('9');
  });

  it('sets html_url', function() {
    expect(DOMNode.querySelector('.issue__header').href).toBe('http://fakeUrl/');
  });

  it('displays issue id', function() {
    expect(DOMNode.querySelector('.issue__id').textContent).toBe('#123');
  });

  it('sets issue state css class', function() {
    expect(DOMNode.querySelector('.issue__state').classList).toContain('issue__state-open');
  });

  it('sets issue state text', function() {
    expect(DOMNode.querySelector('.issue__state').textContent).toBe('open');
  });

  it('sets issue title', function() {
    expect(DOMNode.querySelector('.issue__title').textContent).toBe('foo bar title');
  });

  it('sets issue summary', function() {
    expect(DOMNode.querySelector('.issue__summary').textContent).toBe('foo bar body\n');
  });

  it('sets comment count', function() {
    expect(DOMNode.querySelector('.issue__commentCount').textContent).toBe('1 comment');
  });

  it('sets comment count for multiple comments', function() {
    var tempComponent = testUtils.renderIntoDocument(React.createElement(IssueListItem, {
      model: {
        comments: 3
      }
    }));

    var tempDOMNode = tempComponent.getDOMNode();
    expect(tempDOMNode.querySelector('.issue__commentCount').textContent).toBe('3 comments');
  });

  it('does not display comment count for 0 comments', function() {
    var tempComponent = testUtils.renderIntoDocument(React.createElement(IssueListItem, {
      model: {
        comments: 0
      }
    }));

    var tempDOMNode = tempComponent.getDOMNode();
    expect(tempDOMNode.querySelector('.issue__commentCount').textContent).toBe('');
  });
});