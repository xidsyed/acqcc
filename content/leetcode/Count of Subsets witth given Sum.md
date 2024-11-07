---
title: "Count of Subsets witth given Sum"
date: 2022-08-05
tags: [dsadeck, dp]
aliases:
- 
summary: "Solution to the problem: Count of Subsets witth given Sum"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---


## Problem Statement
[Count of subsets with sum equal to X - GeeksforGeeks](https://www.geeksforgeeks.org/count-of-subsets-with-sum-equal-to-x/)

Pattern: 

---

## Brute Force Solution
``` java
public int count (int[] nums, int n, int target){
	if(n < 0) return target == 0 ? 1 : 0;
	if(target == 0) return 1;
	
	if(nums[n] <= target)
		return count(nums, n-1, target-nums[n]) +
			   count(nums, n-1, target);
	return count(nums, n-1, target);
}
```
TC : $2^n$
SC : $2^n$

## Memoised
``` java
public static Integer[][] dp;
public int count(int[] nums, int n, int target) {
	if (n < 0) return target == 0 ? 1 : 0;
	if (target == 0) return 1;
	if (dp[n][target] != null) return dp[n][target];
	if (nums[n] <= target)
		return dp[n][target] = count(nums, n - 1, target - nums[n]) +
							   count(nums, n - 1, target);
	return dp[n][target] = count(nums, n - 1, target);
}
```

## Iterative
``` java
public int count(int[] nums, int n, int k) {
	// init dp
	for (int i = 0, j=0; i < n + 1; i++) dp[i][j] = 1;
	for (int j = 1, i = 0; j < k + 1; j++) dp[i][j] = 0;
	
	for (int i = 1; i < n + 1; i++) 
		for (int j = 1; j < k + 1; j++) 
			if (nums[i-1] <= j) 
				dp[i][j] = dp[i - 1] [j - nums[i-1]] + dp[i - 1][j];
			else dp[i][j] = dp[i - 1][j];
		
	return dp[n][k];
}
```

understand iterative.. maybe
```
count of subsets considering curr (ith) element of value upto j = 
	count of subset upto i-th element having value complement to curr value
	 (because u can add curr element to all of them to reach j) 
	+
	count of subsets upto ith element having value upto j
```
