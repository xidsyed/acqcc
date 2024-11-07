---
title: One Time UI Events and Nested Navigation Madness in Compose
date: 2024-04-27
tags:
  - Android
  - JetpackCompose
aliases: 
summary: My (probably over-engineered) solution for navigation events in jetpack compose for nested navigation graphs, following the principles of UDF 
image:
  src: posts/attachments/russian_dolls.png
  alt: Nested Russian Dolls
---


# Hi, What is this?
> My (probably over-engineered) solution for navigation events in jetpack compose for nested navigation graphs, ~~following principles of UDF~~ in pursuit having the ViewModel be the single-source-of-truth for the View. 

To have the viewmodel be the single source of truth for the UI, it is the viewmodel's responsibility to notify the UI when a one-time-event such as navigation or an error dialogue has to be handled. However since often the UI is often the sole initiator of such events (such as a button click to go to the next screen), trying to stay true to this principle can be quite challenging, without passing around a bunch of lambdas with different `navcontrollers` for  navigation to all the individual components that could trigger the navigation logic


![[posts/attachments/russian_dolls.png]]


Instead of handling the navigation directly in the UI, by passing `NavControllers` around to child composables so they can invoke navigate on the controller, a cleaner and more idiomatic and a Unidirectional-Data-Flow-y way of doing that would be using viewmodel events.

