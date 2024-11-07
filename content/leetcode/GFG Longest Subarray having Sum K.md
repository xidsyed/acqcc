---
title: "GFG Longest Subarray having Sum K"
date: 2022-06-09
tags: [dsadeck, arrays]
aliases:
- 
summary: "Solution to the problem: GFG Longest Subarray having Sum K"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement
[Longest sub-array having sum k - GeeksforGeeks](https://www.geeksforgeeks.org/longest-sub-array-sum-k/)

Pattern: [[Pattern Prefix Array]]

---

## Solution
``` java
static int lenOfLongSubarr(int[] arr, int n, int k)
{
	 // HashMap to store (sum, index) tuples
	 HashMap<Integer, Integer> map = new HashMap<>();
	 int sum = 0, maxLen = 0;

	 // traverse the given array
	 for (int i = 0; i < n; i++) {
		 
		  // accumulate sum
		  sum += arr[i];
		 
		  // when subarray starts from index '0'
		  if (sum == k)
			  maxLen = i + 1;

		  // make an entry for 'sum' if it is
		  // not present in 'map'
		  if (!map.containsKey(sum)) {
			  map.put(sum, i);
		  }

		  // check if 'sum-k' is present in 'map'
		  // or not
		  if (map.containsKey(sum - k)) {
			   
			  // update maxLength
			  if (maxLen < (i - map.get(sum - k)))
				  maxLen = i - map.get(sum - k);
		  }
	 }
	 return maxLen;            
}
```

### Notes
- 

Similar to : [[560. Subarray Sum Equals K]]
