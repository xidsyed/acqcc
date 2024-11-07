---
title: "Reverse Level Order Traversal"
date: 2022-07-01
tags: [dsadeck, binarytrees]
aliases:
- 
summary: "Solution to the problem: Reverse Level Order Traversal"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 

---
Once you know  [[Binary Tree#Level Order Traversals|Level Order Traversal]] , 

## Solution
``` java
public ArrayList<Integer> reverseLevelOrder(Node root) {
	if(root == null) return new ArrayList<Integer>();
	// result list
	ArrayList<Integer> res = new ArrayList<>();
	
	// queue to iterate over BT
	Queue<Node> q = new LinkedList<Node>();
	q.add(root);
	while (!q.isEmpty()) {
		Node node = q.poll();
		res.add(node.val);
		
		if(node.right != null) q.add(node.right);
		if(node.left != null) q.add(node.left);
	}
	Collections.reverse(res);
	return res;
}
```

## ArrayList Solution
[Binary Tree Level Order Traversal II - LeetCode](https://leetcode.com/problems/binary-tree-level-order-traversal-ii/)
``` java
public List<List<Integer>> levelOrderBottom(TreeNode root) {
	
	List<List<Integer>> res = new ArrayList<>();
	if(root == null) return res;

	Queue<TreeNode> q = new LinkedList<TreeNode>();
	q.add(root);
	while (!q.isEmpty()) {
		int size = q.size();
		ArrayList<Integer> level = new ArrayList<>();
		while(size-- > 0) {
			TreeNode node = q.poll();
			level.add(node.val);
			if(node.left != null) q.add(node.left); 
			if(node.right != null) q.add(node.right); 
		}
		res.add(level);
	}
	Collections.reverse(res);
	return res;
}
```
### Notes
- This Question is a slight modification of **Level Order Traversal using an Iterative Queue**: ![[Binary Tree#Level Order Traversals#Iterative Queue O n]]
- In this one
	- Add the ***right node to the queue first, then the left node***
	- In the end we get an ArrayList with 
		- levels in fwds
		- nodes in a level are in reverse
	- now if we ***reverse the `res` ArrayList*** we get 
		- all the levels in reverse
		- nodes in level are fwds

