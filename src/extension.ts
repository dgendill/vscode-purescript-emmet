'use strict';

import * as vscode from 'vscode';
import * as child_process from 'child_process';
import { StringDecoder } from 'string_decoder';

export const defaultRegexp = "[a-zA-Z0-9_\\-.+*#>()]+";

export function activate(context: vscode.ExtensionContext) {

    console.log('vscode-purescript-emmet is activated.');

    let disposable = vscode.commands.registerCommand('extension.emmetHalogen', () => {

      var editor = vscode.window.activeTextEditor
      var doc = editor.document

      if (editor.selection.isEmpty) {

        const regexp = vscode.workspace.getConfiguration('purescriptEmmet').get<string>('regexp') || defaultRegexp;
        const position = editor.selection.active;
        var range = doc.getWordRangeAtPosition(position, new RegExp(regexp, "g"));
        var text = doc.getText(range);        

        runEmmet(text).then(function(result: string) {
            editor.edit(function(tedit) {
              tedit.replace(range, result)
            })              
        }).catch(function(err) {
            if (err.message.indexOf('ENOENT')) {
              var message = "The purescript-emmet executable could not be found:\n\n Error:\n'" + err.message + "'\n\n"
              message += "PATH Variable: " + process.env.PATH;
              vscode.window.showErrorMessage(message, { modal : true });
            } else {
              vscode.window.showErrorMessage(err.message, { modal : true });
            }
        });
      }

    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}

function runEmmet(text: string) : Promise<string> {

    return new Promise(function(resolve, reject) {

        var executable = vscode.workspace.getConfiguration('purescriptEmmet').get<string>('path');

        if (executable && !executable.trim().endsWith('/purescript-emmet')) {
          executable = executable + "/purescript-emmet";
        }

        var pprocess = child_process.spawn(
            (executable || "purescript-emmet")
        );

        var decoder = new StringDecoder('utf8');
        var result = "";

        pprocess.on('error', (err: Error) => {
            reject(err)
        });

        pprocess.stdout.on('data', function(chunk: Buffer) {
            result += decoder.write(chunk);
        });

        pprocess.stderr.on('data', function(chunk: Buffer) {
            var err = chunk.toString('utf8');
            reject(new Error(err));
        });

        pprocess.stdout.on('end', function() {
            
            pprocess.stdin.end();

            if (result) {
                resolve (result);
            }
               
        });

        pprocess.stdin.write(text);

    });           

}