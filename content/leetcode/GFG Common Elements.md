---
title: "GFG Common Elements"
date: 2022-06-19
tags: [dsadeck, arrays]
aliases:
- 
summary: "Solution to the problem: GFG Common Elements"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement
[Common elements | Practice | GeeksforGeeks](https://practice.geeksforgeeks.org/problems/common-elements1132/1#)
![](https://i.imgur.com/KbqaL3l.png)


Pattern: 

---

## Solution
``` java
public ArrayList<Integer> commonElements(int[] A, int[] B, int[] C, int n1, int n2, int n3) {
	int i1 = 0, i2 = 0, i3 = 0;
	ArrayList<Integer> res = new ArrayList<>();
	while (i1 < n1 && i2 < n2 && i3 < n3) {
		if (A[i1] < B[i2]) i1++;
		else if (B[i2] < C[i3]) i2++;
		else if (C[i3] < A[i1]) i3++;
		else if (A[i1] == B[i2] && B[i2] == C[i3]) {
			if(res.size() == 0 || res.get(res.size()-1) != A[i1])   // if not duplicate
				res.add(A[i1]);
			i1++;i2++;i3++;
		}
	}
	return res;
}
```

### Notes
- 

