---
title: "Count Customers Who Did Not Get A Computer"
date: 2022-09-25
tags: [dsadeck, strings]
aliases:
- 
summary: "Solution to the problem: Count Customers Who Did Not Get A Computer"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement
[Count Customers Who Did Not Get A Computer - Coding Ninjas Codestudio](https://www.codingninjas.com/codestudio/problems/count-customers-who-did-not-get-a-computer_1115775?leftPanelTab=0)

Strings version : [Function to find Number of customers who could not get a computer - GeeksforGeeks](https://www.geeksforgeeks.org/function-to-find-number-of-customers-who-could-not-get-a-computer/)

Pattern: 

---

## Solution
``` java
public static int countCustomers(ArrayList<Integer> arr, int k) 
{
	// Write your code here
	int occupied = 0, result = 0 ;
	HashMap<Integer, Integer> map = new HashMap<Integer, Integer>();
	
	for (int cus : arr) {
		// first time
		if(!map.containsKey(cus)) {
			map.put(cus, 0); 
			// if vacancy - mark vacancy
			if (occupied < k) {
				map.put(cus, 1);
				occupied++;
			}
		}
		// second time
		else {
			// if holding - mark vacant
			if (map.get(cus) == 1) {
				map.remove(cus);
				occupied--;
			}
			// else increment result
			else result++;
		}
	}
	return result;
}
```
TC : $O(n)$
SC : $O(n)$


