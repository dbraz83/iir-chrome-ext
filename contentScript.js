var searchText = $("#lst-ib").val();
var searchResults = [];
var clickResults = [];

$(document).ready(function () {

    checkCookie();

    // use userid and link to the query and SERP results that are input and returned
    const userID = getCookie("username");

    console.log("UserID is " + userID);
    console.log(userID + " QUERY: " + searchText);

    // Are there any g class divs?
    if ($(".g").length > 0) {
        createArray(true);
    }
    window.addEventListener('click', handleWindowClick, { passive: true });
});

function createArray(includeAdverts) {
    //Save array in local storage using search criteria as part of key. 
    //If local storage for search already exists add links to existing array        
    chrome.storage.local.get('iir_searches', function (result) {
        var existingSearchResults = result.iir_searches;
        if (typeof existingSearchResults != 'undefined') {
            searchResults = existingSearchResults;
        }

        var rank = 1;
        var page = $("#nav").find(".cur").text();

        //if we're including advert links then loop through all adverts and add to array if not already present.
        if (includeAdverts) {
            $(".ad_cclk").each(function () {
                var link;
                var text;

                $(this).find("h3").find("a").each(function () {

                    if ($(this).text() != '') {
                        link = $(this).attr('href');
                        text = $(this).text();
                    }
                });

                if (link != null && text != null && !isInArray(searchResults, link)) {
                    addToArray(searchText, link, text, page, rank, true);
                    rank++;
                }
            });
        }

        //Loop through every link in page and add to array if not already present.
        $(".g").each(function () {
            var link = $(this).find("h3.r").find("a").attr('href');
            var text = $(this).find("h3.r").find("a").text();

            if (link != null && text != null && !isInArray(searchResults, link)) {
                addToArray(searchText, link, text, page, rank, false);
                rank++;
            }
        });

        var obj = {};
        obj['iir_searches'] = searchResults
        chrome.storage.local.set(obj, function () {
            //Call array from local storage and display in console for reference.
            chrome.storage.local.get('iir_searches', function (result) {
                console.log(result);
            });
        });
    });
}

function isInArray(array, link) {
    for (i = 0; i < array.length; i++) {
        if (array[i].link === link && array[i].searchText === searchText) {
            return true;
        }
    }
    return false;
}

function addToArray(searchText, link, text, page, rank, advert) {
    var item = {
        searchText: searchText,
        link: link,
        text: text,
        page: page,
        rank: rank,
        advert: advert
    }
    searchResults.push(item);
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = "username" + "=" + cvalue + ";" + expires + ";path=/";
    console.log("cookie name " + cname);

}

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

function checkCookie() {
    var user = getCookie("username");
    var expired = getCookie("exdays");
    //console.log("expiry is " + expired);
    if (user.length === 8 && expired != null) {
        console.log("Welcome again " + user);
    } else {
        // username was a random 6 string which lasts for 1 day - intitally was random but risks duplication, 
        // instead opted for hashing the date, howevere creates an 8 digit string not 6
        var date = (+new Date).toString(36).slice(3, 8);
        var str = Math.random().toString(36).substr(2, 3);
        //var res = date.slice(3,8);
        var user = str + date;
        if (user.length === 8 && user != null) {
            setCookie("username", user, 1);
        }
    }

}

// SERP link click log
// listens for SERP link click
// Updates relevant link array with click
function handleWindowClick(event) {

    //obtain array relating to search
    chrome.storage.local.get('iir_clicks', function (result) {
        var existingClickResults = result.iir_clicks;
        if (typeof existingClickResults != 'undefined') {
            clickResults = existingClickResults;
        }

        //assign link clicked to variable
        var link = event.target;

        //Check for valid link and update click numbers
        if (link.href != null && link.tagName == 'A') {

            //add to array and post array back to console
            addToClickArray(link.href)

            var obj = {};
            obj['iir_clicks'] = clickResults
            chrome.storage.local.set(obj, function () {
                //Call array from local storage and display in console for reference.
                chrome.storage.local.get('iir_clicks', function (result) {
                    console.log(result);
                });
            });
        }
    });

}

function addToClickArray(link) {

    var item = {
        searchText: searchText,
        link: link,
        date: new Date().getTime()
    }
    clickResults.push(item);
}

function myAlert(){
    alert('hello world');
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('qlink').addEventListener('click', myAlert);
});