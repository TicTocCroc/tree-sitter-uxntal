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
    source_file: $ => repeat(
      choice(
        $.include,
        $.constant,
        $.label_data,
        $.label_sublabel_data,
        $.data,
        $.macro
      )
    ),

    include: _ => /~[\w\.]+/,

    constant: $ => seq($.absolute_padding, $.scope),

    absolute_padding: $ => seq('|', token.immediate(alias(/[0-9a-f]+/, $.hex_number))),

    scope: $ => seq('@', token.immediate(alias(prec(-1, /[^\s\/]+/), $.identifier))),

    hex_number: _ => /[0-9a-f]+/,

    label_data: $ => seq(optional($.absolute_padding), $.scope, $.relative_padding),

    label_sublabel_data: $ => seq(optional($.absolute_padding), $.scope, repeat1($.sublabel_data)),

    sublabel_data: $ => seq($.sublabel, $.relative_padding),

    sublabel: $ => choice(
      seq(token.immediate('/'), token.immediate(alias(prec(-1, /[^\s\/]+/), $.identifier))),
      seq('&', token.immediate(alias(prec(-1, /[^\s\/]+/), $.identifier)))
    ),

    relative_padding: $ => seq('$', token.immediate(alias(/[0-9a-f]+/, $.hex_number))),

    data: $ => seq($.scope, repeat1($.hex_number)),

    macro: $ => seq('%', token.immediate(alias(prec(-1, /[^\s\/]+/), $.identifier)), '{', repeat($.statement), '}'),

    statement: $ => choice(
      $.opcode
    ),

    opcode: $ => choice(seq($.base_opcode, optional($.opcode_mode)), $.immediate_opcode),

    base_opcode: _ => choice(
      'BRK',
      'INC',
      'POP',
      'NIP',
      'SWP',
      'ROT',
      'DUP',
      'OVR',
      'EQU',
      'NEQ',
      'GTH',
      'LTH',
      'JMP',
      'JCN',
      'JSR',
      'STH',
      'LDZ',
      'STZ',
      'LDR',
      'STR',
      'LDA',
      'STA',
      'DEI',
      'DEO',
      'ADD',
      'SUB',
      'MUL',
      'DIV',
      'AND',
      'ORA',
      'EOR',
      'SFT'
    ),

    opcode_mode: _ => /2?k?r?/,

    immediate_opcode: $ => choice('JCI', 'JMI', 'JSI', $.literal_opcode),

    literal_opcode: _ => seq('LIT', optional('2'), optional('r')),

    runes: _ => /[|$@&,_.-;=!?#\"%~]/,

    identifier: _ => prec(-1, /[^\s\/]+/),
  }
});