Yes yes, despite google developers [denouncing one-time events as an anti-pattern](https://medium.com/androiddevelopers/viewmodel-one-off-event-antipatterns-16a1da869b95), a  lot of the internet, including myself remains unconvinced there's anything wrong with them considering both approaches require work-arounds and are equally safe.

Sending viewmodel events into channels is simple enough, but the problem arises when you have nested navigation graphs, in nested composables, that both need to listen to events, and process navigation events. I had  a couple of options

1. `Channel` is meant for a single consumer. Multiple consumers can consume events from a channel, but the events won't be replicate across the consumers. So in our case the wrong composable could receive a navigation event and discard it, or worse fail to navigate causing an error / crash
2. `SharedFlow` solves this problem by having a replay buffer which replicates the buffer values across all consumers. This solves the navigation event problem where events will always reach the right consumer. But the problem with this approach is that regular events like say 'Show Error' or 'Pop-up' will also be duplicated and consumed twice.
3. Consuming the channel / flow event at the parent, and then passing down a flow to the respective composables where they listen from events from their own parents. Could work but pointless and convoluted.

I finally settled on simply having 2 Navigation Channels one for the `NavigateMainEvent` and another for `NavigateBottomBarEvent`. Both subclassed from a `NavigationEvent` abstract class, which not only provides necessary parameters to be overwritten, but also common business logic such as picking the correct `navGraph` to send events based on the `Screen` chosen for the navigation, and performing the navigation itself based on the route, arguments and nav controller


# ViewModel and Events
`NavigationEvent.kt`
```kotlin
abstract class NavigationEvent {
    abstract val screen: Screen
    abstract val arguments: List<String>
    abstract val popBackStack: Boolean
    val navGraph: NAVGRAPH by lazy {
        when (screen) {
            Screen.Home, Screen.Details -> NAVGRAPH.MAIN
            Screen.PopularMovieList, Screen.UpcomingMovieList -> NAVGRAPH.BOTTOMBAR
        }
    }
    fun navigate(navController: NavController) {
        val route = screen.route +
                if (arguments.isNotEmpty()) "/" + arguments.joinToString("/") else ""
        if (popBackStack) navController.popBackStack()
        navController.navigate(route)
    }
}

enum class NAVGRAPH {
    MAIN, BOTTOMBAR
}
```

`MovieListUiEvent.kt`
```kotlin
sealed interface MovieListUiEvent {
    data class Paginate(val category: MovieListCategory) : MovieListUiEvent
    data class Navigate(
        override val screen: Screen,
        override val arguments: List<String> = emptyList(),
        override val popBackStack: Boolean = false
    ) : MovieListUiEvent, NavigationEvent()
}
```

`ViewModelEvent.kt`
```kotlin
data class ViewModelNavigateMainEvent(  
    override val screen: Screen,  
    override val arguments: List<String>,  
    override val popBackStack: Boolean  
) : NavigationEvent()  
  
data class ViewModelNavigateBottomBarEvent(  
    override val screen: Screen,  
    override val arguments: List<String> = emptyList(),  
    override val popBackStack: Boolean = false  
) : NavigationEvent()  
  
  
fun MovieListUiEvent.Navigate.toNavigateMainEvent(): ViewModelNavigateMainEvent {  
    return ViewModelNavigateMainEvent(  
        screen,  
        arguments,  
        popBackStack,  
    )  
}  
  
fun MovieListUiEvent.Navigate.toNavigateBottomBarEvent(): ViewModelNavigateBottomBarEvent {  
    return ViewModelNavigateBottomBarEvent(  
        screen,  
        arguments,  
        popBackStack,  
    )  
}
```


# Usage

## Ui Events Production
`BottomNavigationBar.kt`
```kotlin
@Composable
fun BottomNavigationBar(onEvent: (MovieListUiEvent.Navigate) -> Unit) {
    val items = listOf(
        BottomNavItem(Screen.PopularMovieList,  ...),
        BottomNavItem(Screen.UpcomingMovieList, ...),
    )

    var selectedIndex by rememberSaveable { mutableIntStateOf(0) }

    NavigationBar {
        Row(
            modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            items.forEachIndexed { index, bottomNavItem ->
                Add(bottomNavItem, index, selectedIndex) {
                    selectedIndex = index    // TODO : Receive from VM
                    onEvent(
                        MovieListUiEvent.Navigate(
                            screen = bottomNavItem.screen,
                            popBackStack = true
                        )
                    )
                }
            }
        }
    }
}

data class BottomNavItem(  
    val screen: Screen, val title: String, val icon: ImageVector  
)
```

`MovieListItem.kt`
```kotlin
@Composable  
fun MovieListItem(movie: Movie, onEvent : (MovieListUiEvent.Navigate) -> Unit) { 
    Column(modifier = Modifier 
		.clickable {  
            onEvent(MovieListUiEvent.Navigate(screen = Screen.Details, arguments = listOf("${movie.id}")))  
        })
	{
		...
	} 
}
```

## Consumption
`ObserveAsEvents.kt`
```kotlin
@Composable
fun <T> Flow<T>.ObserveAsEvents(onEvent: suspend (T) -> Unit) {
    val lifecycleOwner = LocalLifecycleOwner.current
    LaunchedEffect(this) {
        lifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) {
            withContext(Dispatchers.Main.immediate) {
                collect { event: T -> onEvent(event) }
            }
        }
    }
}
```

`HomeScreen.kt`
```kotlin
fun HomeScreen(viewModel: MovieListViewModel) {  
    val state = viewModel.movieListState.collectAsStateWithLifecycle().value  
    val snackbarHostState = remember { SnackbarHostState() }  
  
    Scaffold(  
        snackbarHost = {...},  
        topBar = {...}, bottomBar = {  
            BottomNavigationBar(  
                onEvent = viewModel::onUiEvent  
            )  
        }) {  
        Box(  
            modifier = Modifier  
                .fillMaxSize()  
                .padding(it)  
        ) {  
            val bottomNavController = rememberNavController()  
  
            viewModel.bottomNavEventFlow.ObserveAsEvents{ event ->  
                event.navigate(bottomNavController)  
            }
		}
	}
}
```

`MainActivity.kt`
```kotlin
@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            Theme {
                Surface(
                    modifier = Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background
                ) {
                    val navController = rememberNavController()
                    val viewModel = hiltViewModel<MovieListViewModel>()

                    viewModel.mainNavEventFlow.ObserveAsEvents { event ->
                        event.navigate(navController)
                    }

                    NavHost(navController, startDestination = Screen.Home.route) {
                        composable(Screen.Home.route) {
                            HomeScreen(viewModel)
                        }
                        composable(
                            route = Screen.Details.route + "/{movieId}",
                            arguments = listOf(
                                navArgument("movieId") { type = NavType.IntType }
                            )) {
                            DetailsScreen()
                        }
                    }
                }
            }
        }
    }

```

This is all very basic and bare-bones. But it seemed like a reasonable solution to my problem was begging to be over-engineered. So i gave it my all. 

✌️✌️✌️


---
## Update
In hindsight, a simpler solution could have been used to handle the navigation in the `View` layer itself by passing the `onNavigationEvent` lambdas to child composables as needed.

This solution is hacky, rigid and needlessly complex, all in pursuit of having the viewmodel by the single-source-of-truth. Pls don't use it on your projects 😅