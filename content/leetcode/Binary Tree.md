---
title: "Binary Tree"
date: 2022-06-30
tags: []
aliases:
- 
summary: "Solution to the problem: Binary Tree"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

# Build Tree Preorder
``` java
// Build Tree - Preorder
public Node buildTree(int[] nodes) {
	idx++;
	
	if (nodes[idx] == -1) return null;
	
	Node newNode = new Node(nodes[idx]);
	newNode.left = buildTree(nodes);
	newNode.right = buildTree(nodes);
	
	return newNode;
}
```


# Traversals
``` java
// Preorder Traversal - root first
public static void preorder(Node root) {
	if (root == null) return;
	
	System.out.print(root.val + " ");
	preorder(root.left);
	preorder(root.right);
}

// Postorder Traversal - root second
public static void inorder(Node root) {
	if (root == null) return;
	
	inorder(root.left);
	System.out.print(root.val + " ");
	inorder(root.right);
}

// Inorder Traversal - root last
public static void postorder(Node root) {
	if (root == null) return;
	
	postorder(root.left);
	postorder(root.right);
	System.out.print(root.val + " ");
}


// LevelOrder Traversal - iterative using queue
public static void levelorder(Node root) {
	// Create & add root to q
	Queue<Node> q = new LinkedList<>();
	q.add(root);
	q.add(null);
	
	// edge case
	if (root == null) return;
	
	while (!q.isEmpty()) {
		Node node = q.remove();
		// Data Node
		if (node != null) {
			System.out.print(node.val + " ");
			if (node.left != null) q.add(node.left);
			if (node.right != null) q.add(node.right);
		}
		// Null Node && q Not Empty
		else if (!q.isEmpty()) {
			q.add(null);
			System.out.print("\n");
		}
	}
}
```

# Level Order Traversals

## Iterative Queue O(n)
``` java
public ArrayList<Integer> levelOrder (Node root) {
	if(root == null) return new ArrayList<Integer>();
	// result list
	ArrayList<Integer> res = new ArrayList<>();
	
	// queue to iterate over BT
	Queue<Node> q = new LinkedList<Node>();
	q.add(root);
	while (!q.isEmpty()) {
		Node node = q.poll();
		res.add(node.val);
		
		if(node.left != null) q.add(node.left);
		if(node.right != null) q.add(node.right);
	}
	return res;
}
```

## Iterative Queue O(n) Print with next line
``` java
public levelOrderBottom(TreeNode root) {
	if(root == null) return res;
	Queue<TreeNode> q = new LinkedList<TreeNode>();
	q.add(root);
	while (!q.isEmpty()) {
		int size = q.size();
		while(size-- > 0) {
			TreeNode node = q.poll();
			System.out.println(node.val + " ")
			if(node.left != null) q.add(node.left); 
			if(node.right != null) q.add(node.right); 
		}
		System.out.println("\n")
	}
	return res;
}
```

## Iterative return ArrayList
``` java
public List<List<Integer>> levelOrderBottom(TreeNode root) {
	
	List<List<Integer>> res = new ArrayList<>();
	if(root == null) return res;

	Queue<TreeNode> q = new LinkedList<TreeNode>();
	q.add(root);
	while (!q.isEmpty()) {
		int size = q.size();
		ArrayList<Integer> level = new ArrayList<>();
		while(size-- > 0) {
			TreeNode node = q.poll();
			level.add(node.val);
			if(node.left != null) q.add(node.left); 
			if(node.right != null) q.add(node.right); 
		}
		res.add(level);
	}
	return res;
}
```


## Recrusive O(n^2)
``` java
ArrayList<Integer> res;

public ArrayList<Integer> levelOrder (Node root){
	res = new ArrayList<>();
	int height = BinaryTree.height(root);
	for (int i = 1; i <= height; i++) {
		printLevel(root, i);
		res.add(null);    // null for next line
	}
	return res;
}

private void printLevel(Node root, int level) {
	// Base Cases
	if (root == null) return;
	if(level == 1) {
		res.add(root.val);
		return;
	}
	// recurse for left and right
	printLevel(root.left, level-1);
	printLevel(root.right, level-1);
}
```
