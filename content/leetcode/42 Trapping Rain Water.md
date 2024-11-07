---
title: "42 Trapping Rain Water"
date: 2022-06-07
tags: [dsadeck, arrays, tboptimised]
aliases:
- 
summary: "Solution to the problem: 42 Trapping Rain Water"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 

---

## Solution
``` java
public int[] getWaterHeight (int[] arr, int n) {
	int end = 0, start = 0;
	int[] waterHeight = new int[n];
	
	while(end < n-1) {
		end++;
		// if taller block found
		if(arr[end] >= arr[start]){
			// store start height
			int wh = arr[start];
			// rewrite waterHeight[start] upto end with wh
			while (start < end)	waterHeight[start++] = wh;
		}
	}
	System.out.printf("Water Height: " + Arrays.toString(waterHeight));
	// ptr to traverse backwards
	int mid = end;
	while (mid > start) {
		mid--;
		// if mid-block is greater
		if (arr[mid] > arr[end]) {
			// store end height
			int wh = arr[end];
			// rewrite waterHeight[end] upto mid with wh
			while (end > mid) waterHeight[end--] = wh;
		}
	}
	System.out.printf("Water Height: " + Arrays.toString(waterHeight));
	return waterHeight;
}

public int trap (int[] arr){
	int n = arr.length;
	int [] waterHeight = getWaterHeight(arr, n);
	int volume = 0;
	for (int i = 0; i < n; i++) {
		long water = waterHeight[i] - arr[i];
		if(water > 0) volume += water;
	}
	return volume;
}
```

### Notes
- Optimised Solution Can Solve the problem with 2 pointers at the start and end of the array


### Optimise Solution
By gaurav
``` cpp
long long trappingWater(int arr[], int n) {
    int minHeight = 0, i = 0, j = n - 1;
    long long ans = 0;
    while (i < j) {
        minHeight = max(minHeight, min(arr[i], arr[j]));
        if (arr[i] < arr[j]) {
            if (arr[i] < minHeight) ans += (minHeight - arr[i]);
            i++;
        } else {
            if (arr[j] < minHeight) ans += (minHeight - arr[j]);
            j--;
	}	}
    return ans;
}
```
