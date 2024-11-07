---
title: "GFG Choclate Distribution Problem"
date: 2022-06-24
tags: [dsadeck, arrays]
aliases:
- 
summary: "Solution to the problem: GFG Choclate Distribution Problem"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: [[Pattern Sliding Window]]

---

## Solution
``` java
public long findMinDiff (ArrayList<Integer> nums, int n, int m)
{
	Collections.sort(nums);
	int start = 0, end = start + m - 1;
	long minDiff = Long.MAX_VALUE;
	
	while(end < n) {
		minDiff = Math.min(minDiff, (long) (nums.get(end) - nums.get(start)));
		end++; start++;
	}
	
	return minDiff;
}
```

### Notes
- sort, sliding window.


