var urls = [];
var bookmarks = [];

$(document).ready(function () {
    logCurrentUrl(10);
});

function logCurrentUrl(seconds) {

    console.log("URL tracking activated.");

    var milliseconds = seconds * 1000;

    setInterval(function () {

        chrome.storage.local.get('iir_urls', function (result) {
            var existingUrls = result.iir_urls;
            if (typeof existingUrls != 'undefined') {
                urls = existingUrls;
            }

            chrome.tabs.query({}, function (tabs) {
                tabs.forEach(tab => {
                    var item = {
                        url: tab.url,
                        timeStamp: new Date().getTime(),
                        active: tab.active
                    }
                    urls.push(item);
                });

                var obj = {};
                obj['iir_urls'] = urls
                chrome.storage.local.set(obj, function () {
                    chrome.storage.local.get('iir_urls', function (result) {
                        console.log(result);
                    });
                });
            });

        });
    }, milliseconds);
};

chrome.bookmarks.onCreated.addListener(function (id, bookmark) {

    var bookmarkId = id;

    chrome.storage.local.get('iir_bookmarks', function (result) {
        var existingBookmarks = result.iir_bookmarks;
        if (typeof existingBookmarks != 'undefined') {
            bookmarks = existingBookmarks;
        }

        var item = {
            bookmarkId: bookmarkId,
            action: 'Bookmark Created',
            url: bookmark.url,
            timeStamp: new Date().getTime()
        }
        bookmarks.push(item);

        var obj = {};
        obj['iir_bookmarks'] = bookmarks
        chrome.storage.local.set(obj, function () {
            chrome.storage.local.get('iir_bookmarks', function (result) {
                console.log(result);
            });
        });
    });
});

chrome.bookmarks.onRemoved.addListener(function (id, removeInfo) {

    var bookmarkId = id;

    chrome.storage.local.get('iir_bookmarks', function (result) {
        var existingBookmarks = result.iir_bookmarks;
        if (typeof existingBookmarks != 'undefined') {
            bookmarks = existingBookmarks;
        }

        var item = {
            bookmarkId: bookmarkId,
            action: 'Bookmark Deleted',
            url: bookmarks.find(x => x.action === 'Bookmark Created' && x.bookmarkId == bookmarkId).url,
            timeStamp: new Date().getTime()
        }
        bookmarks.push(item);

        var obj = {};
        obj['iir_bookmarks'] = bookmarks
        chrome.storage.local.set(obj, function () {
            chrome.storage.local.get('iir_bookmarks', function (result) {
                console.log(result);
            });
        });
    });
});

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function download() {
    var finalUrls = [];
    var finalSearches = [];
    var finalBookmarks = [];
    var finalClicks = [];

    chrome.storage.local.get('iir_urls', function (result) {
        var existingUrls = result.iir_urls;
        if (typeof existingUrls != 'undefined') {
            finalUrls = existingUrls;
        }

        chrome.storage.local.get('iir_searches', function (result) {
            var existingSearches = result.iir_searches;
            if (typeof existingSearches != 'undefined') {
                finalSearches = existingSearches;
            }

            chrome.storage.local.get('iir_bookmarks', function (result) {
                var existingBookmarks = result.iir_bookmarks;
                if (typeof existingBookmarks != 'undefined') {
                    finalBookmarks = existingBookmarks;
                }

                chrome.storage.local.get('iir_clicks', function (result) {
                    var existingClicks = result.iir_clicks;
                    if (typeof existingClicks != 'undefined') {
                        finalClicks = existingClicks;
                    }

                    var csvContent = "data:text/csv;charset=utf-8,";
                    var userId = 'Unknown';

                    chrome.cookies.get({ url: 'https://www.google.com', name: 'username' }, function (comCookie) {
                        if (comCookie) {
                            userId = comCookie.value;
                        }

                        chrome.cookies.get({ url: 'https://www.google.co.uk', name: 'username' }, function (ukCookie) {
                            if (ukCookie && !comCookie) {
                                userId = ukCookie.value;
                            }

                            csvContent += "User Id: " + userId + "\r\n";

                            csvContent += "--Search Data--" + "\r\n";
                            csvContent += "Search Text,Link,Text,Page,Rank,Advert" + "\r\n";
                            finalSearches.forEach(function (item) {
                                item.text = item.text.replace(/,/g, "");
                                item.searchText = item.searchText.replace(/,/g, "");
                                var row = item.searchText + ',' + item.link + ',' + item.text + ',' + item.page + ',' + item.rank + ',' + item.advert + "\r\n";
                                csvContent += row;
                            });

                            csvContent += "--Click Data--" + "\r\n";
                            csvContent += "Search Text,Link,TimeStamp,Page,Rank,Advert" + "\r\n";
                            finalClicks.forEach(function (item) {
                                var search;
                                if (item.searchText != null) {
                                    item.searchText = item.searchText.replace(/,/g, "");
                                    search = finalSearches.find(x => x.searchText == item.searchText && x.link == item.link);
                                }
                                var row = item.searchText + ',' + item.link + ',' + item.date + ',' + (search != null ? search.page : 'Check Searches') + ',' + (search != null ? search.rank : 'Check Searches') + ',' + (search != null ? search.advert : 'Check Searches') + "\r\n";
                                csvContent += row;
                            });

                            csvContent += "--Bookmark Data--" + "\r\n";
                            csvContent += "Bookmark Id,Action,Url,TimeStamp" + "\r\n";
                            finalBookmarks.forEach(function (item) {
                                var row = item.bookmarkId + ',' + item.action + ',' + item.url + ',' + item.timeStamp + "\r\n";
                                csvContent += row;
                            });

                            csvContent += "--Url Data--" + "\r\n";
                            csvContent += "Url,TimeStamp,Active" + "\r\n";
                            finalUrls.forEach(function (item) {
                                var row = item.url + ',' + item.timeStamp + ',' + item.active + "\r\n";
                                csvContent += row;
                            });

                            var encodedUri = encodeURI(csvContent);
                            var link = document.createElement("a");
                            link.setAttribute("href", encodedUri);
                            link.setAttribute("download", "IIR_Chrome_Extension_Data_" + userId + ".csv");
                            link.innerHTML = "Click Here to download";
                            document.body.appendChild(link);
                            link.click();
                        });
                    });
                });
            });
        });
    });
};

function startStudy() {
    chrome.tabs.create({ url: chrome.runtime.getURL("welcome.html") });
};

chrome.contextMenus.create({
    title: "Start Study",
    contexts: ["browser_action"],
    onclick: startStudy
});

chrome.contextMenus.create({
    title: "Download Data",
    contexts: ["browser_action"],
    onclick: download
});