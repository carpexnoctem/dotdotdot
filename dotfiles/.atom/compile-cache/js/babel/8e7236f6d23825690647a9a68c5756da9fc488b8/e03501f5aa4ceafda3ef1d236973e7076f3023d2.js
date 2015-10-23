Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _atom = require('atom');

var _jsonlint = require('jsonlint');

var _jsonlint2 = _interopRequireDefault(_jsonlint);

'use babel';

var LinterJsonLint = (function () {
  function LinterJsonLint() {
    _classCallCheck(this, LinterJsonLint);
  }

  _createClass(LinterJsonLint, null, [{
    key: 'activate',
    value: function activate() {
      require("atom-package-deps").install("linter-jsonlint");
    }
  }, {
    key: 'provideLinter',
    value: function provideLinter() {
      var _this = this;

      return {
        grammarScopes: ['source.json'],
        scope: 'file',
        lintOnFly: true,
        lint: function lint(editor) {

          var path = editor.getPath();
          var text = editor.getText();

          try {
            _jsonlint2['default'].parse(text);
          } catch (e) {

            var line = Number(e.message.match(_this.regex)[1]);
            var column = 0;

            return [{
              type: 'Error',
              text: e.message,
              filePath: path,
              range: new _atom.Range([line, column], [line, column + 1])
            }];
          }

          return [];
        }
      };
    }
  }, {
    key: 'regex',
    value: '.+?line\\s(\\d+)',
    enumerable: true
  }]);

  return LinterJsonLint;
})();

exports['default'] = LinterJsonLint;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qY2hvbmcvLmF0b20vcGFja2FnZXMvbGludGVyLWpzb25saW50L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7b0JBRXNCLE1BQU07O3dCQUNOLFVBQVU7Ozs7QUFIaEMsV0FBVyxDQUFDOztJQUtTLGNBQWM7V0FBZCxjQUFjOzBCQUFkLGNBQWM7OztlQUFkLGNBQWM7O1dBSWxCLG9CQUFHO0FBQ2hCLGFBQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0tBQ3pEOzs7V0FFbUIseUJBQUc7OztBQUNyQixhQUFPO0FBQ0wscUJBQWEsRUFBRSxDQUFDLGFBQWEsQ0FBQztBQUM5QixhQUFLLEVBQUUsTUFBTTtBQUNiLGlCQUFTLEVBQUUsSUFBSTtBQUNmLFlBQUksRUFBRSxjQUFDLE1BQU0sRUFBSzs7QUFFaEIsY0FBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQzVCLGNBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7QUFFNUIsY0FBSTtBQUNGLGtDQUFTLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztXQUN0QixDQUFDLE9BQU8sQ0FBQyxFQUFFOztBQUVWLGdCQUFJLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xELGdCQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7O0FBRWYsbUJBQU8sQ0FBQztBQUNOLGtCQUFJLEVBQUUsT0FBTztBQUNiLGtCQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU87QUFDZixzQkFBUSxFQUFFLElBQUk7QUFDZCxtQkFBSyxFQUFFLGdCQUFVLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNyRCxDQUFDLENBQUM7V0FDSjs7QUFFRCxpQkFBTyxFQUFFLENBQUM7U0FDWDtPQUNGLENBQUE7S0FDRjs7O1dBbENjLGtCQUFrQjs7OztTQUZkLGNBQWM7OztxQkFBZCxjQUFjIiwiZmlsZSI6Ii9Vc2Vycy9qY2hvbmcvLmF0b20vcGFja2FnZXMvbGludGVyLWpzb25saW50L2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG5cbmltcG9ydCB7IFJhbmdlIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQganNvbmxpbnQgIGZyb20gJ2pzb25saW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGludGVySnNvbkxpbnQge1xuXG4gIHN0YXRpYyByZWdleCA9ICcuKz9saW5lXFxcXHMoXFxcXGQrKSdcblxuICBzdGF0aWMgYWN0aXZhdGUoKSB7XG4gICAgcmVxdWlyZShcImF0b20tcGFja2FnZS1kZXBzXCIpLmluc3RhbGwoXCJsaW50ZXItanNvbmxpbnRcIik7XG4gIH1cblxuICBzdGF0aWMgcHJvdmlkZUxpbnRlcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZ3JhbW1hclNjb3BlczogWydzb3VyY2UuanNvbiddLFxuICAgICAgc2NvcGU6ICdmaWxlJyxcbiAgICAgIGxpbnRPbkZseTogdHJ1ZSxcbiAgICAgIGxpbnQ6IChlZGl0b3IpID0+IHtcblxuICAgICAgICBsZXQgcGF0aCA9IGVkaXRvci5nZXRQYXRoKCk7XG4gICAgICAgIGxldCB0ZXh0ID0gZWRpdG9yLmdldFRleHQoKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGpzb25saW50LnBhcnNlKHRleHQpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG5cbiAgICAgICAgICBsZXQgbGluZSA9IE51bWJlcihlLm1lc3NhZ2UubWF0Y2godGhpcy5yZWdleClbMV0pO1xuICAgICAgICAgIGxldCBjb2x1bW4gPSAwO1xuXG4gICAgICAgICAgcmV0dXJuIFt7XG4gICAgICAgICAgICB0eXBlOiAnRXJyb3InLFxuICAgICAgICAgICAgdGV4dDogZS5tZXNzYWdlLFxuICAgICAgICAgICAgZmlsZVBhdGg6IHBhdGgsXG4gICAgICAgICAgICByYW5nZTogbmV3IFJhbmdlKFtsaW5lLCBjb2x1bW5dLCBbbGluZSwgY29sdW1uICsgMV0pXG4gICAgICAgICAgfV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==
//# sourceURL=/Users/jchong/.atom/packages/linter-jsonlint/index.js
