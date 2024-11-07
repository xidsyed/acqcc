---
title: "GFG Minimise the Heights"
date: 2022-06-15
tags: [dsadeck, arrays, incomplete]
aliases:
- 
summary: "Solution to the problem: GFG Minimise the Heights"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 

---

## Solution

[Minimize the maximum difference between heights || Love Babbar DSA sheet - YouTube](https://www.youtube.com/watch?v=Av7vSnPSCtw)

- [ ] #questiontodo [https://www.youtube.com/watch?v=o9WG7t6EKZo&t=797s](https://www.youtube.com/watch?v=o9WG7t6EKZo&t=797s "https://www.youtube.com/watch?v=o9WG7t6EKZo&t=797s")


``` java
int getMinDiff(int[] arr, int n, int k) {
	// code here
	Arrays.sort(arr);
	
	int smallest = arr[0]+k;
	int largest = arr[n-1]-k;
	
	int min, max, ans = arr[n-1] - arr[0];
	
	for (int i = 0; i < n-1; i++) {
		min = Math.min(smallest, arr[i+1]-k);   // smallest larger el
		max = Math.max(largest, arr[i]+k);      // largest smaller el
	 
		if(min < 0) continue;
		
		ans = Math.min(ans, max-min);
	}
	return ans;
}
```

### Notes
[Stack Overflow Explanation](https://stackoverflow.com/questions/32233916/minimum-difference-between-heights-of-towers/63220955#63220955)
	
- So the approach is we already know one kind of trivial solution:
	- increase first el by k `smallest = arr[0]+k` and decrease last (biggest) by k. `largest = arr[n-1]-k` there difference is one possible `ans`.
	- now we have to start looking at `i+1` (second element after the first) and subtract k, maybe we get a smaller value than `arr[0]+k` which when subtracted from a different `largest` element gives a smaller difference.
	- similiarly we search for a largest uptil `(n-2)` `arr[i]+k` might give a larger element which when subtracted by `k` might give a new `largest`

[Minimize the Heights I | Practice | GeeksforGeeks](https://practice.geeksforgeeks.org/problems/minimize-the-heights-i/1/)
same q but no check for `min < 0`

[Smallest Range II - LeetCode](https://leetcode.com/problems/smallest-range-ii/)