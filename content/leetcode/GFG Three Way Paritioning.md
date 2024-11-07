---
title: "GFG Three Way Paritioning"
date: 2022-06-13
tags: [dsadeck, arrays, twopointer]
aliases:
- 
summary: "Solution to the problem: GFG Three Way Paritioning"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement

[Three way partitioning | Practice | GeeksforGeeks](https://practice.geeksforgeeks.org/problems/three-way-partitioning/1)
Pattern: [[Pattern Array Partitioning]] 

---

## Solution
``` java
//Function to partition the array around the range such 
//that array is divided into three parts.

public void swap(int[] x, int a, int b) {
	int t = x[a];
	x[a] = x[b];
	x[b] = t;
}

public void threeWayPartition(int nums[], int A, int B)
{
	int i = 0, start = 0, end = nums.length-1;
	while(i <= end) {
		if(nums[i] < A ){
			// swap to start
			swap(nums, i, start);
			// increment start and i
			start++;
			i++;
		}
		else if (nums[i] > B) {
			// swap to end
			swap(nums, i, end);
			// decrement end
			end--;
		}
		// if num in b/w A and B
		else i++;
	}
}
```

### Notes
- place start and end pointers, and start iterating from the first pointer
	- if num < A swap with start, increment `start` and `i`
	- if num > B swap with `end`, and only decrement `end`
	- else if  `A < num < B` then increment `i`
- Whats going on
	- start marks the end of the first partition of the array
		- so whenever we find a number less than A, we swap with start and increment `start` and `i`
		-   this works even if start and i are pointing to the same number
	- similiarly end marks the beginning of the third parition, whenever `i` finds that `num > B` it will swap `nums[i], nums[end--]`. 
		- notice we dont increment i, since the swapped number in `i`th postion now might be `< A` so we let teh check run again. 
		- therefore we only decrement num
	- finally if neither of those conditions are true, then we move i forward, till it finds an element that goes in the first or last partition. plain and simple.
	- **example**
#### how's that


 

