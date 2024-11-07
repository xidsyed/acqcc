---
title: "Transform String"
date: 2022-09-25
tags: [dsadeck, strings]
aliases:
- 
summary: "Solution to the problem: Transform String"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 

---

## Solution
``` java
int transform (String A, String B)
{
	// check if possible
	if (A.length() != B.length()) return -1;
	
	// check count of all characters
	int[] count = new int[256];
	int len = A.length();
	for (int i = 0 ; i < len ; i++){
		count[A.charAt(i)]++;
		count[B.charAt(i)]--;
	}
	for (int num : count) if (num != 0) return -1;
	
	// return operations
	int operations = 0, i = len-1, j = len-1;
	
	while (i >= 0) {
		if(A.charAt(i) != B.charAt(j)) operations++;
		else j--;
		i--;
	}
	return operations;
}
```
TC : $O(n)$
SC : $O(1)$

### Notes
- Any 'transformation' of a string can be reached, by picking a character and inserting it at the beginning
- Dry run to understand
- Basically, for the back, you count the number of 'mismatching' / 'characters to be sent to the front', until you find some matching characters again.





