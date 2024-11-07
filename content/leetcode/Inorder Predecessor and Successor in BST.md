---
title: "Inorder Predecessor and Successor in BST"
date: 2022-07-22
tags: [dsadeck, bst]
aliases:
- 
summary: "Solution to the problem: Inorder Predecessor and Successor in BST"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 

---

## Solution
``` java
Node inorderPredecessor(Node node, int key) {
	Node pre = null;
	
	while(node != null) {
		if(key <= node.data) node = node.left;
		else {
			pre = node;
			node = node.right;
	}   }
	
	return pre;
}

Node inorderSuccessor(Node node, int key) {
	Node succ = null;
	
	while(node != null) {
		if(key >= node.data) node = node.right;
		else {
			succ = node;
			node = node.left;
	}   }
	
	return succ;
}
```

### Notes
- 

