jQuery-RSS-Plugin
=================

About plugin:

This RSS plugin let you to add eny RSS feed to your site and reupload it with some interval.
It's download xml file of the feed with php script and parsing it.


Installing:
Attach rss.js library to your site.

Using:
Plugin have few parametrs:<br>
  url - path to the feed's xml file (like "http://feeds.reuters.com/Reuters/worldNews").<br>
  positions - how many items need's to be in the plugin window.<br>
  interval - time interval between reuploading of the feed in miliseconds.<br>
  
If you want you can use all or only necessary parameters.

Example of using the plugin:
=====================================
<pre>
<code>$("body").rsswidget({
    url : "http://feeds.reuters.com/Reuters/worldNews", <--url of the feed-->
    positions: 5,    <--it will show us 5 last items(news) in the plugin window-->
    interval: 60000  <--refresh plugin window and downloading newest news with interval of three minutes-->
}); <code>
<pre>
