---
title: "FInd String in Grid"
date: 2022-08-28
tags: [dsadeck, strings]
aliases:
- 
summary: "Solution to the problem: FInd String in Grid"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 

---

## Solution
``` java
public int[][] searchWord(char[][] grid, String word)
{
	// Code here
	int [] x = new int[] {0, 1, 1, 1, 0, -1, -1, -1};
	int [] y = new int[] {1, 1, 0, -1, -1, -1, 0, 1};
	
	int n = grid.length, m = grid[0].length, len = word.length();
	ArrayList<Integer[]> res = new ArrayList<>();
	
	for (int i = 0 ; i < n ; i++ ) {
		for(int j = 0 ; j < m ; j++) {
			// for each cell, traverse 8 directions
			for(int dir = 0 ; dir < 8 ; dir++) {
				int r = i, c = j, idx = 0;
				while (idx < len && r > -1 && r < n && c > -1 && c < m) {
					if(word.charAt(idx) != grid[r][c]) break;
					r += x[dir]; c += y[dir]; idx++;
				}
				if(idx == len) res.add(new Integer[] {i, j});
			}
		}
	}
	// convert to int[][]
	int [][] result = new int[res.size()][2];
	int i = 0;
	for(Integer[] pair : res) {
		result[i][0] = pair[0];
		result[i][1] = pair[1];
		i++;
	}
	return result;
}
```
TC : $O(n*m*len)$
SC : $O(1)$

### Notes
- for every cell, traverse all 8 directions and if theres a match add it to result




