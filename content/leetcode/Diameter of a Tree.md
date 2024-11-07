---
title: "Diameter of a Tree"
date: 2022-07-01
tags: [dsadeck, binarytrees]
aliases:
- 
summary: "Solution to the problem: Diameter of a Tree"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 
Related: [[Balance Binary Tree]]

---

## Solution O(N^2)
``` java
public static int diameter (Node root) {
	if(root == null) return 0;
	
	// recurse for left and right
	int diaLeft = diameter(root.left);
	int diaRight = diameter(root.right);
	
	// calculate diameter for current node
	int diaRoot = height(root.left) + height (root.right) + 1;
	
	// return max dia in current subtree
	return Math.max(diaRoot, Math.max(diaLeft, diaRight));
}
```

### Notes
- Diamter at a certain `root` is given by  `diaRoot = height(root.left) + height (root.right) + 1`.
	- Recruse all the way down
	- Calculate that for all nodes, and keep returning max.

## Solution O(N)
``` java
static class HD {
	public int height;
	public int maxDia;
	
	HD(int height, int dia) {
		this.height = height;
		this.maxDia = dia;
	}
}

private static HD heightDiameter(Node root) {
	if(root == null) return new HD (0, 0);
	
	// find left and right height & diameter
	HD leftHD = heightDiameter(root.left);
	HD rightHD = heightDiameter(root.right);
	
	// calculate curr height and maxDia
	int height = Math.max(leftHD.height, rightHD.height) + 1;                   // calc height
	int rootDia = leftHD.height + rightHD.height + 1;                           // calc rootDia
	int maxDia = Math.max(rootDia, Math.max(leftHD.maxDia, rightHD.maxDia));    // calc maxDia
	
	return new HD(height, maxDia);
}
public static int diameter (Node root) {return heightDiameter(root).maxDia;}
```

The solution above this is O(N^2) only because we calculate `height` which is a O(n) operation, if we instead, tracked height as we updated diameter, the complexity would be reduced to linear time complexity.

So in short we need to return both max `height` and max `dia`. as we recurse our way back up the binary tree

