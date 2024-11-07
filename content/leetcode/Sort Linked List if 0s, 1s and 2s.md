---
title: "Sort Linked List if 0s, 1s and 2s"
date: 2022-07-19
tags: [dsadeck, linkedlist]
aliases:
- 
summary: "Solution to the problem: Sort Linked List if 0s, 1s and 2s"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 
Related: [[GFG Three Way Paritioning]]
[Segregate even and odd nodes in a Link List | Practice | GeeksforGeeks](https://practice.geeksforgeeks.org/problems/segregate-even-and-odd-nodes-in-a-linked-list5035/1)

---

## Solution
``` java
static Node segregate(Node head)
{
	Node dummy = new Node(-1), currHead = new Node(-1), curr = currHead;
	dummy.next = head;
	
	Node node = dummy;
	while(node!= null && node.next != null) {
		if(node.next.data < 1) {
			curr.next = node.next;
			curr = curr.next;
			node.next = node.next.next;
		}
		else node = node.next;
	}
	
	node = dummy;
	while(node!= null && node.next != null) {
		if(node.next.data == 1){
			curr.next = node.next;
			curr = curr.next;
			node.next = node.next.next;
		}
		else node = node.next;
	}
	node = dummy;
	while(node!=null && node.next!=null){
		curr.next = node.next;
		curr = curr.next;
		node = node.next;
	}
	return currHead.next;
}
```


## Simpler 
``` java
public static Node sortList(Node head)
{
	if(head==null || head.next==null) return head;

	Node zeroD = new Node(0), oneD = new Node(0), twoD = new Node(0);
	Node zero = zeroD, one = oneD, two = twoD, curr = head;
	while (curr!=null)
	{
		if (curr.data == 0)
		{
			zero.next = curr;
			zero = zero.next;
		}
		else if (curr.data == 1)
		{
			one.next = curr;
			one = one.next;
		}
		else
		{
			two.next = curr;
			two = two.next;
		}
		curr = curr.next;
	}
	// Attach three lists
	zero.next = (oneD.next!=null) ? (oneD.next) : (twoD.next);
	one.next = twoD.next;
	two.next = null;
	return zeroD.next;
}

```

