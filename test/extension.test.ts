import * as assert from 'assert';
import * as vscode from 'vscode';
import * as lib from '../src/extension';

// Assert that the default regexp will match the
// exact text passed in.
// String -> Eff (assert :: ASSERT) Unit
function assertIdentity(text) {
  let r = new RegExp(lib.defaultRegexp).exec(text);
  if (r) {
    assert.equal(text, r[0]);
  } else {
    assert.equal(text, null);
  }  
}

// String -> Eff (test :: TEST, assert :: ASSERT) Unit
// Assert that a the default regular expression will match
// the text passed in.
function identityTest(text) {
  test("RegExp matches " + text, () => {
    assertIdentity(text);
  });
}

suite("purescript-vs-code extension tests", () => {
  let tests = [
    "div.class-name>span.class_name+span.sib_class_name*5",
    "div.class-name>span.class_name+span#id",
    "div.class-name>span.class_name+span#id>(div>child)"
  ];

  tests.forEach(identityTest);
});