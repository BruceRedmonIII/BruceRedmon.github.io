---
layout: post
title: Bitboards
date: 2026-05-31 13:18 -0400
categories: [Performance, Mapping]
tags: [Chess, Boardgames]
---
<script src="{{ 'assets/js/bbdemos/bb-utility.js' | relative_url }}"></script>
## Introduction
For the sake of this article I will be using certain terminology that may not be accurate to the boardgame itself, but is an accurate way of thinking about how bitboards work. A location in the game will be refered to as a ***square*** and any action a player makes will be considered their ***move***. Lastly, A ***bit*** is the smallest readable amount of data resulting in only 2 values, a 0 and a 1, which many of you may know, but is very important to understand before reading this article. Next we will dive into what a bitboard actually is, what their used for, and why exactly their chosen despite the mass amounts of boilerplate they ultimately come with.

## What is a bitboard?
Bitboards are a highly performative method of representing a board/map typically used for boardgames in cases where extreme performance is needed. The idea is that you use a single bit to represent the location and status of that a square. If we take 9 bits for example, we can represent the occupied locations in a game of tic-tac-toe, such as the demo below.
 ***(No the game is not winnable yet, that is on purpose as we will talk about how to do that later)***

{% include bbdemos/ttt-demo-1.html %} 

While this board doesn't give us all the required information to understand the current state of the game, it does provide us with some utility. For example, we can easily understand whos turn it is based on the amount of bits that have been set, if it is an odd amount, then it is currently O's turn. We can also flip the values on the board, allowing us to understand what squares are available to be played. While we get some information from a single occupied bitboard; we will need at-least 1 more in order to have a game state that is usable.

This is where we start to use bitwise operations in order to calculate information instead of needing to store and update it manually. In this case, we can simply take a single players moves and store them onto a seperate board which we can then use to fully understand the current game state. In the following demo I simply used the same program, except set an addition bit on a seperate board everytime X makes a move. If we use the bitwise operator 'AND', we will get a result that only includes bits that both boards have set to 1, meaning we can reverse our X moves in order to get all the moves that O has made.

{% include bbdemos/ttt-demo-2.html %} 

While storing the entire gamestate in 18 bits is already a massive performance boost for features such as storing past game history, saving and loading, and running AI algorithms, it is only part of what makes bitboards so fast. Additionally, this concept can take complex rules/conditions and solve them in instantaneous speeds using what is referred to as a bitmask. We will apply this concept here in order to calculate our win condition.

## Bitmasking
A bit mask is essentially preset bits that we use specifically for bitwise operations. In this case, we need to have 8 bitmasks as there are 8 ways to win in a game of tic-tac-toe. 

{% include bbdemos/ttt-demo-3.html %} 

This concept completely removes the need to check precise locations along with multiple conditional statements, and instead perform an extremely fast comparison between the mask and the current players position.

{% include bbdemos/ttt-demo-4.html %} 

Each mask is easily adjustable, storable, and able to be set before the program has even compiled. Each mask is stored entirely outside of the game state itself as they never change during run time and aren't unique between games. 

## Under the Hood
While I provided nice visual representations for each demo, the actual code itself is a bit harder to follow. This is because the bits we set actually translatw from binary into readable integers. Below is what our win condition masks actually look like
```js
const winConditions = [
    0b000000111, // Row 1
    0b000111000, // Row 2
    0b111000000, // Row 3
    0b001001001, // Column 1
    0b010010010, // Column 2
    0b100100100, // Column 3
    0b100010001, // Diagonal \
    0b001010100  // Diagonal /
];
```
