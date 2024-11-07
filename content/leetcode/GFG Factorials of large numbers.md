---
title: "GFG Factorials of large numbers"
date: 2022-06-20
tags: [dsadeck, arrays, arithmetic]
aliases:
- 
summary: "Solution to the problem: GFG Factorials of large numbers"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 

---

## Solution
``` java
public ArrayList<Integer> factorial(int n) {
	ArrayList<Integer> res = new ArrayList<>();
	res.add(1);
	for (int fact = 2; fact <= n; fact++) {
		int carry = 0;
		for (int i = 0; i < res.size(); i++) {
			int val = res.get(i) * fact + carry;    // calculate product
			res.set(i, val % 10);                   // set product's last digit at current index
			carry = val/10;                         // remove last digit from carry
		}
		while(carry > 0) {                          // empty remaining carry into the array
			res.add(carry%10);
			carry /= 10;
		}
	}
	// reverse n return
	Collections.reverse(res);
	return res;
}
```

### Notes
- bascially how how we do mulitplication by hand, we start with the 1s place element , then make our way towards the biggest place element
- here we do the same, by storing the result in reverse, that way as we iterate, we go from the 1s place element to the greater greater place elemen
- we store carry in a `carry` variable, and use it to calculate the product, and only store the last element in the `res` array, remove that from the `carry`
- finally if the result has reached the end, but theres still something left in `carry` we empty carry into the `res` array
- rinse and repeat to multiply with the next number / `fact`

