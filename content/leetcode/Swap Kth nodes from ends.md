---
title: "Swap Kth nodes from ends"
date: 2022-07-19
tags: [dsadeck, linkedlist]
aliases:
- 
summary: "Solution to the problem: Swap Kth nodes from ends"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 
Related: [[1721. Swapping Nodes in a Linked List]]  

---

## Solution
``` java
void swap(Node pa, Node pb){
	Node a = pa.next, b = pb.next;
	pa.next = b;
	pb.next = a;
	
	Node temp = a.next;
	a.next = b.next;
	b.next = temp;
}
//Function to swap Kth node from beginning and end in a linked list.
Node swapkthnode(Node head, int num, int K)
{
	Node newHead = new Node(-1), pa = newHead, pb = newHead, a = head, b = head;
	newHead.next = head;
	int count = 0;
	while(count++ < K) {
		pa = pa.next;
		a=a.next;
	}

	while(a.next!= null) {
		pb = pb.next;
		b = b.next;
	}
	
	swap(pa, pb);
	return newHead.next;
}
```

### Notes
- 

