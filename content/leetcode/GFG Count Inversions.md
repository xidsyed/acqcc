---
title: "GFG Count Inversions"
date: 2022-06-19
tags: [dsadeck, arrays]
aliases:
- 
summary: "Solution to the problem: GFG Count Inversions"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 

---

## Solution
``` java
public long merge(long[] nums, int start, int mid, int end) {
	long[] t1 = Arrays.copyOfRange(nums, start, mid + 1);
	long[] t2 = Arrays.copyOfRange(nums, mid + 1, end + 1);
	
	int i1 = 0, i2 = 0, i = start;
	long invCount = 0;
	while (i1 < t1.length && i2 < t2.length) {
		if (t2[i2] < t1[i1]) {  // right subarr el is smaller
			nums[i++] = t2[i2++];
			invCount += (t1.length - i1); // add no. of greater than elements in the left subarr
		} else {
			nums[i++] = t1[i1++];
		}
	}
	
	// copy leftover
	while (i2 < t2.length) nums[i++] = t2[i2++];
	while (i1 < t1.length) nums[i++] = t1[i1++];
	
	return invCount;
}

public long mergeSort(long[] nums, int start, int end) {
	if (start >= end) return 0;
	
	int mid = start + (end - start) / 2;
	long invCount = 0;
	
	invCount += mergeSort(nums, start, mid);
	invCount += mergeSort(nums, mid + 1, end);
	
	invCount += merge(nums, start, mid, end);
	
	return invCount;
}

public long inversionCount(long[] arr, long N) {
	return mergeSort(arr, 0, (int) N - 1);
}
```

### Notes
- Merge Sort with a twist
- when `if (t2[i2] < t1[i1])` is true, meaning the right subarrays element is smaller than the left subarrays element, it is also smaller than the remaining elements in the left subarray `t1.length-i1` , since both the subarrays are sorted
> [!Concept]
> For each smaller element in the right subarray we update how many is it smaller than (how many inversions can it form with the left subarray elements)

