---
title: "GFG Median of 2 Sorted Arrays of Same Size"
date: 2022-06-24
tags: [dsadeck, arrays, mergesort]
aliases:
- 
summary: "Solution to the problem: GFG Median of 2 Sorted Arrays of Same Size"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 
Related: [[4. Median of Two Sorted Arrays]]

---

## Solution
``` java
public int getMedian (int[] nums1, int[] nums2){
	int i1 = 0, i2 = 0, n = nums1.length;
	int p1 = 0, p2 = 0; // prev state of i1 and i2, before termination condition is reached
	while(i1 < n && i2 < n && i1 + i2 < n) {
		p1 = i1 ; p2 = i2;
		if(nums1[i1] < nums2[i2]) i1++;
		else if(nums2[i2] < nums1[i1]) i2++;
		else i1++;
	}
	return (nums1[p1] + nums2[p2]) / 2;
}
```

### Notes
- O(n) solution
- For an O(log(min(n, m))) solution for all sizes of arrays. checkout: [[4. Median of Two Sorted Arrays]] 
- 