---
title: "Maxiumum Sum of Non-Adjacent Nodes"
date: 2022-07-11
tags: [dsadeck, binarytrees]
aliases:
- 
summary: "Solution to the problem: Maxiumum Sum of Non-Adjacent Nodes"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: [[Pattern Non-Adjacent Sum]]
Related: [[198. House Robber]]

---

## Solution
``` java
class Pair {
	int inSum;
	int exSum;
	Pair (int inSum, int exSum) {
		this.inSum = inSum;
		this.exSum = exSum;
	}
}

// post order traverse
Pair post(Node root) {
	if (root == null) return new Pair(0, 0);
	
	Pair left = post(root.left);
	Pair right = post(root.right);
	
	int inSum = root.val + left.exSum + right.exSum;
	int exSum = Math.max(left.inSum, left.exSum) + Math.max(right.inSum, right.exSum);
	
	return new Pair(inSum, exSum);
}

public int getMaxSum (Node root){
	Pair pair = post(root);
	return Math.max(pair.inSum, pair.exSum);
}
```

### Notes
- if include current node (`root` node)
	- add current value, to the excluded value of child nodes
	- add `root.val + left.exSum + right.exSum`
- if excluding the `root` node
	- simply find the maximum possible sum from children nodes
	- `Math.max(left.inSum, left.exSum) + Math.max(right.inSum, right.exSum)`

simple as that
no dp

