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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2pjaG9uZy8uYXRvbS9wYWNrYWdlcy9saW50ZXItcGhwL2xpYi9tYWluLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxtQkFBQTs7QUFBQSxFQUFDLHNCQUF1QixPQUFBLENBQVEsTUFBUixFQUF2QixtQkFBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsTUFBQSxFQUNFO0FBQUEsTUFBQSxjQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxRQUFOO0FBQUEsUUFDQSxLQUFBLEVBQU8scUJBRFA7QUFBQSxRQUVBLFNBQUEsRUFBUyxLQUZUO09BREY7S0FERjtBQUFBLElBTUEsUUFBQSxFQUFVLFNBQUEsR0FBQTtBQUNSLE1BQUEsT0FBQSxDQUFRLG1CQUFSLENBQTRCLENBQUMsT0FBN0IsQ0FBcUMsWUFBckMsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsYUFBRCxHQUFpQixHQUFBLENBQUEsbUJBRGpCLENBQUE7YUFFQSxJQUFDLENBQUEsYUFBYSxDQUFDLEdBQWYsQ0FBbUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFaLENBQW9CLDJCQUFwQixFQUNqQixDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxjQUFELEdBQUE7aUJBQ0UsS0FBQyxDQUFBLGNBQUQsR0FBa0IsZUFEcEI7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQURpQixDQUFuQixFQUhRO0lBQUEsQ0FOVjtBQUFBLElBYUEsVUFBQSxFQUFZLFNBQUEsR0FBQTthQUNWLElBQUMsQ0FBQSxhQUFhLENBQUMsT0FBZixDQUFBLEVBRFU7SUFBQSxDQWJaO0FBQUEsSUFnQkEsYUFBQSxFQUFlLFNBQUEsR0FBQTtBQUNiLFVBQUEsaUJBQUE7QUFBQSxNQUFBLE9BQUEsR0FBVSxPQUFBLENBQVEsYUFBUixDQUFWLENBQUE7YUFDQSxRQUFBLEdBQ0U7QUFBQSxRQUFBLGFBQUEsRUFBZSxDQUFDLGVBQUQsRUFBa0IsWUFBbEIsQ0FBZjtBQUFBLFFBQ0EsS0FBQSxFQUFPLE1BRFA7QUFBQSxRQUVBLFNBQUEsRUFBVyxJQUZYO0FBQUEsUUFHQSxJQUFBLEVBQU0sQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFDLFVBQUQsR0FBQTtBQUNKLGdCQUFBLG1DQUFBO0FBQUEsWUFBQSxRQUFBLEdBQVcsVUFBVSxDQUFDLE9BQVgsQ0FBQSxDQUFYLENBQUE7QUFBQSxZQUNBLE9BQUEsR0FBVSxLQUFDLENBQUEsY0FEWCxDQUFBO0FBQUEsWUFFQSxVQUFBLEdBQWEsRUFGYixDQUFBO0FBQUEsWUFHQSxVQUFVLENBQUMsSUFBWCxDQUFnQixnQkFBaEIsQ0FIQSxDQUFBO0FBQUEsWUFJQSxVQUFVLENBQUMsSUFBWCxDQUFnQixjQUFoQixDQUpBLENBQUE7QUFBQSxZQUtBLFVBQVUsQ0FBQyxJQUFYLENBQWdCLFVBQWhCLEVBQTRCLG1CQUE1QixDQUxBLENBQUE7QUFBQSxZQU1BLFVBQVUsQ0FBQyxJQUFYLENBQWdCLFVBQWhCLEVBQTRCLGdCQUE1QixDQU5BLENBQUE7QUFBQSxZQU9BLElBQUEsR0FBTyxVQUFVLENBQUMsT0FBWCxDQUFBLENBUFAsQ0FBQTtBQVFBLG1CQUFPLE9BQU8sQ0FBQyxJQUFSLENBQWEsT0FBYixFQUFzQixVQUF0QixFQUFrQztBQUFBLGNBQUMsS0FBQSxFQUFPLElBQVI7YUFBbEMsQ0FBZ0QsQ0FBQyxJQUFqRCxDQUFzRCxTQUFDLE1BQUQsR0FBQTtBQUMzRCxrQkFBQSxzQkFBQTtBQUFBLGNBQUEsS0FBQSxHQUFRLCtCQUFSLENBQUE7QUFBQSxjQUNBLFFBQUEsR0FBVyxFQURYLENBQUE7QUFFQSxxQkFBTSxDQUFDLEtBQUEsR0FBUSxLQUFLLENBQUMsSUFBTixDQUFXLE1BQVgsQ0FBVCxDQUFBLEtBQWtDLElBQXhDLEdBQUE7QUFDRSxnQkFBQSxRQUFRLENBQUMsSUFBVCxDQUNFO0FBQUEsa0JBQUEsSUFBQSxFQUFNLE9BQU47QUFBQSxrQkFDQSxRQUFBLEVBQVUsUUFEVjtBQUFBLGtCQUVBLEtBQUEsRUFBTyxPQUFPLENBQUMsbUJBQVIsQ0FBNEIsVUFBNUIsRUFBd0MsS0FBTSxDQUFBLENBQUEsQ0FBTixHQUFXLENBQW5ELENBRlA7QUFBQSxrQkFHQSxJQUFBLEVBQU0sS0FBTSxDQUFBLENBQUEsQ0FIWjtpQkFERixDQUFBLENBREY7Y0FBQSxDQUZBO0FBUUEscUJBQU8sUUFBUCxDQVQyRDtZQUFBLENBQXRELENBQVAsQ0FUSTtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBSE47UUFIVztJQUFBLENBaEJmO0dBSEYsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/jchong/.atom/packages/linter-php/lib/main.coffee
