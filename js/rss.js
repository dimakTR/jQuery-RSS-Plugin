(function($) { 
$(document).ready(function() {
$("body").rsswidget({
    positions: 5


});


})

$.fn.rsswidget = function(options){
        var options = jQuery.extend({
        url: "http://feeds.reuters.com/Reuters/worldNews",
        positions: 3,
        interval : 60000
        },options);     
        $(this).append('<div id="main"/>');
        getData();
        $('#main').append('<div align="center" class="loader">' + '<img src="img/ajax-loader.gif" id="load"/>' + '</div>');
  

    function addCss(css){
        var head = document.getElementsByTagName('head')[0];
        var s = document.createElement('link');
        s.setAttribute('type', 'text/css');
        s.setAttribute('rel', 'stylesheet');
        s.setAttribute('href', css);

        head.appendChild(s);    
    }
    var cssHost = "./css/rss.css"; 
        addCss(cssHost);
        
    function getData(){
     // var rssUrl = "http://news.drweb.ua/rss/get/?c=9&lng=ru";
      var rssUrl = options.url;
        $.ajax({
            url: "./xml/xml.php?rssUrl=" + rssUrl,
            dataType: "xml",
            success: getRSS, 
            error: function(){
                    var error = $('<p class="error">Error</p>');
                    $("#load").fadeOut().hide();
                    $('.loader').append(error);
            }
        });
    }

    function formatDate(date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var h = date.getHours();
        var mn = date.getMinutes();
        var s = date.getSeconds();
          
        return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d) + ' ' + (h <= 9 ? '0' + h : h) + ':' + (mn <= 9 ? '0' + mn : mn) + ':' + (s <= 9 ? '0' + s : s);
    }

    function getRSS(xml) {
        $("#load").fadeOut().hide();
        var date; 
        $(xml).find("item").each(function(i){
                                var url;
                                var item,description,link,date;
                                if(i === options.positions){
                                    return false;
                                } else {
                                    item = $('<div/>',{ class :'news'});
                                    description = $('<div/>',{ class :'description', id : 'number'+i});
                                    link = $('<div/>',{ class :'link'});
                                    date = $('<div/>',{ class :'date'});
                                    url = $(this).find("link").text();  
                                    $(link).append('<a id="num" target="_blank" >' + $(this).find("title").text() + '</a>');
                                    $(description).append($(this).find("description").text());
                                    var pubDateStr = $(this).find("pubDate").text();
                                    var pubDate = new Date(pubDateStr);
                                    $(date).append('Published: ' + formatDate(pubDate));
                                    $(item).append(link,description,date);
                                    $('#main').append(item);
                                    $("#num").attr("id", "num" + i );
                                    $("#num"+i).attr("href",url);
                                    $(".news").fadeIn(300);
                                 }
        });

 
        function format(){
            var data,i,lenght; 
            for ( i = 0 ; i < options.positions; i++) {
                lenght =$("#number"+i).text().length;
                if ( lenght > 200 ) {
                    data = $("#number"+i).text().slice(0,200);
                    $("#number"+i).html('<p>'+data+'[...]'+'<p>');
                }else{
                    data = $("#number"+i).text();
                    $("#number"+i).html('<p>'+data+'<p>');
                }
               
            }         
            
        }
        format();
}

var poller = setInterval(function() { 
    console.log("checking / loading new notes ..."); 
    $('#main').empty();
    $('#main').append('<div align="center" class="loader">' + '<img src="img/ajax-loader.gif" id="load"/>' + '</div>');
    getData();           
} , options.interval);

}

})(jQuery);

