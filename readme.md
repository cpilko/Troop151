# Troop 151 Website

The Project Page for the Troop 151 website.

Are you looking for the public website? Visit it here: http://cpilko.github.io/Troop151/

### About

This website is a static site, built with the [roots](http://roots.cx) static site generator and hosted on [GitHub pages](http://cpilko.github.io/Troop151/).

### Contributing to the Website

To get started you will need a [GitHub account](https://github.com/join). Tell Mr. Pilko your username at a meeting, and he'll make you a contributor to the website.

You'll also need some software:
- a [git client](https://git-scm.com/downloadshttps://git-scm.com/downloads). (The [GitHub Desktop](https://desktop.github.com/) is good for starters.)
- [node.js](http://nodejs.org) installed on your computer.
- A text editor. Notepad will work fine, but something like [Atom](https://atom.io/) is a lot more powerful.

Once you have these things:
- clone this repo down and `cd` into the folder
- run `npm install`
- run `roots watch`
- a local copy of this website will open on your computer.
- make changes to any file and watch the website automagically update!

### Design Theory:

We built this website as a static site, so all the files on the server are just simple text files that get sent to a web browser. That means we can use free hosting to manage this site, and don't have to worry about being hacked, which is a good thing. However, hard coding `html` files is a bit of a pain, so we're using some tools to make this easier:

- Pages on this site are written in a combination of (jade)[http://jade-lang.org] and [markdown](https://daringfireball.net/projects/markdown/syntax). Take a look at the [blank page template](#) for an example of how this goes together. Using this is a lot easier than hard-coding `html` for the pages.
- Dynamic content is provided with [javascript](http://eloquentjavascript.net/). If `javascript` confuses you, scripts can also be written in [coffeescript](http://coffeescript.org/).
- Stylesheets are compiled using [Stylus](http://stylus-lang.com/) using the [axis](http://axis.netlify.com/) framework and [jeet](http://jeet.gs/) grid system.  
- [Roots](http://roots.cx) is a static site generator built on top of (node.js)[http://nodejs.org]. You don't have to know too much about roots or node, except that these programs take the raw files above and compile them into a cohesive site.

### Deploying

- If you just want to compile the production build, run `roots compile -e production` and it will build to `/public` on your local machine.
- Send your changed files to GitHub by adding all changed files, commiting the changes, and pushing the changes to the remote origin.
- Deploy your changes to the public site by running `git subtree push --prefix pubic origin gh-pages` from a command line.
