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
    var tempRelatedTitles = [];
    var tempRelatedUrls = [];
    var tempThumburl = [];

    for (var e = 0; e < relatedUrls.length; e++) {
        if (relatedUrls[e] != currentposturl && relatedTitles[e]) {
            tempRelatedUrls.push(relatedUrls[e]);
            tempRelatedTitles.push(relatedTitles[e]);
            tempThumburl.push(thumburl[e]);
        }
    }

    if (tempRelatedTitles.length > 0) {
        var html = '<h5>' + relatedpoststitle + '</h5>';
        html += '<div class="row w-100 m-0" style="clear: both; display: flex; flex-wrap: wrap;">';
        
        var r = Math.floor((tempRelatedTitles.length - 1) * Math.random());
        var count = 0;

        while (count < tempRelatedTitles.length && count < maxresults) {
            html += '<div class="col-6 col-md-3 p-1" style="box-sizing: border-box;">';
            html += '<a style="text-decoration:none; display: block;" href="' + tempRelatedUrls[r] + '">';
            html += '<img class="img-fluid" src="' + tempThumburl[r] + '" style="width: 100%; height: 150px; object-fit: cover; border-radius: 0.5em; display: block;"/>';
            html += '<div style="text-align: center; color: white; font-size: 12px; line-height: 1.2; margin-top: 5px; word-wrap: break-word;">' + tempRelatedTitles[r] + '</div>';
            html += '</a></div>';
            
            if (r < tempRelatedTitles.length - 1) r++; else r = 0;
            count++;
        }
        html += '</div>';
        document.write(html);
    }
}
