'use strict';

describe('Issues', function() {
  var testUtils = React.addons.TestUtils;
  var renderOutput, shallowRenderer;

  beforeEach(function() {
    shallowRenderer = testUtils.createRenderer();
    shallowRenderer.render(React.createElement(Issues, {
      issues: ['one', 'two', 'three', 'four']
    }));

    renderOutput = shallowRenderer.getRenderOutput();
  });

  it('has "issueList" CSS class', function() {
    expect(renderOutput.props.className).toContain('issueList');
  });

  it('displays each issue in the model', function() {
    expect(renderOutput.props.children.length).toBe(4);
    expect(renderOutput.props.children[0].props.children.props.model).toBe('one');
    expect(renderOutput.props.children[0].props.children.props.index).toBe(0);
    expect(renderOutput.props.children[0].props.children.props.isDetailedView).toBe(false);

    expect(renderOutput.props.children[1].props.children.props.model).toBe('two');
    expect(renderOutput.props.children[1].props.children.props.index).toBe(1);
    expect(renderOutput.props.children[1].props.children.props.isDetailedView).toBe(false);

    expect(renderOutput.props.children[2].props.children.props.model).toBe('three');
    expect(renderOutput.props.children[2].props.children.props.index).toBe(2);
    expect(renderOutput.props.children[2].props.children.props.isDetailedView).toBe(false);

    expect(renderOutput.props.children[3].props.children.props.model).toBe('four');
    expect(renderOutput.props.children[3].props.children.props.index).toBe(3);
    expect(renderOutput.props.children[3].props.children.props.isDetailedView).toBe(false);
  });

  it('does not display issues when prop issues array is empty', function() {
    shallowRenderer.render(React.createElement(Issues, {
      issues: []
    }));

    renderOutput = shallowRenderer.getRenderOutput();
    expect(renderOutput.props.children.length).toBe(0);
  });
});