---
title: "Longest Palindrome in String"
date: 2022-08-11
tags: [dsadeck, strings]
aliases:
- 
summary: "Solution to the problem: Longest Palindrome in String"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 

---

## Return Length Solution
``` java
public int longestPalin (String str){
	// code here
	char[] chars = str.toCharArray();
	int n = chars.length, max =1;
	for (int mid = 0 ; mid < n ; mid++) {
		// odd substring
		int start = mid -1, end = mid+1, count = 1;
		while(start >= 0 && end < n)
			if(chars[start--] ==  chars[end++]) count+=2;
		max = Math.max(count, max);
		// even substring
		start = mid ; end = mid+1; count = 0;
		while(start >=0 && end < n)
			if(chars[start--] == chars[end++]) count+=2;
		max = Math.max(count, max);
	}
	return max;
}

```
TC : $n^2$
SC : $1$

### Notes
- take each element as the center of a palindrome and start checking outwards
- for even numbers you will need to take 2 adjacent elements
- make sure to reset the `start` `end` and `count` before each


## Return String Solution
``` java
public String longestPalin(String str) {
	// code here
	char[] chars = str.toCharArray();
	int n = chars.length, max = 1, pstart = 0, pend = 0;
	for (int mid = 0; mid < n; mid++) {
		// odd substring
		int start = mid - 1, end = mid + 1, count = 1;
		while (start >= 0 && end < n && chars[start] == chars[end]) {
			count += 2; start--; end++;
		}
		if (count > max) {
			max = count; pstart = start + 1; pend = end - 1;
		}
		
		// even substring
		start = mid; end = mid + 1; count = 0;
		while (start >= 0 && end < n && chars[start] == chars[end]) {
			count += 2; start--;end++;
		}
		if (count > max) {
			max = count; pstart = start + 1; pend = end - 1;
		}
	}
	return str.substring(pstart, pend+1);
}
```

TC : $n^2$
SC : $1$

- here `pstart` and `pend` are updated when a larger palindrome is found
- `str.susbtring()` is end exclusive
 