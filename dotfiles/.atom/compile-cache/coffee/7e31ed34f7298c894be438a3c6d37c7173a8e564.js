(function() {
  describe('editor-linter', function() {
    var EditorLinter, editorLinter, getMessage, textEditor;
    getMessage = require('./common').getMessage;
    EditorLinter = require('../lib/editor-linter');
    editorLinter = null;
    textEditor = null;
    beforeEach(function() {
      return waitsForPromise(function() {
        atom.workspace.destroyActivePaneItem();
        return atom.workspace.open(__dirname + '/fixtures/file.txt').then(function() {
          if (editorLinter != null) {
            editorLinter.dispose();
          }
          textEditor = atom.workspace.getActiveTextEditor();
          return editorLinter = new EditorLinter(textEditor);
        });
      });
    });
    describe('::constructor', function() {
      return it("cries when provided argument isn't a TextEditor", function() {
        expect(function() {
          return new EditorLinter;
        }).toThrow();
        expect(function() {
          return new EditorLinter(null);
        }).toThrow();
        return expect(function() {
          return new EditorLinter(55);
        }).toThrow();
      });
    });
    describe('::{add, remove}Message', function() {
      return it('adds/removes decorations from the editor', function() {
        var countDecorations, message;
        countDecorations = textEditor.getDecorations().length;
        editorLinter.underlineIssues = true;
        message = getMessage('Hey!', __dirname + '/fixtures/file.txt', [[0, 1], [0, 2]]);
        editorLinter.addMessage(message);
        expect(textEditor.getDecorations().length).toBe(countDecorations + 1);
        editorLinter.deleteMessage(message);
        return expect(textEditor.getDecorations().length).toBe(countDecorations);
      });
    });
    describe('::getMessages', function() {
      return it('returns a set of messages', function() {
        var message, messageSet;
        message = getMessage('Hey!', __dirname + '/fixtures/file.txt', [[0, 1], [0, 2]]);
        messageSet = editorLinter.getMessages();
        editorLinter.addMessage(message);
        expect(messageSet.has(message)).toBe(true);
        editorLinter.deleteMessage(message);
        return expect(messageSet.has(message)).toBe(false);
      });
    });
    describe('::onDidMessage{Add, Change, Delete}', function() {
      return it('notifies us of the changes to messages', function() {
        var message, messageAdd, messageChange, messageRemove;
        message = getMessage('Hey!', __dirname + '/fixtures/file.txt', [[0, 1], [0, 2]]);
        messageAdd = jasmine.createSpy('messageAdd');
        messageChange = jasmine.createSpy('messageChange');
        messageRemove = jasmine.createSpy('messageRemove');
        editorLinter.onDidMessageAdd(messageAdd);
        editorLinter.onDidMessageChange(messageChange);
        editorLinter.onDidMessageDelete(messageRemove);
        editorLinter.addMessage(message);
        expect(messageAdd).toHaveBeenCalled();
        expect(messageAdd).toHaveBeenCalledWith(message);
        expect(messageChange).toHaveBeenCalled();
        expect(messageChange.mostRecentCall.args[0].type).toBe('add');
        expect(messageChange.mostRecentCall.args[0].message).toBe(message);
        editorLinter.deleteMessage(message);
        expect(messageRemove).toHaveBeenCalled();
        expect(messageRemove).toHaveBeenCalledWith(message);
        expect(messageChange.mostRecentCall.args[0].type).toBe('delete');
        return expect(messageChange.mostRecentCall.args[0].message).toBe(message);
      });
    });
    describe('::{handle, add, remove}Gutter', function() {
      return it('handles the attachment and detachment of gutter to text editor', function() {
        editorLinter.gutterEnabled = false;
        expect(editorLinter.gutter === null).toBe(true);
        editorLinter.gutterEnabled = true;
        editorLinter.handleGutter();
        expect(editorLinter.gutter === null).toBe(false);
        editorLinter.gutterEnabled = false;
        editorLinter.handleGutter();
        expect(editorLinter.gutter === null).toBe(true);
        editorLinter.addGutter();
        expect(editorLinter.gutter === null).toBe(false);
        editorLinter.removeGutter();
        expect(editorLinter.gutter === null).toBe(true);
        editorLinter.removeGutter();
        return expect(editorLinter.gutter === null).toBe(true);
      });
    });
    describe('::onShouldLint', function() {
      return it('ignores instant save requests', function() {
        var timesTriggered;
        timesTriggered = 0;
        editorLinter.onShouldLint(function() {
          return timesTriggered++;
        });
        textEditor.save();
        textEditor.save();
        textEditor.save();
        textEditor.save();
        textEditor.save();
        return expect(timesTriggered).toBe(5);
      });
    });
    return describe('::onDidDestroy', function() {
      return it('is called when TextEditor is destroyed', function() {
        var didDestroy;
        didDestroy = false;
        editorLinter.onDidDestroy(function() {
          return didDestroy = true;
        });
        textEditor.destroy();
        return expect(didDestroy).toBe(true);
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2pjaG9uZy8uYXRvbS9wYWNrYWdlcy9saW50ZXIvc3BlYy9lZGl0b3ItbGludGVyLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxFQUFBLFFBQUEsQ0FBUyxlQUFULEVBQTBCLFNBQUEsR0FBQTtBQUN4QixRQUFBLGtEQUFBO0FBQUEsSUFBQyxhQUFjLE9BQUEsQ0FBUSxVQUFSLEVBQWQsVUFBRCxDQUFBO0FBQUEsSUFDQSxZQUFBLEdBQWUsT0FBQSxDQUFRLHNCQUFSLENBRGYsQ0FBQTtBQUFBLElBRUEsWUFBQSxHQUFlLElBRmYsQ0FBQTtBQUFBLElBR0EsVUFBQSxHQUFhLElBSGIsQ0FBQTtBQUFBLElBS0EsVUFBQSxDQUFXLFNBQUEsR0FBQTthQUNULGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO0FBQ2QsUUFBQSxJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFmLENBQUEsQ0FBQSxDQUFBO2VBQ0EsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFmLENBQW9CLFNBQUEsR0FBWSxvQkFBaEMsQ0FBcUQsQ0FBQyxJQUF0RCxDQUEyRCxTQUFBLEdBQUE7O1lBQ3pELFlBQVksQ0FBRSxPQUFkLENBQUE7V0FBQTtBQUFBLFVBQ0EsVUFBQSxHQUFhLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQWYsQ0FBQSxDQURiLENBQUE7aUJBRUEsWUFBQSxHQUFtQixJQUFBLFlBQUEsQ0FBYSxVQUFiLEVBSHNDO1FBQUEsQ0FBM0QsRUFGYztNQUFBLENBQWhCLEVBRFM7SUFBQSxDQUFYLENBTEEsQ0FBQTtBQUFBLElBYUEsUUFBQSxDQUFTLGVBQVQsRUFBMEIsU0FBQSxHQUFBO2FBQ3hCLEVBQUEsQ0FBRyxpREFBSCxFQUFzRCxTQUFBLEdBQUE7QUFDcEQsUUFBQSxNQUFBLENBQU8sU0FBQSxHQUFBO2lCQUNMLEdBQUEsQ0FBQSxhQURLO1FBQUEsQ0FBUCxDQUVBLENBQUMsT0FGRCxDQUFBLENBQUEsQ0FBQTtBQUFBLFFBR0EsTUFBQSxDQUFPLFNBQUEsR0FBQTtpQkFDRCxJQUFBLFlBQUEsQ0FBYSxJQUFiLEVBREM7UUFBQSxDQUFQLENBRUEsQ0FBQyxPQUZELENBQUEsQ0FIQSxDQUFBO2VBTUEsTUFBQSxDQUFPLFNBQUEsR0FBQTtpQkFDRCxJQUFBLFlBQUEsQ0FBYSxFQUFiLEVBREM7UUFBQSxDQUFQLENBRUEsQ0FBQyxPQUZELENBQUEsRUFQb0Q7TUFBQSxDQUF0RCxFQUR3QjtJQUFBLENBQTFCLENBYkEsQ0FBQTtBQUFBLElBeUJBLFFBQUEsQ0FBUyx3QkFBVCxFQUFtQyxTQUFBLEdBQUE7YUFDakMsRUFBQSxDQUFHLDBDQUFILEVBQStDLFNBQUEsR0FBQTtBQUM3QyxZQUFBLHlCQUFBO0FBQUEsUUFBQSxnQkFBQSxHQUFtQixVQUFVLENBQUMsY0FBWCxDQUFBLENBQTJCLENBQUMsTUFBL0MsQ0FBQTtBQUFBLFFBQ0EsWUFBWSxDQUFDLGVBQWIsR0FBK0IsSUFEL0IsQ0FBQTtBQUFBLFFBRUEsT0FBQSxHQUFVLFVBQUEsQ0FBVyxNQUFYLEVBQW1CLFNBQUEsR0FBWSxvQkFBL0IsRUFBcUQsQ0FBQyxDQUFDLENBQUQsRUFBSSxDQUFKLENBQUQsRUFBUyxDQUFDLENBQUQsRUFBSSxDQUFKLENBQVQsQ0FBckQsQ0FGVixDQUFBO0FBQUEsUUFHQSxZQUFZLENBQUMsVUFBYixDQUF3QixPQUF4QixDQUhBLENBQUE7QUFBQSxRQUlBLE1BQUEsQ0FBTyxVQUFVLENBQUMsY0FBWCxDQUFBLENBQTJCLENBQUMsTUFBbkMsQ0FBMEMsQ0FBQyxJQUEzQyxDQUFnRCxnQkFBQSxHQUFtQixDQUFuRSxDQUpBLENBQUE7QUFBQSxRQUtBLFlBQVksQ0FBQyxhQUFiLENBQTJCLE9BQTNCLENBTEEsQ0FBQTtlQU1BLE1BQUEsQ0FBTyxVQUFVLENBQUMsY0FBWCxDQUFBLENBQTJCLENBQUMsTUFBbkMsQ0FBMEMsQ0FBQyxJQUEzQyxDQUFnRCxnQkFBaEQsRUFQNkM7TUFBQSxDQUEvQyxFQURpQztJQUFBLENBQW5DLENBekJBLENBQUE7QUFBQSxJQW1DQSxRQUFBLENBQVMsZUFBVCxFQUEwQixTQUFBLEdBQUE7YUFDeEIsRUFBQSxDQUFHLDJCQUFILEVBQWdDLFNBQUEsR0FBQTtBQUM5QixZQUFBLG1CQUFBO0FBQUEsUUFBQSxPQUFBLEdBQVUsVUFBQSxDQUFXLE1BQVgsRUFBbUIsU0FBQSxHQUFZLG9CQUEvQixFQUFxRCxDQUFDLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBRCxFQUFTLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBVCxDQUFyRCxDQUFWLENBQUE7QUFBQSxRQUNBLFVBQUEsR0FBYSxZQUFZLENBQUMsV0FBYixDQUFBLENBRGIsQ0FBQTtBQUFBLFFBRUEsWUFBWSxDQUFDLFVBQWIsQ0FBd0IsT0FBeEIsQ0FGQSxDQUFBO0FBQUEsUUFHQSxNQUFBLENBQU8sVUFBVSxDQUFDLEdBQVgsQ0FBZSxPQUFmLENBQVAsQ0FBK0IsQ0FBQyxJQUFoQyxDQUFxQyxJQUFyQyxDQUhBLENBQUE7QUFBQSxRQUlBLFlBQVksQ0FBQyxhQUFiLENBQTJCLE9BQTNCLENBSkEsQ0FBQTtlQUtBLE1BQUEsQ0FBTyxVQUFVLENBQUMsR0FBWCxDQUFlLE9BQWYsQ0FBUCxDQUErQixDQUFDLElBQWhDLENBQXFDLEtBQXJDLEVBTjhCO01BQUEsQ0FBaEMsRUFEd0I7SUFBQSxDQUExQixDQW5DQSxDQUFBO0FBQUEsSUE0Q0EsUUFBQSxDQUFTLHFDQUFULEVBQWdELFNBQUEsR0FBQTthQUM5QyxFQUFBLENBQUcsd0NBQUgsRUFBNkMsU0FBQSxHQUFBO0FBQzNDLFlBQUEsaURBQUE7QUFBQSxRQUFBLE9BQUEsR0FBVSxVQUFBLENBQVcsTUFBWCxFQUFtQixTQUFBLEdBQVksb0JBQS9CLEVBQXFELENBQUMsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFELEVBQVMsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFULENBQXJELENBQVYsQ0FBQTtBQUFBLFFBQ0EsVUFBQSxHQUFhLE9BQU8sQ0FBQyxTQUFSLENBQWtCLFlBQWxCLENBRGIsQ0FBQTtBQUFBLFFBRUEsYUFBQSxHQUFnQixPQUFPLENBQUMsU0FBUixDQUFrQixlQUFsQixDQUZoQixDQUFBO0FBQUEsUUFHQSxhQUFBLEdBQWdCLE9BQU8sQ0FBQyxTQUFSLENBQWtCLGVBQWxCLENBSGhCLENBQUE7QUFBQSxRQUlBLFlBQVksQ0FBQyxlQUFiLENBQTZCLFVBQTdCLENBSkEsQ0FBQTtBQUFBLFFBS0EsWUFBWSxDQUFDLGtCQUFiLENBQWdDLGFBQWhDLENBTEEsQ0FBQTtBQUFBLFFBTUEsWUFBWSxDQUFDLGtCQUFiLENBQWdDLGFBQWhDLENBTkEsQ0FBQTtBQUFBLFFBT0EsWUFBWSxDQUFDLFVBQWIsQ0FBd0IsT0FBeEIsQ0FQQSxDQUFBO0FBQUEsUUFRQSxNQUFBLENBQU8sVUFBUCxDQUFrQixDQUFDLGdCQUFuQixDQUFBLENBUkEsQ0FBQTtBQUFBLFFBU0EsTUFBQSxDQUFPLFVBQVAsQ0FBa0IsQ0FBQyxvQkFBbkIsQ0FBd0MsT0FBeEMsQ0FUQSxDQUFBO0FBQUEsUUFVQSxNQUFBLENBQU8sYUFBUCxDQUFxQixDQUFDLGdCQUF0QixDQUFBLENBVkEsQ0FBQTtBQUFBLFFBV0EsTUFBQSxDQUFPLGFBQWEsQ0FBQyxjQUFjLENBQUMsSUFBSyxDQUFBLENBQUEsQ0FBRSxDQUFDLElBQTVDLENBQWlELENBQUMsSUFBbEQsQ0FBdUQsS0FBdkQsQ0FYQSxDQUFBO0FBQUEsUUFZQSxNQUFBLENBQU8sYUFBYSxDQUFDLGNBQWMsQ0FBQyxJQUFLLENBQUEsQ0FBQSxDQUFFLENBQUMsT0FBNUMsQ0FBb0QsQ0FBQyxJQUFyRCxDQUEwRCxPQUExRCxDQVpBLENBQUE7QUFBQSxRQWFBLFlBQVksQ0FBQyxhQUFiLENBQTJCLE9BQTNCLENBYkEsQ0FBQTtBQUFBLFFBY0EsTUFBQSxDQUFPLGFBQVAsQ0FBcUIsQ0FBQyxnQkFBdEIsQ0FBQSxDQWRBLENBQUE7QUFBQSxRQWVBLE1BQUEsQ0FBTyxhQUFQLENBQXFCLENBQUMsb0JBQXRCLENBQTJDLE9BQTNDLENBZkEsQ0FBQTtBQUFBLFFBZ0JBLE1BQUEsQ0FBTyxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUssQ0FBQSxDQUFBLENBQUUsQ0FBQyxJQUE1QyxDQUFpRCxDQUFDLElBQWxELENBQXVELFFBQXZELENBaEJBLENBQUE7ZUFpQkEsTUFBQSxDQUFPLGFBQWEsQ0FBQyxjQUFjLENBQUMsSUFBSyxDQUFBLENBQUEsQ0FBRSxDQUFDLE9BQTVDLENBQW9ELENBQUMsSUFBckQsQ0FBMEQsT0FBMUQsRUFsQjJDO01BQUEsQ0FBN0MsRUFEOEM7SUFBQSxDQUFoRCxDQTVDQSxDQUFBO0FBQUEsSUFpRUEsUUFBQSxDQUFTLCtCQUFULEVBQTBDLFNBQUEsR0FBQTthQUN4QyxFQUFBLENBQUcsZ0VBQUgsRUFBcUUsU0FBQSxHQUFBO0FBQ25FLFFBQUEsWUFBWSxDQUFDLGFBQWIsR0FBNkIsS0FBN0IsQ0FBQTtBQUFBLFFBQ0EsTUFBQSxDQUFPLFlBQVksQ0FBQyxNQUFiLEtBQXVCLElBQTlCLENBQW1DLENBQUMsSUFBcEMsQ0FBeUMsSUFBekMsQ0FEQSxDQUFBO0FBQUEsUUFFQSxZQUFZLENBQUMsYUFBYixHQUE2QixJQUY3QixDQUFBO0FBQUEsUUFHQSxZQUFZLENBQUMsWUFBYixDQUFBLENBSEEsQ0FBQTtBQUFBLFFBSUEsTUFBQSxDQUFPLFlBQVksQ0FBQyxNQUFiLEtBQXVCLElBQTlCLENBQW1DLENBQUMsSUFBcEMsQ0FBeUMsS0FBekMsQ0FKQSxDQUFBO0FBQUEsUUFLQSxZQUFZLENBQUMsYUFBYixHQUE2QixLQUw3QixDQUFBO0FBQUEsUUFNQSxZQUFZLENBQUMsWUFBYixDQUFBLENBTkEsQ0FBQTtBQUFBLFFBT0EsTUFBQSxDQUFPLFlBQVksQ0FBQyxNQUFiLEtBQXVCLElBQTlCLENBQW1DLENBQUMsSUFBcEMsQ0FBeUMsSUFBekMsQ0FQQSxDQUFBO0FBQUEsUUFRQSxZQUFZLENBQUMsU0FBYixDQUFBLENBUkEsQ0FBQTtBQUFBLFFBU0EsTUFBQSxDQUFPLFlBQVksQ0FBQyxNQUFiLEtBQXVCLElBQTlCLENBQW1DLENBQUMsSUFBcEMsQ0FBeUMsS0FBekMsQ0FUQSxDQUFBO0FBQUEsUUFVQSxZQUFZLENBQUMsWUFBYixDQUFBLENBVkEsQ0FBQTtBQUFBLFFBV0EsTUFBQSxDQUFPLFlBQVksQ0FBQyxNQUFiLEtBQXVCLElBQTlCLENBQW1DLENBQUMsSUFBcEMsQ0FBeUMsSUFBekMsQ0FYQSxDQUFBO0FBQUEsUUFZQSxZQUFZLENBQUMsWUFBYixDQUFBLENBWkEsQ0FBQTtlQWFBLE1BQUEsQ0FBTyxZQUFZLENBQUMsTUFBYixLQUF1QixJQUE5QixDQUFtQyxDQUFDLElBQXBDLENBQXlDLElBQXpDLEVBZG1FO01BQUEsQ0FBckUsRUFEd0M7SUFBQSxDQUExQyxDQWpFQSxDQUFBO0FBQUEsSUFrRkEsUUFBQSxDQUFTLGdCQUFULEVBQTJCLFNBQUEsR0FBQTthQUN6QixFQUFBLENBQUcsK0JBQUgsRUFBb0MsU0FBQSxHQUFBO0FBQ2xDLFlBQUEsY0FBQTtBQUFBLFFBQUEsY0FBQSxHQUFpQixDQUFqQixDQUFBO0FBQUEsUUFDQSxZQUFZLENBQUMsWUFBYixDQUEwQixTQUFBLEdBQUE7aUJBQ3hCLGNBQUEsR0FEd0I7UUFBQSxDQUExQixDQURBLENBQUE7QUFBQSxRQUdBLFVBQVUsQ0FBQyxJQUFYLENBQUEsQ0FIQSxDQUFBO0FBQUEsUUFJQSxVQUFVLENBQUMsSUFBWCxDQUFBLENBSkEsQ0FBQTtBQUFBLFFBS0EsVUFBVSxDQUFDLElBQVgsQ0FBQSxDQUxBLENBQUE7QUFBQSxRQU1BLFVBQVUsQ0FBQyxJQUFYLENBQUEsQ0FOQSxDQUFBO0FBQUEsUUFPQSxVQUFVLENBQUMsSUFBWCxDQUFBLENBUEEsQ0FBQTtlQVFBLE1BQUEsQ0FBTyxjQUFQLENBQXNCLENBQUMsSUFBdkIsQ0FBNEIsQ0FBNUIsRUFUa0M7TUFBQSxDQUFwQyxFQUR5QjtJQUFBLENBQTNCLENBbEZBLENBQUE7V0E4RkEsUUFBQSxDQUFTLGdCQUFULEVBQTJCLFNBQUEsR0FBQTthQUN6QixFQUFBLENBQUcsd0NBQUgsRUFBNkMsU0FBQSxHQUFBO0FBQzNDLFlBQUEsVUFBQTtBQUFBLFFBQUEsVUFBQSxHQUFhLEtBQWIsQ0FBQTtBQUFBLFFBQ0EsWUFBWSxDQUFDLFlBQWIsQ0FBMEIsU0FBQSxHQUFBO2lCQUN4QixVQUFBLEdBQWEsS0FEVztRQUFBLENBQTFCLENBREEsQ0FBQTtBQUFBLFFBR0EsVUFBVSxDQUFDLE9BQVgsQ0FBQSxDQUhBLENBQUE7ZUFJQSxNQUFBLENBQU8sVUFBUCxDQUFrQixDQUFDLElBQW5CLENBQXdCLElBQXhCLEVBTDJDO01BQUEsQ0FBN0MsRUFEeUI7SUFBQSxDQUEzQixFQS9Gd0I7RUFBQSxDQUExQixDQUFBLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/jchong/.atom/packages/linter/spec/editor-linter-spec.coffee
