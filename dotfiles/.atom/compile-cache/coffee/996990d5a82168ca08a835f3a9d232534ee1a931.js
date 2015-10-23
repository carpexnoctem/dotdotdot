(function() {
  var CompositeDisposable;

  CompositeDisposable = require('atom').CompositeDisposable;

  module.exports = {
    config: {
      executablePath: {
        type: 'string',
        title: 'PHP Executable Path',
        "default": 'php'
      }
    },
    activate: function() {
      require('atom-package-deps').install('linter-php');
      this.subscriptions = new CompositeDisposable;
      return this.subscriptions.add(atom.config.observe('linter-php.executablePath', (function(_this) {
        return function(executablePath) {
          return _this.executablePath = executablePath;
        };
      })(this)));
    },
    deactivate: function() {
      return this.subscriptions.dispose();
    },
    provideLinter: function() {
      var helpers, provider;
      helpers = require('atom-linter');
      return provider = {
        name: 'PHP',
        grammarScopes: ['text.html.php', 'source.php'],
        scope: 'file',
        lintOnFly: true,
        lint: (function(_this) {
          return function(textEditor) {
            var command, filePath, parameters, text;
            filePath = textEditor.getPath();
            command = _this.executablePath;
            parameters = [];
            parameters.push('--syntax-check');
            parameters.push('--no-php-ini');
            parameters.push('--define', 'display_errors=On');
            parameters.push('--define', 'log_errors=Off');
            text = textEditor.getText();
            return helpers.exec(command, parameters, {
              stdin: text
            }).then(function(output) {
              var match, messages, regex;
              regex = /error:\s+(.*?) on line (\d+)/g;
              messages = [];
              while ((match = regex.exec(output)) !== null) {
                messages.push({
                  type: "Error",
                  filePath: filePath,
                  range: helpers.rangeFromLineNumber(textEditor, match[2] - 1),
                  text: match[1]
                });
              }
              return messages;
            });
          };
        })(this)
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2pjaG9uZy8uYXRvbS9wYWNrYWdlcy9saW50ZXItcGhwL2xpYi9tYWluLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxtQkFBQTs7QUFBQSxFQUFDLHNCQUF1QixPQUFBLENBQVEsTUFBUixFQUF2QixtQkFBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsTUFBQSxFQUNFO0FBQUEsTUFBQSxjQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxRQUFOO0FBQUEsUUFDQSxLQUFBLEVBQU8scUJBRFA7QUFBQSxRQUVBLFNBQUEsRUFBUyxLQUZUO09BREY7S0FERjtBQUFBLElBTUEsUUFBQSxFQUFVLFNBQUEsR0FBQTtBQUNSLE1BQUEsT0FBQSxDQUFRLG1CQUFSLENBQTRCLENBQUMsT0FBN0IsQ0FBcUMsWUFBckMsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsYUFBRCxHQUFpQixHQUFBLENBQUEsbUJBRGpCLENBQUE7YUFFQSxJQUFDLENBQUEsYUFBYSxDQUFDLEdBQWYsQ0FBbUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFaLENBQW9CLDJCQUFwQixFQUNqQixDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxjQUFELEdBQUE7aUJBQ0UsS0FBQyxDQUFBLGNBQUQsR0FBa0IsZUFEcEI7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQURpQixDQUFuQixFQUhRO0lBQUEsQ0FOVjtBQUFBLElBYUEsVUFBQSxFQUFZLFNBQUEsR0FBQTthQUNWLElBQUMsQ0FBQSxhQUFhLENBQUMsT0FBZixDQUFBLEVBRFU7SUFBQSxDQWJaO0FBQUEsSUFnQkEsYUFBQSxFQUFlLFNBQUEsR0FBQTtBQUNiLFVBQUEsaUJBQUE7QUFBQSxNQUFBLE9BQUEsR0FBVSxPQUFBLENBQVEsYUFBUixDQUFWLENBQUE7YUFDQSxRQUFBLEdBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxLQUFOO0FBQUEsUUFDQSxhQUFBLEVBQWUsQ0FBQyxlQUFELEVBQWtCLFlBQWxCLENBRGY7QUFBQSxRQUVBLEtBQUEsRUFBTyxNQUZQO0FBQUEsUUFHQSxTQUFBLEVBQVcsSUFIWDtBQUFBLFFBSUEsSUFBQSxFQUFNLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQyxVQUFELEdBQUE7QUFDSixnQkFBQSxtQ0FBQTtBQUFBLFlBQUEsUUFBQSxHQUFXLFVBQVUsQ0FBQyxPQUFYLENBQUEsQ0FBWCxDQUFBO0FBQUEsWUFDQSxPQUFBLEdBQVUsS0FBQyxDQUFBLGNBRFgsQ0FBQTtBQUFBLFlBRUEsVUFBQSxHQUFhLEVBRmIsQ0FBQTtBQUFBLFlBR0EsVUFBVSxDQUFDLElBQVgsQ0FBZ0IsZ0JBQWhCLENBSEEsQ0FBQTtBQUFBLFlBSUEsVUFBVSxDQUFDLElBQVgsQ0FBZ0IsY0FBaEIsQ0FKQSxDQUFBO0FBQUEsWUFLQSxVQUFVLENBQUMsSUFBWCxDQUFnQixVQUFoQixFQUE0QixtQkFBNUIsQ0FMQSxDQUFBO0FBQUEsWUFNQSxVQUFVLENBQUMsSUFBWCxDQUFnQixVQUFoQixFQUE0QixnQkFBNUIsQ0FOQSxDQUFBO0FBQUEsWUFPQSxJQUFBLEdBQU8sVUFBVSxDQUFDLE9BQVgsQ0FBQSxDQVBQLENBQUE7QUFRQSxtQkFBTyxPQUFPLENBQUMsSUFBUixDQUFhLE9BQWIsRUFBc0IsVUFBdEIsRUFBa0M7QUFBQSxjQUFDLEtBQUEsRUFBTyxJQUFSO2FBQWxDLENBQWdELENBQUMsSUFBakQsQ0FBc0QsU0FBQyxNQUFELEdBQUE7QUFDM0Qsa0JBQUEsc0JBQUE7QUFBQSxjQUFBLEtBQUEsR0FBUSwrQkFBUixDQUFBO0FBQUEsY0FDQSxRQUFBLEdBQVcsRUFEWCxDQUFBO0FBRUEscUJBQU0sQ0FBQyxLQUFBLEdBQVEsS0FBSyxDQUFDLElBQU4sQ0FBVyxNQUFYLENBQVQsQ0FBQSxLQUFrQyxJQUF4QyxHQUFBO0FBQ0UsZ0JBQUEsUUFBUSxDQUFDLElBQVQsQ0FDRTtBQUFBLGtCQUFBLElBQUEsRUFBTSxPQUFOO0FBQUEsa0JBQ0EsUUFBQSxFQUFVLFFBRFY7QUFBQSxrQkFFQSxLQUFBLEVBQU8sT0FBTyxDQUFDLG1CQUFSLENBQTRCLFVBQTVCLEVBQXdDLEtBQU0sQ0FBQSxDQUFBLENBQU4sR0FBVyxDQUFuRCxDQUZQO0FBQUEsa0JBR0EsSUFBQSxFQUFNLEtBQU0sQ0FBQSxDQUFBLENBSFo7aUJBREYsQ0FBQSxDQURGO2NBQUEsQ0FGQTtBQVFBLHFCQUFPLFFBQVAsQ0FUMkQ7WUFBQSxDQUF0RCxDQUFQLENBVEk7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUpOO1FBSFc7SUFBQSxDQWhCZjtHQUhGLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/jchong/.atom/packages/linter-php/lib/main.coffee
