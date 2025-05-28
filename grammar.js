/**
 * @file A programming language for the Uxn virtual machine
 * @author Tyler Gardner <code@tylergardner.org>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "uxntal",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
