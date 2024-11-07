---
title: "GFG Reverse Doubly Linked List"
date: 2022-06-27
tags: [dsadeck, linkedlist]
aliases:
- 
summary: "Solution to the problem: GFG Reverse Doubly Linked List"
image:
  src: "dsa/attachments/dsa-problem-default-image.jpg"
  alt: ""
---

## Problem Statement


Pattern: 

---

## Solution
``` java
public static Node reverseDLL(Node  head)
{
    //Your code here
    Node prev = null;
    
    while (head != null) {
        // store next
        Node next = head.next;
        
        // swap prev & next
        head.next = prev;
        head.prev = next;
                    
        // increment prev & head                        
        prev = head;
        head = next;
    }
    return prev;
    // return last node
}
```

### Notes
- 

