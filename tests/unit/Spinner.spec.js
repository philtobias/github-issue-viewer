'use strict';

describe('Spinner', function() {
  var testUtils = React.addons.TestUtils;
  var DOMNode, component;

  beforeEach(function() {
    component = testUtils.renderIntoDocument(React.createElement(Spinner));
    DOMNode = component.getDOMNode();
  });

  it('has "spinner" CSS class', function() {
    expect(DOMNode.classList).toContain('spinner');
  });

  it('has "Loading" text', function() {
    expect(DOMNode.textContent).toBe('Loading');
  });
});