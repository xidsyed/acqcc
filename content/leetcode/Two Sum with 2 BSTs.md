---
title: "Two Sum with 2 BSTs"
date: 2022-07-30
tags: [dsadeck, bst]
aliases:
- 
summary: "Solution to the problem: Two Sum with 2 BSTs"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement
[Brothers From Different Roots | Practice | GeeksforGeeks](https://practice.geeksforgeeks.org/problems/brothers-from-different-root/1)

Pattern: 
Related: [[Iterative Traversals of BT#Inorder]]

---

## Solution
``` java
public static int countPairs(Node a, Node b, int k)
{
	Deque<Node> sa = new LinkedList<>(), sb = new LinkedList<>();
	int sum=0, count=0;
	while((a != null || !sa.isEmpty()) && (b!=null || !sb.isEmpty())) {
		while(a != null) {
			sa.push(a);
			a = a.left;
		}
		while(b != null) {
			sb.push(b);
			b = b.right;
		}
		
		if(!sa.isEmpty() && !sb.isEmpty()) 
			sum= sa.peek().data + sb.peek().data;
		 
		// inc a
		if(sum < k) {
			a = sa.pop(); a=a.right;
		}
		
		// inc b
		if(sum > k) {
			b = sb.pop();  b=b.left;
		}
		
		if(sum == k) {
			count++;
			// inc a 
			a = sa.pop(); a=a.right;
			// inc b
			b = sb.pop(); b=b.left;
		}
	}
	return count;
}
```
TC : ` n+m `
SC : ` h1+h2 `

### Notes
- we track the 'pointer' in both bst's via the `peek` of their respective stacks. 
- Traversal only happens when we pop off the stacks, so we use a while loop to push onto the stack
- yeah. what can i say im a genius


