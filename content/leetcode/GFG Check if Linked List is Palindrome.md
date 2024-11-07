---
title: "GFG Check if Linked List is Palindrome"
date: 2022-06-26
tags: [dsadeck, linkedlist]
aliases:
- 
summary: "Solution to the problem: GFG Check if Linked List is Palindrome"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 

---

## Solution
``` java
public boolean isPalindrome (Node head){
	if(head.next == null) return true;
	
	Node mid = getMid(head);        // get floor of mid
	Node head2 = mid.next;      	// get second head
	
	mid.next = null;                    // disconnect first LL
	head2 = reverse(head2);             // reverse second LL
	
	// Compare LLs
	while(head != null && head2 != null) {
		if (head.data != head2.data) return false;
		head = head.next;
		head2 = head2.next;
	}
	return true;
}
```

**Helper Functions**
``` java
public static Node getMid (Node head) {
	Node slow = head, fast = head;
	fast = fast.next; // increment fast to get floor of mid
	
	while (fast!= null && fast.next!=null) {
		slow = slow.next;
		fast = fast.next.next;
	}
	// when fast / fast.next becomes null, slow would have reached floor of mid
	return slow;
}

public static Node reverse(Node head) {
	if(head == null || head.next == null) return head;  // returns last node
	
	Node last = reverse(head.next);
	head.next.next = head;
	head.next = null;
	
	return last;
}
```

### Notes
- compare the first half of the array with the reverse of the second half
	- split list at mid
	- if list has odd number of elements, the left list will be one greater than the right list, but that shouldnt bother us, since we will only check , while both lists are not null. as soon as one list is null we stop checking.

 

