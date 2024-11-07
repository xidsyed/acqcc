---
title: "Bank Transactions"
date: 2022-09-11
tags: [dsadeck, dp]
aliases:
- 
summary: "Solution to the problem: Bank Transactions"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 

---

## Solution
``` java
static HashMap<Integer, HashMap<Integer, Integer>> cache;
public static int dp(int[] nums, int i, int sum) {
	if (i >= nums.length) return 0;
	if(cache.containsKey(i) && cache.get(i).containsKey(sum))
		return cache.get(i).get(sum);
	
	// GET RES
	int res;
	if(sum + nums[i] >= 0) {
		res = Math.max(
			dp(nums, i + 1, sum + nums[i]) + 1,
			dp(nums, i + 1, sum)
		);
	}
	else res = dp(nums, i + 1, sum);
	
	// CACHE RES
	HashMap<Integer, Integer> sumMap = cache.getOrDefault(i, new HashMap<>());
	sumMap.put(sum, res); cache.put(i, sumMap);
	
	// RETURN RES
	return res;
}

public static int getTransactions(int[] nums) {
	cache = new HashMap<>();
	return dp(nums,  0, 0);
}
```
TC : $O()$
SC : 

### Notes
- 



