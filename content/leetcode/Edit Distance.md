---
title: "Edit Distance"
date: 2022-08-20
tags: [dsadeck, strings]
aliases:
- 
summary: "Solution to the problem: Edit Distance"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 
Related: [[1143. Longest Common Subsequence]]

---

## Solution
``` java
Integer[][] cache;

int dp(char[] edit, char[] target, int n1, int n2) {
	// base condition
	if (n1 < 0 || n2 < 0) return (n1 >= n2) ? n1 + 1 : n2 + 1;
	if(cache[n1][n2] != null) return cache[n1][n2];

	// same character
	if (edit[n1] == target[n2]) return cache[n1][n2] = dp(edit, target, n1 - 1, n2 - 1);


	int replace = dp(edit, target, n1 - 1, n2 - 1) + 1;
	int insert = dp(edit, target, n1, n2 - 1) + 1;
	int delete = dp(edit, target, n1 - 1, n2) + 1;

	return cache[n1][n2] = Math.min(replace, Math.min(insert, delete));
}


public int minDistance(String word1, String word2) {
	char[] edit = word1.toCharArray();
	char[] target = word2.toCharArray();
	cache = new Integer[edit.length + 1][target.length + 1];
	return dp(edit, target, edit.length - 1, target.length - 1);
}
```
TC : $n1 * n2$
SC : $n1 * n2$

### Notes
We have 2 strings, `edit`, we pick anyone that we will transform, and `target`, the other one we transfer into. If we, 
- Shift pointers of both fwd
	- add 1 to the solution -> character has been replace

### Relevant
Different types of edit distance allow different sets of string operations. For instance:
-   The [Levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance "Levenshtein distance") allows deletion, insertion and substitution.
-   The [longest common subsequence](https://en.wikipedia.org/wiki/Longest_common_subsequence "Longest common subsequence") (LCS) distance allows only insertion and deletion, not substitution.
-   The [Hamming distance](https://en.wikipedia.org/wiki/Hamming_distance "Hamming distance") allows only substitution, hence, it only applies to strings of the same length.
-   The [Damerau–Levenshtein distance](https://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance "Damerau–Levenshtein distance") allows insertion, deletion, substitution, and the [transposition](https://en.wikipedia.org/wiki/Transposition_(mathematics) "Transposition (mathematics)") of two adjacent characters.
-   The [Jaro distance](https://en.wikipedia.org/wiki/Jaro_distance "Jaro distance") allows only [transposition](https://en.wikipedia.org/wiki/Transposition_(mathematics) "Transposition (mathematics)").

The [Levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance "Levenshtein distance") between "kitten" and "sitting" is 3. A minimal edit script that transforms the former into the latter is:
1.  **k**itten → **s**itten (substitute "s" for "k")
2.  sitt**e**n → sitt**i**n (substitute "i" for "e")
3.  sittin → sittin**g** (insert "g" at the end)

LCS distance (insertions and deletions only) gives a different distance and minimal edit script:
1.  **k**itten → itten (delete "k" at 0)
2.  itten → **s**itten (insert "s" at 0)
3.  sitt**e**n → sittn (delete "e" at 4)
4.  sittn → sitt**i**n (insert "i" at 4)
5.  sittin → sittin**g** (insert "g" at 6)

for a total cost/distance of 5 operations.