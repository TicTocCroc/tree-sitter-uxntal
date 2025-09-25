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
    source_file: $ => repeat(
      choice(
        $.scope,
        $.opcode,
        $.number,
        $.ascii,
        $.address,
        $.detached_sublabel,
        $.subroutine_or_macro,
        $.include,
        $.comment,
        $.open_bracket,
        $.close_bracket,
        $.open_closure,
        $.close_closure,
        $.absolute_padding,
        $.relative_padding,
        $.macro_definition
      )
    ),

    include: _ => /~[^\s]+/,

    comment: _ => token(/\( [^)]* \)/),

    open_bracket: _ => '[',

    close_bracket: _ => ']',

    open_closure: _ => '?{',

    close_closure: _ => '}',

    scope: $ => seq('@', field('name', $.identifier)),

    opcode: _ => choice(
      'BRK',
      'INC', 'INC2', 'INCk', 'INC2k', 'INCr', 'INC2r', 'INCkr', 'INC2kr',
      'POP', 'POP2', 'POPk', 'POP2k', 'POPr', 'POP2r', 'POPkr', 'POP2kr',
      'NIP', 'NIP2', 'NIPk', 'NIP2k', 'NIPr', 'NIP2r', 'NIPkr', 'NIP2kr',
      'SWP', 'SWP2', 'SWPk', 'SWP2k', 'SWPr', 'SWP2r', 'SWPkr', 'SWP2kr',
      'ROT', 'ROT2', 'ROTk', 'ROT2k', 'ROTr', 'ROT2r', 'ROTkr', 'ROT2kr',
      'DUP', 'DUP2', 'DUPk', 'DUP2k', 'DUPr', 'DUP2r', 'DUPkr', 'DUP2kr',
      'OVR', 'OVR2', 'OVRk', 'OVR2k', 'OVRr', 'OVR2r', 'OVRkr', 'OVR2kr',
      'EQU', 'EQU2', 'EQUk', 'EQU2k', 'EQUr', 'EQU2r', 'EQUkr', 'EQU2kr',
      'NEQ', 'NEQ2', 'NEQk', 'NEQ2k', 'NEQr', 'NEQ2r', 'NEQkr', 'NEQ2kr',
      'GTH', 'GTH2', 'GTHk', 'GTH2k', 'GTHr', 'GTH2r', 'GTHkr', 'GTH2kr',
      'LTH', 'LTH2', 'LTHk', 'LTH2k', 'LTHr', 'LTH2r', 'LTHkr', 'LTH2kr',
      'JMP', 'JMP2', 'JMPk', 'JMP2k', 'JMPr', 'JMP2r', 'JMPkr', 'JMP2kr',
      'JCN', 'JCN2', 'JCNk', 'JCN2k', 'JCNr', 'JCN2r', 'JCNkr', 'JCN2kr',
      'JSR', 'JSR2', 'JSRk', 'JSR2k', 'JSRr', 'JSR2r', 'JSRkr', 'JSR2kr',
      'STH', 'STH2', 'STHk', 'STH2k', 'STHr', 'STH2r', 'STHkr', 'STH2kr',
      'LDZ', 'LDZ2', 'LDZk', 'LDZ2k', 'LDZr', 'LDZ2r', 'LDZkr', 'LDZ2kr',
      'STZ', 'STZ2', 'STZk', 'STZ2k', 'STZr', 'STZ2r', 'STZkr', 'STZ2kr',
      'LDR', 'LDR2', 'LDRk', 'LDR2k', 'LDRr', 'LDR2r', 'LDRkr', 'LDR2kr',
      'STR', 'STR2', 'STRk', 'STR2k', 'STRr', 'STR2r', 'STRkr', 'STR2kr',
      'LDA', 'LDA2', 'LDAk', 'LDA2k', 'LDAr', 'LDA2r', 'LDAkr', 'LDA2kr',
      'STA', 'STA2', 'STAk', 'STA2k', 'STAr', 'STA2r', 'STAkr', 'STA2kr',
      'DEI', 'DEI2', 'DEIk', 'DEI2k', 'DEIr', 'DEI2r', 'DEIkr', 'DEI2kr',
      'DEO', 'DEO2', 'DEOk', 'DEO2k', 'DEOr', 'DEO2r', 'DEOkr', 'DEO2kr',
      'ADD', 'ADD2', 'ADDk', 'ADD2k', 'ADDr', 'ADD2r', 'ADDkr', 'ADD2kr',
      'SUB', 'SUB2', 'SUBk', 'SUB2k', 'SUBr', 'SUB2r', 'SUBkr', 'SUB2kr',
      'MUL', 'MUL2', 'MULk', 'MUL2k', 'MULr', 'MUL2r', 'MULkr', 'MUL2kr',
      'DIV', 'DIV2', 'DIVk', 'DIV2k', 'DIVr', 'DIV2r', 'DIVkr', 'DIV2kr',
      'AND', 'AND2', 'ANDk', 'AND2k', 'ANDr', 'AND2r', 'ANDkr', 'AND2kr',
      'ORA', 'ORA2', 'ORAk', 'ORA2k', 'ORAr', 'ORA2r', 'ORAkr', 'ORA2kr',
      'EOR', 'EOR2', 'EORk', 'EOR2k', 'EORr', 'EOR2r', 'EORkr', 'EOR2kr',
      'SFT', 'SFT2', 'SFTk', 'SFT2k', 'SFTr', 'SFT2r', 'SFTkr', 'SFT2kr',
      'LIT', 'LIT2', 'LITr', 'LIT2r',
      'JCI', 'JMI', 'JSI'
    ),

    hex_number: _ => /[0-9a-f]+/,

    literal_hex_number: $ => /#[0-9a-f]+/,

    number: $ => choice($.literal_hex_number, $.hex_number),

    ascii: _ => /"[^\s]+/,

    address: _ => /[,\.;!_\-=\?][^\s]+/,

    detached_sublabel: $ => seq('&', field('name', $.identifier)),

    absolute_padding: _ => /\|[0-9a-f]+/,

    relative_padding: _ => /\$[0-9a-f]+/,

    macro_definition: _ => /%[^\s]+/,

    subroutine_or_macro: _ => /[^@&\s]+/,

    identifier: _ => /[^\s]+/,
  },

  extras: $ => [
    /\s|\\\r?\n/,
    $.comment
  ]
});
