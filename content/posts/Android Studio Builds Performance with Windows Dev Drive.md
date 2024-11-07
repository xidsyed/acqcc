---
title: Android Studio Builds Performance with Windows Dev Drive
date: 2023-11-20
tags:
  - "#Android"
  - "#Performance"
  - "#Experiment"
aliases: 
summary: Switch your android projects to dev drive now! Or should you?
image:
  src: "posts/attachments/article_preview_dev_drive.jpg"
  alt: "Android X Dev Drive"
---
![[posts/attachments/article_preview_dev_drive.jpg]]

Performance has always been a huge pain point for android developers, both in apps and in the IDE. Its is not an uncommon for developers to clone an android project, and wait for 5-10 mins for Android Studio to download and index all the libraries, and let Gradle build the project for the  first time, only to have Android Studio screw up out of nowhere🙂. Time to invalidate the caches and restart, all over again.

So I was pretty excited when I found out that Microsoft has recently released a [new feature](https://devblogs.microsoft.com/visualstudio/devdrive/) specifically for us developers that helps address this very problem. At least that's what i thought at the time, three days ago. I still do. Mostly. But the initial optimism and curiosity has mostly withered away. 


So instead of telling you about all the [different ways gradle caches](https://proandroiddev.com/gradle-cache-your-builds-best-friend-4970ad32420e) the intermediate products of the build process, or where the [different caches are located and what happens when you clear them](https://www.aldebaran.com/developer-center/articles/Sync-gradle-invalidate-cache-restart/index.html#synchronise-your-gradle-files-and-get-some-insight-about-the-android-studio-cache) , or how there is a lot of [conflicting information on the internet](https://stackoverflow.com/questions/23025433/how-to-clear-gradle-cache) on what works and when it doesn't, or [how Dev Drive works](https://devblogs.microsoft.com/engineering-at-microsoft/dev-drive-and-copy-on-write-for-developer-performance/) and what specifically would you need to do to see the greatest benefits, because I can't, because i haven't been able to fully understand it myself. I'm just gonna tell you about the *little* experiment I did to find the answer.

Before I tell you about what Dev Drive is and its promised benefits :

> For disk-bound operations such as cloning, building, copying files, and package restore, we measured average improvements in these operations around of 25%!

Let me first give you the super short ELI5 overview of what gradle is and what it does for the specific purposes of our little experiment.

Other than being annoying, throwing unhelpful and obscure error messages, happening to be the least fun, most boring, slowest thing about android development (shoutout live preview), and overall being the bane of my existence as an android developer, it is actually quite the nifty little software. It takes a lot of heavy lifting out of writing and distributing java applications like compiling, packaging, dependency management and testing to name a few.  It also does a lot of other cool things, like offer the ability to utilize plugins to make it easy for developers to customize their build processes to their needs, or perform custom specific tasks during the build process.

One of these really cool things it does is Incremental builds and caching which is relevant to our mission today. Microsoft has recently announced a new feature called Dev Drive which is supposed to enhance these particular workflows related to building, cloning and compiling projects for which they have published some very impressive numbers on their blogs. Most of these numbers however belong to C# and .NET related projects, with one **Gradle Build of the Spring Framework** showing a 24% improvement. They have claimed general improvements of about 25% around disk bound operations like cloning, building, copying files etc.

![[posts/attachments/dev_drive_microsoft_performance_graph.jpeg]]


All of this was sounding better and better, so I immediately went over to YouTube and searched 'Dev Drive' Performance Improvements, and sure enough there were a handful of videos showing faster build times, some up to 75%!

Staying true to  my cause I decided to look up the improvements in Android specific builds and workflows but I couldn't find any, save for [this reddit post](https://www.reddit.com/r/androiddev/comments/1468z8h/faster_builds_on_windows_11_with_dev_drives_has/) which wasn't very helpful. I took it upon myself to find the answer and share my findings with the community. All I had to do was enable **Dev Drive** on my laptop

The plan was plain and simple to build 3-4 builds on the C:/ Drive, then copy the project over to D:/ Drive and replicate the test. Finally compare the results. Simple enough right? :)

I used the following repositories to build and test them
1. [Imgurinator](https://github.com/xidsyed/imgurinator)
2. [Android Studio Benchmark](https://github.com/yozhik/AndroidStudioBenchmark)
3. [Now In Android](https://github.com/android/nowinandroid)

First one is an old project of mine where i use the [Imgur API](https://apidocs.imgur.com/) to create basic Imgur app

Second one is a standard Android Studio Benchmark widely used to compare the performance of various popular CPUs and Devices against each other by building the source code for the android Firefox Focus app.

The final repository is a showcase android app that uses all the latest android libraries like compose and coroutines, following the official *best practices*. A great study for someone looking to write clean code. 


## First round of tests
First round of tests went smoothly without much affair. I simply cloned the projects to my C Drive repository and 3 builds consecutive builds of the application, after running a cold-build for each project first.

The builds were run after clearing the local build caches each time, and `org.gradle.caching` was set to `false` in the `gradle.properties` file. To learn more about the gradle caches, there are some excellent [medium posts](https://proandroiddev.com/gradle-cache-your-builds-best-friend-4970ad32420e) and [stackoverflow threads](https://stackoverflow.com/questions/23025433/how-to-clear-gradle-cache) about clearing gradle build cache (yup, you read that right, but who am i kidding you'd rather just ask ChatGPT instead)

As much as i would love to delve into everything that I learnt about gradle builds and caches. I won't be writing about that today (mostly cuz I've forgotten most of it. It's been a few months since i did these tests, and never bothered to publish them 🥲 )


|                                 | First Build (Cold) | First Build | Second Build | Thrid Build |
| ------------------------------- | ------------------ | ----------- | ------------ | ----------- |
| Imgurinator  <br>C Drive        | 1m 57s             | 27s         | 22s          | 39s         |
| AS Benchmark  <br>C Drive       | 4m 53s             | 3m 15s      | 3m 20s       | 3m 13s      |
| Now In Android  <br>C Drive     | 6m 14s             | 2m 25s      | 2m 20s       | 2m 5s       |

These were the results of the build runs, fairly consistent results. Now to move the projects over to D:/ drive and perform the tests again. 

|                               | First Build (Cold) | First Build | Second Build | Thrid Build |
| ----------------------------- | ------------------ | ----------- | ------------ | ----------- |
| Imgurinator  <br>C Drive      | 1m 57s             | 27s         | 22s          | 39s         |
| Imgurinator  <br>Dev Drive    | 2m 7s              | 20s         | 14s          | 11s         |
| AS Benchmark  <br>C Drive     | 4m 53s             | 3m 15s      | 3m 20s       | 3m 13s      |
| AS Benchmark  <br>Dev Drive   | 4m 41s             | 3m 19s      | 3m 15s       | 3m 23s      |
| Now In Android  <br>C Drive   | 6m 14s             | 2m 25s      | 2m 20s       | 2m 5s       |
| Now In Android  <br>Dev Drive | 5m 41s             | 2m 11s      | 2m 19s       | 1m 49s      |


Aaaaaand... Hmmm. I was seeing some improvements but they weren't nearly as significant as Microsoft had *promised*. The new **ReFS** file format implemented in Dev Drive by Microsoft has been shown to improve performance, resilience and security. It's been used for ages by Microsoft on their server products.

After several minutes of wracking my brain i realized my first mistake, my *first of many mistakes*. I cloned the repositories but I had forgotten to copy the build caches. "But aren't the build caches stored on within the build directory of the projects modules in `module/build`?". Yes! but there also happens to be a **global gradle cache** that sits in the home directory of your device `/.gradle/caches`. After making this realization, I changed gradle home cache directory (by changing the `Path` environment variable in windows) to within the D:/ drive, and reran all the tests again


|                                 | First Build (Cold) | First Build | Second Build | Thrid Build |
| ------------------------------- | ------------------ | ----------- | ------------ | ----------- |
| Imgurinator  <br>C Drive        | 1m 57s             | 27s         | 22s          | 39s         |
| Imgurinator  <br>Dev Drive      | 2m 7s              | 20s         | 14s          | 11s         |
| Imgurinator  <br>Dev Drive 2    | 1m 52s             | 27s         | 20s          | 17s         |
| AS Benchmark  <br>C Drive       | 4m 53s             | 3m 15s      | 3m 20s       | 3m 13s      |
| AS Benchmark  <br>Dev Drive     | 4m 41s             | 3m 19s      | 3m 15s       | 3m 23s      |
| AS Benchmark  <br>Dev Drive 2   | 4m 21s             | 2m 43s      | 2m 37s       | 2m 37s      |
| Now In Android  <br>C Drive     | 6m 14s             | 2m 25s      | 2m 20s       | 2m 5s       |
| Now In Android  <br>Dev Drive   | 5m 41s             | 2m 11s      | 2m 19s       | 1m 49s      |
| Now In Android  <br>Dev Drive 2 | 6m                 | 2m 10s      | 2m 2s        | 1m 57s      |

The results I got this time, were all over the place. The numbers seem to be lower sometimes and higher other times arbitrarily. I'd rerun the same tests 10s of times and have a standard deviation of up to 20%!

After a lot more time (a whole day) spent i realized benchmarking isn't as simple as it seems. I would go on to realize several things affecting the results.


1. If I ran the test too quickly after one another, the second test result would be negatively affected. I realized pretty quickly that these tests were time consuming and quite demanding for my `Core-i5 8250U` laptop chip, and that my CPU was bound to be throttling before I even started the second test. 
   
   As I ran these tests in a closed rooms opening the windows for ventilation I realized that would effect the results as well 🥲. 
   
   The solution I came up with is having 2 mins for the CPU and the room to reach a standard ambient temperature. In 2 mins the CPU would cool down to and hover at 40 Degrees Celsius. This didn't make the testing any quicker.

2. Dormant background applications utilizing varying amounts of CPU and memory. Ensured i had killed all the applications from the task manager and re-ran the tests

3. Applications displaying UI on the screen, even the terminal size itself 😅 had an impact on the CPU usage. when the laptop was left without interruptions the screen would turn off by itself, which had a direct impact on the CPU / GPU usage of the device, affecting the benchmark results

4. The OpenJDK JVM and gradle daemons from previous projects consumed memory and CPU. So manually killed them before the cold build of every project.


After several hours, almost an entire day of trying to run an accurate benchmark i arrived at some reasonable numbers. I also decided to do 2 runs with `org.gradle.caching = true`, clear the cache and re-run for each project.


![[posts/attachments/dev_drive_final_benchmark_results.png.png]]

Calculating the averages and the improvement percentages of said averages gave the following interesting (or arbitrary)results.

![[posts/attachments/dev_drive_final_benchmark_improvement_results.png|400]]


What can we learn from this?

IDK.

We can certainly put it onto a pretty google sheets bar chart like so :

![[posts/attachments/dev_drive_bar_chart.png]]


Overall we see some improvements, but nothing groundbreaking. 

### Final Thoughts

Real life Benchmarks are harder than i thought. I should have probably picked bigger projects , or performed benchmarks on a more powerful machine where the bottleneck are the disk speeds.
For now I'll Go back to learning jetpack compose and looking for a job.

The advertised [performance mode](https://learn.microsoft.com/en-us/defender-endpoint/microsoft-defender-endpoint-antivirus-performance-mode) of  Dev Drive, doesn't work nearly as good as it should. It hinders build times significantly and you should always add exclusions for your project directories

In all the above cases the repo directory was excluded from Defender real-time antivirus scanning, a commonly deployed configuration. Testing was not done with the new performance mode of Defender antivirus also announced at Build.[Microsoft themselves](https://devblogs.microsoft.com/engineering-at-microsoft/dev-drive-and-copy-on-write-for-developer-performance/#:~:text=In%20all%20cases%20the%20repo%20directory%20was%20excluded%20from%20Defender%20real%2Dtime%20antivirus%20scanning%2C%20a%20commonly%20deployed%20configuration.) in their testing didn't use their own performance mode.



So to answer the question : **Should you (an android developer) take the hazardous and arduous task of splitting your existing drive into 2 volumes, and transferring all your android projects and gradle over to the dev drive?**

maybe. 
or just use a ~~mac~~ windows-on-arm.


### Authors Note :

The aim of this article is not to make the claim that Dev Drive's advertised capabilities are false. I have only tried benchmarking a handful number of projects. God knows I'm no benchmarking guru. I encourage and appreciate all the feedback. Feel free to reach out on my socials below.

This experiment was originally far more elaborate (embarrassingly so), since its been **a while** that i compiled the results, and didn't write down any of the details, I have forgotten most of them, hence the half-assed writing of the article : /.  I couldn't include most of the details about evolution of gradle caches, and how to clear them. Various articles explain how incremental builds work in gradle and build caches, and configuration caches etc. These would have been of great use to me while i was working on my 'built from scratch' anonymous social media a year lol. The CI/CD pipeline I had designed, was painfully slow. From what I've learnt, that could all have been improved significantly.

Oh well. Note to future self.  *In time, you will forget, so write it down.*
