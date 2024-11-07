---
title: "Kth Ancestor"
date: 2022-07-13
tags: [dsadeck, binarytrees]
aliases:
- 
summary: "Solution to the problem: Kth Ancestor"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement
[Kth Ancestor in a Tree | Practice | GeeksforGeeks](https://practice.geeksforgeeks.org/problems/kth-ancestor-in-a-tree/1/#)


Pattern: 

---

## Solution
``` java
static class Ancestor {
	int distance = -10;
	Ancestor(int distance){
		this.distance = distance;
	}
}

Node findAncestor(Node root, Ancestor anc, int node) {
	if(root == null) return null;
	if(root.data == node) {
		anc.distance--;
		return root;
	}
	
	Node left = findAncestor(root.left, anc, node);
	Node right = findAncestor(root.right, anc, node);
	
	// get non-null ancestor value
	Node ans = (left!=null)? left : right;
	
	// node found, ancestor not already found
	if(ans != null && anc.distance > -1) {
		if (anc.distance == 0) ans = root;
		anc.distance--;
	}
	return ans;
}

public int kthAncestor (Node root, int k , int node){
	Ancestor anc = new Ancestor(k);
	Node res = findAncestor(root,anc, node);
	if(anc.distance == -1) return res.data;
	return -1;
}
```

### Notes
- 

