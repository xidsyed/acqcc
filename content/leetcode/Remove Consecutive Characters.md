---
title: "Remove Consecutive Characters"
date: 2022-09-24
tags: [dsadeck, strings]
aliases:
- 
summary: "Solution to the problem: Remove Consecutive Characters"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement
[Remove Consecutive Characters | Practice | GeeksforGeeks](https://practice.geeksforgeeks.org/problems/consecutive-elements2306/1)
Remove adjacent duplicates recursively

Pattern: 

---

## Solution
``` java
public char add (StringBuilder sb, String s, int i) {
	if(i == s.length()) return '#';
	
	char next = add(sb, s, i+1);
	char curr = s.charAt(i);
	if (curr != next) sb.append(curr);
	
	return curr;
}

public String removeConsecutiveCharacter(String S){
	StringBuilder sb = new StringBuilder();
	add(sb, S, 0);
	return sb.reverse().toString();
} 
```
TC : $O(n)$
SC : $O(n)$




