---
title: "Flatten a BST"
date: 2022-07-22
tags: [dsadeck, bst]
aliases:
- 
summary: "Solution to the problem: Flatten a BST"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement
[Flatten BST To A Sorted List (codingninjas.com)](https://www.codingninjas.com/codestudio/problems/flatten-bst-to-a-sorted-list_1169459?)

Pattern: 

---

## Trivial Solution #1
Create an Inorder `Queue<Node>`, then iterate over it and reorder the BST, something like [[1382. Balance a Binary Search Tree]]


## Trivial Solution #2 
Create a `second` linkedlist while taversing inorder
``` java
static TreeNode<Integer> inorder(TreeNode<Integer> root, TreeNode<Integer> second) {
	if(root == null) return second;
	
	second = inorder(root.left, second);
	second.right = new TreeNode<Integer>(root.data); second = second.right;
	second = inorder(root.right, second);
	
	return second;
}

public static TreeNode<Integer> flatten(TreeNode<Integer> root)
{
	TreeNode second = new TreeNode<Integer>(-1);
	inorder(root, second);
	return second.right;
}
```
TC : ` O(n) `
SC : ` O(n) + O(h) - stack 

## Optimal Solution
Similar to  [[Flatten Binary Tree to LL]]
``` java
TreeNode prev = null;

// reverse inorder traverse
private TreeNode flatten(TreeNode root) {
	if (root == null) return prev;
	
	flatten(root.right);
	root.right = prev; prev = root;
	flatten(root.left);
	root.left = null;
	
	return prev;
}
```

TC : ` O(n) `
SC : ` O(h) - stack 

### Notes
- We essnetially traverse reverse inorder, and track the `prev` node visited, and keep returning, it. point `node.right = prev` and `node.left = null` after `flatten(root.left)`

