---
title: "GFG Maximum Product Subarray"
date: 2022-06-20
tags: [dsadeck, arrays, subarrays]
aliases:
- 
summary: "Solution to the problem: GFG Maximum Product Subarray"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 

---

## Solution
``` java
public long maxProduct (int[] nums, int n){
	long prefixProduct = 1, suffixProduct=1,  maxProduct = Long.MIN_VALUE;
	// prefixProduct fwds
	for (int i = 0; i < n; i++) {
		prefixProduct *= nums[i];
		if(prefixProduct == 0) prefixProduct =1;
		maxProduct = Math.max(maxProduct, prefixProduct);
	}

	// suffixProduct reverse
	for (int i = n-1; i >= 0 ; i--) {
		suffixProduct *= nums[i];
		if(suffixProduct == 0) suffixProduct = 1;
		maxProduct = Math.max(maxProduct, suffixProduct);
	}
	return maxProduct;
}
```

### Notes
- let's assume that there can only be a even number of negative integers.
- then its simple kadane's algorithm, where we find the `runningProduct`,  update `maxProduct` as we do it, and reset `runningProduct` to `1` if it becomes `0`
- the complication here is that there can be **odd number of negative integers** in the array, or any subarray between 2 zeroes
	- so the `maxProduct` could be discovered by removing the first negative integer or the last one
	- this is the only edge case that isnt being covered, but its present for every subarray, after a zero since the maxProduct uptill then gets reset
	- so the simple solution is to find the `maxProduct` once forwards using running `prefixProduct`, and once backwards using running `suffixProduct`.
	- and compare those 2

this can also be done in a single for loop

``` java
 public long maxProduct (int[] nums, int n){
	long prefixProduct = 1, suffixProduct=1,  maxProduct = Long.MIN_VALUE;

	for (int i = 0; i < n; i++) {
		prefixProduct *= nums[i];
		suffixProduct *= nums[n - (i+1)];
		
		// update maxProduct first, in case all elements are zeroes
		maxProduct = Math.max(maxProduct, Math.max(prefixProduct, suffixProduct));
		
		if(prefixProduct == 0) prefixProduct =1;
		if(suffixProduct == 0) suffixProduct =1;
	}
	
	return maxProduct;
}
```

only twist here is that to find the corresponding **reverse pointer** we use `n - (i+1)`



