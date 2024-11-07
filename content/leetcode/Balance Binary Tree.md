---
title: "Balance Binary Tree"
date: 2022-07-04
tags: [dsadeck, binarytrees]
aliases:
- 
summary: "Solution to the problem: Balance Binary Tree"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 

---

## Solution
``` java
public int checkHeight (TreeNode root) {
	if (root == null) return 0;
	
	int lh = checkHeight(root.left);
	int rh = checkHeight(root.right);

	if(lh == -1 || rh == -1 || Math.abs(lh-rh) > 1) return -1;
		
	// return height of current node
	return Math.max(lh, rh) + 1;
}

public boolean isBalanced(TreeNode root) {
	if(checkHeight(root) != -1) return true;
	return false;
}
```

### Notes
- use int, to return the height difference  at every step
- if height diff > 1 in current or left or right nodes, return -1
- if final value is not -1 return true, else return false

