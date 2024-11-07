---
title: gpt4 generates color palette
date: 2023-04-27
tags:
  - ai
summary: Is rewriting a 306 line syntax color profile intelligence
image:
  src: thoughts/attachments/robot-evening.jpg
  alt: robots taking an evening walk
---

## I asked GPT4 to create a lighter version of the Nord color profile

-   I seriously doubted it could do it. As intelligent as it is, playing with hexcodes, doesn't seem like a very easy task, without any additional tools, on top of that, it had to maintain **306 lines of code** in it's context, and copy it all line for line, without making a single error, only swapping out lighter hex values for darker ones as deemed necessary
-   Fully expecting it to crap itself after the 30th line or so, I decided to help it out a little and offered it 4 replacement 'darker' colors in exchange for the lighter ones

You can view my [complete discussion with GPT4](https://drive.google.com/file/d/1mxCscZBZv4HqRQJFX-gn_ptv0CRD4XIn/view?usp=share_link) , where I later on ask it to generate a completely new color palette, based on color descriptions, ask it to modify the hexes to incorporate different tones, and even asked it to walk me through the process. It derps a little at the very end, but when prompted with 'can you go back and fix the error you made', it fixes the answer.

## Impressions

What impressed me the most:

1.  It used my replacement colors, only where it deemed necessary.
2.  It compensated the brightness of all the other colors **tastefully**. You can't look at the final result, and suspect that it was not created by a human. It's almost too perfect!!
3.  No mistakes, all the other code as it is, first try.

Here are the results:

`_dark_syntax.scss` against dark background [![image](https://user-images.githubusercontent.com/26184016/234683393-44f46087-49ae-4b9a-9625-26323c94a4fa.png)

`_dark_syntax.scss` against white background ![image|625](https://user-images.githubusercontent.com/26184016/234683582-5a20cb49-3ab7-42f9-a00d-ea91c2abbfe6.png)
`gpt_4_generated_light_syntax.css` against white background ![image|625](https://user-images.githubusercontent.com/26184016/234683699-8d4390e9-0b51-4c95-944d-68dd69d33175.png)
These results, are not enough to cover all the colors included in the color profile. Will upload more.

Checkout the original and modified [css files](https://gist.github.com/xidsyed/cb545a50e157e73c60b52c810fadabdf) and test them out for yourself!