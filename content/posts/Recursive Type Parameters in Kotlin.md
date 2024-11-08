---
title: Recursive Type Parameters in Kotlin
date: 2024-10-09
tags:
  - android
aliases:
  - whos-your-father
summary: Recursive Type Parameter | Short Post
image:
  src: posts/attachments/russian_dolls.png
  alt: Nested Russian Dolls
---

> Generic Sub-Type of Generic Sub-Type of Generic Sub-Type of Generic Sub-Type...


![Nesting Gif](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTk3ZGszdjEyeG53d255MTIwZnc3bjFrM3BwZm56Z2R4bmtiYmlxaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hoqpjo9wx6dntE2ZSj/giphy.gif)

## The Problem: Typing a Tree Structure

When I first started working on a tree-like data structure in Kotlin, I encountered a challenging typing issue. I wanted to create a generic `TreeNode` interface that could be implemented by various node types, while still allowing type-safe access to child nodes.

Here's a simplified version of what I initially tried:

```kotlin
interface TreeNode {
    val children: List<TreeNode>
}

class FileNode(val name: String, override val children: List<TreeNode>) : TreeNode

class DirectoryNode(val path: String, override val children: List<TreeNode>) : TreeNode
```

## The Initial Approach and Its Shortcomings

This seemed fine at first, but problems quickly arose when I tried to work with child nodes:

```kotlin
fun processDirectory(dir: DirectoryNode) {
    for (child in dir.children) {
        // We lose type information here!
        // child is of type TreeNode, not FileNode or DirectoryNode
        if (child is FileNode) {
            println(child.name)  // This works, but requires a cast
        } else if (child is DirectoryNode) {
            println(child.path)  // This also requires a cast
        }
    }
}
```

The main issue was that I lost specific type information when accessing child nodes. This led to several problems:

1. Frequent need for type checking and casting
2. Loss of compile-time type safety
3. Inability to call subclass-specific methods without casting

## Enter Recursive Type Parameters

After some research, I discovered recursive type parameters. Here's how they solved my problem:

```kotlin
interface TreeNode<T : TreeNode<T>> {
    val children: List<T>
}

class FileNode(
    val name: String,
    override val children: List<FileNode> = emptyList()
) : TreeNode<FileNode>

class DirectoryNode(
    val path: String,
    override val children: List<DirectoryNode> = emptyList()
) : TreeNode<DirectoryNode>
```

Now, I could write type-safe code without constant casting:

```kotlin
fun processDirectory(dir: DirectoryNode) {
    for (child in dir.children) {
        // child is now of type DirectoryNode
        println(child.path)  // No casting needed!
    }
}
```

## The Power of Recursive Type Parameters

Recursive type parameters are particularly useful when:

1. You're dealing with hierarchical or recursive data structures (like trees)
2. You want to maintain type information throughout the hierarchy
3. You need to enforce type consistency within a family of related classes

They're commonly used in:

- File system representations
- UI component hierarchies
- Abstract syntax trees in compilers
- Game entity hierarchies

Simply put, if you find yourself frequently casting child elements in a tree-like structure or losing valuable type information, you should consider using recursive type parameters.

---
## Conclusion

Recursive type parameters provided a powerful solution to my tree structure typing problems. They allowed me to maintain type safety and eliminate the need for constant casting, resulting in cleaner and more maintainable code. While they may seem complex at first, they're a valuable tool in any Kotlin developer's toolkit when dealing with hierarchical data structures.


