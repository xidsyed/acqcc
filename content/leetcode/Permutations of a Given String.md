---
title: "Permutations of a Given String"
date: 2022-08-11
tags: [dsadeck, strings]
aliases:
- 
summary: "Solution to the problem: Permutations of a Given String"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 

---

## Solution
``` java
ArrayList<String> res;

public void swap (char[] chars, int a, int b ) {
	char temp = chars[a];
	chars[a] = chars[b];
	chars[b] = temp;
}

public void p (char[] chars, int start) {
	if(start == chars.length-1) {
		res.add(new String(chars));
		return;
	}
		
	for(int i = start; i < chars.length; i++) {
		swap(chars, i, start);
		p(chars, start + 1);
		swap(chars, i, start);
	}
}

public List<String> find_permutation(String S) {
	// Code here
	res = new ArrayList<String>();
	p(S.toCharArray(), 0);
	return res;
}
```
TC : $n * n!$
SC : 

### Notes
- 



