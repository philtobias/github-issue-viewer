'use strict';

var path = require('path');

module.exports = function(grunt, undefined) {
  require('load-grunt-config')(grunt, {
    configPath: path.join(process.cwd(), 'tasks'),
    init: true,
    data: {
      pkg: grunt.file.readJSON('package.json')
    },
    loadGruntTasks: {
      pattern: 'grunt-*'
    }
  });

  grunt.registerTask(
    'default',
    'jshint, unit tests, connect',
    [
      'jshint',
      'jasmine:unit',
      'concurrent:development'
    ]
  );

  grunt.registerTask(
    'test',
    'jshint, unit tests',
    [
      'jshint',
      'jasmine:unit'
    ]
  );
};
