---
title: "Minimum Number of Flips"
date: 2022-08-29
tags: [dsadeck, strings]
aliases:
- 
summary: "Solution to the problem: Minimum Number of Flips"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement
[Min Number of Flips | Practice | GeeksforGeeks](https://practice.geeksforgeeks.org/problems/min-number-of-flips3210/1)

Pattern: 

---

## Solution
``` java
public int minFlips(String S) {
	// Code here
	int countZero = 0, countOne = 0;
	// zero-start
	boolean flag = false;
	for(char ch : S.toCharArray()) {
		if(!flag && ch != '0') countZero++;
		else if(flag && ch != '1') countZero++; 
		flag = !flag;
	} 
	// one-start
	flag = true;
	for(char ch : S.toCharArray()) {
		if(flag && ch != '1') countOne++; 
		else if(!flag && ch != '0') countOne++;
		flag = !flag;
	} 
	
	return Math.min(countZero, countOne);
}
```
TC : $O(n)$
SC : $O(1)$

### Notes
- There are only 2 arrangements of alternating bits possible for any given string One starting with zero and other starting with one. Simply find the one that requires the least number of flips



