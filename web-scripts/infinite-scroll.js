(function($) {
    "use strict";

    var anchor = "";
    var $pager = null;
    var postsContainer = "div.blog-posts";
    var isLoading = false;
    var $window = $(window);
    var $document = $(document);
    // Regex para limpiar scripts duplicados al cargar nuevas entradas
    var scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

    function loadMorePosts() {
        if (anchor && !isLoading) {
            isLoading = true;
            $pager.find("a").hide();
            $pager.find("img").show(); // El GIF de carga

            $.ajax({
                url: anchor,
                type: "get",
                dataType: "html",
                success: function(data) {
                    var $data = $(data);
                    var $posts = $data.find(postsContainer).children();
                    
                    // Filtrar y añadir los nuevos posts
                    $(postsContainer).append($posts.contents().each(function() {
                        if (this.nodeType === 8) $(this).remove();
                    }));

                    // Buscar el link de la siguiente página en el nuevo contenido
                    var nextLink = $data.find("a.blog-pager-older-link");
                    if (nextLink.length) {
                        anchor = nextLink.attr("href");
                        $pager.find("img").hide();
                        $pager.find("a").show();
                    } else {
                        anchor = "";
                        $pager.hide(); // No hay más contenido
                    }
                    isLoading = false;
                },
                error: function() {
                    isLoading = false;
                    $pager.find("img").hide();
                    $pager.find("a").show();
                }
            });
        }
    }

    $(document).ready(function() {
        // Solo ejecutar si no es una página de post individual (item)
        // Blogger expone la configuración en _WidgetManager
        var config = window._WidgetManager ? _WidgetManager._GetAllData() : null;
        
        if (config && config.blog.pageType !== "item") {
            var $olderLink = $("a.blog-pager-older-link");
            if ($olderLink.length) {
                anchor = $olderLink.attr("href");
                
                // Crear el botón de "Load More" dinámicamente
                $pager = $('<div id="load-more-container" style="text-align:center; margin: 20px 0;"></div>');
                var $btn = $('<a href="javascript:;" class="btn-load-more">Load more works</a>');
                var $loader = $('<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjbfaII8U57fj_0DTofZf2G6T8c1By8cfllh_YHOnfxaIofb7IDwlApkvftxEQEh1OwfRu6g-ESDDfxb4n97_zWeLtBFtFC6dMLyaS3v1IpqPAyHlMImzaHE0PTUR8IzKEdsyrYbB6hYraiFJwfTx1DJxlxXpyNfcxKTzlSpBaDLZdvPy4n4vKG-kyPWLgr/s320/LoadMore.gif" style="display: none; max-width:50px;"/>');
                
                $pager.append($btn).append($loader);
                $(postsContainer).after($pager);

                $btn.on("click", function(e) {
                    e.preventDefault();
                    loadMorePosts();
                });
            }
        }
    });
})(jQuery);
