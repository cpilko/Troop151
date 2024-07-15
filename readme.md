# Troop 151 Website

The Project Page for the Troop 151 website.

Are you looking for the public website? Visit it here: http://T151.org/

### About

This website is a static site, built with the [eleventy](https://www.11ty.dev/) build tool and hosted on [GitHub pages](https://pages.github.com/).

### Contributing to the Website

To get started you will need a [GitHub account](https://github.com/join). Tell Original Mr. Pilko your username at a meeting, and he'll make you a contributor to the website.

Once you are a contributor to the website, you can make requests to edit eny file. To do so:
- Click **branches** above the code window
- Click **New Branch** and give it a distinctive name, then click **Create New Branch**
- In the dropdoen above the Code window, select this branch.
- Click the **<> Code** button and select *Codespaces +* to create a new codespace in the branch you just created.
- Edit away. To preview your changes type `npm start` in the terninal window.
- When you are done, select the **Source Control** icon on the left side of the Codespaces editor and *Commit* your changes. You can make multiple Commits as you make incremental changes.
- Once you're ready for the changest to go live, **Create a Pull Request**. These chnanges will be queued for an admin to approve them before they are integrated into the live site. You'll be notified when they are approved. They will be on the live site a few minutes later.

Once you get all this, take a look at the [_notes.md](./_notes.md) file, or search for 'TODO' in any file. These are the things that need to be done.

### Design Theory:

We built this website as a static site, so all the files on the server are just simple text files that get sent to a web browser. That means we can use free hosting to manage this site, and don't have to worry about being hacked, which is a good thing. However, hard coding `html` files is a bit of a pain, so we're using some tools to make this easier:

- Pages on this site are written in a combination of [pug](http://pugjs.org) and [markdown](https://daringfireball.net/projects/markdown/syntax). Using these is a lot easier than hard-coding `html` for the pages.
- Dynamic content is provided with [javascript](http://eloquentjavascript.net/). 
- Stylesheets are compiled using [Stylus](http://stylus-lang.com/) using the [axis](http://axis.netlify.com/) framework and [jeet](http://jeet.gs/) grid system.  
- [Eleventy](https://www.11ty.dev/) is a build tool that runs in [node.js](http://nodejs.org). You don't have to know too much about Eleventy or node, except that these programs take the raw files above and compile them into a cohesive site.

### Deploying

There is a GitHub Action that automatically deploys the `public` folder of the `master` branch to the root of the   `gh-pages` branch.