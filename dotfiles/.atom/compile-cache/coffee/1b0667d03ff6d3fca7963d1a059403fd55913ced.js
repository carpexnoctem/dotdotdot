(function() {
  var helpers, path;

  helpers = require('atom-linter');

  path = require('path');

  module.exports = {
    activate: function() {
      return require('atom-package-deps').install('linter-csslint');
    },
    provideLinter: function() {
      var provider;
      helpers = require('atom-linter');
      return provider = {
        name: 'CSSLint',
        grammarScopes: ['source.css', 'source.html'],
        scope: 'file',
        lintOnFly: true,
        lint: function(textEditor) {
          var exec, filePath, parameters, text;
          filePath = textEditor.getPath();
          text = textEditor.getText();
          parameters = ['--format=json', '-'];
          exec = path.join(__dirname, '..', 'node_modules', 'csslint', 'cli.js');
          return helpers.execNode(exec, parameters, {
            stdin: text
          }).then(function(output) {
            var col, data, line, lintResult, msg, toReturn, _i, _len, _ref;
            lintResult = JSON.parse(output);
            toReturn = [];
            if (lintResult.messages.length < 1) {
              return toReturn;
            }
            _ref = lintResult.messages;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              data = _ref[_i];
              msg = {};
              if (!(data.line && data.col)) {
                msg.range = helpers.rangeFromLineNumber(textEditor, 0);
              } else {
                line = data.line - 1;
                col = data.col - 1;
                msg.range = [[line, col], [line, col]];
              }
              msg.type = data.type.charAt(0).toUpperCase() + data.type.slice(1);
              msg.text = data.message;
              msg.filePath = filePath;
              if (data.rule.id && data.rule.desc) {
                msg.trace = [
                  {
                    type: "Trace",
                    text: '[' + data.rule.id + '] ' + data.rule.desc
                  }
                ];
              }
              toReturn.push(msg);
            }
            return toReturn;
          });
        }
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2pjaG9uZy8uYXRvbS9wYWNrYWdlcy9saW50ZXItY3NzbGludC9saWIvbWFpbi5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsYUFBQTs7QUFBQSxFQUFBLE9BQUEsR0FBVSxPQUFBLENBQVEsYUFBUixDQUFWLENBQUE7O0FBQUEsRUFDQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FEUCxDQUFBOztBQUFBLEVBR0EsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsUUFBQSxFQUFVLFNBQUEsR0FBQTthQUNSLE9BQUEsQ0FBUSxtQkFBUixDQUE0QixDQUFDLE9BQTdCLENBQXFDLGdCQUFyQyxFQURRO0lBQUEsQ0FBVjtBQUFBLElBR0EsYUFBQSxFQUFlLFNBQUEsR0FBQTtBQUNiLFVBQUEsUUFBQTtBQUFBLE1BQUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSxhQUFSLENBQVYsQ0FBQTthQUNBLFFBQUEsR0FDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxRQUNBLGFBQUEsRUFBZSxDQUFDLFlBQUQsRUFBZSxhQUFmLENBRGY7QUFBQSxRQUVBLEtBQUEsRUFBTyxNQUZQO0FBQUEsUUFHQSxTQUFBLEVBQVcsSUFIWDtBQUFBLFFBSUEsSUFBQSxFQUFNLFNBQUMsVUFBRCxHQUFBO0FBQ0osY0FBQSxnQ0FBQTtBQUFBLFVBQUEsUUFBQSxHQUFXLFVBQVUsQ0FBQyxPQUFYLENBQUEsQ0FBWCxDQUFBO0FBQUEsVUFDQSxJQUFBLEdBQU8sVUFBVSxDQUFDLE9BQVgsQ0FBQSxDQURQLENBQUE7QUFBQSxVQUVBLFVBQUEsR0FBYSxDQUFDLGVBQUQsRUFBa0IsR0FBbEIsQ0FGYixDQUFBO0FBQUEsVUFHQSxJQUFBLEdBQU8sSUFBSSxDQUFDLElBQUwsQ0FBVSxTQUFWLEVBQXFCLElBQXJCLEVBQTJCLGNBQTNCLEVBQTJDLFNBQTNDLEVBQXNELFFBQXRELENBSFAsQ0FBQTtpQkFJQSxPQUFPLENBQUMsUUFBUixDQUFpQixJQUFqQixFQUF1QixVQUF2QixFQUFtQztBQUFBLFlBQUMsS0FBQSxFQUFPLElBQVI7V0FBbkMsQ0FBaUQsQ0FBQyxJQUFsRCxDQUF1RCxTQUFDLE1BQUQsR0FBQTtBQUNyRCxnQkFBQSwwREFBQTtBQUFBLFlBQUEsVUFBQSxHQUFhLElBQUksQ0FBQyxLQUFMLENBQVcsTUFBWCxDQUFiLENBQUE7QUFBQSxZQUNBLFFBQUEsR0FBVyxFQURYLENBQUE7QUFFQSxZQUFBLElBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFwQixHQUE2QixDQUFoQztBQUNFLHFCQUFPLFFBQVAsQ0FERjthQUZBO0FBSUE7QUFBQSxpQkFBQSwyQ0FBQTs4QkFBQTtBQUNFLGNBQUEsR0FBQSxHQUFNLEVBQU4sQ0FBQTtBQUNBLGNBQUEsSUFBRyxDQUFBLENBQUssSUFBSSxDQUFDLElBQUwsSUFBYyxJQUFJLENBQUMsR0FBcEIsQ0FBUDtBQUVFLGdCQUFBLEdBQUcsQ0FBQyxLQUFKLEdBQVksT0FBTyxDQUFDLG1CQUFSLENBQTRCLFVBQTVCLEVBQXdDLENBQXhDLENBQVosQ0FGRjtlQUFBLE1BQUE7QUFJRSxnQkFBQSxJQUFBLEdBQU8sSUFBSSxDQUFDLElBQUwsR0FBWSxDQUFuQixDQUFBO0FBQUEsZ0JBQ0EsR0FBQSxHQUFNLElBQUksQ0FBQyxHQUFMLEdBQVcsQ0FEakIsQ0FBQTtBQUFBLGdCQUVBLEdBQUcsQ0FBQyxLQUFKLEdBQVksQ0FBQyxDQUFDLElBQUQsRUFBTyxHQUFQLENBQUQsRUFBYyxDQUFDLElBQUQsRUFBTyxHQUFQLENBQWQsQ0FGWixDQUpGO2VBREE7QUFBQSxjQVFBLEdBQUcsQ0FBQyxJQUFKLEdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFWLENBQWlCLENBQWpCLENBQW1CLENBQUMsV0FBcEIsQ0FBQSxDQUFBLEdBQW9DLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBVixDQUFnQixDQUFoQixDQVIvQyxDQUFBO0FBQUEsY0FTQSxHQUFHLENBQUMsSUFBSixHQUFXLElBQUksQ0FBQyxPQVRoQixDQUFBO0FBQUEsY0FVQSxHQUFHLENBQUMsUUFBSixHQUFlLFFBVmYsQ0FBQTtBQVdBLGNBQUEsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQVYsSUFBaUIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUE5QjtBQUNFLGdCQUFBLEdBQUcsQ0FBQyxLQUFKLEdBQVk7a0JBQUM7QUFBQSxvQkFDWCxJQUFBLEVBQU0sT0FESztBQUFBLG9CQUVYLElBQUEsRUFBTSxHQUFBLEdBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFoQixHQUFxQixJQUFyQixHQUE0QixJQUFJLENBQUMsSUFBSSxDQUFDLElBRmpDO21CQUFEO2lCQUFaLENBREY7ZUFYQTtBQUFBLGNBZ0JBLFFBQVEsQ0FBQyxJQUFULENBQWMsR0FBZCxDQWhCQSxDQURGO0FBQUEsYUFKQTtBQXNCQSxtQkFBTyxRQUFQLENBdkJxRDtVQUFBLENBQXZELEVBTEk7UUFBQSxDQUpOO1FBSFc7SUFBQSxDQUhmO0dBSkYsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/jchong/.atom/packages/linter-csslint/lib/main.coffee
