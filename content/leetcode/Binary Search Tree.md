---
title: "Binary Search Tree"
date: 2022-07-07
tags: []
aliases:
- 
summary: "Solution to the problem: Binary Search Tree"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

- left child < root < right chilid
- inorder traversal gives sorted array
- search complexity is `O(h)` `h=height`


## Fundamental Programs
``` java
public static TreeNode insert(TreeNode root, int val) {
	if (root == null) return new TreeNode(val);
	
	if (val < root.val)
		root.left = insert(root.left, val);
	else if(val > root.val )
		root.right = insert(root.right, val);
	
	return root;
}

public static boolean search(TreeNode root, int val) {
	if (root == null) return false;
	if (root.val == val) return true;
	
	boolean found;
	
	if (val < root.val) found = search(root.left, val);
	else found = search(root.right, val);
	
	return found;
}

public static TreeNode insert(int[] arr) {
	TreeNode root = new TreeNode(arr[0]);
	for (int i = 1; i < arr.length; i++)
		insert(root, arr[i]);
	
	return root;
}

// === DELETE === //
// return left most node
private static TreeNode inorderSuccessor(TreeNode root) {
	root = root.right;
	while (root!= null && root.left != null) root = root.left;
	return root;
}

public static TreeNode delete(TreeNode root, int val) {
	if (root == null) return null;
	
	if (val < root.val) root.left = delete(root.left, val);
	else if (val > root.val) root.right = delete(root.right, val);
	
	else {  // root.val == val
		
		// case 1: 0 child
		if (BT.isLeaf(root)) return null;
		
		// case 2 : 1 child
		if (root.right == null) return root.left;
		if (root.left == null) return root.right;
		
		// case 3 : 2 child
		// get root's inorder successor -> leftmost node in the right subtree
		TreeNode is = inorderSuccessor(root);
		// replace root w is
		root.val = is.val;
		// delete is from right subtree
		root.right = delete(root.right, is.val);
	}
	
	return root;
}

public static void inRange(TreeNode root, int X, int Y) {
	if (root == null) return;
	
	if (root.val < X) inRange(root.right, X, Y);
	else if (root.val > Y) inRange(root.left, X, Y);
	
	else {  // X <= root.val <= Y
		// inorder print inRange
		inRange(root.left, X, Y);
		System.out.print(root.val + " ");
		inRange(root.right, X, Y);
	}
}
```
