---
title: "Populate Inorder Successor for all Nodes"
date: 2022-07-23
tags: [dsadeck, bst]
aliases:
- 
summary: "Solution to the problem: Populate Inorder Successor for all Nodes"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement
[Populate Inorder Successor for all nodes | Practice | GeeksforGeeks](https://practice.geeksforgeeks.org/problems/populate-inorder-successor-for-all-nodes/1)


Pattern: 

---

## Solution
``` java
public void populateNext(Node root){
	Deque<Node> stack = new LinkedList<>();
	Node node = root, pre = null;
	while(node!=null || !stack.isEmpty()) {
		if(node!=null){
			stack.push(node);
			node = node.left;
		} else {
			node = stack.pop();
			if(pre!=null) pre.next = node;
			pre = node;
			node = node.right;
		}
	}
}
```

### Notes
- jsut a laggin pointer, pointing its next to the curr `node` ptr

