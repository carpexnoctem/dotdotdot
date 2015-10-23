(function() {
  var CompositeDisposable;

  CompositeDisposable = require('atom').CompositeDisposable;

  module.exports = {
    config: {
      shellcheckExecutablePath: {
        type: 'string',
        title: 'Shellcheck Executable Path',
        "default": 'shellcheck'
      },
      enableNotice: {
        type: 'boolean',
        title: 'Enable Notice Messages',
        "default": false
      }
    },
    activate: function() {
      this.subscriptions = new CompositeDisposable;
      this.subscriptions.add(atom.config.observe('linter-shellcheck.shellcheckExecutablePath', (function(_this) {
        return function(executablePath) {
          return _this.executablePath = executablePath;
        };
      })(this)));
      return this.subscriptions.add(atom.config.observe('linter-shellcheck.enableNotice', (function(_this) {
        return function(enableNotice) {
          return _this.enableNotice = enableNotice;
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
        grammarScopes: ['source.shell'],
        scope: 'file',
        lintOnFly: true,
        lint: (function(_this) {
          return function(textEditor) {
            var filePath, parameters, showAll, text;
            filePath = textEditor.getPath();
            text = textEditor.getText();
            showAll = _this.enableNotice;
            parameters = ['-f', 'gcc', '-'];
            return helpers.exec(_this.executablePath, parameters, {
              stdin: text
            }).then(function(output) {
              var colEnd, colStart, lineEnd, lineStart, match, messages, regex;
              regex = /.+?:(\d+):(\d+):\s(\w+?):\s(.+)/g;
              messages = [];
              while ((match = regex.exec(output)) !== null) {
                if (showAll || match[3] === "warning" || match[3] === "error") {
                  lineStart = match[1] - 1;
                  colStart = match[2] - 1;
                  lineEnd = match[1] - 1;
                  colEnd = textEditor.getBuffer().lineLengthForRow(lineStart);
                  messages.push({
                    type: match[3],
                    filePath: filePath,
                    range: [[lineStart, colStart], [lineEnd, colEnd]],
                    text: match[4]
                  });
                }
              }
              return messages;
            });
          };
        })(this)
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2pjaG9uZy8uYXRvbS9wYWNrYWdlcy9saW50ZXItc2hlbGxjaGVjay9saWIvbWFpbi5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsbUJBQUE7O0FBQUEsRUFBQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVIsRUFBdkIsbUJBQUQsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLE1BQUEsRUFDRTtBQUFBLE1BQUEsd0JBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFFBQU47QUFBQSxRQUNBLEtBQUEsRUFBTyw0QkFEUDtBQUFBLFFBRUEsU0FBQSxFQUFTLFlBRlQ7T0FERjtBQUFBLE1BSUEsWUFBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sU0FBTjtBQUFBLFFBQ0EsS0FBQSxFQUFPLHdCQURQO0FBQUEsUUFFQSxTQUFBLEVBQVMsS0FGVDtPQUxGO0tBREY7QUFBQSxJQVVBLFFBQUEsRUFBVSxTQUFBLEdBQUE7QUFDUixNQUFBLElBQUMsQ0FBQSxhQUFELEdBQWlCLEdBQUEsQ0FBQSxtQkFBakIsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLENBQW1CLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBWixDQUNsQiw0Q0FEa0IsRUFFakIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsY0FBRCxHQUFBO2lCQUNFLEtBQUMsQ0FBQSxjQUFELEdBQWtCLGVBRHBCO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FGaUIsQ0FBbkIsQ0FEQSxDQUFBO2FBS0EsSUFBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLENBQW1CLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBWixDQUFvQixnQ0FBcEIsRUFDakIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtl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

//# sourceURL=/Users/jchong/.atom/packages/linter-shellcheck/lib/main.coffee
