---
title: "Height of a Tree"
date: 2022-07-01
tags: [dsadeck, binarytrees]
aliases:
- 
summary: "Solution to the problem: Height of a Tree"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---
## Problem Statement


Pattern: 

---


``` java
public static int height(Node root) {
	if (root == null) return 0;
	
	int leftHeight = height(root.left);
	int rightHeight = height(root.right);
	
	return Math.max(leftHeight, rightHeight) + 1;
}
```

