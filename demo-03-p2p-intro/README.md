# Welcome to peer-to-peer browsing

Hi! I’m a “Hyperdrive” at [hyper://e3039d870239c71d5f1a4a6bd4e87e5078937a68fdb3650f258e605d9a2fe503/](hyper://e3039d870239c71d5f1a4a6bd4e87e5078937a68fdb3650f258e605d9a2fe503/)

## Introduction

In 2013, the **dat protocol**(`dat://`) was launched as an alternative protocol to the standard Hypertext Transfer Protocol (`http://` or `https://`). These protocols determine _how_ a website is accessed. The [dat project](https://docs.datproject.org/) sought to create a more decentralized approach to website access through direct computer-to-computer, or peer-to-peer connections. (Think bittorrent, Limewire.) Read more about [how dat works](https://datprotocol.github.io/how-dat-works/#introduction).

In May of 2020, **dat** was renamed to **hypercore**(`hyper://`), in order to consolidate efforts to maintain and develop the technology. [Read more about this transition here](https://blog.datproject.org/2020/05/15/dat-protocol-renamed-hypercore-protocol/). You can find documentation of [the hypercore protocol here](https://hypercore-protocol.org/).

**Beaker**, or the Beaker browser is a tool built to access and build p2p sites. Sites served via the hypercore protocol are called **hyperdrives**. The Beaker browser is capable of rendering any webpage: the way it reads website files is the same as any standard browser. (Technically, it’s built on Chromium, so it’s a version of Chrome.) You can create websites in the same way as you would with any other protocol; however with by hypercore protocol in Beaker browser, you also have access to [tools specific to Beaker](https://docs.beakerbrowser.com/#apis), such as the [API for sending/receiving messages from other peers visiting the site.](https://docs.beakerbrowser.com/apis/beaker.peersockets).


## Making P2P websites

You can use the beaker browser for managing your site files by going to  your [beaker://library/](beaker://library/) on your browser (think Github Desktop) or use the Terminal. To use the dat CLI

- Here is a demo the [Weather API](weather.html) from Lai’s example.
- Here is a standard p5 demo [p5 sketch](sketch.html) from a [Code Lab demo](https://github.com/RISD-Code-Lab/cl-spring2020/tree/master/session-07).

## Create a hyperdrive

- Setup a [new hyperdrive](https://docs.beakerbrowser.com/beginner/creating-new-hyperdrives)

- Setup an existing [local folder as a hyperdrive](https://docs.beakerbrowser.com/intermediate/syncing-with-folders) 
	- Note: if you are syncing a local folder, and you turn on autosync, any changes you save to your local files are automatically published! 

- [Fork an existing site](https://docs.beakerbrowser.com/advanced/forking-hyperdrives) to collaborate on the site. (This will most likely be the method you all will use to expand off of each other’s projects.)


### File structure

Your file structure in your website folder can be organized as any other site.

`index.json` houses the [metadata for your website](https://docs.beakerbrowser.com/developers/index.json-manifest)

You might also have a `.datignore` file. This works the  same wa as `.gitignore` — it will skip syncing files you have listed in this file. (I recommend listing `.DS_Store`  here.)


## Using Beaker APIs

Now for the fun part: you can tap into [Beaker browser’s APIs](https://docs.beakerbrowser.com/#apis) to take advantage of this infrastructure. You can look  at the source of this page (Drive  -> Explore Files) to check out  some examples  of how these could be used.

-  This website itself is a demo of the `beaker.markdown` api: it reads the markdown  content of `intro.md` file and renders it as html.
- The top peer count info  uses the `beaker.peersockets` API to track the number of peers. 

