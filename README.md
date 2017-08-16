# vscode-purescript-emmet

VSCode extension for [purescript-emmet](https://github.com/kRITZCREEK/purescript-emmet).

### Keybinding

Type the emmet abbreviation and then press `Alt+Shift+y` to execute the "Halogen to Emmet HTML" command. To customize see the
`extension.emmetHalogen` keybindings.

### Settings

| Setting | Value  |
| ------- | ------ |
| purescriptEmmet.path | null |
| purescriptEmmet.regexp | [a-zA-Z0-9_\\-.+*#>()]+ |

### Dependencies

You will need [purescript-emmet](https://github.com/kRITZCREEK/purescript-emmet) installed on your system and
available in your PATH.  Alternatively, you can set the absolute path to `purescript-emmet` using the `purescriptEmmet.path`
configuration variable.

### Abbreviation Matcher

This extension attempts to match the emmet-like abbreviation by moving backwards from the cursor position. To be more specific, it uses [TextDocument.getWordRangeAtPosition](https://code.visualstudio.com/docs/extensionAPI/vscode-api#_a-nametextdocumentaspan-classcodeitem-id38textdocumentspan) with a custom RegExp object. If purescript-emmet provides support for new operators, the RegExp object will need to be updated. If that happens feel free to open an issue or send a PR, otherwise you can define it with the `purescriptEmmet.regexp` configuration variable.

### Contributing

To make changes, checkout the repository and run `npm install` in project root. You can make changes to `src/extension.ts` and test them in VSCode by pressing F5 or by choosing `Start Debugging` from the Debug menu. To run the tests run `npm run test`.