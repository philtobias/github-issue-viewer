'use strict';

describe('CommentListItem', function() {
  var testUtils = React.addons.TestUtils;
  var renderOutput, shallowRenderer,
      userMetaComponent, issueSummary;

  var now = new Date();

  beforeEach(function() {
    shallowRenderer = testUtils.createRenderer();
    shallowRenderer.render(React.createElement(CommentListItem, {
      model: {
        created_at: now,
        body: 'foobar',
        user: {
          html_url: 'fakepath'
        }
      }
    }));

    renderOutput = shallowRenderer.getRenderOutput();
    userMetaComponent = renderOutput.props.children[0];
    issueSummary = renderOutput.props.children[1];
  });

  it('has "comment" CSS class', function() {
    expect(renderOutput.props.className).toContain('comment');
  });

  describe('UserMeta component', function() {
    it('passes model to UserMeta component', function() {
      expect(userMetaComponent.props.model).toEqual({
        html_url: 'fakepath'
      });
    });

    it('sets isShowingTimestamp prop to true', function() {
      expect(userMetaComponent.props.isShowingTimestamp).toBe(true);
    });

    it('sets timestampMessage prop text', function() {
      expect(userMetaComponent.props.timestampMessage).toBe('commented on this issue ');
    });
  });

  it('has .issue_summary element', function() {
    expect(issueSummary.props.className).toContain('issue__summary');
  });

  it('displays the model.body in the summary element', function() {
    expect(issueSummary.props.children.props.dangerouslySetInnerHTML.__html).toBe('<p>foobar</p>\n');
  });
});