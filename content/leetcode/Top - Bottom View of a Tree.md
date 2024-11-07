---
title: "Top - Bottom View of a Tree"
date: 2022-07-03
tags: [dsadeck, binarytrees]
aliases:
- 
summary: "Solution to the problem: Top - Bottom View of a Tree"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement
[Top View of Binary Tree | Practice | GeeksforGeeks](https://practice.geeksforgeeks.org/problems/top-view-of-binary-tree/1)
Pattern: 

---

## Top View Solution
``` java
static class AxisNode {
	int axis;
	Node node;
	
	AxisNode(int axis, Node node) {
		this.axis = axis;
		this.node = node;
	}
}
public ArrayList<Integer> topView (Node root){
	TreeMap<Integer, Integer> axesMap = new TreeMap<>();
	Queue<AxisNode> q = new LinkedList<>();

	if (root == null) return new ArrayList<>();  // return empty list

	// levelorder traversal to create axesMap
	q.add(new AxisNode(0, root));
	while (!q.isEmpty()) {
		// get axis & node
		AxisNode an = q.remove();
		int axis = an.axis;
		Node node = an.node;
		
		if (!axesMap.containsKey(axis)) axesMap.put(axis, node.val);
	
		if (node.left != null) q.add(new AxisNode(axis - 1, node.left));
		if (node.right != null) q.add(new AxisNode(axis + 1, node.right));
	}

	return new ArrayList<>(axesMap.values());
}
```

### Notes
- A slight modification of [[Vertical Traversal of BT]]
	- Here we **only need the first node of a vertical axis reached through level order traversal**
	- so instead of using a `TreeMap<Integer , LinkedList<Intger>>` we only need a `TreeMap<Integer , Integer>`
	- thats it 🤷‍♂️

## Bottom View Solution
- Slight Modification to top view
	- Here we **only need the LAST node of a vertical axis reached through level order traversal**
	- remove the if condition
``` java
 axesMap.put(axis, node.val);
```
