'use strict';

describe('Label', function() {
  var testUtils = React.addons.TestUtils;
  var DOMNode, component;

  beforeEach(function() {
    component = testUtils.renderIntoDocument(React.createElement(Label, {
      model: {
        name: 'foobar',
        color: 'ffffff'
      }
    }));
    DOMNode = component.getDOMNode();
  });

  it('has "label" CSS class', function() {
    expect(DOMNode.classList).toContain('label');
  });

  it('sets the backgroundColor', function() {
    expect(DOMNode.style.backgroundColor).toBe('rgb(255, 255, 255)');
  });

  it('sets the appropriate text color that contrasts the background color', function() {
    expect(DOMNode.style.color).toBe('rgb(0, 0, 0)');
  });

  it('displays the name', function() {
    expect(DOMNode.textContent).toBe('foobar');
  });
});