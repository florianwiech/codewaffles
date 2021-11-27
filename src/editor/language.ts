import { Compartment } from "@codemirror/state";
import { languages as languageData } from "@codemirror/language-data";

export const languageConf = new Compartment();

export const initialLanguageSetup = languageConf.of([]);

export const languageExtensions = [
  {
    name: "Plain text",
    load() {
      return Promise.resolve([]);
    },
  },
  ...languageData,
];

export const supportedLanguages = [
  "C",
  "C#",
  "C++",
  "CMake",
  "CQL",
  "CSS",
  "Dart",
  "Dockerfile",
  "Gherkin",
  "Go",
  "Groovy",
  "HTML",
  "HTTP",
  "Haskell",
  "JSON",
  "JSON-LD",
  "JSX",
  "Java",
  "JavaScript",
  "Jinja2",
  "Julia",
  "Kotlin",
  "LESS",
  "LaTeX",
  "LiveScript",
  "Lua",
  "Markdown",
  "Mathematica",
  "MySQL",
  "Nginx",
  "Objective-C",
  "Objective-C++",
  "PGP",
  "Perl",
  "Plain text",
  "PowerShell",
  "Properties files",
  "ProtoBuf",
  "Puppet",
  "Python",
  "R",
  "Ruby",
  "Rust",
  "SCSS",
  "SQL",
  "SQLite",
  "Scala",
  "Shell",
  "Swift",
  "TOML",
  "TSX",
  "Tcl",
  "TypeScript",
  "Velocity",
  "WebAssembly",
  "XML",
  "YAML",
  "diff",
];
