---
layout: page
title: Archive
permalink: /archive/
description: Showcase your writing, short stories, or poems. Replace this text with your description.
---

<ul class="archive-list">

{%comment%}
list the post of the tags
{%endcomment%}

{% for tag in site.tags %}
  {% assign t = tag | first %}
  {% assign posts = tag | last %}

<h2 class="post-title">
  {{ t | capitalize }}
</h2>

{% for post in posts reversed %}
  {% if post.tags contains t %}
    <li>
        <p class="post-archive-time"> {{ post.date | date_to_string }} &raquo; <a class="post-archive-title" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a></p>
      </li>

{%comment%}
  <li>
    <a href="{{ post.url }}">{{ post.title }}</a>
    <span class="date">{{ post.date | date: "%B %-d, %Y"  }}</span>
  </li>
{%endcomment%}
  {% endif %}
{% endfor %}

{% endfor %}

{%comment%}
old archive style

{% for post in site.posts reversed %}
    <li>
        <p class="post-archive-time"> {{ post.date | date_to_string }} &raquo; <a class="post-archive-title" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a></p>
      </li>
{% endfor %}
{%endcomment%}

</ul>


{%comment%}
## Blog Posts

{% for post in site.posts %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
{% endfor %}
{%endcomment%}


{%comment%}
list the tags
{%endcomment%}

{% for tag in site.tags %}
{% assign t = tag | first %}
{% assign posts = tag | last %}
<li>{{t | downcase | replace:" ","-" }} has {{ posts | size }} posts</li>
{% endfor %}


