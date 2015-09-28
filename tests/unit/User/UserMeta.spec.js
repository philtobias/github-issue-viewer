'use strict';

describe('UserMeta', function() {
  var testUtils = React.addons.TestUtils;
  var DOMNode, component;
  var now = new Date();

  beforeEach(function() {
    component = testUtils.renderIntoDocument(React.createElement(UserMeta, {
      model: {
        created_at: now,
        html_url: 'http://fakeUrl/',
        avatar_url: 'http://avatarUrl/',
        login: 'username'
      },
      isShowingTimestamp: true,
      timestampMessage: 'foo bar '
    }));

    DOMNode = component.getDOMNode();
  });

  it('has "issue__userMeta" CSS classname', function() {
    expect(DOMNode.classList).toContain('issue__userMeta');
  });

  it('sets html_url', function() {
    expect(DOMNode.querySelector('.issue__user').href).toBe('http://fakeUrl/');
  });

  it('sets avatar_url', function() {
    expect(DOMNode.querySelector('.user__avatar').src).toBe('http://avatarUrl/');
  });

  it('sets alt attribute for avatar image', function() {
    expect(DOMNode.querySelector('.user__avatar').alt).toBe('username');
  });

  it('displays username', function() {
    expect(DOMNode.querySelector('.user__name').textContent).toBe('username');
  });

  it('displays timestamp when isShowingTimestamp is true', function() {
    expect(DOMNode.querySelector('.user__createdAt').textContent).toBe('foo bar a few seconds ago');
  });

  it('does not display the timestamp when isShowingTimestamp is false', function() {
    var tempComponent = testUtils.renderIntoDocument(React.createElement(UserMeta, {
      model: {
        created_at: now,
        html_url: 'http://fakeUrl/',
        avatar_url: 'http://avatarUrl/',
        login: 'username'
      },
      isShowingTimestamp: false,
      timestampMessage: 'foo bar'
    }));

    var tempDOMNode = tempComponent.getDOMNode();
    expect(tempDOMNode.querySelector('.user__createdAt').textContent).toBe('');
  });
});