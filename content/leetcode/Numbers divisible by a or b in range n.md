---
title: "Numbers divisible by a or b in range n"
date: 2022-08-26
tags: [dsadeck, arithmetic]
aliases:
- 
summary: "Solution to the problem: Numbers divisible by a or b in range n"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: [[Pattern Inclusion Exclusion Principle]]

---

## Solution
Keyword OR
``` java
int divisible (int n, int a, int b) {
	int countA = n/a;
	int countB = n/b;
	int countAB = n/(a*b);
	return countA + countB - countAB;
	
}
```
TC : 
SC : 

### Notes
- 



