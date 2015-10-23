(function() {
  var path, resolve, toInt;

  toInt = function(str) {
    return parseInt(str, 10);
  };

  resolve = require('resolve');

  path = require('path');

  module.exports = {
    scopes: ['source.coffee', 'source.litcoffee', 'source.coffee.jsx', 'source.coffee.angular'],
    _resolveCoffeeLint: function(filePath) {
      try {
        return path.dirname(resolve.sync('coffeelint/package.json', {
          basedir: path.dirname(filePath)
        }));
      } catch (_error) {}
      return 'coffeelint';
    },
    configImportsModules: function(config) {
      var rconfig, ruleName, _ref;
      for (ruleName in config) {
        rconfig = config[ruleName];
        if (rconfig.module != null) {
          return true;
        }
      }
      return (typeof userConfig !== "undefined" && userConfig !== null ? (_ref = userConfig.coffeelint) != null ? _ref.transforms : void 0 : void 0) != null;
    },
    canImportModules: function(coffeelint) {
      var major, minor, patch, _ref;
      _ref = coffeelint.VERSION.split('.').map(toInt), major = _ref[0], minor = _ref[1], patch = _ref[2];
      if (major > 1) {
        return true;
      }
      if (major === 1 && minor > 9) {
        return true;
      }
      if (major === 1 && minor === 9 && patch >= 5) {
        return true;
      }
      return false;
    },
    isCompatibleWithAtom: function(coffeelint) {
      var major, minor, patch, _ref;
      _ref = coffeelint.VERSION.split('.').map(toInt), major = _ref[0], minor = _ref[1], patch = _ref[2];
      if (major > 1) {
        return true;
      }
      if (major === 1 && minor > 9) {
        return true;
      }
      if (major === 1 && minor === 9 && patch >= 1) {
        return true;
      }
      return false;
    },
    lint: function(filePath, origPath, source, scopeName) {
      var coffeeLintPath, coffeelint, config, configFinder, e, isLiterate, major, minor, patch, result, showUpgradeError, _ref;
      isLiterate = scopeName === 'source.litcoffee';
      showUpgradeError = false;
      coffeeLintPath = this._resolveCoffeeLint(filePath);
      coffeelint = require(coffeeLintPath);
      _ref = coffeelint.VERSION.split('.').map(toInt), major = _ref[0], minor = _ref[1], patch = _ref[2];
      if (!this.isCompatibleWithAtom(coffeelint)) {
        coffeeLintPath = 'coffeelint';
        coffeelint = require(coffeeLintPath);
        showUpgradeError = true;
      }
      configFinder = require("" + coffeeLintPath + "/lib/configfinder");
      result = [];
      try {
        config = configFinder.getConfig(filePath);
        if (this.configImportsModules(config) && !this.canImportModules(coffeelint)) {
          showUpgradeError = true;
        } else {
          result = coffeelint.lint(source, config, isLiterate);
        }
      } catch (_error) {
        e = _error;
        console.log(e.message);
        console.log(e.stack);
        result.push({
          lineNumber: 1,
          level: 'error',
          message: "CoffeeLint crashed, see console for error details.",
          rule: 'none'
        });
      }
      if (showUpgradeError) {
        result = [
          {
            lineNumber: 1,
            level: 'error',
            message: "http://git.io/local_upgrade upgrade your project's CoffeeLint",
            rule: 'none'
          }
        ];
      }
      return result;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2pjaG9uZy8uYXRvbS9wYWNrYWdlcy9saW50ZXItY2xheS1jb2ZmZWVsaW50L2xpYi9jb3JlLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUVBO0FBQUEsTUFBQSxvQkFBQTs7QUFBQSxFQUFBLEtBQUEsR0FBUSxTQUFDLEdBQUQsR0FBQTtXQUFTLFFBQUEsQ0FBUyxHQUFULEVBQWMsRUFBZCxFQUFUO0VBQUEsQ0FBUixDQUFBOztBQUFBLEVBQ0EsT0FBQSxHQUFVLE9BQUEsQ0FBUSxTQUFSLENBRFYsQ0FBQTs7QUFBQSxFQUVBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQUZQLENBQUE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQU9FO0FBQUEsSUFBQSxNQUFBLEVBQVEsQ0FDTixlQURNLEVBRU4sa0JBRk0sRUFHTixtQkFITSxFQUlOLHVCQUpNLENBQVI7QUFBQSxJQU9BLGtCQUFBLEVBQW9CLFNBQUMsUUFBRCxHQUFBO0FBQ2xCO0FBQ0UsZUFBTyxJQUFJLENBQUMsT0FBTCxDQUFhLE9BQU8sQ0FBQyxJQUFSLENBQWEseUJBQWIsRUFBd0M7QUFBQSxVQUMxRCxPQUFBLEVBQVMsSUFBSSxDQUFDLE9BQUwsQ0FBYSxRQUFiLENBRGlEO1NBQXhDLENBQWIsQ0FBUCxDQURGO09BQUEsa0JBQUE7QUFJQSxhQUFPLFlBQVAsQ0FMa0I7SUFBQSxDQVBwQjtBQUFBLElBY0Esb0JBQUEsRUFBc0IsU0FBQyxNQUFELEdBQUE7QUFDcEIsVUFBQSx1QkFBQTtBQUFBLFdBQUEsa0JBQUE7bUNBQUE7WUFBaUQ7QUFBakQsaUJBQU8sSUFBUDtTQUFBO0FBQUEsT0FBQTtBQUNBLGFBQU8sK0lBQVAsQ0FGb0I7SUFBQSxDQWR0QjtBQUFBLElBa0JBLGdCQUFBLEVBQWtCLFNBQUMsVUFBRCxHQUFBO0FBQ2hCLFVBQUEseUJBQUE7QUFB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

//# sourceURL=/Users/jchong/.atom/packages/linter-clay-coffeelint/lib/core.coffee
