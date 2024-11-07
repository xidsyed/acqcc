---
title: "Rabin Karp"
date: 2022-08-22
tags: [dsadeck, strings, concept]
aliases:
- 
summary: "Solution to the problem: Rabin Karp"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement
String Matching with Rolling Hash in less than $O(m*n)$
[Abdul Bari Explanation](https://www.youtube.com/watch?v=qQ8vS2btsxI)
[Explanation and Code](https://www.programiz.com/dsa/rabin-karp-algorithm)


Pattern: [[Pattern String Matching]]
Related: [[KMP Algo]]

---
Rolling Hash Formula
![](https://i.imgur.com/waDKIVj.jpg)


## Solution
``` java
// RABIN KARP ROLLING HASH ALGO
public static int getIndex(String pattern, String text) {
	int n = pattern.length(), m = text.length(),
		set = 128, MOD = 8_388,
		nset = 1, pHash = 0, tHash = 0;
	if(m < n) return -1;
	
	// get nset
	for(int i = 0; i < n-1 ; i++) nset = (nset * set) % MOD;
	
	// get pattern & text hash
	for (int i = n - 1; i >= 0; i--) {
		pHash = (set * pHash + pattern.charAt(n-1-i)) % MOD;
		tHash = (set * tHash + text.charAt(n-1-i)) % MOD;
	}

	// roll hash
	if(tHash == pHash && text.substring(0, n).equals(pattern)) return 0;
	for (int i = 1; i <= m-n; i++) {
		// update text hash
		int pre = text.charAt(i-1), post = text.charAt(i+n-1);
		tHash = (set * (tHash - (pre * nset)) + post) % MOD ;
		if(tHash < 0) tHash += MOD; // Avoid Integer Overflow
		// compare hashes
		if(tHash == pHash && text.substring(i, i+n).equals(pattern)) return i;
	}
	return -1;
}
```
TC : $O(m * n)$
SC : $O(1)$

![](https://i.imgur.com/HZcWCgv.png)