# Troop 151 Website

The Project Page for the Troop 151 website.

Are you looking for the public website? Visit it here: http://T151.org/

### About

This website is a static site, built with the [brunch](http://brunch.io) build tool and hosted on [GitHub pages](http://cpilko.github.io/Troop151/).

### Contributing to the Website

To get started you will need a [GitHub account](https://github.com/join). Tell Mr. Pilko your username at a meeting, and he'll make you a contributor to the website.

You'll also need some software:
- a [git client](https://git-scm.com/downloadshttps://git-scm.com/downloads). (The [GitHub Desktop](https://desktop.github.com/) is good for starters.)
- [node.js](http://nodejs.org) installed on your computer.
- A text editor. Notepad will work fine, but something like [Visual Studio Code](https://code.visualstudio.com/) is a lot more powerful.

Once you have these things:
- `git clone` this repo down and `cd` into the folder
- run `npm install`
- run `brunch build --serve`
- a local copy of this website will open on your computer.
- make changes to any file and watch the website automagically update!

Once you get all this, take a look at the [_notes.md](./_notes.md) file, or search for 'TODO' in any file. These are the things that need to be done.

### Design Theory:

We built this website as a static site, so all the files on the server are just simple text files that get sent to a web browser. That means we can use free hosting to manage this site, and don't have to worry about being hacked, which is a good thing. However, hard coding `html` files is a bit of a pain, so we're using some tools to make this easier:

- Pages on this site are written in a combination of [pug](http://pugjs.org) and [markdown](https://daringfireball.net/projects/markdown/syntax). Using this is a lot easier than hard-coding `html` for the pages.
- Dynamic content is provided with [javascript](http://eloquentjavascript.net/). If `javascript` confuses you, scripts can also be written in [coffeescript](http://coffeescript.org/).
- Stylesheets are compiled using [Stylus](http://stylus-lang.com/) using the [axis](http://axis.netlify.com/) framework and [jeet](http://jeet.gs/) grid system.  
- [Brunch](http://brunch.io) is a build tool that runs in [node.js](http://nodejs.org). You don't have to know too much about brunch or node, except that these programs take the raw files above and compile them into a cohesive site.

### Deploying

- If you just want to compile the production build, run `brunch build -p` and it will build to `/public` on your local machine.
- Send your changed files to GitHub by running these commands:
    - `git add .` -- To stage all the changed files to the git server.
    - `git commit -m "message"` -- Where *message* is descriptive text of what you changed.
    - `git push` -- Which sends all your changes off to the master repository in the cloud and syncs them.
- Deploy your changes to the public site by running these commands. These assume you are running a *nix shell:
    - `git checkout gh-pages`
    - `git checkout master public`
    - `cp -r public/* .` <-The period at the end is very important!
    - `rm -r public`
    - `git add .`
    - `git commit -m "Deploy"`
    - `git push`
    - `git checkout master`
    - Whew! (I should really write a script for this...)
