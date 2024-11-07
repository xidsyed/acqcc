---
title: "Count and Sum of Nodes"
date: 2022-06-30
tags: [dsadeck, binarytrees]
aliases:
- 
summary: "Solution to the problem: Count and Sum of Nodes"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 

---

## Solution
``` java
// Count Nodes O(n)
public static int countNodes (Node root) {
	if(root == null) return 0;
	
	int left = countNodes(root.left);
	int right = countNodes(root.right);
	
	return right + left + 1;
}

// Sum Nodes O(n)
public static int sumNodes (Node root) {
	if(root == null) return 0;
	
	int leftSum = sumNodes(root.left);
	int rightSum = sumNodes(root.right);
	
	return leftSum + rightSum + root.val;
}
```

### Notes
- 