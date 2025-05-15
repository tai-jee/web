function getQueryStringArray() {
    var assoc = [];
    var items = window.location.search.substring(1).split("&");
    for (var j = 0; j < items.length; j++) {
        var a = items[j].split("="); assoc[a[0]] = a[1];
    }
    return assoc;
}

var qs = getQueryStringArray();
console.log(qs);

// shortcut links to socials
if (qs.s !== "undefined" && qs.s) {
   switch (qs.s) {
        case "github":
            url = "https://github.com/tai-jee/";
            break;
        case "twitch": 
            url = "https://www.twitch.tv/taijeeee";
            break;
        case "youtube":
            url = "https://www.youtube.com/@tai-jee";
            break;
        default:
            url = new URL(window.location.href);
            url.searchParams.delete("s");
   }

   window.location.href = url;
}
