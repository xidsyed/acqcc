---
title: "Flatten a Linked List"
date: 2022-07-19
tags: [dsadeck, linkedlist]
aliases:
- 
summary: "Solution to the problem: Flatten a Linked List"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 
Related: [[23. Merge k Sorted Lists]] 

---

## Solution PriorityQueue
This is technically a O(1) space solution, since we take the contraint `(N*M) <=100`

``` java
Node flatten(Node root)
{
// Your code here
	Node x = root, y = x;
	PriorityQueue<Node> pq = new PriorityQueue<>(101, (n1, n2) -> n1.data-n2.data);
	while(x!=null){
		y = x;
		while(y!=null) {
			pq.add(y);
			y = y.bottom;
		}
		x = x.next;
	}
	Node newRoot = new Node(-1), curr = newRoot;
	while(!pq.isEmpty()) {
		curr.bottom = pq.remove();
		curr.bottom.next = null;
		curr.bottom.bottom = null;
		curr = curr.bottom;
	}
	
	return newRoot.bottom;
  }  
```

### Notes


## Merge Sort Solution
``` java
Node merge(Node a, Node b) {
	if(a == null) return b;
	if(b == null) return a;
	
	Node smaller, larger;
	
	smaller = (a.data <= b.data) ? a : b;
	larger = (b.data >= a.data) ? b : a;
	
	smaller.bottom = merge(smaller.bottom, larger);
	
	smaller.next = null;
	return smaller;
}

Node flatten(Node root)
{
	// Your code here
	if(root == null || root.next == null) return root;
	
	root.next = flatten(root.next);
	
	root = merge(root, root.next);
	
	return root;
}  
```
<% tp.file.cursor(2) %>

