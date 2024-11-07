---
title: "Convert Sorted List to BST"
date: 2022-07-23
tags: [dsadeck, bst]
aliases:
- 
summary: "Solution to the problem: Convert Sorted List to BST"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 
Related:  [[Balance Binary Tree]]

---

## Solution
``` java
public Node sortedListToBST(ListNode head) { return bstify(head, null);}

// [head, tail)
public Node bstify(ListNode head, ListNode tail) {
	if (head == tail) return null;
	
	// get mid
	ListNode mid = head, fast = mid.next;
	while (fast != tail && fast.next != tail) {
		mid = mid.next;
		fast = fast.next.next;
	}
	// get left and right
	Node node = new Node(mid.val);
	node.left = bstify(head, mid);
	node.right = bstify(mid.next, tail);
	
	return node;
}
```
TC : ` O(nlogn) `
SC : ` O(1), O(log n) - stack `

- `nlogn` complexity, because we have to traverse sub-lists to find `mid` of max size `n`,  and we have to do this `logn` times
- basically like merge sort, we have to perform merge operation on 2 arrays of max size n logn times


## Inorder O(n) Solution
``` java
ListNode list;

public TreeNode sortedListToBST(ListNode head) {
	list = head;
	int size = 0;
	for (; head != null; size++) head = head.next;
	return inorderBstify(0, size-1);
}

// [start, end]
public TreeNode inorderBstify(int start, int end) {
	if (start > end) return null;
	int mid = start + (end - start) / 2;
	
	TreeNode left = inorderBstify(start, mid - 1);
	TreeNode curr = new TreeNode(list.val); list = list.next;
	TreeNode right = inorderBstify(mid + 1, end);
	
	curr.left = left;
	curr.right = right;

	return curr;
}
```
TC : ` O(n) `
SC : ` O(1), O(log n) - stack 

## Notes
- Better Solution : O(n)
- we go left till the we reach the first node of the list, and then inorder traverse, the bst, and linear traverse the Linked List `list = list.next` 🤷‍♂️. simple!

## Iterative Inorder Solution
#todoleetcode 
just like 
[[1008. Construct Binary Search Tree from Preorder Traversal]]