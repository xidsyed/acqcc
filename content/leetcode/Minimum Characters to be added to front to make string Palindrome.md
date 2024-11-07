---
title: "Minimum Characters to be added to front to make string Palindrome"
date: 2022-09-11
tags: [dsadeck, strings]
aliases:
- 
summary: "Solution to the problem: Minimum Characters to be added to front to make string Palindrome"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement
[Minimum characters to be added at front to make string palindrome - GeeksforGeeks](https://www.geeksforgeeks.org/minimum-characters-added-front-make-string-palindrome/)

Pattern: 

---

## Naive Solution
``` java
// function for checking string is palindrome or not
static boolean ispalindrome(String s) {
	int l = s.length();
	for (int i = 0, j = l - 1; i <= j; i++, j--) 
		if (s.charAt(i) != s.charAt(j)) return false;
	return true;
}

// Driver code
public static void main(String[] args) {
	String s = "BABABAA";
	int cnt = 0, flag = 0;

	while (s.length() > 0) {
		// if string becomes palindrome then break
		if (ispalindrome(s)) {
			flag = 1;
			break;
		} else {
			cnt++;
			s = s.substring(0, s.length() - 1);
		}
	}
	
	if (flag == 1) System.out.println(cnt);
}
```
TC : $O(n^2)$
SC : 

> [! Concept]
> **Find the greatest palindrome starting from index 0**, remaining elements will have to be added reversed to the front of the string
- Simply increase window size till string stops being a palindrome
	- `return str.length() - windowSize`
- BottleNeck : Verifying palindrome takes O(n) time


---

## Optimal Solution
We could use the concept of a LPS Array from [[KMP Algo]]
``` java
public static void getLps(String needle, int[] lps) {
	int currLps = 0, i = 1;
	while (i < needle.length())
		if (needle.charAt(i) == needle.charAt(currLps))
			lps[i++] = ++currLps;               // match        ->   increment lps
		else if (currLps == 0) lps[i++] = 0;    // currLps = 0  ->   lps not possible
		else currLps = lps[currLps - 1];        // currLps != 0 ->   match against prev currLps
}

public static int minChar(String str) {
   //Write your code here
   int len = str.length();
   if(len < 2) return 0;
   
   StringBuilder sb = new StringBuilder(str), rev =  new StringBuilder(str);
   sb.append("$").append(rev.reverse());
   
   int[] lps = new int[sb.length()];
   getLps(sb.toString(), lps);
   
   return len - lps[sb.length()-1];
}
```
TC : $O(n)$

- LPS of the `sb` string will give is the longest plaindrome starting at 0 in `O(n)`





