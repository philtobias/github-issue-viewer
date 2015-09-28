module.exports = {
  unit: {
    src: [
      'assets/js/Utils.js',
      'assets/js/ErrorMessage.js',
      'assets/js/Spinner.js',
      'assets/js/Pagination.js',
      'assets/js/Labels/Label.js',
      'assets/js/Labels/Labels.js',
      'assets/js/User/UserMeta.js',
      'assets/js/Issues/IssueListItem.js',
      'assets/js/Issues/Issue.js',
      'assets/js/Issues/Issues.js',
      'assets/js/Comments/CommentListItem.js',
      'assets/js/Comments/Comments.js',
      'assets/js/Main.js'
    ],
    options: {
      specs: 'tests/unit/**/*.spec.js',
      outfile: 'tests/_SpecRunner.html',
      vendor: [
        'assets/vendor/react-with-addons.js',
        'assets/vendor/marked.js',
        'node_modules/jasmine-ajax/lib/mock-ajax.js',
        'node_modules/jasmine-react-helpers/src/jasmine-react.js'
      ]
    }
  }
};