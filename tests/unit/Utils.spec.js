'use strict';

describe('Utils', function() {
  describe('cleanTruncate()', function() {
    it('cleanly truncates a string based on the maxChars', function() {
      expect(Utils.cleanTruncate('abc def ghi', 5)).toBe('abc…');
      expect(Utils.cleanTruncate('abc def ghi', 7)).toBe('abc def…');
      expect(Utils.cleanTruncate('abc def ghi', 8)).toBe('abc def…');
    });

    it('returns the string if string lengh is greater than the maxChars', function() {
      expect(Utils.cleanTruncate('abc def ghi', 15)).toBe('abc def ghi');
      expect(Utils.cleanTruncate('abc def ghi', 100)).toBe('abc def ghi');
    });
  });

  describe('linkifyUsername()', function() {
    it('turns @username into an html anchor link', function() {
      expect(Utils.linkifyUsername('foo bar @foobar')).toBe('foo bar <a href="https://github.com/foobar">@foobar</a>');
    });
  });

  describe('formatTruncatedBody()', function() {
    it('calls cleanTruncate() and formatBody()', function() {
      spyOn(Utils, 'cleanTruncate');
      spyOn(Utils, 'formatBody');

      Utils.formatTruncatedBody('abc def ghi', 8);

      expect(Utils.cleanTruncate).toHaveBeenCalledWith('abc def ghi', 8);
      expect(Utils.formatBody).toHaveBeenCalled();      
    });
  });

  describe('formatBody()', function() {
    it('sets innerHTML with string', function() {
      var result = Utils.formatBody('abc def');

      expect(result.type).toBe('span');
      expect(result._store.props.dangerouslySetInnerHTML.__html).toBe('<p>abc def</p>\n');
    });
  });

  describe('ajax()', function() {
    it('makes an ajax request', function() {
      spyOn(XMLHttpRequest.prototype, 'open').and.callThrough();
      spyOn(XMLHttpRequest.prototype, 'send');
      var successCallback = function() {};
      var errorCallback = function() {};

      Utils.ajax('GET', 'fakepath', successCallback, errorCallback);

      expect(XMLHttpRequest.prototype.open).toHaveBeenCalledWith('GET', 'fakepath', true);
      expect(XMLHttpRequest.prototype.send).toHaveBeenCalled();
    });
  });

  describe('getContractYIQ()', function() {
    it('returns "black" for light colors', function() {
      expect(Utils.getContrastYIQ('ffffff')).toBe('black');
      expect(Utils.getContrastYIQ('eeeeee')).toBe('black');
    });

    it('returns "white" for dark colors', function() {
      expect(Utils.getContrastYIQ('000000')).toBe('white');
      expect(Utils.getContrastYIQ('333333')).toBe('white');
    });
  });

  describe('timeAgo()', function() {
    it('human readable time from current date', function() {
      var now = function() { return new Date(); };
      var date;

      date = now();
      expect(Utils.timeAgo(date)).toBe('a few seconds');

      date = now();
      date = date.setMinutes(date.getMinutes() - 30);
      expect(Utils.timeAgo(date)).toBe('30 minutes');

      date = now();
      date = date.setHours(date.getHours() - 3);
      expect(Utils.timeAgo(date)).toBe('3 hours');

      date = now();
      date = date.setDate(date.getDate() - 5);
      expect(Utils.timeAgo(date)).toBe('5 days');

      date = now();
      date = date.setMonth(date.getMonth() - 2);
      expect(Utils.timeAgo(date)).toBe('2 months');

      date = now();
      date = date.setFullYear(date.getFullYear() - 4);
      expect(Utils.timeAgo(date)).toBe('4 years');
    });
  });
});