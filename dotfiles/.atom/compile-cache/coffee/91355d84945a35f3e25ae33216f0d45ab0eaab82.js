(function() {
  var CompositeDisposable, Linter, LinterPuppet, linterPath,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  linterPath = atom.packages.getLoadedPackage("linter").path;

  Linter = require("" + linterPath + "/lib/linter");

  CompositeDisposable = require('atom').CompositeDisposable;

  LinterPuppet = (function(_super) {
    __extends(LinterPuppet, _super);

    LinterPuppet.syntax = ['source.puppet'];

    LinterPuppet.prototype.cmd = 'puppet parser validate';

    LinterPuppet.prototype.executablePath = null;

    LinterPuppet.prototype.linterName = 'puppet';

    LinterPuppet.prototype.errorStream = 'stderr';

    LinterPuppet.prototype.regex = '.*: (?<message>(Syntax|Unclosed|Could) (.|\\n)*) at (.|\\n)*:(?<line>\\d+)';

    function LinterPuppet(editor) {
      this.disposables = new CompositeDisposable;
      LinterPuppet.__super__.constructor.call(this, editor);
      this.disposables.add(atom.config.observe('linter-puppet.puppetExecutablePath', (function(_this) {
        return function() {
          return _this.executablePath = atom.config.get('linter-puppet.puppetExecutablePath');
        };
      })(this)));
    }

    LinterPuppet.prototype.destroy = function() {
      LinterPuppet.__super__.destroy.apply(this, arguments);
      return this.disposables.dispose();
    };

    LinterPuppet.prototype.createMessage = function(match) {
      var message;
      if (match && match.type === 'parse' && !match.message) {
        message = 'parse error';
      }
      return LinterPuppet.__super__.createMessage.call(this, match);
    };

    return LinterPuppet;

  })(Linter);

  module.exports = LinterPuppet;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2pjaG9uZy8uYXRvbS9wYWNrYWdlcy9saW50ZXItcHVwcGV0L2xpYi9saW50ZXItcHVwcGV0LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxxREFBQTtJQUFBO21TQUFBOztBQUFBLEVBQUEsVUFBQSxHQUFhLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWQsQ0FBK0IsUUFBL0IsQ0FBd0MsQ0FBQyxJQUF0RCxDQUFBOztBQUFBLEVBQ0EsTUFBQSxHQUFTLE9BQUEsQ0FBUSxFQUFBLEdBQUcsVUFBSCxHQUFjLGFBQXRCLENBRFQsQ0FBQTs7QUFBQSxFQUVDLHNCQUF1QixPQUFBLENBQVEsTUFBUixFQUF2QixtQkFGRCxDQUFBOztBQUFBLEVBSU07QUFHSixtQ0FBQSxDQUFBOztBQUFBLElBQUEsWUFBQyxDQUFBLE1BQUQsR0FBUyxDQUFDLGVBQUQsQ0FBVCxDQUFBOztBQUFBLDJCQUlBLEdBQUEsR0FBSyx3QkFKTCxDQUFBOztBQUFBLDJCQU1BLGNBQUEsR0FBZ0IsSUFOaEIsQ0FBQTs7QUFBQSwyQkFRQSxVQUFBLEdBQVksUUFSWixDQUFBOztBQUFBLDJCQVVBLFdBQUEsR0FBYSxRQVZiLENBQUE7O0FBQUEsMkJBY0EsS0FBQSxHQUFPLDRFQWRQLENBQUE7O0FBZ0JhLElBQUEsc0JBQUMsTUFBRCxHQUFBO0FBQ1gsTUFBQSxJQUFDLENBQUEsV0FBRCxHQUFlLEdBQUEsQ0FBQSxtQkFBZixDQUFBO0FBQUEsTUFDQSw4Q0FBTSxNQUFOLENBREEsQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFBLFdBQVcsQ0FBQyxHQUFiLENBQWlCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBWixDQUFvQixvQ0FBcEIsRUFBMEQsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDekUsS0FBQyxDQUFBLGNBQUQsR0FBa0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLG9DQUFoQixFQUR1RDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTFELENBQWpCLENBSEEsQ0FEVztJQUFBLENBaEJiOztBQUFBLDJCQXVCQSxPQUFBLEdBQVMsU0FBQSxHQUFBO0FBQ0wsTUFBQSwyQ0FBQSxTQUFBLENBQUEsQ0FBQTthQUNBLElBQUMsQ0FBQSxXQUFXLENBQUMsT0FBYixDQUFBLEVBRks7SUFBQSxDQXZCVCxDQUFBOztBQUFBLDJCQTJCQSxhQUFBLEdBQWUsU0FBQyxLQUFELEdBQUE7QUFFYixVQUFBLE9BQUE7QUFBQSxNQUFBLElBQUcsS0FBQSxJQUFVLEtBQUssQ0FBQyxJQUFOLEtBQWMsT0FBeEIsSUFBb0MsQ0FBQSxLQUFTLENBQUMsT0FBakQ7QUFDRSxRQUFBLE9BQUEsR0FBVSxhQUFWLENBREY7T0FBQTthQUVBLGdEQUFNLEtBQU4sRUFKYTtJQUFBLENBM0JmLENBQUE7O3dCQUFBOztLQUh5QixPQUozQixDQUFBOztBQUFBLEVBd0NBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFlBeENqQixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/jchong/.atom/packages/linter-puppet/lib/linter-puppet.coffee
