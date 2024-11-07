---
title: "919 · Meeting Rooms II"
date: 2022-07-15
tags: [dsadeck, intervals]
aliases:
- 
summary: "Solution to the problem: 919 · Meeting Rooms II"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement
==Leetcode Premium Problem== 
[919 · Meeting Rooms II - LintCode](https://www.lintcode.com/problem/919/)


Pattern: [[Pattern Activity Selection Problem]]
Related: [[986. Interval List Intersections]]

---

What do you have to do:
Find and return the max number of overlapping intervals. to do that, you cannot simply check if a new non-overlapping interval has started, and update count. you need to be aware of every interval that ahas started, and ended at a given point in time to increment or decrement `overlapCount` or `sim` at a given point in time, to get an accurate 

so either
- sort intervals comparing both start and end, the one with earliear start < earlier end < later start < later end
- then increse or decrease `sim` or `height` depending on overlap

or, break up the interval into points sort by val, then if it is `end < start`
- every start increment `sim++`
- every end decrement  `sim--`

## Solutions
DS used in problem
``` java
static class Interval {
	public int start;
	public int end;
	
	Interval(int s, int e) {
		this.start = s;
		this.end = e;
	}
}
```

### Verbose Slower Solution
``` java
static class Point implements Comparable<Point> {
	int val;
	boolean isStart;
	
	Point(int val, boolean start) {
		this.val = val;
		this.isStart = start;
	}
	
	@Override
	public int compareTo(Point p2) {
		Point p1 = this;
		int res = p1.val - p2.val;
		if (res == 0) {                                      // p1 = p2
			if (!p1.isStart && p2.isStart) res = -1;         // p1 < p2
			else if (!p2.isStart && p1.isStart) res = 1;   // p2 < p1
		}
		return res;
	}
}

public int minMeetingRooms(List<Interval> intervals) {
	ArrayList<Point> points = new ArrayList<>();
	// get interval start and end points
	for (Interval i : intervals) {
		points.add(new Point(i.start, true));
		points.add(new Point(i.end, false));
	}
	Collections.sort(points);
	
	// count simultaneous meetings
	int sim = 0, maxSim = 0;
	
	for (Point p : points) {
		if (p.isStart) sim++;
		else sim--;
		maxSim = Math.max(sim, maxSim);
	}
	
	// return max simultaneous meetings recorded
	return maxSim;
}
```
- Slow just becuase of the extra class, and `ArrayList<Point>` 
- Similiar to the [[Line Sweep Algorithm]] you extract and sort points from an interval, every time an interval starts, increment `sim` (which is the count of simultaneous intervals), and every time an interval ends `p.isStart == false` decrement `sim--`
- keep track of `maxSim` and return it

### Non-Verbose Faster Solution
``` java
public int minMeetingRooms(List<Interval> intervals) {
	int n = intervals.size();
	// get start and ending points of intervals
	int[] start = new int[n], end = new int[n];
	for (int i = 0; i < n; i++) {
		start[i] = intervals.get(i).start;
		end[i] = intervals.get(i).end;
	}
	Arrays.sort(start);
	Arrays.sort(end);
	
	// find max simultaneous intervals
	int sim = 0, maxSim = 0, s = 0, e = 0;
	while (s < n) {
		if (start[s] < end[e]) {
			s++;
			sim++;
		} else {
			e++;
			sim--;
		}
		// update maxSim
		maxSim = Math.max(sim, maxSim);
	}
	// return maxSim
	return maxSim;
}
```

- Same thing here but without the extra `Point` class
- extract all start and end pointers of intervals into a `start` and `end` array and sort them respectively
- whichever comes first (is smaller) `start[s]` or `end[e]` visit it
	- if start point comes first `if (start[s] < end[e])` then increment `sim` and increment start pointer `s`
	- else if `start[s] >= end[e]` even if start and end come together, end has precedence, since acc to the questions, if 2 meetings start and end at the same time, the ending meeting ends first.

## Similar Problem
