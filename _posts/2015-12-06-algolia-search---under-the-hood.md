---
layout: post
title: "Algolia Search: Under the hood"
description: "Poking around in the innards of Algolia"
category:
tags: ruby,algolia
---
{% include JB/setup %}

I was poking around Algolia [ruby](https://github.com/algolia/algoliasearch-client-ruby) client today and noticed some interesting things.  It is possible to know what the attributes, attributesToIndex, and attributesForFaceting are without knowing the class's definition.

```ruby
# Basic Contact model wired up with Algolia
class Contact < ActiveRecord::Base
  include AlgoliaSearch
  algoliasearch do
    attributes            :title, :subtitle, :description, :likes_count, :seller_name
    add_attribute         :contacted_at_date
    attributesToIndex     ['title', 'subtitle', 'unordered(description)']
    attributesForFaceting ['stars_count', 'free_shipping', 'category', 'color']

    # Slave index, sorting the contacts by last contacted_at_date
    add_slave "Contacts_by_recency" do
      customRanking ['desc(contacted_at_date)']
    end
  end
end
```

Sometime later ... I'm working on a gem to wrap Algolia Search in a [ransack](https://github.com/activerecord-hackery/ransack) style API.  The new gem will make querying Algolia feel more natural and ease the transition from database based search to Algolia based search.

I want to safely perform search operations on the model, ***but*** I don't know the Algolia configuration of the model while in a third-party library.  To work around this let's just ask Algolia what the fields in the index are:

```ruby
# Call the protected method :algolia_configurations
algolia_configurations = Contact.send(:algolia_configurations)

# algolia_configurations is hash similar to the following:
ap algolia_configurations.keys
# [
#   { type: Contact(id: integer, title: String, .....), per_page: 10, page: 1, ... },
#   {index_name: 'Contacts_by_recency', slave: true, ...},
#   ...
# ]

# Inspect the root index to learn more about it's contents:
root_index = algolia_configurations[ algolia_configurations.keys.detect { |k| k[:type].present? } ]

ap root_index
# #<AlgoliaSearch::IndexSettings:0x...
#   @additional_attributes = {
#     "_tags"              => Proc...,
#     "contacted_at_date"  => Proc...,
#   },
#   @attributes            = {
#     "title"              => Proc...,
#     "subtitle"           => Proc...,
#     "description"        => Proc...,
#     "likes_cont"         => Proc...,
#   },
#   @attributesToIndex     = ['title', 'subtitle', 'unordered(description)'],
#   @attributesForFaceting = ['stars_count', 'free_shipping', 'category', 'color'],
#   ...
#   @additional_indexes    = {...}
#   @options               = {...}
#   ...
# >
```

Now we know some very interesting things about the algolia_configuration.
1. The method :algolia_configurations stores a hash of key => Algolia::Index
2. Root index's key is the only one with the :type field (our Rails class).
3. Inspecting the root index to yields the facetable fields, indexed fields, and stored attributes.

Now we are cooking with fire :-)

From here it is reasionable to build an ORM on top of Algolia search.

Enjoy!
