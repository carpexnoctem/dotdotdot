(function() {
  var BottomContainer, BottomStatus, BottomTab, CompositeDisposable, Emitter, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), CompositeDisposable = _ref.CompositeDisposable, Emitter = _ref.Emitter;

  BottomTab = require('./bottom-tab');

  BottomStatus = require('./bottom-status');

  BottomContainer = (function(_super) {
    __extends(BottomContainer, _super);

    function BottomContainer() {
      return BottomContainer.__super__.constructor.apply(this, arguments);
    }

    BottomContainer.prototype.prepare = function(state) {
      this.state = state;
      return this;
    };

    BottomContainer.prototype.createdCallback = function() {
      var Me, emitter, name, tab, _ref1;
      this.subscriptions = new CompositeDisposable;
      this.emitter = emitter = new Emitter;
      this.tabs = {
        Line: new BottomTab().prepare('Line'),
        File: new BottomTab().prepare('File'),
        Project: new BottomTab().prepare('Project')
      };
      this.status = new BottomStatus();
      Me = this;
      this.subscriptions.add(atom.config.observe('linter.statusIconScope', (function(_this) {
        return function(statusIconScope) {
          _this.statusIconScope = statusIconScope;
          return _this.status.count = _this.tabs[_this.statusIconScope].count;
        };
      })(this)));
      _ref1 = this.tabs;
      for (name in _ref1) {
        tab = _ref1[name];
        this.subscriptions.add(atom.config.onDidChange("linter.showErrorTab" + name, (function(_this) {
          return function() {
            return _this.updateTabs();
          };
        })(this)));
        tab.addEventListener('click', function() {
          if (Me.state.scope === this.name) {
            return emitter.emit('should-toggle-panel');
          } else {
            return emitter.emit('did-change-tab', this.name);
          }
        });
      }
      return this.onDidChangeTab((function(_this) {
        return function(activeName) {
          var _ref2, _results;
          _this.state.scope = activeName;
          _ref2 = _this.tabs;
          _results = [];
          for (name in _ref2) {
            tab = _ref2[name];
            _results.push(tab.active = name === activeName);
          }
          return _results;
        };
      })(this));
    };

    BottomContainer.prototype.attachedCallback = function() {
      return this.updateTabs();
    };

    BottomContainer.prototype.detachedCallback = function() {
      this.subscriptions.dispose();
      return this.emitter.dispose();
    };

    BottomContainer.prototype.setVisibility = function(value) {
      if (value) {
        return this.removeAttribute('hidden');
      } else {
        return this.setAttribute('hidden', true);
      }
    };

    BottomContainer.prototype.getVisibility = function() {
      return !this.hasAttribute('hidden');
    };

    BottomContainer.prototype.getTab = function(name) {
      return this.tabs[name];
    };

    BottomContainer.prototype.onDidChangeTab = function(callback) {
      return this.emitter.on('did-change-tab', callback);
    };

    BottomContainer.prototype.onShouldTogglePanel = function(callback) {
      return this.emitter.on('should-toggle-panel', callback);
    };

    BottomContainer.prototype.setCount = function(_arg) {
      var File, Line, Project;
      Project = _arg.Project, File = _arg.File, Line = _arg.Line;
      this.tabs.File.count = File;
      this.tabs.Project.count = Project;
      this.tabs.Line.count = Line;
      return this.status.count = this.tabs[this.statusIconScope].count;
    };

    BottomContainer.prototype.updateTabs = function() {
      var active, name, tab, _ref1;
      active = this.state.scope;
      _ref1 = this.tabs;
      for (name in _ref1) {
        tab = _ref1[name];
        if (tab.attached) {
          this.removeChild(tab);
        }
        tab.active = false;
        if (!atom.config.get("linter.showErrorTab" + name)) {
          continue;
        }
        this.appendChild(tab);
        if (active !== name) {
          continue;
        }
        tab.active = true;
        active = null;
      }
      this.appendChild(this.status);
      if (active === this.state.scope && this.firstChild && this.firstChild.name) {
        this.firstChild.active = true;
        return this.state.scope = this.firstChild.name;
      }
    };

    return BottomContainer;

  })(HTMLElement);

  module.exports = document.registerElement('linter-bottom-container', {
    prototype: BottomContainer.prototype
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2pjaG9uZy8uYXRvbS9wYWNrYWdlcy9saW50ZXIvbGliL3VpL2JvdHRvbS1jb250YWluZXIuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQ0E7QUFBQSxNQUFBLDRFQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxPQUFpQyxPQUFBLENBQVEsTUFBUixDQUFqQyxFQUFDLDJCQUFBLG1CQUFELEVBQXNCLGVBQUEsT0FBdEIsQ0FBQTs7QUFBQSxFQUVBLFNBQUEsR0FBWSxPQUFBLENBQVEsY0FBUixDQUZaLENBQUE7O0FBQUEsRUFHQSxZQUFBLEdBQWUsT0FBQSxDQUFRLGlCQUFSLENBSGYsQ0FBQTs7QUFBQSxFQUtNO0FBQ0osc0NBQUEsQ0FBQTs7OztLQUFBOztBQUFBLDhCQUFBLE9BQUEsR0FBUyxTQUFFLEtBQUYsR0FBQTtBQUNQLE1BRFEsSUFBQyxDQUFBLFFBQUEsS0FDVCxDQUFBO0FBQUEsYUFBTyxJQUFQLENBRE87SUFBQSxDQUFULENBQUE7O0FBQUEsOEJBR0EsZUFBQSxHQUFpQixTQUFBLEdBQUE7QUFDZixVQUFBLDZCQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsYUFBRCxHQUFpQixHQUFBLENBQUEsbUJBQWpCLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxPQUFELEdBQVcsT0FBQSxHQUFVLEdBQUEsQ0FBQSxPQURyQixDQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEsSUFBRCxHQUNFO0FBQUEsUUFBQSxJQUFBLEVBQVUsSUFBQSxTQUFBLENBQUEsQ0FBVyxDQUFDLE9BQVosQ0FBb0IsTUFBcEIsQ0FBVjtBQUFBLFFBQ0EsSUFBQSxFQUFVLElBQUEsU0FBQSxDQUFBLENBQVcsQ0FBQyxPQUFaLENBQW9CLE1BQXBCLENBRFY7QUFBQSxRQUVBLE9BQUEsRUFBYSxJQUFBLFNBQUEsQ0FBQSxDQUFXLENBQUMsT0FBWixDQUFv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

//# sourceURL=/Users/jchong/.atom/packages/linter/lib/ui/bottom-container.coffee
