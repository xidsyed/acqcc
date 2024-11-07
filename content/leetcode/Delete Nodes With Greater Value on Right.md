---
title: "Delete Nodes With Greater Value on Right"
date: 2022-07-19
tags: [dsadeck, linkedlist]
aliases:
- 
summary: "Solution to the problem: Delete Nodes With Greater Value on Right"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 

---

## Solution
``` java
Node compute(Node head)
{
	// your code here
	if(head == null || head.next == null) return head;
	Node nextValid = compute(head.next);
	
	if(nextValid.data > head.data) return nextValid;
	
	head.next = nextValid;
	return head;
}
```

## Notes
Basically going from end to start
make sure the next element is greater than the current element, else drop it.

Another way to do this could be to reverse the LL
and only add the next element if it is greater than the current element

``` java
Node compute (Node head) {
	Node revHead = reverse(head), rev = revHead, rh = revHead;
	while(rev.next!=null) {
		if(rev.next.data >= rh.data) {
			rh.next = rev.next;
			rh = rh.next;
		}
		rev = rev.next;
	}
	rh.next = null;
	
	return reverse(revHead);
}
```

`rh` is basically the leading pointer of sorted ascending list


