---
title: "Count the Reversals"
date: 2022-08-24
tags: [dsadeck, strings]
aliases:
- 
summary: "Solution to the problem: Count the Reversals"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 
Related:  [[1963. Minimum Number of Swaps to Make the String Balanced]]

---

## Solution
``` java
int countRev (String s)
{
	// your code here     
	Deque<Character> stack = new LinkedList<>();
	int rev = 0;
	
	for(char ch : s.toCharArray()) 
		if(ch == '{') stack.push(ch);
		else {
			if(stack.isEmpty()) {
				stack.push('{');
				rev++;
			}
			else stack.pop();
		}
	
	
	if(!stack.isEmpty()) 
		if(stack.size() % 2 == 0) rev = rev + stack.size() / 2;
		else return -1;
	
	return rev;
}
```
TC : $O(n)$
SC : $O(n)$

### Notes

## Optimal Solution
We don't really need to store the brackets in the stack, we could instead simply maintain a counter like so.
``` java
int countRev(String s) {
	// your code here     
	int stackSize = 0, rev = 0;        // reversal count

	for (int i = 0 ; i < s.length() ; i++)
		if(s.charAt(i) == '[') stackSize++;
		else {
			if(stackSize == 0) {
				stackSize++;
				rev++;
			}
			else stackSize--;
		}

	// if unbalanced brackets left
	if(stackSize != 0) 
		if(stackSize % 2 == 0) rev = rev + stackSize / 2;
		else return -1;
	
	return rev;
}
```

Related  : [[1963. Minimum Number of Swaps to Make the String Balanced]]



