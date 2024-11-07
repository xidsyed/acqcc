---
title: "Job Sequencing Problem"
date: 2022-07-15
tags: [dsadeck, greedy, heap]
aliases:
- 
summary: "Solution to the problem: Job Sequencing Problem"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement
[Job Sequencing Problem | Practice | GeeksforGeeks](https://practice.geeksforgeeks.org/problems/job-sequencing-problem-1587115620/1#)
``` java
class Job {
	int profit;
	int deadline;
	
	Job(int p, int d) {
		profit = p;
		deadline = d;
	}
}
```

Pattern: 

---
## Approach 1
[3.2 Job Sequencing with Deadlines - Greedy Method - YouTube](https://www.youtube.com/watch?v=zPtI8q9gvX8)

``` cpp
public:
static bool comp (Job a, Job b){
	 return a.profit > b.profit;
}
vector<int> JobScheduling(Job arr[], int n) 
{ 
	sort (arr, arr+n,comp);
	vector<bool> vis(n,false); 
	int jobcnt=0,maxprofit=0;
	for (int i=0; i< n; i++){
		for (int j=arr[i].dead-1; j>= 0; j--){
			 if (vis[j]) continue;
			 else 
			 {	 	
			 	vis[j]= true;
				maxprofit+= arr[i].profit;
				jobcnt++;
				break;
		 	}
	 	}			
 	}
 	return {jobcnt,maxprofit};
}
```


## Priority Queue Approach

``` java
public int[] JobScheduling(Job arr[], int n) {
	// min deadline array
	Arrays.sort(arr, Comparator.comparingInt(job -> job.deadline));
	// profit min-heap
	PriorityQueue<Job> pq = new PriorityQueue<>(Comparator.comparingInt(job -> job.profit));
	// accumulate 'n' max profit jobs for deadline of 'n'
	for (Job job : arr) {
		pq.add(job);
		while (pq.size() > job.deadline) pq.remove();
	}
	// calculate and return time and profit
	int time = 0, profit = 0;
	while(!pq.isEmpty()){
		profit +=pq.remove().profit;
		time++;
	}
	return new int[]{time, profit};
}
```

### Notes
- 

