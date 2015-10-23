(function() {
  var Core, path,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Core = require('./core.coffee');

  path = require('path');

  module.exports = new ((function() {
    function _Class() {
      this.lint = __bind(this.lint, this);
    }

    _Class.prototype.grammarScopes = Core.scopes;

    _Class.prototype.scope = "file";

    _Class.prototype.lintOnFly = true;

    _Class.prototype.lint = function(TextEditor) {
      var TextBuffer, filePath, origPath, scopeName, source, transform;
      TextBuffer = TextEditor.getBuffer();
      filePath = TextEditor.getPath();
      if (filePath) {
        origPath = filePath ? path.dirname(filePath) : '';
        source = TextEditor.getText();
        scopeName = TextEditor.getGrammar().scopeName;
        transform = function(_arg) {
          var column, context, endCol, indentLevel, level, lineNumber, message, range, rule, startCol;
          level = _arg.level, message = _arg.message, rule = _arg.rule, lineNumber = _arg.lineNumber, context = _arg.context, column = _arg.column;
          if (context) {
            message = "" + message + ". " + context;
          }
          message = "" + message + ". (" + rule + ")";
          indentLevel = TextEditor.indentationForBufferRow(lineNumber - 1);
          startCol = TextEditor.getTabLength() * indentLevel;
          endCol = TextBuffer.lineLengthForRow(lineNumber - 1);
          range = [[lineNumber - 1, startCol], [lineNumber - 1, endCol]];
          return {
            type: level === 'error' ? 'Error' : 'Warning',
            text: message,
            filePath: filePath,
            range: range
          };
        };
        return Core.lint(filePath, origPath, source, scopeName).map(transform);
      }
    };

    return _Class;

  })());

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2pjaG9uZy8uYXRvbS9wYWNrYWdlcy9saW50ZXItY2xheS1jb2ZmZWVsaW50L2xpYi9wbHVzLWxpbnRlci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsVUFBQTtJQUFBLGtGQUFBOztBQUFBLEVBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxlQUFSLENBQVAsQ0FBQTs7QUFBQSxFQUNBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQURQLENBQUE7O0FBQUEsRUFHQSxNQUFNLENBQUMsT0FBUCxHQUFpQixHQUFBLENBQUE7OztLQUVmOztBQUFBLHFCQUFBLGFBQUEsR0FBZSxJQUFJLENBQUMsTUFBcEIsQ0FBQTs7QUFBQSxxQkFDQSxLQUFBLEdBQU8sTUFEUCxDQUFBOztBQUFBLHFCQUVBLFNBQUEsR0FBVyxJQUZYLENBQUE7O0FBQUEscUJBTUEsSUFBQSxHQUFNLFNBQUMsVUFBRCxHQUFBO0FBQ0osVUFBQSw0REFBQTtBQUFBLE1BQUEsVUFBQSxHQUFhLFVBQVUsQ0FBQyxTQUFYLENBQUEsQ0FBYixDQUFBO0FBQUEsTUFFQSxRQUFBLEdBQVcsVUFBVSxDQUFDLE9BQVgsQ0FBQSxDQUZYLENBQUE7QUFHQSxNQUFBLElBQUcsUUFBSDtBQUNFLFFBQUEsUUFBQSxHQUFjLFFBQUgsR0FBaUIsSUFBSSxDQUFDLE9BQUwsQ0FBYSxRQUFiLENBQWpCLEdBQTRDLEVBQXZELENBQUE7QUFBQSxRQUNBLE1BQUEsR0FBUyxVQUFVLENBQUMsT0FBWCxDQUFBLENBRFQsQ0FBQTtBQUFBLFFBR0EsU0FBQSxHQUFZLFVBQVUsQ0FBQyxVQUFYLENBQUEsQ0FBdUIsQ0FBQyxTQUhwQyxDQUFBO0FBQUEsUUFNQSxTQUFBLEdBQVksU0FBQyxJQUFELEdBQUE7QUFDVixjQUFBLHVGQUFBO0FBQUEsVUFEWSxhQUFBLE9BQU8sZUFBQSxTQUFTLFlBQUEsTUFBTSxrQkFBQSxZQUFZLGVBQUEsU0FBUyxjQUFBLE1BQ3ZELENBQUE7QUFBQSxVQUFBLElBQXNDLE9BQXRDO0FBQUEsWUFBQSxPQUFBLEdBQVUsRUFBQSxHQUFHLE9BQUgsR0FBVyxJQUFYLEdBQWUsT0FBekIsQ0FBQTtXQUFBO0FBQUEsVUFDQSxPQUFBLEdBQVUsRUFBQSxHQUFHLE9BQUgsR0FBVyxLQUFYLEdBQWdCLElBQWhCLEdBQXFCLEdBRC9CLENBQUE7QUFBQSxVQUtBLFdBQUEsR0FBYyxVQUFVLENBQUMsdUJBQVgsQ0FBbUMsVUFBQSxHQUFhLENBQWhELENBTGQsQ0FBQTtBQUFBLFVBT0EsUUFBQSxHQUFZLFVBQVUsQ0FBQyxZQUFYLENBQUEsQ0FBQSxHQUE0QixXQVB4QyxDQUFBO0FBQUEsVUFRQSxNQUFBLEdBQVMsVUFBVSxDQUFDLGdCQUFYLENBQTRCLFVBQUEsR0FBYSxDQUF6QyxDQVJULENBQUE7QUFBQSxVQVVBLEtBQUEsR0FBUSxDQUFDLENBQUMsVUFBQSxHQUFhLENBQWQsRUFBaUIsUUFBakIsQ0FBRCxFQUE2QixDQUFDLFVBQUEsR0FBYSxDQUFkLEVBQWlCLE1BQWpCLENBQTdCLENBVlIsQ0FBQTtBQVlBLGlCQUFPO0FBQUEsWUFDTCxJQUFBLEVBQVMsS0FBQSxLQUFTLE9BQVosR0FBeUIsT0FBekIsR0FBc0MsU0FEdkM7QUFBQSxZQUVMLElBQUEsRUFBTSxPQUZEO0FBQUEsWUFHTCxRQUFBLEVBQVUsUUFITDtBQUFBLFlBSUwsS0FBQSxFQUFPLEtBSkY7V0FBUCxDQWJVO1FBQUEsQ0FOWixDQUFBO0FBMEJBLGVBQU8sSUFBSSxDQUFDLElBQUwsQ0FBVSxRQUFWLEVBQW9CLFFBQXBCLEVBQThCLE1BQTlCLEVBQXNDLFNBQXRDLENBQWdELENBQUMsR0FBakQsQ0FBcUQsU0FBckQsQ0FBUCxDQTNCRjtPQUpJO0lBQUEsQ0FOTixDQUFBOztrQkFBQTs7T0FMRixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/jchong/.atom/packages/linter-clay-coffeelint/lib/plus-linter.coffee
