'use babel';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewLine = /\r?\n/;

var Message = (function (_HTMLElement) {
  _inherits(Message, _HTMLElement);

  function Message() {
    _classCallCheck(this, Message);

    _get(Object.getPrototypeOf(Message.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Message, [{
    key: 'initialize',
    value: function initialize(message) {
      this.message = message;
      return this;
    }
  }, {
    key: 'updateVisibility',
    value: function updateVisibility(scope) {
      var status = true;
      if (scope === 'Line') status = this.message.currentLine;else if (scope === 'File') status = this.message.currentFile;

      if (this.children.length && this.message.filePath) if (scope === 'Project') this.children[this.children.length - 1].children[0].removeAttribute('hidden');else this.children[this.children.length - 1].children[0].setAttribute('hidden', true);

      if (status) this.removeAttribute('hidden');else this.setAttribute('hidden', true);
    }
  }, {
    key: 'attachedCallback',
    value: function attachedCallback() {
      this.appendChild(Message.getRibbon(this.message));
      this.appendChild(Message.getMessage(this.message));

      if (this.message.filePath) {
        this.appendChild(Message.getLink(this.message));
      }
    }
  }], [{
    key: 'getLink',
    value: function getLink(message) {
      var el = document.createElement('a');
      var pathEl = document.createElement('span');
      var displayFile = message.filePath;

      el.className = 'linter-message-item';

      for (var path of atom.project.getPaths()) {
        if (displayFile.indexOf(path) === 0) {
          displayFile = displayFile.substr(path.length + 1); // Path + Path Separator
          break;
        }
      }if (message.range) {
        el.textContent = 'at line ' + (message.range.start.row + 1) + ' col ' + (message.range.start.column + 1);
      }
      pathEl.textContent = ' in ' + displayFile;
      el.appendChild(pathEl);
      el.addEventListener('click', function () {
        atom.workspace.open(message.filePath).then(function () {
          if (message.range) {
            atom.workspace.getActiveTextEditor().setCursorBufferPosition(message.range.start);
          }
        });
      });
      return el;
    }
  }, {
    key: 'getMessage',
    value: function getMessage(message) {
      var el = document.createElement('span');
      el.className = 'linter-message-item';
      if (message.html && typeof message.html !== 'string') {
        el.appendChild(message.html.cloneNode(true));
      } else if (message.multiline || message.html && message.html.match(NewLine) || message.text && message.text.match(NewLine)) {
        return Message.getMultiLineMessage(message.html || message.text);
      } else {
        if (message.html) {
          el.innerHTML = message.html;
        } else if (message.text) {
          el.textContent = message.text;
        }
      }
      return el;
    }
  }, {
    key: 'getMultiLineMessage',
    value: function getMultiLineMessage(message) {
      var container = document.createElement('linter-multiline-message');
      for (var line of message.split(NewLine)) {
        if (!line) continue;
        var el = document.createElement('linter-message-line');
        el.textContent = line;
        container.appendChild(el);
      }
      return container;
    }
  }, {
    key: 'getRibbon',
    value: function getRibbon(message) {
      var el = document.createElement('span');
      el.className = 'linter-message-item badge badge-flexible linter-highlight ' + message['class'];
      el.textContent = message.type;
      return el;
    }
  }, {
    key: 'fromMessage',
    value: function fromMessage(message) {
      return new MessageElement().initialize(message);
    }
  }]);

  return Message;
})(HTMLElement);

exports.Message = Message;
var MessageElement = document.registerElement('linter-message', {
  prototype: Message.prototype
});
exports.MessageElement = MessageElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qY2hvbmcvLmF0b20vcGFja2FnZXMvbGludGVyL2xpYi91aS9tZXNzYWdlLWVsZW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsV0FBVyxDQUFBOzs7Ozs7Ozs7Ozs7OztBQUVYLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQTs7SUFFVixPQUFPO1lBQVAsT0FBTzs7V0FBUCxPQUFPOzBCQUFQLE9BQU87OytCQUFQLE9BQU87OztlQUFQLE9BQU87O1dBQ1Isb0JBQUMsT0FBTyxFQUFFO0FBQ2xCLFVBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO0FBQ3RCLGFBQU8sSUFBSSxDQUFBO0tBQ1o7OztXQUNlLDBCQUFDLEtBQUssRUFBRTtBQUN0QixVQUFJLE1BQU0sR0FBRyxJQUFJLENBQUE7QUFDakIsVUFBSSxLQUFLLEtBQUssTUFBTSxFQUNsQixNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUEsS0FDOUIsSUFBSSxLQUFLLEtBQUssTUFBTSxFQUN2QixNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUE7O0FBRW5DLFVBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQy9DLElBQUksS0FBSyxLQUFLLFNBQVMsRUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFBLEtBQzFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUE7O0FBRXZGLFVBQUksTUFBTSxFQUNSLElBQUksQ0FBQyxlQUFl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QTtLQUNoRDs7O1NBL0ZVLE9BQU87R0FBUyxXQUFXOzs7QUFrR2pDLElBQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUU7QUFDdkUsV0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTO0NBQzdCLENBQUMsQ0FBQSIsImZpbGUiOiIvVXNlcnMvamNob25nLy5hdG9tL3BhY2thZ2VzL2xpbnRlci9saWIvdWkvbWVzc2FnZS1lbGVtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCdcblxuY29uc3QgTmV3TGluZSA9IC9cXHI/XFxuL1xuXG5leHBvcnQgY2xhc3MgTWVzc2FnZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgaW5pdGlhbGl6ZShtZXNzYWdlKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZVxuICAgIHJldHVybiB0aGlzXG4gIH1cbiAgdXBkYXRlVmlzaWJpbGl0eShzY29wZSkge1xuICAgIGxldCBzdGF0dXMgPSB0cnVlXG4gICAgaWYgKHNjb3BlID09PSAnTGluZScpXG4gICAgICBzdGF0dXMgPSB0aGlzLm1lc3NhZ2UuY3VycmVudExpbmVcbiAgICBlbHNlIGlmIChzY29wZSA9PT0gJ0ZpbGUnKVxuICAgICAgc3RhdHVzID0gdGhpcy5tZXNzYWdlLmN1cnJlbnRGaWxlXG5cbiAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggJiYgdGhpcy5tZXNzYWdlLmZpbGVQYXRoKVxuICAgICAgaWYgKHNjb3BlID09PSAnUHJvamVjdCcpXG4gICAgICAgIHRoaXMuY2hpbGRyZW5bdGhpcy5jaGlsZHJlbi5sZW5ndGggLSAxXS5jaGlsZHJlblswXS5yZW1vdmVBdHRyaWJ1dGUoJ2hpZGRlbicpXG4gICAgICBlbHNlIHRoaXMuY2hpbGRyZW5bdGhpcy5jaGlsZHJlbi5sZW5ndGggLSAxXS5jaGlsZHJlblswXS5zZXRBdHRyaWJ1dGUoJ2hpZGRlbicsIHRydWUpXG5cbiAgICBpZiAoc3RhdHVzKVxuICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ2hpZGRlbicpXG4gICAgZWxzZVxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2hpZGRlbicsIHRydWUpXG4gIH1cbiAgYXR0YWNoZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLmFwcGVuZENoaWxkKE1lc3NhZ2UuZ2V0UmliYm9uKHRoaXMubWVzc2FnZSkpXG4gICAgdGhpcy5hcHBlbmRDaGlsZChNZXNzYWdlLmdldE1lc3NhZ2UodGhpcy5tZXNzYWdlKSlcblxuICAgIGlmICh0aGlzLm1lc3NhZ2UuZmlsZVBhdGgpIHtcbiAgICAgIHRoaXMuYXBwZW5kQ2hpbGQoTWVzc2FnZS5nZXRMaW5rKHRoaXMubWVzc2FnZSkpXG4gICAgfVxuICB9XG4gIHN0YXRpYyBnZXRMaW5rKG1lc3NhZ2UpIHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuICAgIGNvbnN0IHBhdGhFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGxldCBkaXNwbGF5RmlsZSA9IG1lc3NhZ2UuZmlsZVBhdGhcblxuICAgIGVsLmNsYXNzTmFtZSA9ICdsaW50ZXItbWVzc2FnZS1pdGVtJ1xuXG4gICAgZm9yIChsZXQgcGF0aCBvZiBhdG9tLnByb2plY3QuZ2V0UGF0aHMoKSlcbiAgICAgIGlmIChkaXNwbGF5RmlsZS5pbmRleE9mKHBhdGgpID09PSAwKSB7XG4gICAgICAgIGRpc3BsYXlGaWxlID0gZGlzcGxheUZpbGUuc3Vic3RyKHBhdGgubGVuZ3RoICsgMSkgLy8gUGF0aCArIFBhdGggU2VwYXJhdG9yXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICBpZiAobWVzc2FnZS5yYW5nZSkge1xuICAgICAgZWwudGV4dENvbnRlbnQgPSBgYXQgbGluZSAke21lc3NhZ2UucmFuZ2Uuc3RhcnQucm93ICsgMX0gY29sICR7bWVzc2FnZS5yYW5nZS5zdGFydC5jb2x1bW4gKyAxfWBcbiAgICB9XG4gICAgcGF0aEVsLnRleHRDb250ZW50ID0gJyBpbiAnICsgZGlzcGxheUZpbGVcbiAgICBlbC5hcHBlbmRDaGlsZChwYXRoRWwpXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIGF0b20ud29ya3NwYWNlLm9wZW4obWVzc2FnZS5maWxlUGF0aCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UucmFuZ2UpIHtcbiAgICAgICAgICBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKCkuc2V0Q3Vyc29yQnVmZmVyUG9zaXRpb24obWVzc2FnZS5yYW5nZS5zdGFydClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICAgIHJldHVybiBlbFxuICB9XG4gIHN0YXRpYyBnZXRNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGVsLmNsYXNzTmFtZSA9ICdsaW50ZXItbWVzc2FnZS1pdGVtJ1xuICAgIGlmIChtZXNzYWdlLmh0bWwgJiYgdHlwZW9mIG1lc3NhZ2UuaHRtbCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIGVsLmFwcGVuZENoaWxkKG1lc3NhZ2UuaHRtbC5jbG9uZU5vZGUodHJ1ZSkpXG4gICAgfSBlbHNlIGlmIChcbiAgICAgIG1lc3NhZ2UubXVsdGlsaW5lIHx8XG4gICAgICAobWVzc2FnZS5odG1sICYmIG1lc3NhZ2UuaHRtbC5tYXRjaChOZXdMaW5lKSkgfHxcbiAgICAgIChtZXNzYWdlLnRleHQgJiYgbWVzc2FnZS50ZXh0Lm1hdGNoKE5ld0xpbmUpKVxuICAgICkge1xuICAgICAgcmV0dXJuIE1lc3NhZ2UuZ2V0TXVsdGlMaW5lTWVzc2FnZShtZXNzYWdlLmh0bWwgfHwgbWVzc2FnZS50ZXh0KVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobWVzc2FnZS5odG1sKSB7XG4gICAgICAgIGVsLmlubmVySFRNTCA9IG1lc3NhZ2UuaHRtbFxuICAgICAgfSBlbHNlIGlmIChtZXNzYWdlLnRleHQpIHtcbiAgICAgICAgZWwudGV4dENvbnRlbnQgPSBtZXNzYWdlLnRleHRcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGVsXG4gIH1cbiAgc3RhdGljIGdldE11bHRpTGluZU1lc3NhZ2UobWVzc2FnZSkge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbnRlci1tdWx0aWxpbmUtbWVzc2FnZScpXG4gICAgZm9yIChsZXQgbGluZSBvZiBtZXNzYWdlLnNwbGl0KE5ld0xpbmUpKSB7XG4gICAgICBpZiAoIWxpbmUpIGNvbnRpbnVlXG4gICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbnRlci1tZXNzYWdlLWxpbmUnKVxuICAgICAgZWwudGV4dENvbnRlbnQgPSBsaW5lXG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZWwpXG4gICAgfVxuICAgIHJldHVybiBjb250YWluZXJcbiAgfVxuICBzdGF0aWMgZ2V0UmliYm9uKG1lc3NhZ2UpIHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGVsLmNsYXNzTmFtZSA9IGBsaW50ZXItbWVzc2FnZS1pdGVtIGJhZGdlIGJhZGdlLWZsZXhpYmxlIGxpbnRlci1oaWdobGlnaHQgJHttZXNzYWdlLmNsYXNzfWBcbiAgICBlbC50ZXh0Q29udGVudCA9IG1lc3NhZ2UudHlwZVxuICAgIHJldHVybiBlbFxuICB9XG4gIHN0YXRpYyBmcm9tTWVzc2FnZShtZXNzYWdlKSB7XG4gICAgcmV0dXJuIG5ldyBNZXNzYWdlRWxlbWVudCgpLmluaXRpYWxpemUobWVzc2FnZSlcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgTWVzc2FnZUVsZW1lbnQgPSBkb2N1bWVudC5yZWdpc3RlckVsZW1lbnQoJ2xpbnRlci1tZXNzYWdlJywge1xuICBwcm90b3R5cGU6IE1lc3NhZ2UucHJvdG90eXBlXG59KVxuIl19
//# sourceURL=/Users/jchong/.atom/packages/linter/lib/ui/message-element.js
