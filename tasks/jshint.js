module.exports = {
  options: '<%= pkg.jshintConfig %>',
  all: {
    src: [
      './assets/js/**/*.js',
      './tests/unit/**/*.js'
    ]
  }
};
