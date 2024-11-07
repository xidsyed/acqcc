---
title: "Merge 2 BSTs"
date: 2022-07-23
tags: [dsadeck, bst]
aliases:
- 
summary: "Solution to the problem: Merge 2 BSTs"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement
[Merge Two BSTs (codingninjas.com)](https://www.codingninjas.com/codestudio/problems/h_920474)


Pattern: 

---

## List Sort Solution
``` java
public ArrayList<Node> mergeLists(List<Node> l1, List<Node> l2) {  
   ArrayList<Node> nodes = new ArrayList<>();  
   int i = 0, j = 0;  
   while (i < l1.size() && j < l2.size()) {  
      if (l1.get(i).val <= l2.get(j).val) nodes.add(l1.get(i++));  
      else nodes.add(l2.get(j++));  
   }  
   while (i < l1.size()) nodes.add(l1.get(i++));  
   while (j < l2.size()) nodes.add(l2.get(j++));  
   return nodes;  
}  
  
public void dfs(Node root, ArrayList<Node> nodes) {  
   if (root == null) return;  
   nodes.add(root);  
   dfs(root.left, nodes);  
   dfs(root.right, nodes);  
}  
  
public Node inorderToBST(ArrayList<Node> nodes, int start, int end) {  
   if (start < end) return null;  
   int mid = (end - start) / 2 + start;  
   Node root = nodes.get(mid);  
   root.left = inorderToBST(nodes, start, mid - 1);  
   root.right = inorderToBST(nodes, mid + 1, end);  
   return root;  
}  
  
public Node merge(Node root1, Node root2) {  
   ArrayList<Node> nodes1 = new ArrayList<>();  
   ArrayList<Node> nodes2 = new ArrayList<>();  
   dfs(root1, nodes1);  
   dfs(root2, nodes2);  
   ArrayList<Node> nodes = mergeLists(nodes1, nodes2);  
   return inorderToBST(nodes, 0, nodes.size() - 1);  
}
```
TC : `O(m+n)`
SC : `O(m+n)`

## Optimal Solution
Convert both BST into Linked
``` java
Node list;

Node flatten(Node node, Node prev) {
	if (node == null) return prev;
	
	prev = flatten(node.right, prev);
	node.right = prev;
	prev = node;
	prev = flatten(node.left, prev);
	
	node.left = null;
	
	return prev;
}

Node merge(Node a, Node b) {
	Node dh = new Node(-1), dummy = dh;
	
	while (a != null && b != null) {
		if (a.val < b.val) {
			dummy.right = a;
			a = a.right;
		} else {
			dummy.right = b;
			b = b.right;
		}
		dummy = dummy.right;
	}
	
	if (a == null) dummy.right = b;
	else dummy.right = a;
	
	return dh.right;
}

int getSize(Node root) {
	int size = 0;
	while (root != null) {
		root = root.right;
		size++;
	}
	return size;
}

Node bstify(int start, int end) {
	if(start > end) return null;
	
	int mid = start + (end - start) / 2;
	
	Node left = bstify(start, mid - 1);
	Node curr = list; list = list.right;
	Node right = bstify(mid + 1, end);
	
	curr.left = left; curr.right = right;
	
	return curr;
}

public Node mergeBST(Node a, Node b) {
	// flatten to linked lists
	a = flatten(a, null);
	b = flatten(b, null);
	// Merge Lists
	list = merge(a, b);
	// Bstify LinkedList
	return bstify(0, getSize(list) - 1);
}
```
TC : `O(m+n)`
SC : `O(h1 + h2)`