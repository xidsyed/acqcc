---
title: "Flatten Binary Tree to LL"
date: 2022-07-04
tags: [dsadeck, binarytrees]
aliases:
- 
summary: "Solution to the problem: Flatten Binary Tree to LL"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: [[Pattern Binary Tree Traversal]]

---

## Solution
``` java
TreeNode prev = null;

// right-first postorder
public void postorder (TreeNode root) {
	if(root == null) return;
	
	postorder(root.right);
	postorder(root.left);
	
	root.right = prev;
	root.left = null;
	prev = root;
	
}

public void flatten(TreeNode root) { postorder(root); }
```

### Notes
![](https://i.imgur.com/CgC09iL.png)

To make it easier, jus think of a single node and its left and right, so for  the binary tree `1, 2, 5` LL would be `1 -> 2 -> 5`
- we have to get a linked list in the order `node -> left -> right`
- we could preorder traverse, and point prev node `prev.right` to the curr node, but then we would lose original `prev.right` that was yet to be traversed
	- if `1 -> 2` then 5 would get lost
- so we traverse preorder-reverse `right -> left -> node` and for each node `node.right = prev` and `prev = node`, where initially `prev = null`
- this way we can form a LL in reverse
