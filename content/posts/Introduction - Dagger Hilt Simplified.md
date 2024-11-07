---
title: Introduction - Dagger Hilt Simplified
date: 2023-11-27
tags:
  - Android
aliases: 
summary: Grab that dagger by the hilt! Get started with the basics of Hilt in Android.
image:
  src: "posts/attachments/article_preview_dagger_hilt_series.jpg"
  alt: ""
---
# Hi Developer 👋


Dagger and dependency injection are quite complex, but with hilt they don't have to be. Following is a series giving you a brief overview of various key topics in Dagger Hilt. 

Keep in mind this is **not a deep dive**. Just a quick series covering the most frequently used and fundamental dagger hilt concepts. With that said if you have always wanted to be **The Dumbledore of Dependency Injection with Digger Hilt**, you must read this series from beginning to end. Without further ado, this is, Dagger Hilt Simplified.  


![[posts/attachments/article_preview_dagger_hilt_series.jpg]]


[[posts/Introduction - Dagger Hilt Simplified|Introduction - Dagger Hilt Simplified]]

[[posts/Components in Hilt|Components in Hilt]]

[[posts/Dependency Binding in Hilt|Dependency Binding in Hilt]]

[[posts/Scoping in Hilt|Scoping in Hilt]]

[[posts/Demystifying Scoping in Dagger Hilt|Demystifying Scoping in Dagger Hilt]]



---




Dependency injection (DI) is a fundamental concept in software development, promoting loose coupling and facilitating testability and maintainability. Dagger Hilt, a part of the Dagger family, offers a streamlined approach to DI in Android development. In this article, we'll explore how to harness the power of Dagger Hilt to inject dependencies effortlessly into your Android projects.

## Setting Up Dagger Hilt

First things first, let's add Dagger Hilt to our project. We'll need to include the necessary dependencies in our `build.gradle` file:

```groovy
// Add Dagger Hilt dependencies
implementation 'com.google.dagger:hilt-android:2.40.5'
kapt 'com.google.dagger:hilt-compiler:2.40.5'
```

Once the dependencies are added, we're ready to dive into the world of dependency injection with Dagger Hilt.

## Initializing Dagger Hilt

The entry point to Dagger Hilt in an Android app is the `Application` class. By annotating our `Application` class with `@HiltAndroidApp`, we enable Dagger Hilt's code generation and set up the base class for our application:

```kotlin
@HiltAndroidApp
class MyApp : Application()
```

This annotation triggers Hilt's code generation, which includes a base class for our application that allows for dependency injection.

## Defining Modules

Modules in Dagger Hilt are used to provide dependencies to the object graph. We define a module using the `@Module` annotation and specify the dependencies using `@Provides` methods. For instance:

```kotlin
@Module
@InstallIn(ApplicationComponent::class)
object AppModule {

    @Provides
    @Singleton
    fun provideDataManager(): DataManager {
        return DataManager()
    }
}
```

Here, we've defined a module called `AppModule` and provided a singleton instance of `DataManager`.

## Scoping Bindings

To ensure that dependencies are created and destroyed appropriately, we can scope bindings within modules. Annotations like `@Singleton`, `@ActivityScoped`, etc., are used for this purpose. For instance:

```kotlin
@Module
@InstallIn(ApplicationComponent::class)
object AppModule {

    @Provides
    @Singleton
    fun provideDataManager(): DataManager {
        return DataManager()
    }
}
```

Here, `@Singleton` ensures that only one instance of `DataManager` is created throughout the application lifecycle.

## Injecting Dependencies

Once our dependencies are defined and scoped, we can inject them into our Android components using `@AndroidEntryPoint`. For example, in an `Activity`:

```kotlin
@AndroidEntryPoint
class MainActivity : AppCompatActivity() {

    @Inject
    lateinit var dataManager: DataManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Now, dataManager is available for use
    }
}
```

By annotating our `Activity` with `@AndroidEntryPoint` and declaring a field with `@Inject`, Dagger Hilt handles the dependency injection for us.

## Up Next

Dagger Hilt simplifies dependency injection in Android development, allowing for cleaner and more maintainable code. By following the steps outlined in this guide, you'll be well-equipped to leverage Dagger Hilt's capabilities in your projects. Happy injecting!

Read on about [[posts/Components in Hilt|Components in Hilt]] to learn more about the different components used in dagger to scope dependencies to



