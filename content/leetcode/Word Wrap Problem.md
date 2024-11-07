---
title: "Word Wrap Problem"
date: 2022-08-11
tags: [dsadeck, strings, dp]
aliases:
- 
summary: "Solution to the problem: Word Wrap Problem"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 

---

## Incomplete Solution
#todoleetcode 
``` java	
Integer[][] cache;

public int dp(int[] nums, int k, int n, int left) {
	if (n == 0) return cache[n][left] = nums[n] < left ? 0 : left * left;
	if(cache[n][left] != null) return cache[n][left];
	
	if (nums[n] <= left) return cache[n][left] = Math.min(
		dp(nums, k, n - 1, left - nums[n] - 1),                 // same line
		dp(nums, k, n - 1, k - nums[n]-1) + (left*left)         // next line
	);
	
	return cache[n][left] = dp(nums, k, n - 1, k - nums[n]-1) + (left*left) ;   // next line
}

public int solveWordWrap(int[] nums, int k) {
	cache = new Integer[nums.length + 1][k + 1];
	return dp(nums, k, nums.length - 1, k);
}

```


### Notes
- We calculate cost everytime we go to a new line
- and we minimise the cost
- base case same pattern is followed because "As mentioned in the problem description there will be no extra spaces in the last line."



