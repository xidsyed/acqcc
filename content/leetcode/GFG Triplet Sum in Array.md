---
title: "GFG Triplet Sum in Array"
date: 2022-06-24
tags: [dsadeck, arrays, arithmetic]
aliases:
- 
summary: "Solution to the problem: GFG Triplet Sum in Array"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: [[Pattern Two Pointer]]
Related: [[15. 3Sum]]

---

## Solution
``` java
public boolean find3Numbers(int[] nums, int n, int k) {
	Arrays.sort(nums);
	for (int start = 0; start < n-2; start++) {
		int mid = start+1, end = n-1;
		while(mid < end) {
			int sum = nums[start] + nums[mid] + nums[end];
			if(sum < k) mid++;
			else if(sum > k) end--;
			else return true;
		}
	}
	return false;
}
```

### Notes
- for start -> n -2
	- mid = start +1 end = n-1
	- if `sum > k` end--
	- if `sum < k` start++


