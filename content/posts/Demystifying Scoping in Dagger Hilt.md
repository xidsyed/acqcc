---
title: Demystifying Scoping in Dagger Hilt
date: 2023-12-04
tags:
  - Android
aliases: 
summary: Scopes? Components?? Bindings??? Huh!
image:
  src: "posts/attachments/article_preview_dagger_hilt_series.jpg"
  alt: ""
---

# Demystifying Scoping in Dagger Hilt

So, you've decided to dive into the enchanting world of Dagger Hilt, eh? Buckle up, because we're about to unravel the mysteries of scoping in this magical realm. Picture yourself as a wizard casting spells to control the lifespan of your objects. Intrigued? Let's get started!

## Understanding Default Scoping in Dagger Hilt

First things first, let's talk about default scoping in Hilt. When you slap an `@Inject` on your constructor without any `@Module` or `@InstallIn`, Hilt just goes, "Eh, let's make this unscoped." What does that mean? Well, every time you summon that binding, Hilt conjures up a brand-spanking-new instance just for you. Think of it like ordering a fresh batch of cookies every time you crave a snack. 

```kotlin
//TweetRepository.kt
class TweetRepository @Inject constructor(){  
    fun getTweets() {  
        Log.d(TAG, "Tweets Received")  
    }  
}

//TweetApp
@HiltAndroidApp  
class TweetApp : Application() {  
    @Inject  
    lateinit var tweetRepository: TweetRepository  
  
    override fun onCreate() {  
        super.onCreate()  
        tweetRepository.getTweets()  
    }  
}
```

In this snippet, every time `getTweets()` is called, a new `TweetRepository` instance is whipped up faster than you can say "Abracadabra!"

## Scoped Bindings: Making Magic Happen

Now, let's talk about the real deal – scoped bindings. Hilt lets you sprinkle some magic dust and scope your bindings to a specific component. Imagine casting a spell to ensure that only one instance of a binding is summoned per component instance. That's what scoping does!

Take a gander at this table showcasing the scope annotations for each component:

![Hilt Scopes|475](https://i.imgur.com/cZJN8eb.png)

For instance, if you decide to scope your `AnalyticsAdapter` to the `ActivityComponent` using `@ActivityScoped`, Hilt makes sure you get the same instance of `AnalyticsAdapter` throughout the entire life of your activity. It's like having a loyal sidekick that sticks with you through thick and thin!

```kotlin
@ActivityScoped  
class AnalyticsAdapter @Inject constructor(private val service: AnalyticsService) { ... }
```

## Compatibility is Key: Matching Scopes and Components

Now, here's where things get a bit tricky. Can a component contain bindings with different scopes from itself? Nope, not in this magical realm. If you try to mix and match scopes like a reckless sorcerer, Dagger Hilt will give you a swift kick in the code with an `IncompatiblyScopedBindings` error. 

```kotlin
@Module  
@InstallIn(ActivityRetainedComponent::class)  
object MainModule {  
    @Provides  
    @ActivityScoped // Oops, error incoming!  
    fun getScopedBinding(): StateA = StateA(++counterA)  
  
    @Provides  
    fun getUnscopedBinding() : StateB = StateB(++counterB)  
}
```

You see, trying to scope `ActivityScoped` bindings within an `ActivityRetainedComponent` is like trying to fit a square peg into a round hole – it just won't work!

## Components vs. Bindings: Clarifying the Scope Game

Alright, let's address the elephant in the room. Do components provide scope to the bindings? Nah, not really. Components are like the stage where all the magic happens, but they don't decide the scope of your bindings. You can have both scoped and unscoped bindings coexisting within a component. 

Scoped bindings are like the VIPs of the party – they get special treatment and stick around throughout the component's lifetime. Meanwhile, unscoped bindings are like the regular folks, popping in and out as needed.

Warning, They can be quite memory intensive cuz they stick around till the components life-time whether they are needed or not. so use them sparingly.


```kotlin
var counterA = 0
var counterB = 0

data class StateA (val value : Int)
data class StateB (val value : Int)

@Module
@InstallIn(ActivityRetainedComponent::class)
object MainModule {
    @Provides
    @ActivityRetainedScoped
    fun getScopedBinding(): StateA = StateA(++counterA)

    @Provides
    fun getUnscopedBinding() : StateB = StateB(++counterB)
}


```

`MainActivity.kt`
```kotlin

@AndroidEntryPoint
class MainActivity : ComponentActivity() {

    @Inject
    lateinit var stateA: StateA
    @Inject
    lateinit var stateB: StateB

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            XtractinatorTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background
                ) {
                    val valueA: Int by remember { mutableStateOf(stateA.value) }
                    val valueB: Int by remember { mutableStateOf(stateB.value) }
                    ShowState(valueA, valueB)
                }

            }
        }
    }
}

@Composable
fun ShowState(valueA: Int, valueB: Int) {
    var showStateVal by rememberSaveable { mutableStateOf(false) }
    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.spacedBy(32.dp, Alignment.CenterVertically),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Box(
            modifier = Modifier
                .height(64.dp)
                .fillMaxWidth()
        ) {
            if (showStateVal) {
                Text(text =
                        "State A Value (Scoped)   : $valueA \n"+
                        "State B Value (Unscoped) : $valueB",
                    maxLines = 2,
                    modifier = Modifier.align(Alignment.Center))
            }
        }
        Button(
            onClick = { showStateVal = !showStateVal }
        ) {
            val string = if (showStateVal) "hide" else "show"
            Text(string)
        }
    }
}

```

In the above example , everytime the screen rotates, the unscoped binding is recreated, whereas the scoped binding is scoped to the `ActivityRetainedComponent` and stays the same

In the snippet above, every time your screen rotates, the unscoped binding (`StateB`) gets a makeover, while the scoped binding (`StateA`) remains as steadfast as a loyal companion.

## Conclusion: Becoming a Scoping Sorcerer

And there you have it, fellow wizards! You're now equipped with the knowledge to wield scoping powers in Dagger Hilt like a seasoned sorcerer. Remember, with great power comes great responsibility – so use your scoping wisely, and may your objects live long and prosper! Until next time, keep coding and conjuring those magical bindings! ✨🔮

After completing this series you may now consider yourself **The Dumbeldore of Dagger Hilt**. You'd be greatly mistaken of course, but you are free to do as you please but please remember what the wise man once said.

>To be the Dumbledore of anything is no easy task, one must read the documentation and suffer greatly 
>
– Wise Man 

Hf. Enjoy. 