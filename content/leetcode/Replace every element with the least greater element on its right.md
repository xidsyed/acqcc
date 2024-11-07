---
title: "Replace every element with the least greater element on its right"
date: 2022-07-30
tags: [dsadeck, bst]
aliases:
- 
summary: "Solution to the problem: Replace every element with the least greater element on its right"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 

---

## Trivial Solution ❌
``` java
public static ArrayList<Integer> findLeastGreater(int n, int[] arr) {
	// code here
	ArrayList<Integer> res = new ArrayList<>(n);
	for(int i = 0; i < n ; i++) {
		int min = -1;
		for(int j = i+1 ; j < n ; j++) 
			min = (arr[j] > arr[i] && (min == -1 || arr[j] < min)) ? arr[j] : min;
		res.add(min);
	}
	return res;
}
```
TC : ` n^2 `
SC : ` n `

## Optimal Solution
``` java
public ArrayList<Integer> findLeastGreater(int n, int[] arr) {
	LinkedList<Integer> res = new LinkedList<>();
	TreeSet<Integer> set = new TreeSet<>();
	for (int i = n - 1; i >= 0; i--) {
		set.add(arr[i]);
		Integer greater = set.higher(arr[i]);
		if (greater == null) res.addFirst(-1);
		else res.addFirst(greater);
	}
	return new ArrayList<>(res);
}
```
TC : ` nlogn `
SC : ` n 

- We iterate over `arr[i]` from the end, finding the inorder successor `set.higher(arr[i])`, and adding it to the list 🤷
- Why `TreeSet` ?
	- It is a self balancing bst, so the complexity cannot be `n^2` even if the array is in descending order



