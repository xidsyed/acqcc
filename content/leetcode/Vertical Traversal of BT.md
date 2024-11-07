---
title: "Vertical Traversal of BT"
date: 2022-07-03
tags: [dsadeck, binarytrees]
aliases:
- 
summary: "Solution to the problem: Vertical Traversal of BT"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement
Given a Binary Tree, find the vertical traversal of it starting from the leftmost level to the rightmost level.  
If there are multiple nodes passing through a vertical line, then they should be printed as they appear in **level order** traversal of the tree.

Pattern: 
Related: [[Top - Bottom View of a Tree]] 

---

## Solution
Approach.
- Keep track of axis using wrapper class, and (`node.left -> axis-1` ,  `node.right -> axis + 1`)
- Level Order Traversal
- Use a Ordered Hashmap in java `TreeMap` to store LinkedList Node values, mapped to their axes.
- Conver to arraylist of lists and return 🤷

``` java
static class AxisNode {
	int axis;
	Node node;
	
	AxisNode(int axis, Node node) {
		this.axis = axis;
		this.node = node;
	}
}

public List<List<Integer>> verticalTraversal(Node root) {
	TreeMap<Integer, LinkedList<Integer>> axesMap = new TreeMap<>();
	Queue<AxisNode> q = new LinkedList<>();
	
	if (root == null) return new ArrayList<>();  // return empty list
	
	// levelorder traversal to create axesMap
	q.add(new AxisNode(0, root));
	while (!q.isEmpty()) {
		// get axis & node
		AxisNode an = q.remove();
		int axis = an.axis;
		Node node = an.node;
		
		if (!axesMap.containsKey(axis)) 
			axesMap.put(axis, new LinkedList<>());
		axesMap.get(an.axis).add(an.node.val);
		
		if (node.left != null) q.add(new AxisNode(axis - 1, node.left));
		if (node.right != null) q.add(new AxisNode(axis + 1, node.right));
	}
	
	return new ArrayList<>(axesMap.values());
}
```

- Returns a `List<List<Integer>>` of the nodes of vertical columns from left to right

## GFG Variation
For a single `ArrayList` like in the [GFG Problem](https://practice.geeksforgeeks.org/problems/print-a-binary-tree-in-vertical-order/), use this code:

``` java
class AxisNode {
	int axis;
	Node node;
	AxisNode(int axis, Node node) {
		this.axis = axis;
		this.node = node;
	}
}

public ArrayList<Integer> verticalOrder (Node root){
	TreeMap<Integer, LinkedList<Integer>> axesMap= new TreeMap<>();
	Queue<AxisNode> q = new LinkedList<>();
	
	if(root == null) return new ArrayList<Integer>();  // return empty list
	
	// levelorder traversal to create axesMap
	q.add(new AxisNode(0, root));
	while(!q.isEmpty()) {
		
		// get axis & node
		AxisNode an = q.remove();
		int axis = an.axis;
		Node node = an.node;
		
		if(!axesMap.containsKey(axis))	
			axesMap.put(axis, new LinkedList<>());
		axesMap.get(an.axis).add(an.node.data);
		
		if(node.left != null) q.add(new AxisNode(axis - 1, node.left));
		if(node.right != null) q.add(new AxisNode(axis + 1, node.right));
	}
	
	ArrayList<Integer> vTrav = new ArrayList<>();
	for(LinkedList<Integer> list : axesMap.values())
		for(Integer val : list)
			vTrav.add(val);
	// return arraylist of sorted map
	return vTrav;
}
```


## Leetcode Variation
![](https://i.imgur.com/16YzZe0.png)
For this stupidity 🙄 you need to change your code to sort level traversals too.😒

``` java
static class AxisNode {
	int axis;
	TreeNode node;
	AxisNode(int axis, TreeNode node) {
		this.axis = axis;
		this.node = node;
	}
}

public List<List<Integer>> verticalTraversal (TreeNode root){
	TreeMap<Integer, LinkedList<Integer>> axesMap= new TreeMap<>();
	Queue<AxisNode> q = new LinkedList<>();

	if(root == null) return new ArrayList<>();  // return empty list
	q.add(new AxisNode(0, root));

	// levelorder traversal to create axesMap
	while(!q.isEmpty()) {
		int size = q.size();
		ArrayList<AxisNode> levelList = new ArrayList<>();
		while(size-- > 0) {
			// get axis & node
			AxisNode an = q.remove();
			levelList.add(an);
			int axis = an.axis;
			TreeNode node = an.node;

			if(!axesMap.containsKey(axis))
				axesMap.put(axis, new LinkedList<>());

			if(node.left != null) q.add(new AxisNode(axis - 1, node.left));
			if(node.right != null) q.add(new AxisNode(axis + 1, node.right));
		}
		Collections.sort(levelList, Comparator.comparingInt(an -> an.node.val));
		for(AxisNode an : levelList) axesMap.get(an.axis).add(an.node.val);
	}

	// return arraylist of sorted map
	return new ArrayList<>(axesMap.values());
}
```

