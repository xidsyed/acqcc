---
title: "Sum Tree"
date: 2022-07-06
tags: [dsadeck, binarytrees]
aliases:
- 
summary: "Solution to the problem: Sum Tree"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 

---

## Check if BT is Sum Tree
[Sum Tree | Practice | GeeksforGeeks](https://practice.geeksforgeeks.org/problems/sum-tree/1#)
``` java
boolean isSum = true;

boolean isLeaf (Node root) {return (root.left == null && root.right == null);}

int check(Node root) {
	if (root == null || !isSum) return 0;

	int lsum = check(root.left);
	int rsum = check(root.right);
	
	if(!isLeaf(root) && (root.data != lsum+rsum)) 
		isSum = false;
	
	return lsum+rsum+root.data;
}

boolean isSumTree(Node root)
{
	check(root);
	return isSum;
}
```


# Transform to Sum tree
[Transform to Sum Tree | Practice | GeeksforGeeks](https://practice.geeksforgeeks.org/problems/transform-to-sum-tree/1)
``` java
public int sum (Node root) {
	if(root == null) return 0;
	
	int lSum = sum(root.left);
	int rSum = sum(root.right);
	
	int rootVal = root.data;
	root.data = lSum + rSum;
	return rootVal +lSum + rSum;
}

public void toSumTree(Node root){
	 //add code here.
	 sum(root);
}
```
