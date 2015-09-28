module.exports = {
  options: {
    interrupt: false,
    spawn: false
  },
  js: {
    files: [
      'assets/js/**/*.js'
    ],
    tasks: [
      'jshint',
      'jasmine:unit'
    ]
  },
  unit: {
    files: [
      'tests/unit/**/*.js'
    ],
    tasks: [
      'jshint',
      'jasmine:unit'
    ]
  }
};