---
layout: post
title: "Algolia Search for Rails"
description: ""
category:
tags: []
---
{% include JB/setup %}

This is a brief shout-out to an amazing service: [Algolia](https://www.algolia.com) search.  I use their tools everyday and am thrilled with the experience.

The gem [algoliasearch-client-ruby](https://github.com/algolia/algoliasearch-client-ruby) easily integrates the Algolia Search API into your Ruby on Rails application.


Table of Content
-------------
**Get started**

1. [Install](#install)
1. [Setup](#setup)
1. [Quick Start](#quick-start)
1. [Nested objects/relations](#)
1. [Backend Search](#backend-search)
1. [Frontend Search (realtime experience)](#)
1. [Learn more](#learn-more)
1. [](#)
1. [](#)

Install
-------------

Add the gem to your <code>Gemfile</code>:

```ruby
echo 'gem "algoliasearch-rails"' >> Gemfile
bundle install
```

Setup
-------------
Create a new file <code>config/initializers/algoliasearch.rb</code> to setup your <code>APPLICATION_ID</code> and <code>API_KEY</code>. Algolia supports both [will_paginate](https://github.com/mislav/will_paginate) and [kaminari](https://github.com/amatsuda/kaminari) as pagination backend:
```ruby
AlgoliaSearch.configuration = { application_id: ENV["ALGOLIA_APP_ID"], api_key: ENV["ALGOLIA_API_KEY"], pagination_backend: :will_paginate }
```


Quick Start
-------------

Next add the AlgoliaSearch module to your models and configure the search index:

```ruby
class Contact < ActiveRecord::Base
  include AlgoliaSearch
  algoliasearch do
    # all attributes will be sent
  end
end


class Product < ActiveRecord::Base
  include AlgoliaSearch

  algoliasearch do
    # List of attribute used to build an Algolia record
    attributes :title, :subtitle, :description, :likes_count, :seller_name

    # attributesToIndex setting defines the attributes you want to search in:
    attributesToIndex ['title', 'subtitle', 'unordered(description)']

    # attributesForFaceting setting defines the attributes your can filter by:
    attributesForFaceting ['stars_count', 'free_shipping', 'category', 'color']

    # customRanking setting defines the ranking criteria use to compare two matching
    # records in case their text-relevance is equal. It should reflect your record popularity.
    customRanking ['desc(likes_count)']
  end
end
```

Nested objects/relations
-------------

Embedding nested objects is easy, define an extra attribute returning any JSON-compliant object (an array or a hash or both):

```ruby
class Profile < ActiveRecord::Base
  include AlgoliaSearch
  belongs_to :user
  has_many   :specializations
  algoliasearch do
    # restrict the nested "user" object to its `name` + `email`
    attribute :user do
      { name: user.name, email: user.email }
    end
    # build an array of public specialization (include only `title` and `another_attr`)
    attribute :public_specializations do
      specializations.select { |s| s.public? }.map do |s|
        { title: s.title, another_attr: s.another_attr }
      end
    end
  end
end
```

Backend Search
-------------

To search from the backend use the `raw_search` method. It retrieves the raw JSON answer from the API:

```ruby
p Contact.raw_search("jon doe")
```

If you need ActiveRecord::Base models instead of JSON objects, you could also use `search`. Search is not recommended, since this method will fetch the matching `objectIDs` from the API and perform a database query to retrieve an array of matching models:

```ruby
p Contact.search("jon doe") # we recommend to use `raw_search` to avoid the database lookup
```

Frontend Search (realtime experience)
-------------

A traditional Rails search page tended have search logic on the backend, usually in a controller and a search API. This setup makes sense if the search experience was a user typing in a search query, submitting the search, and then being redirected a search results page.

We no longer have to implement search on the backend; in fact many ecommerce sites no longer use this practice.  I highly recommend the a client side JS search experience, such as [instantsearch.js](https://community.algolia.com/instantsearch.js), which issues all search requests directly from the end user's browser, mobile device, or client. It reduces the overall search latency and offloads the requests to Algolia's servers instead of yours.


```javascript
//= require algolia/v3/algoliasearch.min
```

Then in your JavaScript code you can do:

```js
var client = algoliasearch(ApplicationID, Search-Only-API-Key);
var index = client.initIndex('YourIndexName');
index.search('something', function(success, hits) {
  console.log(success, hits)
}, { hitsPerPage: 10, page: 0 });
```

Learn More
-------------
[Aloglia Search website](https://www.algolia.com/doc/rails)

