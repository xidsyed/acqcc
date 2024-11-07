---
title: "Reverse Doubly Linked List in Groups of K"
date: 2022-07-16
tags: [dsadeck, linkedlist]
aliases:
- 
summary: "Solution to the problem: Reverse Doubly Linked List in Groups of K"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 

---

## Solution
``` java
public Node revListInGroupOfGivenSize(Node head, int K){
	Node curr = head, prev = null;
	int count = 0;
	
	// let prev be the leading pointer of the new reversed LL
	// and keep inserting `curr` (leading ptr of leftover LL)
	// before `prev`
	
	while(curr != null && count++ < K) {
		Node next = curr.next;
		
		curr.prev = null;
		curr.next = prev;
		if(prev!=null) prev.prev = curr;
		
		prev = curr;
		curr = next;
	}
	
	if(curr != null) {
		head.next = revListInGroupOfGivenSize(curr, K);
		head.next.prev = head;
	}
	
	return prev;
}
```

### Notes
- much like [[GFG Reverse Doubly Linked List]]

