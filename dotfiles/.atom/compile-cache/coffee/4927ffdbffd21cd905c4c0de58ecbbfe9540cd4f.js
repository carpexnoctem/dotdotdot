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
      var TextBuffer, filePath, scopeName, source, transform;
      TextBuffer = TextEditor.getBuffer();
      filePath = TextEditor.getPath();
      if (filePath) {
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
        return Core.lint(filePath, source, scopeName).map(transform);
      }
    };

    return _Class;

  })());

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2pjaG9uZy8uYXRvbS9wYWNrYWdlcy9saW50ZXItY29mZmVlbGludC9saWIvcGx1cy1saW50ZXIuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFVBQUE7SUFBQSxrRkFBQTs7QUFBQSxFQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsZUFBUixDQUFQLENBQUE7O0FBQUEsRUFDQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FEUCxDQUFBOztBQUFBLEVBR0EsTUFBTSxDQUFDLE9BQVAsR0FBaUIsR0FBQSxDQUFBOzs7S0FFZjs7QUFBQSxxQkFBQSxhQUFBLEdBQWUsSUFBSSxDQUFDLE1BQXBCLENBQUE7O0FBQUEscUJBQ0EsS0FBQSxHQUFPLE1BRFAsQ0FBQTs7QUFBQSxxQkFFQSxTQUFBLEdBQVcsSUFGWCxDQUFBOztBQUFBLHFCQU1BLElBQUEsR0FBTSxTQUFDLFVBQUQsR0FBQTtBQUNKLFVBQUEsa0RBQUE7QUFBQSxNQUFBLFVBQUEsR0FBYSxVQUFVLENBQUMsU0FBWCxDQUFBLENBQWIsQ0FBQTtBQUFBLE1BRUEsUUFBQSxHQUFXLFVBQVUsQ0FBQyxPQUFYLENBQUEsQ0FGWCxDQUFBO0FBR0EsTUFBQSxJQUFHLFFBQUg7QUFDRSxRQUFBLE1BQUEsR0FBUyxVQUFVLENBQUMsT0FBWCxDQUFBLENBQVQsQ0FBQTtBQUFBLFFBRUEsU0FBQSxHQUFZLFVBQVUsQ0FBQyxVQUFYLENBQUEsQ0FBdUIsQ0FBQyxTQUZwQyxDQUFBO0FBQUEsUUFLQSxTQUFBLEdBQVksU0FBQyxJQUFELEdBQUE7QUFDVixjQUFBLHVGQUFBO0FBQUEsVUFEWSxhQUFBLE9BQU8sZUFBQSxTQUFTLFlBQUEsTUFBTSxrQkFBQSxZQUFZLGVBQUEsU0FBUyxjQUFBLE1BQ3ZELENBQUE7QUFBQSxVQUFBLElBQXNDLE9BQXRDO0FBQUEsWUFBQSxPQUFBLEdBQVUsRUFBQSxHQUFHLE9BQUgsR0FBVyxJQUFYLEdBQWUsT0FBekIsQ0FBQTtXQUFBO0FBQUEsVUFDQSxPQUFBLEdBQVUsRUFBQSxHQUFHLE9BQUgsR0FBVyxLQUFYLEdBQWdCLElBQWhCLEdBQXFCLEdBRC9CLENBQUE7QUFBQSxVQUtBLFdBQUEsR0FBYyxVQUFVLENBQUMsdUJBQVgsQ0FBbUMsVUFBQSxHQUFhLENBQWhELENBTGQsQ0FBQTtBQUFBLFVBT0EsUUFBQSxHQUFZLFVBQVUsQ0FBQyxZQUFYLENBQUEsQ0FBQSxHQUE0QixXQVB4QyxDQUFBO0FBQUEsVUFRQSxNQUFBLEdBQVMsVUFBVSxDQUFDLGdCQUFYLENBQTRCLFVBQUEsR0FBYSxDQUF6QyxDQVJULENBQUE7QUFBQSxVQVVBLEtBQUEsR0FBUSxDQUFDLENBQUMsVUFBQSxHQUFhLENBQWQsRUFBaUIsUUFBakIsQ0FBRCxFQUE2QixDQUFDLFVBQUEsR0FBYSxDQUFkLEVBQWlCLE1BQWpCLENBQTdCLENBVlIsQ0FBQTtBQVlBLGlCQUFPO0FBQUEsWUFDTCxJQUFBLEVBQVMsS0FBQSxLQUFTLE9BQVosR0FBeUIsT0FBekIsR0FBc0MsU0FEdkM7QUFBQSxZQUVMLElBQUEsRUFBTSxPQUZEO0FBQUEsWUFHTCxRQUFBLEVBQVUsUUFITDtBQUFBLFlBSUwsS0FBQSxFQUFPLEtBSkY7V0FBUCxDQWJVO1FBQUEsQ0FMWixDQUFBO0FBeUJBLGVBQU8sSUFBSSxDQUFDLElBQUwsQ0FBVSxRQUFWLEVBQW9CLE1BQXBCLEVBQTRCLFNBQTVCLENBQXNDLENBQUMsR0FBdkMsQ0FBMkMsU0FBM0MsQ0FBUCxDQTFCRjtPQUpJO0lBQUEsQ0FOTixDQUFBOztrQkFBQTs7T0FMRixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/jchong/.atom/packages/linter-coffeelint/lib/plus-linter.coffee
