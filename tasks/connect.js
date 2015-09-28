module.exports = function (grunt) {
  'use strict';

  return {
    development: {
      options: {
        hostname: 'localhost',
        port: 8080,
        keepalive: true,
        protocol: 'http',
        base: '<%= pkg.config.buildDir %>'
      }
    }
  };
};
