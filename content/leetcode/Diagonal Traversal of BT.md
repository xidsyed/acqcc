---
title: "Diagonal Traversal of BT"
date: 2022-07-03
tags: [dsadeck, binarytrees]
aliases:
- 
summary: "Solution to the problem: Diagonal Traversal of BT"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement
[Diagonal Traversal | Interviewbit](https://www.interviewbit.com/problems/diagonal-traversal/)


Pattern: [[Pattern Binary Tree Axis]]

---

## Solution
``` java
class AxisNode {
	int axis;
	TreeNode node;
	
	AxisNode(int axis, TreeNode node) {
		this.axis = axis;
		this.node = node;
	}
}

public void diagonalTraversal (TreeNode root, int axis, TreeMap<Integer, LinkedList<Integer>> axesMap) {
	if(root == null) return;
	
	if (!axesMap.containsKey(axis)) 
		axesMap.put(axis, new LinkedList<>());
	axesMap.get(axis).add(root.val);
	
	if(root.left != null) diagonalTraversal(root.left, axis +1, axesMap);
	if(root.right != null) diagonalTraversal(root.right, axis, axesMap);
}

public int[] traverse(TreeNode root) {
	if (root == null) return new int[0];  // return empty arr
	
	TreeMap<Integer, LinkedList<Integer>> axesMap = new TreeMap<>();
	diagonalTraversal(root, 0, axesMap);
	
	// convert map to arraylist
	ArrayList<Integer> res = new ArrayList<>();
	for(LinkedList<Integer> list : axesMap.values())
		for(Integer val : list)
			res.add(val);        
	
	// convert arraylist to arr and return
	return res.stream().mapToInt(i -> i).toArray();
}

public int[] solve(TreeNode A) {
	return traverse(A);
}
```

### Notes
- Fundamental Idea : builds on [[Vertical Traversal of BT]] 
	- except in this case, axis is along the right diagonal
	- so everytime you go right, you are travelling along the same axis
	- everytime you go left, your axis gets incremented by 1
- Better Solution could have been an iterative one

