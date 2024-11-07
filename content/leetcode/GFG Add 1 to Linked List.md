---
title: "GFG Add 1 to Linked List"
date: 2022-06-25
tags: [dsadeck, linkedlist]
aliases:
- 
summary: "Solution to the problem: GFG Add 1 to Linked List"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement
[Add 1 to a number represented as linked list | Practice | GeeksforGeeks](https://practice.geeksforgeeks.org/problems/add-1-to-a-number-represented-as-linked-list/1#)

Pattern: 

---

## Recursive Solution
``` java
public ListNode addOne (ListNode head)
{
	// exit condition - last element
	if(head.next == null) {
		head.val++;             // if 9 it will become 10
		return head;
	}
	
	// recursive call
	addOne(head.next);
	
	// WAY UP
	if(head.next.val == 10) {   // if next is 10
		head.next.val = 0;      // set next to 0
		head.val++;             // increment current
	}
	return head;
}
```

### Notes
- go down to the last element, increment by 1 and return it
- for every element on the way up
	- check if the next element is 10
		- if it is set it to 0, and increment current element by 1
- **Disadvantage**: if all `9`s in array the first element becomes `10` and not an extra `1` followed by a `0`

## Iterative Reverse Approach
``` java
public ListNode reverse(ListNode head) {
	if(head == null || head.next == null) return head;  // returns last node
	
	ListNode last = reverse(head.next);
	head.next.next = head;
	head.next = null;
	
	return last;
}

public ListNode addOneReverse(ListNode head){
	ListNode revHead = reverse(head) , node = revHead;
	while(node != null) {
		if(node.val < 9) { // node not 9
			node.val++;
			break;
		}
		else {              // node is 9
			node.val = 0;
			if(node.next == null) { // last node
				node.next = new ListNode(1);
				break;
			}
		}
		node = node.next;
	}
	return reverse(revHead);
}
```

Inspired the array problem to [Plus One](https://leetcode.com/problems/plus-one/discuss/24082/My-Simple-Java-Solution)
**Disadvantage:**
-  2 extra traversals, to reverse and unreverse array
**Advantage**
- If all 9's in array, the first element is `1` and not `10`