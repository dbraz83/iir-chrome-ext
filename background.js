var urls = [];

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