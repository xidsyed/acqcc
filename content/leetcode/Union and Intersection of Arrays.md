---
title: "Union and Intersection of Arrays"
date: 2022-06-14
tags: [dsadeck, arrays]
aliases:
- 
summary: "Solution to the problem: Union and Intersection of Arrays"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement
[Union of two arrays | Practice | GeeksforGeeks](https://practice.geeksforgeeks.org/problems/union-of-two-arrays3538/1#)
[Intersection of Two Arrays - LeetCode](https://leetcode.com/problems/intersection-of-two-arrays/submissions/)

Pattern: 

---

## Union Solution
``` java
public int[] doUnion (int a[], int n, int b[], int m){
	HashSet<Integer> set = new HashSet<>();
	for(int num: a) set.add(num);
	for(int num: b) set.add(num);
	
	return set.stream().mapToInt(i->i).toArray();   // to return intersection array
	//return set.size();
}
```

## Intersection Solution

``` java
public int[] intersection (int[] nums1, int[] nums2){
	HashSet<Integer> set = new HashSet<>();
	HashSet<Integer> intersect = new HashSet<>();
	
	for(int num : nums1) set.add(num);
	for(int num : nums2)
		if(set.contains(num)) intersect.add(num);
	
	return intersect.stream().mapToInt(i -> i).toArray();
}
```


## Better Solution ? 
[Intersection of two sorted Linked lists | Practice | GeeksforGeeks](https://practice.geeksforgeeks.org/problems/intersection-of-two-sorted-linked-lists/1#)
when arrays are sorted, u can use 2 pointers and some simple logic like [[GFG Intersection of Two Sorted LLs]]
