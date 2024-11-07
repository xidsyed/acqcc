---
title: "Clone LL with Random Pointer"
date: 2022-07-19
tags: [dsadeck, linkedlist]
aliases:
- 
summary: "Solution to the problem: Clone LL with Random Pointer"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement
[Clone a linked list with next and random pointer | Practice | GeeksforGeeks](https://practice.geeksforgeeks.org/problems/clone-a-linked-list-with-next-and-random-pointer/1)

Pattern: 

---

## Solution
``` java
Node copyList(Node head) {
	Node curr = head;
	// insert node
	while(curr!=null) {
		Node newNode = new Node(curr.data);
		newNode.next = curr.next;
		curr.next = newNode;
		curr = newNode.next;
	}
	// point arb
	curr = head;
	while(curr!=null) 
	{
		if(curr.arb!=null)
			curr.next.arb = curr.arb.next;
		curr = curr.next.next;
	}
	
	// separate both LL
	Node clonedHead = head.next, cloned = clonedHead;
	curr = head;
	while (curr != null) {
		curr.next = curr.next.next;
		curr = curr.next;
		if(cloned.next != null) {
			cloned.next = cloned.next.next;
			cloned = cloned.next;
		}
	} 
	
	return clonedHead;
}
```

### Notes
- 

