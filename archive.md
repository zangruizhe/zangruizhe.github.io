---
layout: page
title: Archive
description: Showcase your writing, short stories, or poems. Replace this text with your description.
---

<ul class="post-list">
{% for post in site.posts reversed %}
    <li>
        <p class="post-archive-time"> {{ post.date | date_to_string }} &raquo; <a class="post-archive-title" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a></p>
      </li>
{% endfor %}
</ul>


{%comment%}
## Blog Posts

{% for post in site.posts %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
{% endfor %}
{%endcomment%}


