(function() {
  describe('Message Element', function() {
    var Message, filePath, getMessage, visibleText;
    Message = require('../../lib/ui/message-element').Message;
    filePath = __dirname + '/fixtures/file.txt';
    getMessage = function(type) {
      return {
        type: type,
        text: 'Some Message',
        filePath: filePath
      };
    };
    visibleText = function(element) {
      var cloned;
      cloned = element.cloneNode(true);
      Array.prototype.forEach.call(cloned.querySelectorAll('[hidden]'), function(item) {
        return item.remove();
      });
      return cloned.textContent;
    };
    it('works', function() {
      var message, messageElement;
      message = getMessage('Error');
      messageElement = Message.fromMessage(message, 'Project');
      messageElement.attachedCallback();
      expect(visibleText(messageElement).indexOf(filePath) !== -1).toBe(true);
      messageElement.updateVisibility('File');
      expect(messageElement.hasAttribute('hidden')).toBe(true);
      message.currentFile = true;
      messageElement.updateVisibility('File');
      expect(messageElement.hasAttribute('hidden')).toBe(false);
      expect(visibleText(messageElement).indexOf(filePath) === -1).toBe(true);
      messageElement.updateVisibility('Line');
      expect(messageElement.hasAttribute('hidden')).toBe(true);
      message.currentLine = true;
      messageElement.updateVisibility('Line');
      expect(messageElement.hasAttribute('hidden')).toBe(false);
      return expect(visibleText(messageElement).indexOf(filePath) === -1).toBe(true);
    });
    return it('plays nice with class attribute', function() {
      var message, messageElement;
      message = getMessage('Error');
      message["class"] = 'Well Hello';
      messageElement = Message.fromMessage(message, 'Project');
      messageElement.attachedCallback();
      expect(messageElement.querySelector('.Well') instanceof Element).toBe(true);
      expect(messageElement.querySelector('.Hello') instanceof Element).toBe(true);
      return expect(messageElement.querySelector('.haha')).toBe(null);
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2pjaG9uZy8uYXRvbS9wYWNrYWdlcy9saW50ZXIvc3BlYy91aS9tZXNzYWdlLWVsZW1lbnQtc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLEVBQUEsUUFBQSxDQUFTLGlCQUFULEVBQTRCLFNBQUEsR0FBQTtBQUMxQixRQUFBLDBDQUFBO0FBQUEsSUFBQyxVQUFXLE9BQUEsQ0FBUSw4QkFBUixFQUFYLE9BQUQsQ0FBQTtBQUFBLElBQ0EsUUFBQSxHQUFXLFNBQUEsR0FBWSxvQkFEdkIsQ0FBQTtBQUFBLElBR0EsVUFBQSxHQUFhLFNBQUMsSUFBRCxHQUFBO0FBQ1gsYUFBTztBQUFBLFFBQUMsTUFBQSxJQUFEO0FBQUEsUUFBTyxJQUFBLEVBQU0sY0FBYjtBQUFBLFFBQTZCLFVBQUEsUUFBN0I7T0FBUCxDQURXO0lBQUEsQ0FIYixDQUFBO0FBQUEsSUFLQSxXQUFBLEdBQWMsU0FBQyxPQUFELEdBQUE7QUFDWixVQUFBLE1BQUE7QUFBQSxNQUFBLE1BQUEsR0FBUyxPQUFPLENBQUMsU0FBUixDQUFrQixJQUFsQixDQUFULENBQUE7QUFBQSxNQUNBLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQXhCLENBQTZCLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixVQUF4QixDQUE3QixFQUFrRSxTQUFDLElBQUQsR0FBQTtlQUNoRSxJQUFJLENBQUMsTUFBTCxDQUFBLEVBRGdFO01BQUEsQ0FBbEUsQ0FEQSxDQUFBO0FBSUEsYUFBTyxNQUFNLENBQUMsV0FBZCxDQUxZO0lBQUEsQ0FMZCxDQUFBO0FBQUEsSUFZQSxFQUFBLENBQUcsT0FBSCxFQUFZLFNBQUEsR0FBQTtBQUNWLFVBQUEsdUJBQUE7QUFBQSxNQUFBLE9BQUEsR0FBVSxVQUFBLENBQVcsT0FBWCxDQUFWLENBQUE7QUFBQSxNQUNBLGNBQUEsR0FB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

//# sourceURL=/Users/jchong/.atom/packages/linter/spec/ui/message-element-spec.coffee