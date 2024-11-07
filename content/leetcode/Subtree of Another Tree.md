---
title: "Subtree of Another Tree"
date: 2022-07-01
tags: [dsadeck, binarytrees]
aliases:
- 
summary: "Solution to the problem: Subtree of Another Tree"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement 
[Subtree of Another Tree - LeetCode](https://leetcode.com/problems/subtree-of-another-tree/)

Pattern: 

---

## Solution
``` java
private boolean compare(Node A, Node B) {
	// BASE CASES
	if (A == null && B == null) return true;   // if both are null
	if (A == null || B == null) return false;   // if only one is null
	
	// if A == B, check left and right
	if (A.val == B.val)
		return compare(A.left, B.left) && compare(A.right, B.right);
	
	return false;
}

public boolean isSubtree(Node root, Node subRoot) {
	// BASE CASES
	if (subRoot == null) return true;
	if (root == null) return false;

	// return if root is identical to subRoot
	if(compare(root, subRoot)) return true;
	
	// recurse and return for root.left and root.right
	return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
} 
```

### Notes
- start matching the subtree with each tree node, starting from the root and recursing left and right

