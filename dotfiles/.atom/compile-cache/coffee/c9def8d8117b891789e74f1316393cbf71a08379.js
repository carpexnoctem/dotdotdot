(function() {
  var BufferedProcess, CompositeDisposable, _ref;

  _ref = require('atom'), BufferedProcess = _ref.BufferedProcess, CompositeDisposable = _ref.CompositeDisposable;

  module.exports = {
    config: {
      executablePath: {
        type: 'string',
        "default": 'pep257',
        description: "Path to executable pep257 cmd."
      },
      ignoreCodes: {
        type: 'string',
        "default": '',
        description: 'Comma separated list of error codes to ignore. ' + 'Available codes: https://pypi.python.org/pypi/pep257#error-codes'
      }
    },
    activate: function() {
      this.subscriptions = new CompositeDisposable;
      this.subscriptions.add(atom.config.observe('linter-python-pep257.executablePath', (function(_this) {
        return function(executablePath) {
          return _this.executablePath = executablePath;
        };
      })(this)));
      this.subscriptions.add(atom.config.observe('linter-python-pep257.ignoreCodes', (function(_this) {
        return function(executablePath) {
          return _this.executablePath = executablePath;
        };
      })(this)));
      return console.log('activate linter-python-pep257');
    },
    deactivate: function() {
      return this.subscriptions.dispose();
    },
    provideLinter: function() {
      var provider;
      return provider = {
        grammarScopes: ['source.python'],
        scope: 'file',
        lintOnFly: true,
        lint: function(textEditor) {
          return new Promise((function(_this) {
            return function(resolve, reject) {
              var cmd, filePath, ignoreCodes, info, parameters, process;
              filePath = textEditor.getPath();
              cmd = atom.config.get('linter-python-pep257.executablePath');
              parameters = [filePath, "--count"];
              if (ignoreCodes = atom.config.get('linter-python-pep257.ignoreCodes')) {
                parameters.push("--ignore=" + ignoreCodes);
              }
              info = {};
              process = new BufferedProcess({
                command: cmd,
                args: parameters,
                stdout: function(data) {
                  return info.error_count = data;
                },
                stderr: function(data) {
                  return info.errors = data;
                },
                exit: function(code) {
                  var k, l, line_number, messages, msg, output, v, _i, _len;
                  if (code === 0) {
                    return resolve([]);
                  }
                  if (info.error_count === 0) {
                    return resolve([]);
                  }
                  output = info.errors.split("\n");
                  messages = [];
                  for (k = _i = 0, _len = output.length; _i < _len; k = ++_i) {
                    v = output[k];
                    if (k % 2 === 0 && k < output.length - 1) {
                      line_number = parseInt((v.match(/:\d+/) || [":"])[0].split(":")[1]);
                      line_number -= 1;
                      l = k + 1;
                      msg = output[k].trim() + " " + output[l].trim();
                      if (parseInt(line_number) !== line_number) {
                        resolve([]);
                      }
                      messages.push({
                        type: 'Warning',
                        text: msg,
                        filePath: filePath,
                        range: [[line_number, 0], [line_number, 0]]
                      });
                    }
                  }
                  return resolve(messages);
                }
              });
              return process.onWillThrowError(function(_arg) {
                var error, handle;
                error = _arg.error, handle = _arg.handle;
                atom.notifications.addError("Failed to run " + this.executablePath, {
                  detail: "" + error.message,
                  dismissable: true
                });
                handle();
                return resolve([]);
              });
            };
          })(this));
        }
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2pjaG9uZy8uYXRvbS9wYWNrYWdlcy9saW50ZXItcHl0aG9uLXBlcDI1Ny9saWIvbWFpbi5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsMENBQUE7O0FBQUEsRUFBQSxPQUF5QyxPQUFBLENBQVEsTUFBUixDQUF6QyxFQUFDLHVCQUFBLGVBQUQsRUFBa0IsMkJBQUEsbUJBQWxCLENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxNQUFBLEVBQ0U7QUFBQSxNQUFBLGNBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFFBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxRQURUO0FBQUEsUUFFQSxXQUFBLEVBQWEsZ0NBRmI7T0FERjtBQUFBLE1BSUEsV0FBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sUUFBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLEVBRFQ7QUFBQSxRQUVBLFdBQUEsRUFBYyxpREFBQSxHQUNaLGtFQUhGO09BTEY7S0FERjtBQUFBLElBV0EsUUFBQSxFQUFVLFNBQUEsR0FBQTtBQUNSLE1BQUEsSUFBQyxDQUFBLGFBQUQsR0FBaUIsR0FBQSxDQUFBLG1CQUFqQixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsYUFBYSxDQUFDLEdBQWYsQ0FBbUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFaLENBQW9CLHFDQUFwQixFQUNqQixDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxjQUFELEdBQUE7aUJBQ0UsS0FBQyxDQUFBLGNBQUQsR0FBa0IsZUFEcEI7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQURpQixDQUFuQixDQURBLENBQUE7QUFBQSxNQUlBLElBQUMsQ0FBQSxhQUFhLENBQUMsR0FBZixDQUFtQixJQUFJLENBQUMsTUFBTSxDQUFD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

//# sourceURL=/Users/jchong/.atom/packages/linter-python-pep257/lib/main.coffee
