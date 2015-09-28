'use strict';

describe('ErrorMessage', function() {
  var testUtils = React.addons.TestUtils;
  var DOMNode, component;

  beforeEach(function() {
    component = testUtils.renderIntoDocument(React.createElement(ErrorMessage, {
      message: 'foobar'
    }));
    DOMNode = component.getDOMNode();
  });

  it('has "error" CSS class', function() {
    expect(DOMNode.classList).toContain('error');
  });

  it('displays error message text', function() {
    expect(DOMNode.textContent).toBe('foobar');
  });
});