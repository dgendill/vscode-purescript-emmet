'use strict';

import * as vscode from 'vscode';
import * as child_process from 'child_process';
import { StringDecoder } from 'string_decoder';

export function activate(context: vscode.ExtensionContext) {

    console.log('Emmet Halogen Activated.');

    let disposable = vscode.commands.registerCommand('extension.emmetHalogen', () => {

        var editor = vscode.window.activeTextEditor
        var doc = editor.document

        if (editor.selection.isEmpty) {
            // the Position object gives you the line and character where the cursor is
            const position = editor.selection.active;

            var range = doc.getWordRangeAtPosition(position, /[a-zA-Z.^\-\[\]#]+/g);
            var text = doc.getText(range);
            // var line = doc.lineAt(position);
            // var lineStart = line.range.start;         
            // vscode.window.showInformationMessage(text);

            var process = child_process.spawn(
                "/home/dom/.nvm/versions/node/v7.7.4/bin/purescript-emmet"
            );

            var decoder = new StringDecoder('utf8');
            var result = "";

            process.stdout.on('data', function(chunk: Buffer) {
                // vscode.window.showInformationMessage(chunk.toString('utf8'));
                // vscode.window.showInformationMessage(`$chunk.length`);
                // vscode.window.showInformationMessage(result, { modal : true });
                result += decoder.write(chunk);
            });

            process.stdout.on('end', function() {
            
                var edit = new vscode.TextEdit(range, result)
                var wedit = new vscode.WorkspaceEdit()
                wedit.set(doc.uri, [edit])

                vscode.workspace.applyEdit(wedit);
                    
                process.stdin.end();
            });

            // process.stdout.resume();
            process.stdin.write(text);

            // // move cursor to this new position
            // var newPosition = position.with(position.line, 0);

        }

    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}