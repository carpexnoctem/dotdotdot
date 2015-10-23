"use babel";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = {
  config: {
    rubyExecutablePath: {
      type: "string",
      "default": "ruby"
    },
    ignoredExtensions: {
      type: 'array',
      "default": ['erb', 'md'],
      items: {
        type: 'string'
      }
    }
  },

  activate: function activate() {
    // We are now using steelbrain's package dependency package to install our
    //  dependencies.
    require("atom-package-deps").install("linter-ruby");
  },

  provideLinter: function provideLinter() {
    var helpers = require("atom-linter");
    var Path = require("path");
    var regex = /.+:(\d+):\s*(.+?):\s(.+)/;
    return {
      grammarScopes: ["source.ruby", "source.ruby.rails", "source.ruby.rspec"],
      scope: "file",
      lintOnFly: true,
      lint: function lint(activeEditor) {
        var command = atom.config.get("linter-ruby.rubyExecutablePath");
        var ignored = atom.config.get("linter-ruby.ignoredExtensions");
        var filePath = activeEditor.getPath();
        var fileExtension = Path.extname(filePath).substr(1);

        for (var extension of ignored) {
          if (fileExtension === extension) return [];
        }

        return helpers.exec(command, ['-wc'], { stdin: activeEditor.getText(), stream: 'stderr' }).then(function (output) {
          var toReturn = [];
          output.split(/\r?\n/).forEach(function (line) {
            var matches = regex.exec(line);
            if (matches === null) {
              return;
            }
            toReturn.push({
              range: helpers.rangeFromLineNumber(activeEditor, Number.parseInt(matches[1] - 1)),
              type: matches[2],
              text: matches[3],
              filePath: filePath
            });
          });
          return toReturn;
        });
      }
    };
  }
};
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qY2hvbmcvLmF0b20vcGFja2FnZXMvbGludGVyLXJ1YnkvbGliL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsV0FBVyxDQUFDOzs7OztxQkFFRztBQUNiLFFBQU0sRUFBRTtBQUNOLHNCQUFrQixFQUFFO0FBQ2xCLFVBQUksRUFBRSxRQUFRO0FBQ2QsaUJBQVMsTUFBTTtLQUNoQjtBQUNELHFCQUFpQixFQUFFO0FBQ2pCLFVBQUksRUFBRSxPQUFPO0FBQ2IsaUJBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDO0FBQ3RCLFdBQUssRUFBRTtBQUNMLFlBQUksRUFBRSxRQUFRO09BQ2Y7S0FDRjtHQUNGOztBQUVELFVBQVEsRUFBRSxvQkFBTTs7O0FBR2QsV0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0dBQ3JEOztBQUVELGVBQWEsRUFBRSx5QkFBTTtBQUNuQixRQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDdkMsUUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLFFBQU0sS0FBSyxHQUFHLDBCQUEwQixDQUFDO0FBQ3pDLFdBQU87QUFDTCxtQkFBYSxFQUFFLENBQUMsYUFBYSxFQUFFLG1CQUFtQixFQUFFLG1CQUFtQixDQUFDO0FBQ3hFLFdBQUssRUFBRSxNQUFNO0FBQ2IsZUFBUyxFQUFFLElBQUk7QUFDZixVQUFJLEVBQUUsY0FBQyxZQUFZLEVBQUs7QUFDdEIsWUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztBQUNsRSxZQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0FBQ2pFLFlBQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUN4QyxZQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFdkQsYUFBSyxJQUFJLFNBQVMsSUFBSSxPQUFPLEVBQUU7QUFDN0IsY0FBSSxhQUFhLEtBQUssU0FBUyxFQUFFLE9BQU8sRUFBRSxDQUFDO1NBQzVDOztBQUVELGVBQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTSxFQUFJO0FBQ3RHLGNBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNsQixnQkFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJLEVBQUU7QUFDNUMsZ0JBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakMsZ0JBQUksT0FBTyxLQUFLLElBQUksRUFBRTtBQUNwQixxQkFBTzthQUNSO0FBQ0Qsb0JBQVEsQ0FBQyxJQUFJLENBQUM7QUFDWixtQkFBSyxFQUFFLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFFLENBQUM7QUFDbkYsa0JBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ2hCLGtCQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUNoQixzQkFBUSxFQUFFLFFBQVE7YUFDbkIsQ0FBQyxDQUFDO1dBQ0osQ0FBQyxDQUFDO0FBQ0gsaUJBQU8sUUFBUSxDQUFDO1NBQ2pCLENBQUMsQ0FBQztPQUNKO0tBQ0YsQ0FBQztHQUNIO0NBQ0YiLCJmaWxlIjoiL1VzZXJzL2pjaG9uZy8uYXRvbS9wYWNrYWdlcy9saW50ZXItcnVieS9saWIvbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGJhYmVsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29uZmlnOiB7XG4gICAgcnVieUV4ZWN1dGFibGVQYXRoOiB7XG4gICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgZGVmYXVsdDogXCJydWJ5XCJcbiAgICB9LFxuICAgIGlnbm9yZWRFeHRlbnNpb25zOiB7XG4gICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgZGVmYXVsdDogWydlcmInLCAnbWQnXSxcbiAgICAgIGl0ZW1zOiB7XG4gICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIGFjdGl2YXRlOiAoKSA9PiB7XG4gICAgLy8gV2UgYXJlIG5vdyB1c2luZyBzdGVlbGJyYWluJ3MgcGFja2FnZSBkZXBlbmRlbmN5IHBhY2thZ2UgdG8gaW5zdGFsbCBvdXJcbiAgICAvLyAgZGVwZW5kZW5jaWVzLlxuICAgIHJlcXVpcmUoXCJhdG9tLXBhY2thZ2UtZGVwc1wiKS5pbnN0YWxsKFwibGludGVyLXJ1YnlcIik7XG4gIH0sXG5cbiAgcHJvdmlkZUxpbnRlcjogKCkgPT4ge1xuICAgIGNvbnN0IGhlbHBlcnMgPSByZXF1aXJlKFwiYXRvbS1saW50ZXJcIik7XG4gICAgY29uc3QgUGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuICAgIGNvbnN0IHJlZ2V4ID0gLy4rOihcXGQrKTpcXHMqKC4rPyk6XFxzKC4rKS87XG4gICAgcmV0dXJuIHtcbiAgICAgIGdyYW1tYXJTY29wZXM6IFtcInNvdXJjZS5ydWJ5XCIsIFwic291cmNlLnJ1YnkucmFpbHNcIiwgXCJzb3VyY2UucnVieS5yc3BlY1wiXSxcbiAgICAgIHNjb3BlOiBcImZpbGVcIixcbiAgICAgIGxpbnRPbkZseTogdHJ1ZSxcbiAgICAgIGxpbnQ6IChhY3RpdmVFZGl0b3IpID0+IHtcbiAgICAgICAgY29uc3QgY29tbWFuZCA9IGF0b20uY29uZmlnLmdldChcImxpbnRlci1ydWJ5LnJ1YnlFeGVjdXRhYmxlUGF0aFwiKTtcbiAgICAgICAgY29uc3QgaWdub3JlZCA9IGF0b20uY29uZmlnLmdldChcImxpbnRlci1ydWJ5Lmlnbm9yZWRFeHRlbnNpb25zXCIpO1xuICAgICAgICBjb25zdCBmaWxlUGF0aCA9IGFjdGl2ZUVkaXRvci5nZXRQYXRoKCk7XG4gICAgICAgIGNvbnN0IGZpbGVFeHRlbnNpb24gPSBQYXRoLmV4dG5hbWUoZmlsZVBhdGgpLnN1YnN0cigxKTtcblxuICAgICAgICBmb3IgKGxldCBleHRlbnNpb24gb2YgaWdub3JlZCkge1xuICAgICAgICAgIGlmIChmaWxlRXh0ZW5zaW9uID09PSBleHRlbnNpb24pIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBoZWxwZXJzLmV4ZWMoY29tbWFuZCwgWyctd2MnXSwge3N0ZGluOiBhY3RpdmVFZGl0b3IuZ2V0VGV4dCgpLCBzdHJlYW06ICdzdGRlcnInfSkudGhlbihvdXRwdXQgPT4ge1xuICAgICAgICAgIHZhciB0b1JldHVybiA9IFtdO1xuICAgICAgICAgIG91dHB1dC5zcGxpdCgvXFxyP1xcbi8pLmZvckVhY2goZnVuY3Rpb24gKGxpbmUpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXMgPSByZWdleC5leGVjKGxpbmUpO1xuICAgICAgICAgICAgaWYgKG1hdGNoZXMgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG9SZXR1cm4ucHVzaCh7XG4gICAgICAgICAgICAgIHJhbmdlOiBoZWxwZXJzLnJhbmdlRnJvbUxpbmVOdW1iZXIoYWN0aXZlRWRpdG9yLCBOdW1iZXIucGFyc2VJbnQoKG1hdGNoZXNbMV0gLSAxKSkpLFxuICAgICAgICAgICAgICB0eXBlOiBtYXRjaGVzWzJdLFxuICAgICAgICAgICAgICB0ZXh0OiBtYXRjaGVzWzNdLFxuICAgICAgICAgICAgICBmaWxlUGF0aDogZmlsZVBhdGhcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiB0b1JldHVybjtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufTtcbiJdfQ==
//# sourceURL=/Users/jchong/.atom/packages/linter-ruby/lib/main.js
