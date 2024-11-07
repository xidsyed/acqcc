---
title: "GFG Sum of Longest Bloodline"
date: 2022-07-07
tags: [dsadeck, binarytrees]
aliases:
- 
summary: "Solution to the problem: GFG Sum of Longest Bloodline"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 

---

## Solution
``` java
class hs implements Comparable<hs>{
	int height;
	int sum;
	
	hs (int height, int sum) {
		this.height = height;
		this.sum = sum;
	}
	
	@Override
	public int compareTo(hs other) {
		int hDelta = Integer.compare(height, other.height);
		int sDelta = Integer.compare(sum, other.sum);
		
		if(hDelta == 0) return sDelta;  // height is same, return sum difference
		return hDelta;                  // return height difference
	}
}

hs sum (Node root, int depth) {
	if(root == null) return new hs(depth-1, 0);
	
	hs lhs = sum(root.left, depth + 1);
	hs rhs = sum(root.right, depth + 1);
	
	hs greater = lhs.compareTo(rhs) >= 0 ? lhs : rhs;   // get greater
	greater.sum += root.val;                            // update sum
	
	return greater;
}

public int sumOfLongRootToLeafPath (Node root){
	return sum(root, 1).sum;
}
```

### Notes
- hs is a wrapper class to store `height` and `sum` together
- `compareTo`, first compares the height, and if same, then compares the sum
	-  ![](https://i.imgur.com/WfIqo4q.png)


