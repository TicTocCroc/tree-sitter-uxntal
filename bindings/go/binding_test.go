package tree_sitter_uxntal_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_uxntal "github.com/tictoccroc/tree-sitter-uxntal/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_uxntal.Language())
	if language == nil {
		t.Errorf("Error loading Uxntal grammar")
	}
}
