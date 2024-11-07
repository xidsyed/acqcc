---
title: "GFG Intersection of Two Sorted LLs"
date: 2022-06-25
tags: [dsadeck, linkedlist]
aliases:
- 
summary: "Solution to the problem: GFG Intersection of Two Sorted LLs"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 

---

## Solution
``` java
public static Node findIntersection(Node head1, Node head2)
{
	Node ans = new Node(-1), ansHead = ans;
	
	while(head1 != null && head2 != null) {
		if(head1.data < head2.data) head1 = head1.next;
		else if(head2.data < head1.data) head2 = head2.next;
		
		else {  // head1 = head2	
			if(head1.data > ans.data) {
				ans.next = new Node(head1.data);
				ans = ans.next;
			}
			head1 = head1.next;
			head2 = head2.next;
		}
	}
	return ansHead.next;
}
```

Move the smaller pointer fwds, till one of them reaches null
if both pointers are same, compare with last element in ans, if grgeater, insert
move both pointers fwds

## Messier Set Solution

``` java
public static Node findIntersection(Node head1, Node head2)
{
	// code here.
	Set<Integer> set = new HashSet<Integer>();
	while(head1 != null){
		set.add(head1.data);
		head1 = head1.next;
	}
	
	Node p2 = head2;
	Set<Integer> intersect = new HashSet<Integer>();
	while(head2 != null) {
		if(set.contains(head2.data))
			intersect.add(head2.data);
		head2 = head2.next;
	}
	
	Node node = new Node(-1), nodeHead = node;
	while(p2!=null) {
		if(intersect.contains(p2.data)) {
			node.next = new Node(p2.data);
			intersect.remove(p2.data);
			node = node.next;
		}
		p2 = p2.next;
	}
	
	return nodeHead.next;
}
```
