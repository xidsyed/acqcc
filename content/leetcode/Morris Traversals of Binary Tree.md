---
title: "Morris Traversals of Binary Tree"
date: 2022-07-13
tags: [dsadeck, binarytrees]
aliases:
- 
summary: "Solution to the problem: Morris Traversals of Binary Tree"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---
[[Binary Tree#Traversals]]
## Problem Statement
Traverse a binary tree (inorder/postorder/preorder), using O(1) space, return root of tree

## Definition Threaded Tree
![[Pasted image 20220713173904.png]]
A binary tree is threaded by making all right child pointers that would normally be null point to the inorder successor of the node (if it exists), and all left child pointers that would normally be null point to the inorder predecessor of the node.

Pattern: 
Related: [Find median of BST in O(n) time and O(1) space - GeeksforGeeks](https://www.geeksforgeeks.org/find-median-bst-time-o1-space/)

---

## Inorder Traversal
[Binary Tree Inorder Traversal - LeetCode](https://leetcode.com/problems/binary-tree-inorder-traversal/)

### Pseudo Code
``` txt
1. Initialize current as root 
2. While current is not NULL
   If current hs a left child
      ifa) Make current as right child of the 'rightmost 
         node in current's left subtree' or its 'inorder predecessor'
      ifb) Go to left child, i.e., current = current->left
   Else
      ea) Print current’s data
      eb) Go to the right, i.e., current = current->right

```

### Java Code
``` java
public ArrayList<Integer> inorder (TreeNode root){
	TreeNode curr = root;
	ArrayList<Integer> res = new ArrayList<>();
	
	while(curr != null) {
		if(curr.left != null) {
			// get inorder predecessor 'pred'
			TreeNode pred = curr.left;
			while(pred.right != null && pred.right != curr) pred = pred.right;
			
			if(pred.right == null) {    // pred not connected to root/curr
				pred.right = curr;      // connect pred to root/curr
				curr = curr.left;
			} else {                    // pred.right == curr (pred already connected to root/curr)
				pred.right = null;      // disconnect
				res.add(curr.data);     // print
				curr = curr.right;      // traverse right subtree - inorder successor
			}
		} else { // curr.left -> null
			res.add(curr.data);         // print
			curr = curr.right;          // traverse right subtree
		}
	}
	return res;
}
```
- print 
	- the second time you arrive at root `pred.right != null` because of `LNR`
	- when `curr.left == null`

## Preorder Traversal
[Binary Tree Preorder Traversal - LeetCode](https://leetcode.com/problems/binary-tree-preorder-traversal/)
### Java Code
``` java
public List<Integer> preorderTraversal (TreeNode root){
	TreeNode curr = root;
	ArrayList<Integer> res = new ArrayList<>();

	while(curr != null) {
		if(curr.left != null) {
			// get inorder predecessor 'pred'
			TreeNode pred = curr.left;
			while(pred.right != null && pred.right != curr) pred = pred.right;

			if(pred.right == null) {    // pred not connected to root/curr
				pred.right = curr;      // connect pred to root/curr
				res.add(curr.val);     // print
				curr = curr.left;
			} else {                    // pred.right == curr (pred already connected to root/curr)
				pred.right = null;      // disconnect
				curr = curr.right;      // traverse right subtree - inorder successor
			}
		} else { // curr.left -> null
			res.add(curr.val);         // print
			curr = curr.right;          // traverse right subtree
		}
	}
	return res;
}
```

- print 
	- the first time curr  is at the root node, not the second (i.e. when `pred.right == curr`, that means `curr` has been visited before)
	- and when `curr.left == null` 

## PostOrder Traversal
``` java
// right first preorder, in reverse = postorder
public List<Integer> postorder (TreeNode root){
	TreeNode curr = root;
	ArrayList<Integer> res = new ArrayList<>();
	
	while(curr != null) {
		if(curr.right != null) {
			// get inorder successor 'pred'
			TreeNode pred = curr.right;
			while(pred.left != null && pred.left != curr) pred = pred.left;
			
			if(pred.left == null) {    // pred not connected to root/curr
				pred.left = curr;      // connect pred to root/curr
				res.add(curr.val);     // print
				curr = curr.right;
			} else {                    // pred.left == curr (pred already connected to root/curr)
				pred.left = null;      // disconnect
				curr = curr.left;      // traverse left subtree - inorder predecessor
			}
		} else { // curr.right -> null
			res.add(curr.val);         // print
			curr = curr.left;          // traverse left subtree
		}
	}
	Collections.reverse(res);
	return res;
}
```
- right first preorder, in reverse = postorder
- traverse right subtree first
- print root/curr on first traversal like you do in preorder
- connect root's inorder successor `succ` to root on firs traversal
- disconnect it on second traversal, and traverse `curr's` left subtree

