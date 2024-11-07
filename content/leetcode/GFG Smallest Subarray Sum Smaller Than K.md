---
title: "GFG Smallest Subarray Sum Smaller Than K"
date: 2022-06-24
tags: [dsadeck, arrays]
aliases:
- 
summary: "Solution to the problem: GFG Smallest Subarray Sum Smaller Than K"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: [[Pattern Two Pointer]]

---

## Solution
``` java
public static int smallestSubWithSum(int nums[], int n, int x) {
	int start = 0, end = start, minLen = Integer.MAX_VALUE, sum = 0;
	while(end < n) {
		sum += nums[end];
		while(start <= end && sum > x) {
			minLen = Math.min(end-start+1, minLen);
			sum -= nums[start++];
		}
		end++;
	}
	return minLen;
}
```

### Notes
- quite simple

