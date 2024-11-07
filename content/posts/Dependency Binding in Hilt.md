---
title: Dependency Binding in Hilt
date: 2023-12-02
tags:
  - Android
  - "#DaggerHiltIntroduction"
aliases: 
summary: Scopes? Components?? Bindings??? Huh!
image:
  src: "posts/attachments/article_preview_dagger_hilt_series.jpg"
  alt: ""
---
# Hi,

Dependency injection (DI) is a crucial aspect of modern software development, facilitating modularity, testability, and maintainability in your codebase. In Kotlin, Dagger stands out as a powerful tool for implementing DI efficiently. However, understanding the nuances between annotations like `@Inject`, `@Provides`, and `@Binds`, as well as comprehending the roles of modules, components, and dependency containers, can be daunting. Fear not! In this guide, we'll demystify these concepts and equip you with the knowledge to wield Dagger like a pro.

### `@Inject`, `@Provides`, and `@Binds`: Unraveling the Mystery

**1. `@Inject`:** This annotation is your best friend when you own the code. It elegantly marks constructors, signaling Dagger to handle their instantiation and dependency resolution. With `@Inject`, say goodbye to boilerplate code and unnecessary generated classes cluttering your project. It's like having a personal DI assistant at your service.

```kotlin
// Example of using @Inject
class UserManager @Inject constructor(private val userService: UserService) {
    // User manager functionality
}
```

In this example, the `UserManager` class is marked with `@Inject`, indicating to Dagger that it should be provided by DI, with its dependency `UserService` resolved automatically.

**2. `@Provides`:** When interfacing with code you don't own, `@Provides` steps in as the mediator. It's commonly used within modules to furnish instances of dependencies, ensuring seamless integration even with external libraries or frameworks.

```kotlin
// Example of using @Provides
@Module
object NetworkModule {
    @Provides
    fun provideRetrofit(): Retrofit {
        return Retrofit.Builder()
            .baseUrl("https://api.example.com/")
            .build()
    }
}
```

Here, the `NetworkModule` provides an instance of `Retrofit` using `@Provides`, allowing other parts of the application to inject `Retrofit` as a dependency.

**3. `@Binds`:** Interfaces, devoid of constructors, often left DI-less and forlorn, find solace in the arms of `@Binds`. This specialized annotation acts as a matchmaker, binding interfaces to their concrete implementations. While `@Provides` can achieve similar results, `@Binds` shines by trimming down generated code, minimizing build times in sprawling projects.

```kotlin
// Example of using @Binds
@Module
abstract class RepositoryModule {
    @Binds
    abstract fun bindsMyRepository(myRepository: MyRepositoryImpl): MyRepository
}
```

In this snippet, `RepositoryModule` binds `MyRepository` interface to its concrete implementation `MyRepositoryImpl`, facilitating DI without unnecessary boilerplate code.

### Modules, Components, and Dependency Containers: Navigating the Dependency Jungle

**Module:** Picture modules as artisans crafting dependencies. They're classes adorned with `@Module`, meticulously defining how objects are created and provided. Modules are indispensable, organizing bindings into cohesive units like `NetworkModule` or `DataModule`, ensuring your dependencies are well-structured and easily accessible.

```kotlin
@Module
object AppModule {
    @Provides
    fun provideContext(application: Application): Context {
        return application.applicationContext
    }
}
```

In this example, `AppModule` provides the application context using `@Provides`, ensuring the availability of the application context throughout the application.

**Component:** Enter the realm of components, orchestrators of DI symphonies. These entities define the scope and relationships between dependencies, offering lifecycles and scoping to the modules they encompass. In the realm of Dagger Hilt, components reign supreme, generating Android framework counterparts and orchestrating dependency injection with finesse.

```kotlin
@Singleton
@Component(modules = [AppModule::class, NetworkModule::class])
interface AppComponent {
    fun inject(activity: MainActivity)
}
```

Here, `AppComponent` aggregates `AppModule` and `NetworkModule`, defining the scope and lifecycle for their dependencies, and provides injection points for activities like `MainActivity`.

**Dependency Container:** Behold the enigmatic dependency container, the backstage manager of your DI opera. In Dagger Hilt's domain, these containers materialize magically, holding instances of objects and guiding their lifecycle with an invisible hand. While you don't summon them explicitly, they're omnipresent, silently orchestrating the injection ballet behind the scenes.

In summary, mastering Dagger's intricacies empowers you to wield DI with finesse, sculpting robust and maintainable codebases with ease. With `@Inject`, `@Provides`, and `@Binds` at your disposal, alongside a profound understanding of modules, components, and dependency containers, you're primed to conquer the realm of dependency injection in Kotlin like a true champion.

# Up next
Now, armed with this knowledge, venture forth, and let Dagger be your guiding light in the labyrinth of software development! How do you [[posts/Scoping in Hilt|scope dependencies to components]]? 

Funny you asked. I was thinking the exact same thing. 

Read On!