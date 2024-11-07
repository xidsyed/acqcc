---
title: "Left and Right View"
date: 2022-07-02
tags: [dsadeck, binarytrees]
aliases:
- 
summary: "Solution to the problem: Left and Right View"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement
[Left View of Binary Tree | Practice | GeeksforGeeks](https://practice.geeksforgeeks.org/problems/left-view-of-binary-tree/1)

Pattern: 

---

## Left Solution
``` java
HashMap<Integer, Integer> map = new HashMap<>();

public void preorder (Node root, int depth) {
	if(root == null) return;
	// if depth not reached before, put value
	if(!map.containsKey(depth)) map.put(depth, root.data);
	preorder(root.left, depth+1);    // go left first
	preorder(root.right, depth+1);
}


 public ArrayList<Integer> leftView (Node root) {
	
	ArrayList<Integer> res = new ArrayList<>();

	preorder(root, 1);
	
	for (int i = 1; map.containsKey(i); i++) res.add(map.get(i));
	
	return res;
}
```

### Notes
- preorder traversal, always goes left from node first then right.
	- during the traversal, foreach unique depth, add to a map the node value found
	- this way, all the left nodes get input first
	- and right nodes, only when there are no left nodes at the depth!

For the Right Solution, simply reversePreorder -> traverse right first then left

```java
public void preorder (Node root, int depth) {
	if(root == null) return;
	// if depth not reached before, put value
	if(!map.containsKey(depth)) map.put(depth, root.data);
	preorder(root.right, depth+1);    // go right first
	preorder(root.left, depth+1);
}
```
