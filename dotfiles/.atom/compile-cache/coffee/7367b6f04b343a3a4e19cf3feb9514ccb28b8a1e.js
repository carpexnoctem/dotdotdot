(function() {
  var BufferedProcess, Command, CompositeDisposable, Parser, _ref;

  _ref = require('atom'), BufferedProcess = _ref.BufferedProcess, CompositeDisposable = _ref.CompositeDisposable;

  Parser = (function() {
    function Parser() {}

    Parser.match = function(line) {
      var m;
      if (m = /(.+):([0-9]+): +(MD[0-9]{3}) +(.+)/.exec(line)) {
        return {
          type: 'Error',
          message: "" + m[3] + ": " + m[4],
          lineStart: m[2],
          lineEnd: m[2],
          charStart: 1,
          charEnd: 1
        };
      }
    };

    Parser.parse = function(data) {
      var error, errors, line;
      errors = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          line = data[_i];
          _results.push(this.match(line));
        }
        return _results;
      }).call(Parser);
      errors = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = errors.length; _i < _len; _i++) {
          error = errors[_i];
          if (error != null) {
            _results.push(error);
          }
        }
        return _results;
      })();
      if (errors.length === 0) {
        return {
          passed: true
        };
      } else {
        return {
          passed: false,
          errors: errors
        };
      }
    };

    return Parser;

  })();

  Command = (function() {
    function Command() {}

    Command.setExecutablePath = function(path) {
      return Command.executablePath = path;
    };

    Command.getExecutablePath = function() {
      return Command.executablePath || 'mdl';
    };

    return Command;

  })();

  module.exports = {
    config: {
      executablePath: {
        type: 'string',
        "default": 'mdl',
        description: 'Path to mdl executable'
      }
    },
    activate: function() {
      this.subscriptions = new CompositeDisposable;
      return this.subscriptions.add(atom.config.observe('linter-example.executablePath', function(executablePath) {
        return Command.setExecutablePath(executablePath);
      }));
    },
    deactivate: function() {
      return this.subscriptions.dispose();
    },
    provideLinter: function() {
      var provider;
      return provider = {
        grammarScopes: ['source.gfm', 'source.pfm'],
        scope: 'file',
        lintOnFly: false,
        lint: (function(_this) {
          return function(TextEditor) {
            return new Promise(function(resolve, reject) {
              var filePath, lines, process;
              filePath = TextEditor.getPath();
              lines = [];
              console.log(Command.getExecutablePath());
              process = new BufferedProcess({
                command: Command.getExecutablePath(),
                args: [filePath],
                stdout: function(data) {
                  var line, _i, _len, _ref1, _results;
                  _ref1 = data.split('\n');
                  _results = [];
                  for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                    line = _ref1[_i];
                    _results.push(lines.push(line));
                  }
                  return _results;
                },
                exit: function(code) {
                  var info;
                  if (code === 0) {
                    return resolve([]);
                  }
                  info = Parser.parse(lines);
                  if (info == null) {
                    return resolve([]);
                  }
                  if (info.passed) {
                    return resolve([]);
                  }
                  return resolve(info.errors.map(function(error) {
                    return {
                      type: error.type,
                      text: error.message,
                      filePath: error.file || filePath,
                      range: [[error.lineStart - 1, error.charStart - 1], [error.lineEnd - 1, error.charEnd]]
                    };
                  }));
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
            });
          };
        })(this)
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2pjaG9uZy8uYXRvbS9wYWNrYWdlcy9saW50ZXItbWFya2Rvd25saW50L2xpYi9pbml0LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSwyREFBQTs7QUFBQSxFQUFBLE9BQXlDLE9BQUEsQ0FBUSxNQUFSLENBQXpDLEVBQUMsdUJBQUEsZUFBRCxFQUFrQiwyQkFBQSxtQkFBbEIsQ0FBQTs7QUFBQSxFQUVNO3dCQUNKOztBQUFBLElBQUEsTUFBQyxDQUFBLEtBQUQsR0FBUSxTQUFDLElBQUQsR0FBQTtBQUNOLFVBQUEsQ0FBQTtBQUFBLE1BQUEsSUFBRyxDQUFBLEdBQUksb0NBQW9DLENBQUMsSUFBckMsQ0FBMEMsSUFBMUMsQ0FBUDtlQUNFO0FBQUEsVUFBQSxJQUFBLEVBQU0sT0FBTjtBQUFBLFVBQ0EsT0FBQSxFQUFTLEVBQUEsR0FBRyxDQUFFLENBQUEsQ0FBQSxDQUFMLEdBQVEsSUFBUixHQUFZLENBQUUsQ0FBQSxDQUFBLENBRHZCO0FBQUEsVUFFQSxTQUFBLEVBQVcsQ0FBRSxDQUFBLENBQUEsQ0FGYjtBQUFBLFVBR0EsT0FBQSxFQUFTLENBQUUsQ0FBQSxDQUFBLENBSFg7QUFBQSxVQUlBLFNBQUEsRUFBVyxDQUpYO0FBQUEsVUFLQSxPQUFBLEVBQVMsQ0FMVDtVQURGO09BRE07SUFBQSxDQUFSLENBQUE7O0FBQUEsSUFRQSxNQUFDLENBQUEsS0FBRCxHQUFRLFNBQUMsSUFBRCxHQUFBO0FBQ04sVUFBQSxtQkFBQTtBQUFBLE1BQUEsTUFBQTs7QUFBVTthQUFBLDJDQUFBOzBCQUFBO0FBQUEsd0JBQUEsSUFBQyxDQUFBLEtBQUQsQ0FBTyxJQUFQLEVBQUEsQ0FBQTtBQUFBOztxQkFBVixDQUFBO0FBQUEsTUFDQSxNQUFBOztBQUFVO2FBQUEsNkNBQUE7NkJBQUE7Y0FBK0I7QUFBL0IsMEJBQUEs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

//# sourceURL=/Users/jchong/.atom/packages/linter-markdownlint/lib/init.coffee
