var urls = [];
var bookmarks = [];

$(document).ready(function () {
    logCurrentUrl(1);
});

function logCurrentUrl(seconds) {

    console.log("URL tracking activated.");

    var milliseconds = seconds * 1000;
    var timeEnded = false;

    setInterval(function () {

        var tasks = [];
        chrome.storage.local.get('iir_tasks', function (result) {
            var existingTasks = result.iir_tasks;
            if (typeof existingTasks != 'undefined') {
                tasks = existingTasks;
            }

            var nextTask = tasks.find(x => x.complete == false);

            if (nextTask != null) {
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

                chrome.storage.local.get('iir_timer', function (result) {
                    var storedTime = result.iir_timer;
                    var currentTime = new Date().getTime();
                    var timeLeft = storedTime - currentTime;

                    if (storedTime != 'undefined') {
                        if (timeLeft <= 0) {
                            chrome.tabs.update({ url: chrome.runtime.getURL("postTask.html") });
                            chrome.storage.local.remove(["iir_timer"], function () {
                                var error = chrome.runtime.lastError;
                                if (error) {
                                    console.error(error);
                                }
                            })
                        }

                        var views = chrome.extension.getViews({
                            type: "popup"
                        });

                        if (timeLeft >= 0) {
                            var realTime = millisecondsToTime(timeLeft)

                            for (var i = 0; i < views.length; i++) {
                                views[i].document.getElementById('x').innerHTML = realTime;
                            }
                        }
                        else {
                            views[i].document.getElementById('x').innerHTML = "00:00";

                        }
                    }
                });
            }
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

function sortByDate(a, b) {
    return ((a.end > b.end) ? -1 : ((a.end < b.end) ? 1 : 0));
}

function download() {
    var finalUrls = [];
    var finalSearches = [];
    var finalBookmarks = [];
    var finalClicks = [];
    var finalQueryTimes = [];
    var finalConsent = {};
    var finalPreStudy = {};
    var finalPreTasks = [];
    var finalPostTasks = [];
    var finalTasks = [];

    chrome.storage.local.get('iir_tasks', function (result) {
        finalTasks = result.iir_tasks;

        chrome.storage.local.get('iir_form_pretasks', function (result) {
            finalPreTasks = result.iir_form_pretasks;

            chrome.storage.local.get('iir_form_posttasks', function (result) {
                finalPostTasks = result.iir_form_posttasks;

                chrome.storage.local.get('iir_form_consent', function (result) {
                    finalConsent = result.iir_form_consent;

                    chrome.storage.local.get('iir_form_prestudy', function (result) {
                        finalPreStudy = result.iir_form_prestudy;

                        chrome.storage.local.get('iir_urls', function (result) {
                            var existingUrls = result.iir_urls;
                            if (typeof existingUrls != 'undefined') {
                                finalUrls = existingUrls;
                            }

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

                                            chrome.storage.local.get('iir_querytime', function (result) {
                                                var existingQueryTimes = result.iir_querytime;
                                                if (typeof existingQueryTimes != 'undefined') {
                                                    finalQueryTimes = existingQueryTimes;
                                                    finalQueryTimes.sort(sortByDate);
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

                                                        csvContent += "--Task Data--" + "\r\n";
                                                        csvContent += "Task,Complete,PreTask Complete,PostTask Complete,Duration" + "\r\n";
                                                        if (finalTasks != null) {
                                                            finalTasks.forEach(function (item) {
                                                                var row = item.task + ',' + item.complete + ',' + item.preTaskComplete + ',' + item.postTaskComplete + ',' + item.taskEndTime + "\r\n";
                                                                csvContent += row;
                                                            });
                                                        }

                                                        csvContent += "--Consent Form Data--" + "\r\n";
                                                        csvContent += "Consent 1,Consent 2,Consent Text,Sign" + "\r\n";
                                                        if (finalConsent != null) {
                                                            if (finalConsent.consentText != null) {
                                                                finalConsent.consentText = finalConsent.consentText.replace(/,/g, "");
                                                            }
                                                            csvContent += (finalConsent.consent1 != null ? finalConsent.consent1 : 'Unknown') + ',' + (finalConsent.consent2 != null ? finalConsent.consent2 : 'Unknown') + (finalConsent.consentText != null ? finalConsent.consentText : 'Unknown') + ',' + (finalConsent.sign != null ? finalConsent.sign : 'Unknown') + "\r\n";
                                                        }
                                                        csvContent += "--PreStudy Form Data--" + "\r\n";
                                                        csvContent += "StudyCode,Age,Nationality,Course,Gender,Language,Language Detail,IT Use,Internet Use,Search Engine Use,Search Engine Preference,Search Engine Detail,Email Update,Email Detail" + "\r\n";
                                                        if (finalPreStudy != null) {
                                                            if (finalPreStudy.studyCode != null) {
                                                                finalPreStudy.studyCode = finalPreStudy.studyCode.replace(/,/g, "");
                                                            }
                                                            if (finalPreStudy.course != null) {
                                                                finalPreStudy.course = finalPreStudy.course.replace(/,/g, "");
                                                            }
                                                            if (finalPreStudy.languageText != null) {
                                                                finalPreStudy.languageText = finalPreStudy.languageText.replace(/,/g, "");
                                                            }
                                                            if (finalPreStudy.searchEngineText != null) {
                                                                finalPreStudy.searchEngineText = finalPreStudy.searchEngineText.replace(/,/g, "");
                                                            }
                                                            if (finalPreStudy.updateText != null) {
                                                                finalPreStudy.updateText = finalPreStudy.updateText.replace(/,/g, "");
                                                            }
                                                            csvContent += (finalPreStudy.studyCode != null ? finalPreStudy.studyCode : 'Unknown') + ',' + (finalPreStudy.age != null ? finalPreStudy.age : 'Unknown') + ',' + (finalPreStudy.nationality != null ? finalPreStudy.nationality : 'Unknown') + ',' + (finalPreStudy.course != null ? finalPreStudy.course : 'Unknown') + ',' + (finalPreStudy.gender != null ? finalPreStudy.gender : 'Unknown') + ',' + (finalPreStudy.language != null ? finalPreStudy.language : 'Unknown') + ',' + (finalPreStudy.languageText != null ? finalPreStudy.languageText : 'Unknown') + ',' + (finalPreStudy.itUse != null ? finalPreStudy.itUse : 'Unknown') + ',' + (finalPreStudy.internetUse != null ? finalPreStudy.internetUse : 'Unknown') + ',' + (finalPreStudy.searchEngineUse != null ? finalPreStudy.searchEngineUse : 'Unknown') + ',' + (finalPreStudy.searchEnginePreference != null ? finalPreStudy.searchEnginePreference : 'Unknown') + ',' + (finalPreStudy.searchEngineText != null ? finalPreStudy.searchEngineText : 'Unknown') + ',' + (finalPreStudy.emailUpdate != null ? finalPreStudy.emailUpdate : 'Unknown') + ',' + (finalPreStudy.updateText != null ? finalPreStudy.updateText : 'Unknown') + ',' + "\r\n";
                                                        }

                                                        csvContent += "--PreTask Form Data--" + "\r\n";
                                                        csvContent += "Task,Experience,Know,Interested,Difficult" + "\r\n";
                                                        if (finalPreTasks != null) {
                                                            finalPreTasks.forEach(function (item) {
                                                                var row = item.task + ',' + item.exp + ',' + item.know + ',' + item.int + ',' + item.diff + "\r\n";
                                                                csvContent += row;
                                                            });
                                                        }

                                                        csvContent += "--PostTask Form Data--" + "\r\n";
                                                        csvContent += "Task,Q1,Q2,Q3,Q4,Q5,Q6,Q7,Q8,Q9,Q10,Q11,Q12,Q13" + "\r\n";
                                                        if (finalPostTasks != null) {
                                                            finalPostTasks.forEach(function (item) {
                                                                var row = item.task + ',' + item.q1 + ',' + item.q2 + ',' + item.q3 + ',' + item.q4 + ',' + item.q5 + ',' + item.q6 + ',' + item.q7 + ',' + item.q8 + ',' + item.q9 + ',' + item.q10 + ',' + item.q11 + ',' + item.q12 + ',' + item.q13 + "\r\n";
                                                                csvContent += row;
                                                            });
                                                        }

                                                        csvContent += "--Search Data--" + "\r\n";
                                                        csvContent += "Search Text,Link,Text,Page,Rank,Advert,TimeStamp,Query Time" + "\r\n";
                                                        if (finalSearches != null) {
                                                            finalSearches.forEach(function (item) {

                                                                var queryTimeItem = finalQueryTimes.find(x => x.queryText == item.searchText && x.end <= item.timeStamp);
                                                                var queryTime = 'Unknown';
                                                                if (queryTimeItem != null) {
                                                                    queryTime = queryTimeItem.end - queryTimeItem.start;
                                                                }

                                                                item.text = item.text.replace(/,/g, "");
                                                                item.searchText = item.searchText.replace(/,/g, "");

                                                                var row = item.searchText + ',' + item.link + ',' + item.text + ',' + item.page + ',' + item.rank + ',' + item.advert + ',' + item.timeStamp + ',' + queryTime + "\r\n";
                                                                csvContent += row;
                                                            });
                                                        }

                                                        csvContent += "--Click Data--" + "\r\n";
                                                        csvContent += "Search Text,Link,TimeStamp,Page,Rank,Advert" + "\r\n";
                                                        if (finalClicks != null) {
                                                            finalClicks.forEach(function (item) {
                                                                var search;
                                                                if (item.searchText != null) {
                                                                    item.searchText = item.searchText.replace(/,/g, "");
                                                                    search = finalSearches.find(x => x.searchText == item.searchText && x.link == item.link);
                                                                }
                                                                var row = item.searchText + ',' + item.link + ',' + item.date + ',' + (search != null ? search.page : 'Check Searches') + ',' + (search != null ? search.rank : 'Check Searches') + ',' + (search != null ? search.advert : 'Check Searches') + "\r\n";
                                                                csvContent += row;
                                                            });
                                                        }

                                                        csvContent += "--Search Time Data--" + "\r\n";
                                                        csvContent += "Search Text,Start,End" + "\r\n";
                                                        if (finalQueryTimes != null) {
                                                            finalQueryTimes.forEach(function (item) {
                                                                if (item.queryText != null) {
                                                                    item.queryText = item.queryText.replace(/,/g, "");
                                                                }
                                                                var row = item.queryText + ',' + item.start + ',' + item.end + "\r\n";
                                                                csvContent += row;
                                                            });
                                                        }

                                                        csvContent += "--Bookmark Data--" + "\r\n";
                                                        csvContent += "Bookmark Id,Action,Url,TimeStamp" + "\r\n";
                                                        if (finalBookmarks != null) {
                                                            finalBookmarks.forEach(function (item) {
                                                                var row = item.bookmarkId + ',' + item.action + ',' + item.url + ',' + item.timeStamp + "\r\n";
                                                                csvContent += row;
                                                            });
                                                        }

                                                        csvContent += "--Url Data--" + "\r\n";
                                                        csvContent += "Url,TimeStamp,Active" + "\r\n";
                                                        if (finalUrls != null) {
                                                            finalUrls.forEach(function (item) {
                                                                var row = item.url + ',' + item.timeStamp + ',' + item.active + "\r\n";
                                                                csvContent += row;
                                                            });
                                                        }

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
                            });
                        });
                    });
                });
            });
        });
    });
}

function millisecondsToTime(milli) {
    var milliseconds = milli % 1000;
    var seconds = Math.floor((milli / 1000) % 60);
    var minutes = Math.floor((milli / (60 * 1000)) % 60);

    if (seconds < 10)
    {
        seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
}

chrome.contextMenus.create({
    title: "Download Data",
    contexts: ["browser_action"],
    onclick: download
});
