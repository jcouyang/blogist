var username=$("meta[name=username]").attr("content"),blogdetailModel=Model.extend({dataOptions:{dataType:"jsonp"}}),GIST_DIGEST_URL="get@https://gist.github.com.ru/jcouyang/46bb290f1b99eef15639",bloglistModelFor=function(a){return Model.extend({dataOptions:{data:{username:a},dataType:"jsonp"}})},BloglistModel=bloglistModelFor(username),bloglistModel=new BloglistModel("bloglist",GIST_DIGEST_URL),BlogDetailView=View.extend({el:$("#blogist"),template:"src/templates/article.html"}),MetaModel=Model.extend({refetch:function(){return Q({blog_title:$("meta[name=blog_title]").attr("content"),github_name:$("meta[name=username]").attr("content"),description:$("meta[name=description]").attr("content"),about_gist:$("meta[name=about_gist]").attr("content"),author_name:$("meta[name=author_name]").attr("content")})}}),metaModel=new MetaModel,BlogHeaderView=View.extend({model:metaModel,el:$("h1.page-header"),template:"src/templates/title.html"}),BlogNavView=View.extend({model:metaModel,el:$("#overlord"),template:"src/templates/nav.html"});(new BlogHeaderView).render(),(new BlogNavView).render();var BloglistView=View.extend({model:bloglistModel,el:$("#blogist"),template:"src/templates/gistlist.html",preProcessData:function(a){return{results:a.result}}}),router=new Router,bloglist;router.get("/",function(){loading(),bloglist=new BloglistView,bloglist.render({page:1}),$("#disqus_thread").remove()}),router.get("/page/:number",function(a){loading(),bloglist.render({page:a.number})});var loadDisqus=function(){$("#disqus_thread").length||$("#blogist").append($("<div id='disqus_thread'></div>")),disqus_identifier=window.location.hash.replace("#",""),disqus_url=window.location.href.replace("/#",""),disqus_title=$("h2.page-header").text()||$(".gist-meta a").eq(1).text()||document.title,DISQUS.reset({reload:!0})},blogDetailOf=function(a){var b=new blogdetailModel(a,"get@https://gist.github.com/"+username+"/"+a+".json"),c=new BlogDetailView({model:b});c.render({disqus_name:$("meta[name=disqus_name]").attr("content")}).then(loadDisqus)};router.get("/gist/:gistid/?",function(a){loading(),blogDetailOf(a.gistid)}),router.get("/gist/:gistid/.+",function(a){loading(),blogDetailOf(a.gistid)}),$("#overlord").hover(function(){$(this).addClass("overlord_active")},function(){$(this).removeClass("overlord_active")});var loading=function(){$("#blogist").html('<img src="stylesheets/img/loading-cubes.svg" class="center-block">')};if(patharray=location.pathname.split("/"),2===patharray.length){loading();var BloglistModel=bloglistModelFor(patharray[1]),bloglistModel=new BloglistModel("bloglist",GIST_DIGEST_URL),TrailBloglistView=BloglistView.extend({model:bloglistModel});bloglist=new TrailBloglistView,bloglist.render({page:1})}