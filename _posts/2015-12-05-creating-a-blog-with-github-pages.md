---
layout: post
title: "Creating a blog with github pages"
description: "Migrate your blog from Wordpress or Squarespace to github and host it for free."
category: development
tags: github,git,ruby,jekyll
---

<div class="col s12">
  <section class="section" id="basic">
    <p class="caption">
      I recently created this blog on GitHub.com for free.  This page is powered by Jekyll, an amazing website generator designed for minimal/static pages hosted on GitHub.
    </p>
    <p class="caption">
      The simplicity of Jekyll’s rendering, theming, and writing workflow is excellent; however, setting up my first page took a longer than I expected.
    </p>

    <ul class="collection with-header">
      <li class="collection-header">
        <h6>
        In this post I'll walk through:
        </h6>
      </li>
      <li class="collection-item">
        Why choose Jekyll instead of Wordpress or Squarespace?
      </li>
      <li class="collection-item">
        How to setup this Jekyll powered blog.
      </li>
      <li class="collection-item">
        The layout of the files created by Jekyll.
      </li>
      <li class="collection-item">
        How to post your first page.
      </li>
    </ul>
  </section>



  <section class="section" id="why">
    <h4 class="header">
        Why choose Github-pages vs Wordpress or Squarespace?
    </h4>

    <p class="caption">
      I recently became interested in github-pages after seeing numerious project pages hosted on github using the jekyll framework.  I found other hosting solutions, such as Wordpress and Squarespace, too heavy-weight.
      <br>*The WYSIWYG editors made it hard see what the generated HTML would be.
      <br>*The CSS &amp; JS bloated out to of controll.
      <br>*Backing up a Wordpress site is a huge pain.
      <br>*As a developer I wanted access to the backend database for my content, which is inaccessable Squarespace.

      <br>
      <br>
      So, started using Jekyll it seemed like a great alternative. My entire blog is tracked in git as static files. Backups are trivial now, I simply fork the repository and hack away.  Finally, I can compose my posts as Markdown, which I am familar with from Rails &amp; GitHub.
      <br>
      <br>
      The fact that GitHub provides free hosting Jekyll is just amazing. It saves me the hassle of spinning up a EC2 or DigitalOcean server and maintaining it regularly.
    </p>
  </section>



  <section class="section" id="jekyll-setup">
    <h4 class="header">
        How to setup this Jekyll powered blog
    </h4>

    <p class="caption">
      Instead of trudging through a lot of blogs and documentation, the easier way is to use <a href="https://github.com/poole/poole">poole</a>.  It is an out of the box tempalte for your blog with a clean looking layout.
    </p>

    <ul class="collection with-header">
      <li class="collection-header">
        Setup steps:
      </li>
      <li class="collection-item">
        Create a new repo in your github account
        <pre>
# Replace 'username' with your github user:
username.github.io
        </pre>
      </li>
      <li class="collection-item">
        Clone poole locally &amp; push it up to your new repo:
        <pre>
$ git clone git@github.com:poole/poole.git username.github.io
$ cd username.github.io
$ git remote remove origin
$ git remote add origin git@github.com:username/username.github.io.git
$ git push origin master:master -u -f
        </pre>
      </li>
      <li class="collection-item">
        In a few moments your blog will be ready to rock and roll.
        <br>
        Goto username.github.io in your browser to see the new site.
      </li>
    </ul>
  </section>




  <section class="section" id="jekyll-layout">
    <h4 class="header">
        The layout of the files created by Jekyll.
    </h4>

    <p class="caption">
      The initial state of your new repository is pretty simple:
      <pre>
|=============|==================================================================|
| File Name   | Description                                                      |
|=============|==================================================================|
| _includes   | Boiler-plate HTML for building the website.                      |
| _layouts    | Boiler-plate HTML for building the website.                      |
| _posts      | _posts folder contains all of the blog posts in markdown format  |
| public      | Public for CSS, JS, images, etc                                  |
|=============|==================================================================|
| _config.yml | Jekyll configuration for the blog                                |
| atom.xml    | Atom.xml for RSS                                                 |
| index.html  | Home page for your blog                                          |
| LICENSE.md  | License of the repo, I recommend MIT license when possible       |
| README.md   | Readme for your repo                                             |
| about.md    |                                                                  |
| 404.html    |                                                                  |
| CNAME       |                                                                  |
|=============|==================================================================|
      </pre>
    </p>

    <p class="caption">
      <strong>_includes and _layouts</strong> contain the boiler plate html for your website:
      <br>* _layouts/default.html
      <br>* _layouts/page.html
      <br>* _layouts/post.html
      <br>* _includes/head.html
    </p>

    <p class="caption">
      <strong>_posts</strong> contains all of the posts in markdown format. There are a few example posts to get you started.
    </p>

    <p class="caption">
      <strong>_config.yml</strong> contains the configuration settings for your site.  You should change these to match your site's configuration:
      <pre>
  title:       "My Blog"
  tagline:     "Super amazing blog of awesomeness"
  description: "Killer description here :-)"
  url:         "https://username.github.io"
      </pre>
    </p>
  </section>



  <section class="section" id="first-page">
    <h4 class="header">
        How to post your first page
    </h4>

    <p class="caption">
      Creating a post is easy. Every post follows a consistent format: ./_posts/YYYY-MM-DD-page-name.md
      <br>
      The first part is the date in YYYY-MM-DD format, ex 2015-12-31. The second part is the parameterized title of the post.  The header of the post is in YAML format as follows:
      <pre>
---
layout: post
title: "..."
description: "..."
category: ...
tags: github,git,ruby,jekyll,...
---
      </pre>
      Everything after that can be markdown, html, or whatever else you like.
    </p>

    <p class="caption">
      Once your post is ready to be published, commmit it to git and push it up to github.
      <br>
      Enjoy!
    </p>
  </section>

</div>

