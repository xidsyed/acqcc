---
title: "Longest Repeating Subsequence"
date: 2022-08-11
tags: [dsadeck, strings, dp]
aliases:
- 
summary: "Solution to the problem: Longest Repeating Subsequence"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 
Related: [[1143. Longest Common Subsequence]]

---

## DP Solution
``` java
Integer[][] cache;
public int LongestRepeatingSubsequence(String str) {
	cache =  new Integer[str.length()+1][str.length()];
	return dp(str.toCharArray(), str.length()-1, str.length()-2);
}

public int dp (char[] chars, int l1, int l2) {
	if(l1 < 0 || l2 < 0 || l2 >= l1) return 0;
	if(cache[l1][l2] != null) return cache[l1][l2];
	
	if(chars[l1] == chars[l2])
		return cache[l1][l2] = dp(chars, l1-1, l2-1) + 1;
	return cache[l1][l2] =  Math.max(
		dp(chars, l1-1, l2), dp(chars, l1, l2-1)
	);
}
```
TC : $n^2$
SC : $n^2$

- simple lcs problem with a twist `	if(l1 < 0 || l2 < 0 || l2 >= l1) return 0;`




