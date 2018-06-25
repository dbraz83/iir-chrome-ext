var searchResultKey = 'searchArray-' + $("#lst-ib").val();
var searchResult = [];

$(document).ready(function () {

    checkCookie();

    // use userid and link to the query and SERP results that are input and returned
    const userID = getCookie("username");

    console.log("UserID is " + userID);
    console.log(userID + " QUERY: " + $("#lst-ib").val());

    // Are there any g class divs?
    if ($(".g").length > 0) {
        createArray(true);
    }

<<<<<<< HEAD
        //Save array in local storage using search criteria as part of key. 
        //If local storage for search already exists add links to existing array
        var searchResultKey = 'searchArray-' + $("#lst-ib").val();

        var searchResult = [];
        var existingSearchResult = JSON.parse(localStorage.getItem(searchResultKey));
        var rank = 1;
        var page = $("#nav").find(".cur").text();

        //If search already exists in local storage copy values to searchResult.
        if (existingSearchResult != undefined) {
            searchResult = existingSearchResult;            
        }

        //Loop through every link in page and add to array if not already present.
        $(".g").each(function () {
            var link = $(this).find("h3.r").find("a").attr('href');
            var text = $(this).find("h3.r").find("a").text();

            if (link != null && text != null && !isInArray(searchResult, link)) {

                var item = {
                    link: link,
                    text: text,
                    page: page,
                    rank: rank,
                    clicks: 0
=======
    logCurrentUrl();
    window.addEventListener('click', handleWindowClick, { passive: true });
});

function createArray(includeAdverts) {
    //Save array in local storage using search criteria as part of key. 
    //If local storage for search already exists add links to existing array        
    var existingSearchResult = JSON.parse(localStorage.getItem(searchResultKey));
    var rank = 1;
    var page = $("#nav").find(".cur").text();

    //If search already exists in local storage copy values to searchResult.
    if (existingSearchResult != undefined) {
        searchResult = existingSearchResult;
    }

    //if we're including advert links then loop through all adverts and add to array if not already present.
    if (includeAdverts) {
        $(".ad_cclk").each(function () {
            var link;
            var text;

            $(this).find("h3").find("a").each(function () {

                if ($(this).text() != '') {      
                    link = $(this).attr('href');
                    text = $(this).text();
>>>>>>> 418890ce4472d81b191702251aa8c3138cb0b6c7
                }
                searchResult.push(item);
                rank++;
            }
        });

<<<<<<< HEAD
        localStorage.setItem(searchResultKey, JSON.stringify(searchResult));
=======
            if (link != null && text != null && !isInArray(searchResult, link)) {
                addToArray(link, text, page, rank, true);
                rank++;
            }
        });
    }

    //Loop through every link in page and add to array if not already present.
    $(".g").each(function () {
        var link = $(this).find("h3.r").find("a").attr('href');
        var text = $(this).find("h3.r").find("a").text();

        if (link != null && text != null && !isInArray(searchResult, link)) {
            addToArray(link, text, page, rank, false);
            rank++;
        }
    });

    localStorage.setItem(searchResultKey, JSON.stringify(searchResult));

    //Call array from local storage and display in console for reference.
    console.log(JSON.parse(localStorage.getItem(searchResultKey)));
}
>>>>>>> 418890ce4472d81b191702251aa8c3138cb0b6c7

function isInArray(array, link) {
    for (i = 0; i < array.length; i++) {
        if (array[i].link === link) {
            return true;
        }
    }
    return false;
}

function addToArray(link, text, page, rank, advert) {
    var item = {
        link: link,
        text: text,
        page: page,
        rank: rank,
        advert: advert,
        clicks: 0
    }
    searchResult.push(item);
}

function isInArray(array, link) {
    for (i = 0; i < array.length; i++) {
        if (array[i].link === link) {
            return true;
        }
    }
    return false;
}

// can localStorage be utilised?
/*
function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}
console.log(storageAvailable('sessionStorage'));
*/

// make a random userID

/*		
chrome.storage.local.get('value', function(result) {
          console.log('Username currently is ' + result);
        });
	*/
//const userID = Math.random().toString(36).substr(2, 6);
//console.log(userID);

// set cookie as session ID. Allows for username to be used over multiple tabs 
// courtesy of https://www.w3schools.com/js/js_cookies.asp

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

function logCurrentUrl() {
    /*
    Checks location of URL every 5 seconds, this will be reduced to every 1/2 second once live, this is in order to track user navigation
    */
    window.onpopstate = function (event) {
        console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
    };
    window.onhashchange = function () {
        console.log("Currently URL is " + window.location.href);
    }
    setInterval(function () {

        console.log("Currently URL is " + window.location.href);
    }, 5000);
};


// SERP link click log
// listens for SERP link click
// AIM IS TO COMPARE AGAINST All SERP links in array (above) to get SERP rank
function handleWindowClick(event) {
    var origEl = event.target;
    if (origEl.tagName == 'A') {
        // do some things with event link: origEl.toString();
        console.log("Event Link: " + origEl.toString());
    } else if (origEl.parentNode.tagName == 'A') {
        console.log("SERP click:" + origEl.parentNode.toString());
    } else if (origEl.tagName == 'SPAN') {
        console.log("Span  is clicked");
    }
}

// tracks when URL hash changes, however not all URLS use hash....
//see above for URL following

/*
function hashHandler(){
    this.oldHash = window.location.hash;
    this.Check;

    var that = this;
    var detect = function(){
        if(that.oldHash!=window.location.hash){
            console.log("URL is currently" + window.location.hash);
            that.oldHash = window.location.hash;
        }
    };
    this.Check = setInterval(function(){ detect() }, 1000);
}

var hashDetection = new hashHandler();
*/


// tracking bookmarks
// NOTHING HAPPENS ON THE CONSOLE OR FOR bookmark manager CONSOLE EITHER....likely not implemented correctly
/*
chrome.bookmarks.onCreated.addListener(function(id, bookmark) {
       console.log("Bookmark Created"); 
    });
	
chrome.bookmarks.create({'parentId': bookmarkBar.id,
                               'title': 'Study Bookmarks'},
                              function(newFolder) {
        console.log("added folder: " + newFolder.title);
      });	
	
	
	
// attempt at creating link rank, logic flawed? Better to start from scratch?

function qList (){
let queryList, serpRank, i;
var userID = getCookie("username");
queryList = [];
qLen = queryList.length;
text = "<ol>";
for (i = 0; i < qLen; i++) {
    text += "<li>" + queryList[i] + "</li>";
queryList.push($("#lst-ib").val());
//console.log("UserID is " + userID);
return queryList;
console.log(userID + " QUERY: " + queryList );

	}
}
*/

