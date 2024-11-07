---
title: "GFG Minimum Number of Jumps"
date: 2022-06-14
tags: [dsadeck, arrays]
aliases:
- 
summary: "Solution to the problem: GFG Minimum Number of Jumps"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement

![](https://i.imgur.com/vSQWN9I.png)

Pattern: 

---

## Solution
``` java
public int jump(int[] nums){
	int limit = nums[0], jumps = 1, i = 0, n = nums.length;
	if(n == 1) return 0;
	while (i < n && i <= limit ) {
		// if end reached return jumps
		if (limit >= n - 1) return jumps;
		// find max limit in current limit
		int currLimit = limit;
		while (i <= currLimit) {
			limit = Math.max(limit, i+nums[i]);
			i++;
		}
		// if limit changed update jump
		if(limit > currLimit) jumps++;
	}
	return -1;
}
```

### Notes
- element at current index decides the `limit` / how far you can jump
	- check if the `limit >= num.length`. if so return `jumps` counted. else continue 
	- within the `currLimit` find the new max `limit`
	- if `limit` is found then it must be greater `limit > currLimit`. then a jump has been made, and `limit` has been updated

[Alternative Greedy Solution](https://leetcode.com/problems/jump-game-ii/discuss/18014/Concise-O(n)-one-loop-JAVA-solution-based-on-Greedy)
