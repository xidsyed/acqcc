---
title: "Parenthesis Checker"
date: 2022-08-21
tags: [dsadeck, strings, stacks]
aliases:
- 
summary: "Solution to the problem: Parenthesis Checker"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 

---

## Solution
``` java
static boolean ispar(String str) {
	// add your code here
	Deque<Character> stack = new LinkedList<>();
	for (char ch : str.toCharArray()) {
		if (ch == '{' || ch == '(' || ch == '[') stack.push(ch);
		else {
			if (stack.isEmpty()) return false;
			char pop = stack.pop();
			if (ch == '}' && pop != '{') return false;
			if (ch == ')' && pop != '(') return false;
			if (ch == ']' && pop != '[') return false;
		}
	}
	return stack.isEmpty();
}
```
TC : $O(n)$
SC : $O(n)$

### Notes
- 



