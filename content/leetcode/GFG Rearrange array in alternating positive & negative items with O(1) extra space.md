---
title: "GFG Rearrange array in alternating positive & negative items with O(1) extra space"
date: 2022-06-19
tags: [dsadeck, arrays]
aliases:
- 
summary: "Solution to the problem: GFG Rearrange array in alternating positive & negative items with O(1) extra space"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---


## Problem Statement #2 - Unordereed

![](https://i.imgur.com/iZ07yoW.png)
InPlace O(1) space

Pattern: 

---

## Solution
``` java
public int[] rearrangeUnordered(int[] nums) {
	int ni = 0; // negative index
	for (int i = 0; i < nums.length && ni < nums.length; i++) {
		if (nums[i] < 0) {
			swap(nums, i, ni);
			ni +=2;
		}
	}
	return nums;
}
```

Time Complexity: `O(n)`

### Notes
- Will not maintain relative order of elements: not stable


## Problem Statement #1 - Ordered
[Rearrange array in alternating positive & negative items with O(1) extra space | Set 1 - GeeksforGeeks](https://www.geeksforgeeks.org/rearrange-array-alternating-positive-negative-items-o1-extra-space/)
![](https://i.imgur.com/dbhQfm9.png)

With `O(n)` space its easy :[Alternate positive and negative numbers | Practice | GeeksforGeeks](https://practice.geeksforgeeks.org/problems/array-of-alternate-ve-and-ve-nos1401/1)
``` java
void rearrange(int nums[], int n) {
	LinkedList<Integer> neg = new LinkedList<>(), pos = new LinkedList<>();
	
	// create pos and negative linked lists
	for(int num : nums)
		if(num < 0) neg.add(num);
		else pos.add(num);
	
	// merge both
	int index = 0;
	while(!pos.isEmpty() && !neg.isEmpty()) {
		nums[index++] = pos.remove();
		nums[index++] = neg.remove();
	}
	
	// copy leftover
	while(!pos.isEmpty())nums[index++] = pos.remove();
	while(!neg.isEmpty())nums[index++] = neg.remove() ;
	
	return;
}
```


The only way this can be solved in O(1) space is if time complexity is `O(n^2)`, which is the [solution given at gfg](https://www.geeksforgeeks.org/rearrange-array-alternating-positive-negative-items-o1-extra-space/)
