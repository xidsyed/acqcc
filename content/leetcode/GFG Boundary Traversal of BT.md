---
title: "GFG Boundary Traversal of BT"
date: 2022-07-02
tags: [dsadeck, binarytrees]
aliases:
- 
summary: "Solution to the problem: GFG Boundary Traversal of BT"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement
[Boundary Traversal of binary tree | Practice | GeeksforGeeks](https://practice.geeksforgeeks.org/problems/boundary-traversal-of-binary-tree/1)
Pattern: 

---

## Solution
``` java
ArrayList<Integer> res;
private boolean isLeaf (Node node) {return node.left == null && node.right == null;}

private void traverseLeft(Node root) {
	if (root == null || isLeaf(root)) return;
	
	res.add(root.data);  // add on way down
	
	// go left. cant? go right
	if (root.left != null) traverseLeft(root.left);
	else traverseLeft(root.right);
}

private void traverseRight(Node root) {
	if (root == null || isLeaf(root)) return;
	// go right. cant? go left
	if (root.right != null) traverseRight(root.right);
	else traverseRight(root.left);
	
	res.add(root.data);  // add on way up
}

private void traverseLeaf(Node root) {
	if(root == null) return;
	
	// leaf -> add value
	if (isLeaf(root)) {
		res.add(root.data);
		return;
	}
	
	traverseLeaf(root.left);
	traverseLeaf(root.right);
}

public ArrayList<Integer> boundary(Node root) {
	res = new ArrayList<>();
	if(root == null) return res;
	
	res.add(root.data);
	
	traverseLeft(root.left);        // traverse left boundary
	if(!isLeaf(root))               // check not leaf
		traverseLeaf(root);         // traverse leaf nodes
	traverseRight(root.right);      // traverse right boundary
	
	return res;
}

```

### Notes
- traverse the right boundary on the way back up
- when traverseLeaf check if root isnt a leaf, or else it will be duplicated


