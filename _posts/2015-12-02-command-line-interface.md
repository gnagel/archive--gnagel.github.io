---
layout: post
title: "CLI Hackery"
tagline: ""
description: "A CLI (command line interface) is a user interface to a computer's operating system or an application in which the user responds to a visual prompt by typing in a command on a specified line, receives a response back from the system, and then enters another command, and so forth."
category: "Development"
tags: cli,ruby,rake,jekyll
---
<div class="col s12 m9 l10">
  <section class="section scrollspy" id="basic">
    <p class="caption">
      In the Ruby &amp; Ruby on Rails world we often interact with CLIs (<a href="https://en.wikipedia.org/wiki/Command-line_interface">command line interface</a>) in the form of rake commands.
      A rake command is a simple CLI that has: a description, accepts has zero or more arguments, and usually does a single task.
    </p>

    <ul class="collection with-header">
      <li class="collection-header">
        <h5>
          A good command line utility:
        </h5>
      </li>
      <li class="collection-item">
        Performs a single task well
      </li>
      <li class="collection-item">
        Has an instructive description
      </li>
      <li class="collection-item">
        Has comments in the code
      </li>
      <li class="collection-item">
        If there are mutiple steps, has a guided
      </li>
    </ul>
  </section>



  <section class="section scrollspy" id="rake-post">
    <h4 class="header">
      `rake post`
    </h4>

    <p class="caption">
      Let's say we have a sample rake command, <em>rake post</em>, with the briefest of descriptions:

      <pre>
      In terminal:
        $ rake -T post
        > rake post # Begin a new post in ./_posts
      </pre>

      <pre>
      From Rakefile:
        desc('Begin a new post in ./_posts')
        task :post do
          ...
        end
      </pre>

      We now know what it does, it doesn't accept any arguments, and doesn't require any inputs.
      <br>

      Executing the rake command yields interesting results:
      <pre>
        $ rake build:post
        > ArgumentError, no title specified
        $
      </pre>
      Hmm, it appears that it requires something after all.  How should we fix this?
      <br>
      At this point you most developers would skim the code or start googling it.
      For the junior-developer or layman this may be a difficult or time consuming task.
    </p>
  </section>


  <section class="section scrollspy" id="make-it-easy">
    <h5 class="header">
      Make It Easy
    </h5>
    <p class="caption">
      It's easy to make <em>rake post</em> better.  Adding instructions to the rake task, and comments to the Rakefile goes go a long way toward improving this command.

      <pre>
      In terminal:
        $ rake -T post
        > rake post # Create a new post, env arguments: title, tagline, description, category, tags(csv)
      </pre>

      <pre>
      From Rakefile:
        #
        # rake post
        # - Creates a new post in the _posts directory
        # - See http://jekyllrb.com/docs/posts/ for more post options
        #
        # |===================================================================================|
        # | Argument            | Required | Description                                      |
        # |===================================================================================|
        # | ENV['title']        | yes      | Title of the blog post                           |
        # | ENV['tagline']      | no       | Tagline of the post (displayed under the title)  |
        # | ENV['description']  | no       | SEO Description of the post                      |
        # | ENV['category']     | no       | Category of the post, used by Jekyll             |
        # | ENV['tags']         | no       | Tags for the post, used by Jekyll                |
        # |===================================================================================|
        #
        desc('Create a new post, env arguments: title, tagline, description, category, tags(csv)')
        task :post do
          ...
        end
      </pre>

      This simple change makes the rake script easy and self-explanatory.  Now anyone can use the script without diving into the code and debugging.
    </p>
  </section>
</div>



<div class="col hide-on-small-only m3 l2">
  <div class="toc-wrapper">
    <div style="height: 1px;">
      <ul class="section table-of-contents">
        <li>
          <a href="#basic">CLI</a>
        </li>
        <li>
          <a href="#rake-post">rake post</a>
        </li>
        <li>
          <a href="#make-it-easy">Make It Easy</a>
        </li>
      </ul>
    </div>
  </div>
</div>


<script type="text/javascript">
  $(function() {
    // TODO make this affix to the right
    $('.scrollspy').scrollSpy({});
  });
</script>
