---
title: "KMP Algo"
date: 2022-09-14
tags: [dsadeck, strings]
aliases:
- 
summary: "Solution to the problem: KMP Algo"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement
LPS

Pattern: 

---

## Solution
``` java
// O(2n)
public void getLps(String needle, int[] lps) {
	int currLps = 0, i = 1;
	while (i < needle.length())
		if (needle.charAt(i) == needle.charAt(currLps))
			lps[i++] = ++currLps;               // match        ->   increment lps
		else if (currLps == 0) lps[i++] = 0;    // currLps = 0  ->   lps not possible
		else currLps = lps[currLps - 1];        // currLps != 0 ->   match against prev currLps
}

public int kmp(String needle, String haystack) {
	// base condition
	if(needle.length() == 0) return 0;

	// get lps
	int[] lps = new int[needle.length()];
	getLps(needle, lps);

	// matching
	int i = 0, j = 0;
	while (i < haystack.length() && j < needle.length())
		if(haystack.charAt(i) == needle.charAt(j)) { i++; j++;}
		else if (j == 0) i++;
		else j = lps[j-1];

	if (j == needle.length()) return i - needle.length();
	return -1;
}
```
TC : $O(n + m)$
SC : $O(n)$ where n is the size of the needle

### Notes
- KMP algo essentially keeps track of how much of a pattern has already been matched, and how much more needs to be matched.
- LPS array - Longest Prefix (common) Suffix (where neither is the whole string) 

**Matching**
- During matching if mismatch is found, the needle pointer resumes to the **earliest unmatched location in the needle**. HOW?
- Dry Run :
	- ` needle = "sosos" ` ` haystack = "sosoososos" `
	- LPS array made would be `[0, 0, 1, 2, 3]`
	- when needle ptr `i` is at index `4` and haystack ptr `j` is at index `4` and theres a mismatch
		- needle ptr gets sent to and resumes after the earliest match `j = lps[j-1]` 
		- when there is a mismatch at `j = 4`,  `lps [3] -> 2` says : *Resume checking from index 2, since the longest prefix suffix of the string of size is of length 2, it has already occurred once before, now resume checking from the 3rd character*. 
	- didnt explain it too well, you get the idea.




