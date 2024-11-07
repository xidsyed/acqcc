---
title: "Police and Thieves"
date: 2022-07-18
tags: [dsadeck, greedy]
aliases:
- 
summary: "Solution to the problem: Police and Thieves"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 

---

## Solution
``` java
public int catchThieves(char[] arr, int n, int k) {
	int t = 0, p = 0, caught = 0;
	// set p and t
	while (p < n && arr[p] != 'P') p++;
	while (t < n && arr[t] != 'T') t++;
	
	while (t < n && p < n) {
		// out of range
		if (Math.abs(t - p) > k) {
			if (t > p) do p++; while (p < n && arr[p] != 'P');
			else do t++; while (t < n && arr[t] != 'T');
		}
		
		// in range
		else {
			caught++;
			do p++; while (p < n && arr[p] != 'P');
			do t++; while (t < n && arr[t] != 'T');
		}
	}
	return caught;
}
```

### Notes
- we alott policement to theives in the order that they appear.
- #tboptimised 
	- [x] understand why other approaches dont work, and why this works
	- [ ] 
	- [Mock Coding Interview with incoming SDE at Microsoft - @Nishant Chahar, YouTuber with 50K+ subs - YouTube](https://www.youtube.com/watch?v=MFkqnGiCCiU)

something about something lik

