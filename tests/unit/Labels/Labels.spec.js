'use strict';

describe('Labels', function() {
  var testUtils = React.addons.TestUtils;
  var renderOutput, shallowRenderer;

  beforeEach(function() {
    shallowRenderer = testUtils.createRenderer();
    shallowRenderer.render(React.createElement(Labels, {
      model: ['one', 'two', 'three']
    }));

    renderOutput = shallowRenderer.getRenderOutput();
  });

  it('has "labels" CSS class', function() {
    expect(renderOutput.props.className).toContain('labels');
  });

  it('displays each label in the model', function() {
    expect(renderOutput.props.children.length).toBe(3);
    expect(renderOutput.props.children[0].props.model).toBe('one');
    expect(renderOutput.props.children[1].props.model).toBe('two');
    expect(renderOutput.props.children[2].props.model).toBe('three');
  });
});