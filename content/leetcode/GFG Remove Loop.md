---
title: "GFG Remove Loop"
date: 2022-06-25
tags: [dsadeck, linkedlist]
aliases:
- 
summary: "Solution to the problem: GFG Remove Loop"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 

---

## Solution
[[142. Linked List Cycle II]] but with a lagging pointer
``` java
public void removeCycle (ListNode head) {
	ListNode fast = head, slow = head;
	ListNode prev = new ListNode(); // lagging pointer
	
	while(fast!= null && fast.next !=null){
		prev = slow;                
		slow = slow.next;
		fast = fast.next.next;
		if(slow == fast) break;
	}
	if(fast == null || fast.next == null) return;   // LL is not cyclic, or has single el

	while(head != slow) {
		prev = slow;
		head = head.next;
		slow = slow.next;
	}
	
	prev.next = null;   // set lagging_pointer_to_cycle_start to null
}
```

### Notes
- The idea is to having a lagging pointer inside of the cycle when `slow` and `head` meet at `cycle_start`
- Then why do we need the laggin pointer in the first loop?
	- that is in case `cycle_start == head` of the linked list. in that case, the second loop will never run, and we will never know, what the prev element was!


