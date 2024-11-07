---
title: "GFG Palindromic Array"
date: 2022-06-24
tags: [dsadeck, arrays]
aliases:
- 
summary: "Solution to the problem: GFG Palindromic Array"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement
[Palindromic Array | Practice | GeeksforGeeks](https://practice.geeksforgeeks.org/problems/palindromic-array-1587115620/1#)

Pattern: 

---


## Solution
``` java
for (int num : nums) {
	int temp = num, revNum = 0;
	while(temp != 0) {
		revNum = revNum*10 + temp%10;
		temp /= 10;
	}
	if(revNum != num) return 0; 
}

return 1;
```

### Notes
- 

