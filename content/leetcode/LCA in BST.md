---
title: "LCA in BST"
date: 2022-07-22
tags: [dsadeck, bst]
aliases:
- 
summary: "Solution to the problem: LCA in BST"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 

---

## Solution
``` java
Node LCA(Node root, int n1, int n2)
{
	if(n1 > n2) return LCA(root, n2, n1);
	if(root == null) return null;
	
	if(root.data < n1 && root.data < n2) return LCA(root.right, n1, n2);
	if(root.data > n1 && root.data > n2) return LCA(root.left, n1, n2);
	return root;
}
```

`Ologn`

 