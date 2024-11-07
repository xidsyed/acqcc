---
title: "GFG Merge k Sorted Arrays"
date: 2022-06-05
tags: [dsadeck, arrays, heap]
aliases:
- 
summary: "Solution to the problem: GFG Merge k Sorted Arrays"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 

---

## Solution
``` java
public class Node {  
   int index;  
   int[] arr;  
   Node (int index, int[] arr) {  
      this.index = index;  
      this.arr =  arr;  
   }  
}  
  
public ArrayList<Integer> mergeKArrays (int[][] arr, int K){
	// priority that compares the element at current index of arr
	PriorityQueue<Node> pq = 
		new PriorityQueue<Node>(Comparator.comparingInt((Node n) -> n.arr[n.index]));
	int len=0;
	// traverse arr to and add to priority queue nodes
	for (int[] subArr : arr) {
		// update length
		len+=subArr.length;
		// create node for subarray
		Node node = new Node(0, subArr);
		// add node to PQ
		pq.add(node);
	}
	
	ArrayList<Integer> result = new ArrayList<>(len);
	// while pq not empty
	while(!pq.isEmpty()){
		// remove min el
		Node minEl = pq.poll();
		// add min el to arr
		result.add(minEl.arr[minEl.index]);
		// reinsert minEl if index<length
		if(++minEl.index < minEl.arr.length) pq.add(minEl);
	}
	return result;
}

```

### Notes
- Use a Node Wrapper over each subarraay to track index
- Solve just like [[23. Merge k Sorted Lists]]

