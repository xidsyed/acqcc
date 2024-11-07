---
title: "BT Sum at Kth Level"
date: 2022-07-01
tags: [dsadeck, binarytrees]
aliases:
- 
summary: "Solution to the problem: BT Sum at Kth Level"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 

---

## Solution
``` java
public int KSum(Node root, int k) {
	int level = 0, sum = 0;
	Queue<Node> q = new LinkedList<>();
	q.add(root);
	
	while (!q.isEmpty()) {
		int size = q.size();
		sum = 0;
		level++;
		while (size-- > 0) {
			Node node = q.poll();
			sum += node.val;
			if (node.left != null) 	q.add(node.left);
			if (node.right != null) q.add(node.right);
		}
		if (level == k) break;
	}
	return sum;
}
```

### Notes
- we already know how to do a [[Binary Tree#Level Order Traversals|Level Order Traversal]]
	- instead of using nulls to differentiate the next line, there is a better way!
	- we can keep track of the number of elements added in each level = `q.size` after removing the root
	- first iter when only root is in queue, the number of elements at level 1 is `q.size()`. so we iterate `size` number of times
	- next outer loop iter, the number of elements in q  =  `q.size()` is 2 
- so on and so forth. this way we can distinguish a level in a BT
 


