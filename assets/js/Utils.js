'use strict';

var Utils = (function() {
  var cleanTruncate = function(str, maxChars) {
    if(str && str.length > maxChars) {
      str = str.substring(0, maxChars + 1);
      str = str.substring(0, Math.min(str.length, str.lastIndexOf(' ')));
      str = str + '\u2026';
    }
    return str;
  };

  var linkifyUsername = function(str) {
    if(str) {
      return str.replace(/(^|\s)@(\w+)/g, '$1<a href="https://github.com/$2">@$2</a>');
    }
    return str;
  };

  var formatTruncatedBody = function(str, maxChars) {
    return Utils.formatBody(Utils.cleanTruncate(str, maxChars));
  };

  var formatBody = function(str) {
    if(str) {
      return React.DOM.span({
        dangerouslySetInnerHTML: {
          __html: Utils.linkifyUsername(marked(str, {
            gfm: true // GitHub flavored markdown
          }))
        }
      });
    }
    return str;
  };

  var ajax = function(method, url, successCallback, errorCallback) {
    var request = new XMLHttpRequest();
    var errorMessage = '';

    request.open(method, url, true);
    request.onreadystatechange = function() {
      if(request.readyState === 4) {
        if(request.status === 200) {
          successCallback.call(this, JSON.parse(request.responseText));
        } else {
          errorMessage = request.statusText;

          if(request.responseText) {
            errorMessage = errorMessage + ': ' + JSON.parse(request.responseText).message;
          }
          errorCallback.call(this, request, request.status, errorMessage);
        }
      }
    };
    request.send();

    return request;
  };

  /* Source: https://24ways.org/2010/calculating-color-contrast/ */
  var getContrastYIQ = function(hexcolor) {
    var r = parseInt(hexcolor.substr(0,2), 16);
    var g = parseInt(hexcolor.substr(2,2), 16);
    var b = parseInt(hexcolor.substr(4,2), 16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'black' : 'white';
  };

  var timeAgo = function(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + ' years';
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + ' months';
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + ' days';
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + ' hours';
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + ' minutes';
    }

    return 'a few seconds';
  };

  return {
    cleanTruncate: cleanTruncate,
    linkifyUsername: linkifyUsername,
    formatBody: formatBody,
    formatTruncatedBody: formatTruncatedBody,
    ajax: ajax,
    getContrastYIQ: getContrastYIQ,
    timeAgo: timeAgo
  };
})();