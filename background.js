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
            url: bookmarks.find(x=>x.action === 'Bookmark Created' && x.bookmarkId == bookmarkId).url,
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