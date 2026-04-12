var relatedTitles = [],
    relatedTitlesNum = 0,
    relatedUrls = [],
    thumburl = [],
    relatedpoststitle = "Related Posts",
    maxresults = 20,
    currentposturl = window.location.href;

function related_results_labels_thumbs(e) {
    for (var t = 0; t < e.feed.entry.length; t++) {
        var l = e.feed.entry[t];
        relatedTitles[relatedTitlesNum] = l.title.$t;
        try {
            thumburl[relatedTitlesNum] = l.gform_foot.url
        } catch (r) {
            var s = l.content.$t,
                a = s.indexOf("<img"),
                i = s.indexOf('src="', a),
                d = s.indexOf('"', i + 5),
                u = s.substr(i + 5, d - i - 5); - 1 != a && -1 != i && -1 != d && "" != u ? thumburl[relatedTitlesNum] = u : thumburl[relatedTitlesNum] = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgAepghrb6cTcVP8Siz-M4A7SqMMwfh7WBuymkuLwkel0RjB4uuoEPGmnk8u6QJep9O9gCEQtGv3aqgzRNRtCuq_2ywwBg1rILq9d2Q3S0uPGPaaY1IuUKFwLTugFtL7Zblw9LABnvdiA2_/s1600/no-thumbnail.png"
        }
        relatedTitles[relatedTitlesNum].length > 35 && (relatedTitles[relatedTitlesNum] = relatedTitles[relatedTitlesNum].substring(0, 35) + "...");
        for (var n = 0; n < l.link.length; n++) "alternate" == l.link[n].rel && (relatedUrls[relatedTitlesNum] = l.link[n].href, relatedTitlesNum++)
    }
}

function removeRelatedDuplicates_thumbs() {
    for (var e = [], t = [], l = [], r = 0; r < relatedUrls.length; r++) contains_thumbs(e, relatedUrls[r]) || (e.length += 1, e[e.length - 1] = relatedUrls[r], t.length += 1, l.length += 1, t[t.length - 1] = relatedTitles[r], l[l.length - 1] = thumburl[r]);
    relatedTitles = t, relatedUrls = e, thumburl = l
}

function contains_thumbs(e, t) {
    for (var l = 0; l < e.length; l++)
        if (e[l] == t) return !0;
    return !1
}

function printRelatedLabels_thumbs() {
    for (var e = 0; e < relatedUrls.length; e++)(relatedUrls[e] == currentposturl || !relatedTitles[e]) && (relatedUrls.splice(e, 1), relatedTitles.splice(e, 1), thumburl.splice(e, 1), e--);
    
    if (relatedTitles.length > 0) {
        document.write("<h5>" + relatedpoststitle + "</h5>");
        // Añadimos 'w-100' y aseguramos el row de Bootstrap
        document.write('<div class="row w-100 m-0" style="clear: both;">');
        for (var t = Math.floor((relatedTitles.length - 1) * Math.random()), e = 0; e < relatedTitles.length && e < 20 && e < maxresults;) {
            // Forzamos columnas que se adapten: 2 en móvil, 4 en desktop
            document.write('<div class="col-6 col-md-3 p-1">');
            document.write('<a style="text-decoration:none;" href="' + relatedUrls[t] + '">');
            document.write('<img class="img-fluid related_img" src="' + thumburl[t] + '" style="width:100%; object-fit:cover; aspect-ratio:1/1;"/><br/>');
            document.write('<div id="related-title" style="font-size:12px; line-height:1.2;">' + relatedTitles[t] + "</div></a></div>");
            t < relatedTitles.length - 1 ? t++ : t = 0, e++
        }
        document.write("</div>");
    }
    relatedUrls.splice(0, relatedUrls.length), thumburl.splice(0, thumburl.length), relatedTitles.splice(0, relatedTitles.length)
}
