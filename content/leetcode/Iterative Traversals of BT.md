---
title: "Iterative Traversals of BT"
date: 2022-07-02
tags: [dsadeck, binarytrees]
aliases:
- 
summary: "Solution to the problem: Iterative Traversals of BT"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---
Pattern: 

---
For recrusive checkout:  [[Binary Tree#Traversals]]

## Preorder
[Binary Tree Preorder Traversal - LeetCode](https://leetcode.com/problems/binary-tree-preorder-traversal/submissions/)

`node -> left -> right`
``` java
public static List<Integer> preorderIterative (Node root) {
	List<Integer> res = new LinkedList<>();
	Stack<Node> stack = new Stack<>();
	
	if(root == null) return res;
	Node node = root;
	
	while(!stack.isEmpty() || node != null) {
		if(node!=null) {        // go left first
			stack.push(node);
			res.add(node.val);  // visit node
			node = node.left;
		}
		else {                  // then go right
			node = stack.pop();
			node = node.right;
		}
	}
	return res;
}
```

- while `node !=null` 
	- **keep adding to result and going left**
- `node == null` 
	- get prev root `node = stack.pop`  
	- **go right** `node = node.right` 


---

## Inorder
[Binary Tree Inorder Traversal - LeetCode](https://leetcode.com/problems/binary-tree-inorder-traversal/)

`left -> node -> right`
``` java
public static List<Integer> inorderIterative (Node root) {
	List<Integer> res = new LinkedList<>();
	Stack<Node> stack = new Stack<>();
	
	if(root == null) return res;
	Node node = root;
	
	while (!stack.isEmpty() || node != null) {
		if(node != null) {          // go left first
			stack.push(node);
			node = node.left;
		} else {                    // then go right
			node = stack.pop();
			res.add(node.val);      // add after all left children
			node = node.right;
		}
	}
	return res;
}
```
- Keep pushing to stack till node is not null 
	- go left `node = node.left`
- When node becomes null,  (left most node is reached)
	- pop from stack, add to result **(adding after all left children are traversed)**
	- go right `node = node.right`  


---


## Post Order
[Binary Tree Postorder Traversal - LeetCode](https://leetcode.com/problems/binary-tree-postorder-traversal/)
	
`left -> right -> node`
``` java
public static List<Integer> postorderIterative (Node root) {
	LinkedList<Integer> res = new LinkedList<>(); // (second stack)
	Stack<Node> stack = new Stack<>();
	
	if(root == null) return res;
	Node node = root;
	
	while(!stack.isEmpty() || node != null) {
		if(node != null) {      // go right first
			stack.push(node);
			res.push(node.val); // push before going to children
			node = node.right;
		} else {                // then go left
			node = stack.pop();
			node = node.left;
		}
	}
	return res;
}
```

