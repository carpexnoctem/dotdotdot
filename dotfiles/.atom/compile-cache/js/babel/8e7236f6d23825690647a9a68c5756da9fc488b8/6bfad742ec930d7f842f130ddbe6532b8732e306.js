"use babel";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = {
  config: {
    // It should be noted that I, Kepler, hate these Config names. However these
    //  are the names in use by many people. Changing them for the sake of clean
    //  of clean code would cause a mess for our users. Because of this we
    //  override the titles the editor gives them in the settings pane.
    execPath: {
      type: "string",
      "default": "/usr/bin/g++"
    },
    gccIncludePaths: {
      type: "string",
      "default": " "
    },
    gccSuppressWarnings: {
      type: "boolean",
      "default": false
    },
    gccDefaultCFlags: {
      type: "string",
      "default": "-Wall"
    },
    gccDefaultCppFlags: {
      type: "string",
      "default": "-Wall -std=c++11"
    },
    gccErrorLimit: {
      type: "integer",
      "default": 0
    }
  },

  activate: function activate() {
    // Because all four of the languages this linter supports have grammmars
    //  have grammmars built into the editor we do not need to throw errors when
    //  one any one of the lanugages isn't installed. If a user has the grammar
    //  disabled that is a choice they have made.

    // Show the user an error if they do not have an appropriate linter base
    //  package installed from Atom Package Manager. This will not be an issues
    //  after a base linter package is integrated into Atom, in the comming
    //  months.
    // TODO: Remove when Linter Base is integrated into Atom.

    atom.project.onDidChangePaths(require("./config").settings);
    fileConfig = require("./config");
    fileConfig.settings();
    if (!atom.packages.getLoadedPackages("linter")) {
      atom.notifications.addError("Linter package not found.", {
        detail: "Please install the `linter` package in your Settings view."
      });
    }
  },

  provideLinter: function provideLinter() {
    var helpers = require("atom-linter");
    var regex = "(?<file>.+):(?<line>\\d+):(?<col>\\d+): (?<type>[\\w \\-]{5,9}):[ -]+(?<message>.*)";

    // Read configuration data from JSON file .gcc-config.json
    // in project root
    return {
      grammarScopes: ["source.c", "source.cpp"],
      scope: "file",
      lintOnFly: false,
      lint: function lint(activeEditor) {
        fileConfig = require("./config");
        var path = require('path');
        fileConfig.settings();
        var file = activeEditor.getPath();
        var cwd = atom.project.getPaths()[0];
        if (!cwd) {
          editor = atom.workspace.getActivePaneItem();
          if (editor) {
            file = editor.buffer.file;
            if (file) {
              cwd = file.getParent().getPath();
            }
          }
        }
        command = atom.config.get("linter-gcc.execPath");

        // Expand path if necessary
        if (command.substring(0, 1) == ".") {
          command = path.join(cwd, command);
        }

        args = [];
        // const args = ["-fsyntax-only",
        //   "-fno-caret-diagnostics",
        //   "-fno-diagnostics-fixit-info",
        //   "-fdiagnostics-print-source-range-info",
        //   "-fexceptions"];
        //
        if (activeEditor.getGrammar().name === "C++") {
          //const language = "c++";
          s = atom.config.get("linter-gcc.gccDefaultCppFlags");
          tempargs = s.split(" ");
          args = args.concat(tempargs);
        }
        // if(activeEditor.getGrammar().name === "Objective-C++") {
        //   //const language = "objective-c++";
        //   args.push("-xobjective-c++");
        //   args.push(atom.config.get("linter-gcc.gccDefaultObjCppFlags"));
        // }
        if (activeEditor.getGrammar().name === "C") {
          //const language = "c";
          s = atom.config.get("linter-gcc.gccDefaultCFlags");
          tempargs = s.split(" ");
          args = args.concat(tempargs);
        }
        // if(activeEditor.getGrammar().name === "Objective-C") {
        //   //const language = "objective-c";
        //   args.push("-xobjective-c");
        //   args.push(atom.config.get("linter-gcc.gccDefaultObjCFlags"));
        // }
        //
        args.push("-fmax-errors=" + atom.config.get("linter-gcc.gccErrorLimit"));
        if (atom.config.get("linter-gcc.gccSuppressWarnings")) {
          args.push("-w");
        }
        // if(atom.config.get("linter-gcc.verboseDebug")) {
        //   args.push("--verbose");
        // }
        //
        var s = atom.config.get("linter-gcc.gccIncludePaths");
        s = s.trim();
        if (s.length != 0) {
          tempargs = s.split(",");
          tempargs.forEach(function (entry) {
            entry = entry.trim();
            if (entry.length != 0) {
              if (entry.substring(0, 1) == ".") {
                entry = path.join(cwd, entry);
              }
              item = "-I" + entry;
              args.push(item);
            }
          });
        }
        //
        // New set of arguments
        args.push(file);
        console.log(command);
        console.log(args);

        return helpers.exec(command, args, { stream: "stderr" }).then(function (output) {
          return helpers.parse(output, regex);
        });
      }
    };
  }
};
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qY2hvbmcvLmF0b20vcGFja2FnZXMvbGludGVyLWdjYy9saWIvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxXQUFXLENBQUM7Ozs7O3FCQUVHO0FBQ2IsUUFBTSxFQUFFOzs7OztBQUtOLFlBQVEsRUFBRTtBQUNSLFVBQUksRUFBRSxRQUFRO0FBQ2QsaUJBQVMsY0FBYztLQUN4QjtBQUNELG1CQUFlLEVBQUU7QUFDZixVQUFJLEVBQUUsUUFBUTtBQUNkLGlCQUFTLEdBQUc7S0FDYjtBQUNELHVCQUFtQixFQUFFO0FBQ25CLFVBQUksRUFBRSxTQUFTO0FBQ2YsaUJBQVMsS0FBSztLQUNmO0FBQ0Qsb0JBQWdCLEVBQUU7QUFDaEIsVUFBSSxFQUFFLFFBQVE7QUFDZCxpQkFBUyxPQUFPO0tBQ2pCO0FBQ0Qsc0JBQWtCLEVBQUU7QUFDbEIsVUFBSSxFQUFFLFFBQVE7QUFDZCxpQkFBUyxrQkFBa0I7S0FDNUI7QUFDRCxpQkFBYSxFQUFFO0FBQ2IsVUFBSSxFQUFFLFNBQVM7QUFDZixpQkFBUyxDQUFDO0tBQ1g7R0FDRjs7QUFFRCxVQUFRLEVBQUUsb0JBQU07Ozs7Ozs7Ozs7OztBQVlkLFFBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBRSxDQUFDO0FBQzdELGNBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDakMsY0FBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ3RCLFFBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQzdDLFVBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUN6QiwyQkFBMkIsRUFDM0I7QUFDRSxjQUFNLEVBQUUsNERBQTREO09BQ3JFLENBQ0YsQ0FBQztLQUNIO0dBQ0Y7O0FBRUQsZUFBYSxFQUFFLHlCQUFNO0FBQ25CLFFBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxh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Q0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNyQixnQkFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtBQUNuQixrQkFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUU7QUFDN0IscUJBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztlQUNqQztBQUNELGtCQUFJLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQztBQUNwQixrQkFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNuQjtXQUNKLENBQUMsQ0FBQztTQUNOOzs7QUFHRCxZQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2hCLGVBQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDckIsZUFBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFbEIsZUFBTyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO2lCQUNoRSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7U0FBQSxDQUM3QixDQUFDO09BQ0g7S0FDRixDQUFDO0dBQ0g7Q0FDRiIsImZpbGUiOiIvVXNlcnMvamNob25nLy5hdG9tL3BhY2thZ2VzL2xpbnRlci1nY2MvbGliL21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBiYWJlbFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIC8vIEl0IHNob3VsZCBiZSBub3RlZCB0aGF0IEksIEtlcGxlciwgaGF0ZSB0aGVzZSBDb25maWcgbmFtZXMuIEhvd2V2ZXIgdGhlc2VcbiAgICAvLyAgYXJlIHRoZSBuYW1lcyBpbiB1c2UgYnkgbWFueSBwZW9wbGUuIENoYW5naW5nIHRoZW0gZm9yIHRoZSBzYWtlIG9mIGNsZWFuXG4gICAgLy8gIG9mIGNsZWFuIGNvZGUgd291bGQgY2F1c2UgYSBtZXNzIGZvciBvdXIgdXNlcnMuIEJlY2F1c2Ugb2YgdGhpcyB3ZVxuICAgIC8vICBvdmVycmlkZSB0aGUgdGl0bGVzIHRoZSBlZGl0b3IgZ2l2ZXMgdGhlbSBpbiB0aGUgc2V0dGluZ3MgcGFuZS5cbiAgICBleGVjUGF0aDoge1xuICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgIGRlZmF1bHQ6IFwiL3Vzci9iaW4vZysrXCJcbiAgICB9LFxuICAgIGdjY0luY2x1ZGVQYXRoczoge1xuICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgIGRlZmF1bHQ6IFwiIFwiXG4gICAgfSxcbiAgICBnY2NTdXBwcmVzc1dhcm5pbmdzOiB7XG4gICAgICB0eXBlOiBcImJvb2xlYW5cIixcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBnY2NEZWZhdWx0Q0ZsYWdzOiB7XG4gICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgZGVmYXVsdDogXCItV2FsbFwiXG4gICAgfSxcbiAgICBnY2NEZWZhdWx0Q3BwRmxhZ3M6IHtcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBkZWZhdWx0OiBcIi1XYWxsIC1zdGQ9YysrMTFcIlxuICAgIH0sXG4gICAgZ2NjRXJyb3JMaW1pdDoge1xuICAgICAgdHlwZTogXCJpbnRlZ2VyXCIsXG4gICAgICBkZWZhdWx0OiAwXG4gICAgfVxuICB9LFxuXG4gIGFjdGl2YXRlOiAoKSA9PiB7XG4gICAgLy8gQmVjYXVzZSBhbGwgZm91ciBvZiB0aGUgbGFuZ3VhZ2VzIHRoaXMgbGludGVyIHN1cHBvcnRzIGhhdmUgZ3JhbW1tYXJzXG4gICAgLy8gIGhhdmUgZ3JhbW1tYXJzIGJ1aWx0IGludG8gdGhlIGVkaXRvciB3ZSBkbyBub3QgbmVlZCB0byB0aHJvdyBlcnJvcnMgd2hlblxuICAgIC8vICBvbmUgYW55IG9uZSBvZiB0aGUgbGFudWdhZ2VzIGlzbid0IGluc3RhbGxlZC4gSWYgYSB1c2VyIGhhcyB0aGUgZ3JhbW1hclxuICAgIC8vICBkaXNhYmxlZCB0aGF0IGlzIGEgY2hvaWNlIHRoZXkgaGF2ZSBtYWRlLlxuXG4gICAgLy8gU2hvdyB0aGUgdXNlciBhbiBlcnJvciBpZiB0aGV5IGRvIG5vdCBoYXZlIGFuIGFwcHJvcHJpYXRlIGxpbnRlciBiYXNlXG4gICAgLy8gIHBhY2thZ2UgaW5zdGFsbGVkIGZyb20gQXRvbSBQYWNrYWdlIE1hbmFnZXIuIFRoaXMgd2lsbCBub3QgYmUgYW4gaXNzdWVzXG4gICAgLy8gIGFmdGVyIGEgYmFzZSBsaW50ZXIgcGFja2FnZSBpcyBpbnRlZ3JhdGVkIGludG8gQXRvbSwgaW4gdGhlIGNvbW1pbmdcbiAgICAvLyAgbW9udGhzLlxuICAgIC8vIFRPRE86IFJlbW92ZSB3aGVuIExpbnRlciBCYXNlIGlzIGludGVncmF0ZWQgaW50byBBdG9tLlxuXG4gICAgYXRvbS5wcm9qZWN0Lm9uRGlkQ2hhbmdlUGF0aHMocmVxdWlyZShcIi4vY29uZmlnXCIpLnNldHRpbmdzICk7XG4gICAgZmlsZUNvbmZpZyA9IHJlcXVpcmUoXCIuL2NvbmZpZ1wiKTtcbiAgICBmaWxlQ29uZmlnLnNldHRpbmdzKCk7XG4gICAgaWYoIWF0b20ucGFja2FnZXMuZ2V0TG9hZGVkUGFja2FnZXMoXCJsaW50ZXJcIikpIHtcbiAgICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRFcnJvcihcbiAgICAgICAgXCJMaW50ZXIgcGFja2FnZSBub3QgZm91bmQuXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBkZXRhaWw6IFwiUGxlYXNlIGluc3RhbGwgdGhlIGBsaW50ZXJgIHBhY2thZ2UgaW4geW91ciBTZXR0aW5ncyB2aWV3LlwiXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuICB9LFxuXG4gIHByb3ZpZGVMaW50ZXI6ICgpID0+IHtcbiAgICBjb25zdCBoZWxwZXJzID0gcmVxdWlyZShcImF0b20tbGludGVyXCIpO1xuICAgIGNvbnN0IHJlZ2V4ID0gXCIoPzxmaWxlPi4rKTooPzxsaW5lPlxcXFxkKyk6KD88Y29sPlxcXFxkKyk6ICg/PHR5cGU+W1xcXFx3IFxcXFwtXXs1LDl9KTpbIC1dKyg/PG1lc3NhZ2U+LiopXCI7XG5cbiAgICAvLyBSZWFkIGNvbmZpZ3VyYXRpb24gZGF0YSBmcm9tIEpTT04gZmlsZSAuZ2NjLWNvbmZpZy5qc29uXG4gICAgLy8gaW4gcHJvamVjdCByb290XG4gICAgcmV0dXJuIHtcbiAgICAgIGdyYW1tYXJTY29wZXM6IFtcInNvdXJjZS5jXCIsIFwic291cmNlLmNwcFwiXSxcbiAgICAgIHNjb3BlOiBcImZpbGVcIixcbiAgICAgIGxpbnRPbkZseTogZmFsc2UsXG4gICAgICBsaW50OiAoYWN0aXZlRWRpdG9yKSA9PiB7XG4gICAgICAgIGZpbGVDb25maWcgPSByZXF1aXJlKFwiLi9jb25maWdcIik7XG4gICAgICAgIHZhciBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuICAgICAgICBmaWxlQ29uZmlnLnNldHRpbmdzKCk7XG4gICAgICAgIHZhciBmaWxlID0gYWN0aXZlRWRpdG9yLmdldFBhdGgoKTtcbiAgICAgICAgdmFyIGN3ZCA9IGF0b20ucHJvamVjdC5nZXRQYXRocygpWzBdXG4gICAgICAgIGlmICghY3dkKSB7XG4gICAgICAgICAgICBlZGl0b3IgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVQYW5lSXRlbSgpO1xuICAgICAgICAgICAgaWYgKGVkaXRvcikge1xuICAgICAgICAgICAgICAgIGZpbGUgPSBlZGl0b3IuYnVmZmVyLmZpbGU7XG4gICAgICAgICAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY3dkID0gZmlsZS5nZXRQYXJlbnQoKS5nZXRQYXRoKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbW1hbmQgPSBhdG9tLmNvbmZpZy5nZXQoXCJsaW50ZXItZ2NjLmV4ZWNQYXRoXCIpO1xuXG4gICAgICAgIC8vIEV4cGFuZCBwYXRoIGlmIG5lY2Vzc2FyeVxuICAgICAgICBpZiAoY29tbWFuZC5zdWJzdHJpbmcoMCwxKSA9PSBcIi5cIikge1xuICAgICAgICAgICAgY29tbWFuZCA9IHBhdGguam9pbihjd2QsIGNvbW1hbmQpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXJncyA9IFtdO1xuICAgICAgICAvLyBjb25zdCBhcmdzID0gW1wiLWZzeW50YXgtb25seVwiLFxuICAgICAgICAvLyAgIFwiLWZuby1jYXJldC1kaWFnbm9zdGljc1wiLFxuICAgICAgICAvLyAgIFwiLWZuby1kaWFnbm9zdGljcy1maXhpdC1pbmZvXCIsXG4gICAgICAgIC8vICAgXCItZmRpYWdub3N0aWNzLXByaW50LXNvdXJjZS1yYW5nZS1pbmZvXCIsXG4gICAgICAgIC8vICAgXCItZmV4Y2VwdGlvbnNcIl07XG4gICAgICAgIC8vXG4gICAgICAgIGlmKGFjdGl2ZUVkaXRvci5nZXRHcmFtbWFyKCkubmFtZSA9PT0gXCJDKytcIikge1xuICAgICAgICAgIC8vY29uc3QgbGFuZ3VhZ2UgPSBcImMrK1wiO1xuICAgICAgICAgIHMgPSBhdG9tLmNvbmZpZy5nZXQoXCJsaW50ZXItZ2NjLmdjY0RlZmF1bHRDcHBGbGFnc1wiKTtcbiAgICAgICAgICB0ZW1wYXJncyA9IHMuc3BsaXQoXCIgXCIpO1xuICAgICAgICAgIGFyZ3MgPSBhcmdzLmNvbmNhdCh0ZW1wYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYoYWN0aXZlRWRpdG9yLmdldEdyYW1tYXIoKS5uYW1lID09PSBcIk9iamVjdGl2ZS1DKytcIikge1xuICAgICAgICAvLyAgIC8vY29uc3QgbGFuZ3VhZ2UgPSBcIm9iamVjdGl2ZS1jKytcIjtcbiAgICAgICAgLy8gICBhcmdzLnB1c2goXCIteG9iamVjdGl2ZS1jKytcIik7XG4gICAgICAgIC8vICAgYXJncy5wdXNoKGF0b20uY29uZmlnLmdldChcImxpbnRlci1nY2MuZ2NjRGVmYXVsdE9iakNwcEZsYWdzXCIpKTtcbiAgICAgICAgLy8gfVxuICAgICAgICBpZihhY3RpdmVFZGl0b3IuZ2V0R3JhbW1hcigpLm5hbWUgPT09IFwiQ1wiKSB7XG4gICAgICAgICAgLy9jb25zdCBsYW5ndWFnZSA9IFwiY1wiO1xuICAgICAgICAgIHMgPSBhdG9tLmNvbmZpZy5nZXQoXCJsaW50ZXItZ2NjLmdjY0RlZmF1bHRDRmxhZ3NcIik7XG4gICAgICAgICAgdGVtcGFyZ3MgPSBzLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgICBhcmdzID0gYXJncy5jb25jYXQodGVtcGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGlmKGFjdGl2ZUVkaXRvci5nZXRHcmFtbWFyKCkubmFtZSA9PT0gXCJPYmplY3RpdmUtQ1wiKSB7XG4gICAgICAgIC8vICAgLy9jb25zdCBsYW5ndWFnZSA9IFwib2JqZWN0aXZlLWNcIjtcbiAgICAgICAgLy8gICBhcmdzLnB1c2goXCIteG9iamVjdGl2ZS1jXCIpO1xuICAgICAgICAvLyAgIGFyZ3MucHVzaChhdG9tLmNvbmZpZy5nZXQoXCJsaW50ZXItZ2NjLmdjY0RlZmF1bHRPYmpDRmxhZ3NcIikpO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIGFyZ3MucHVzaChgLWZtYXgtZXJyb3JzPSR7YXRvbS5jb25maWcuZ2V0KFwibGludGVyLWdjYy5nY2NFcnJvckxpbWl0XCIpfWApO1xuICAgICAgICBpZihhdG9tLmNvbmZpZy5nZXQoXCJsaW50ZXItZ2NjLmdjY1N1cHByZXNzV2FybmluZ3NcIikpIHtcbiAgICAgICAgICBhcmdzLnB1c2goXCItd1wiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBpZihhdG9tLmNvbmZpZy5nZXQoXCJsaW50ZXItZ2NjLnZlcmJvc2VEZWJ1Z1wiKSkge1xuICAgICAgICAvLyAgIGFyZ3MucHVzaChcIi0tdmVyYm9zZVwiKTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvL1xuICAgICAgICB2YXIgcyA9IGF0b20uY29uZmlnLmdldChcImxpbnRlci1nY2MuZ2NjSW5jbHVkZVBhdGhzXCIpO1xuICAgICAgICBzID0gcy50cmltKCk7XG4gICAgICAgIGlmIChzLmxlbmd0aCAhPSAgMCkge1xuICAgICAgICAgICAgdGVtcGFyZ3MgPSBzLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICAgIHRlbXBhcmdzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgICAgICAgICBlbnRyeSA9IGVudHJ5LnRyaW0oKTtcbiAgICAgICAgICAgICAgICBpZiAoZW50cnkubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudHJ5LnN1YnN0cmluZygwLDEpID09IFwiLlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRyeSA9IHBhdGguam9pbihjd2QsIGVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gXCItSVwiICsgZW50cnk7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvL1xuICAgICAgICAvLyBOZXcgc2V0IG9mIGFyZ3VtZW50c1xuICAgICAgICBhcmdzLnB1c2goZmlsZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGNvbW1hbmQpO1xuICAgICAgICBjb25zb2xlLmxvZyhhcmdzKTtcblxuICAgICAgICByZXR1cm4gaGVscGVycy5leGVjKGNvbW1hbmQsIGFyZ3MsIHtzdHJlYW06IFwic3RkZXJyXCJ9KS50aGVuKG91dHB1dCA9PlxuICAgICAgICAgIGhlbHBlcnMucGFyc2Uob3V0cHV0LCByZWdleClcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59O1xuIl19
//# sourceURL=/Users/jchong/.atom/packages/linter-gcc/lib/main.js
