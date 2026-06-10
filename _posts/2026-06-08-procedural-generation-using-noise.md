---
layout: post
title: Procedural Generation Using Random Noise
date: 2026-06-08 11:05 -0400
categories: [Procedural Generation, Mapping]
tags: [Noise, Math]
---
<script src="{{ 'assets/js/noisedemos/noise-utility.js' | relative_url }}"></script>
<script src="{{ 'assets/js/noisedemos/perlin-noise.js' | relative_url }}"></script>
<script src="{{ 'assets/js/noisedemos/simplex-noise.js' | relative_url }}"></script>
<script src="{{ 'assets/js/noisedemos/value-noise.js' | relative_url }}"></script>
## Introduction
___
Random Noise is a rather hard concept to explain as there is no clean or obvious definition other than it being "Random". If you've ever seen an old tv lose signal or heard a radio that wasn't properly set to a station, you'll have seen/heard Noise. It is created by a pseudo-random algorithm that creates an infinite line of numbers that can be translated into data such as those white and black pixels on the screen or the random sound you hear from that radio.

{% include noisedemos/noise-demo-1.html %} 

One of the important things to understand about Random Noise is that its not technically random, it is pseudo-random, meaing the values are calculated using an algorithm that has set values used to manipulate/mangle the seed into becoming what you see above. One of the big benefits of Random Noise when it comes to procedural gnneration is that it is consistent and can be entirely calculated at compile time. Multiple people across mutliple devices in multiple countries could use the same exact seed, and it is gauranteed to be the same exact result while also having no runtime overhead. 

## Artifacts
___
Random Noise can be useful on it's own, potentially even working as an alternative to a standard random number generator. To learn more about this I highly recommend watching Squirrel Eiserloh presentation on Noise-Based RNG, he also invented Squirrel Noise which is what I used for the demo above (<https://www.gdcvault.com/play/1024365/Math-for-Game-Programmers-Noise>).

When looking at Random Noise, you'll notice small patterns and shapes that are typically referred to as "artifacts". When looking for a purely random result, we typically don't want to see artifacts that are too large or too consistent as they indicate a lack of randomness that we are trying to achieve. Gradient Noise on the other hand is designed to yield large amounts of similar looking artifacts in order to create randomized but consistent patterns. It's gradient noise that we use for procedural generation (typically) and that is what the premise of this article is based around. 

{% include noisedemos/noise-demo-2.html %} 

As you can see, gradient noise offers much larger and more defined artifacts than what you would get from random noise or value noise, which is essentially a blockier version of random noise designed to create some form of artifacting that can be used (although not to be confused with gradient noise, as they are indeed different). Both of these gradients however often have sharp changes in values as opposed to a smoother transition which we would want in many cases. This is where the concept of 'octaves' come into play which we will talk about next.

## Octaves
___
Gradient noise in its simplest form is ironically not very gradient, which can make for steep drop offs in values causing procedurally generated content to shift too heavily too fast. For example, if we try to generate height using the values we get from either the Perlin or Simplex noise above, we would get values that go from the height of 1, to the low of 0, in only a few pixels. Because of this we use the concept of octaves to smooth the frequency of the Noise we generate. 

{% include noisedemos/noise-demo-3.html %} 
