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

function setCookie(cname, cvalue, exdays){
 var d = new Date();
 d.setTime(d.getTime() + (exdays*24*60*60*1000));
 var expires = "expires="+ d.toUTCString();
 document.cookie = "username" + "=" + cvalue + ";" + expires + ";path=/";
 console.log("cookie name " + cname);

}

function getCookie(cname){
	var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i<ca.length; i++){
	var c = ca[i];
		while (c.charAt(0) == ' '){
		c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
		return c.substring(name.length,c.length);
		}
	}
	return "";
}


/* 
I changed the expired date to 1 day, because you wouldn't need the id for longer than that, now when it 
expires the username disappears but it doesn't generate a new username, it remains blank
*/

function checkCookie() {
    var user = getCookie("username");
	var expired = getCookie("exdays");
	//console.log("expiry is " + expired);
    if (user.length === 8 && expired != null) {
        console.log("Welcome again " + user);
    } else {
		// username is a random 6 string which lasts for 1 day - intitally was random but risks duplication, 
	    // instead opted for hashing the date, howevere creates an 8 digit string not 6
        //user = Math.random().toString(36).substr(2, 6);
		user = (+new Date).toString(36);
        if (user.length === 8 && user != null) {
            setCookie("username", user, 1);
        }
    } 
	
}


// added this as the checkCookie function didn't seem to trigger
checkCookie();

var user = (+new Date).toString(36);
console.log(document.cookie);

// for testing purposes, and also to hard reset the cookie username
//document.cookie = "username=Jasd; expires=Thu, 08 June 2018 18:27:00 UTC; path=/";
/*
if (document.cookie.split(';').filter((item) => {
    return item.includes('username=')
}).length) {
    console.log('The cookie "reader" exists')
}
else{
	console.log("No cookie");
}

var x = document.cookie;
console.log("doc cookie" + x);
*/

//  cookie set as a session id. retrieve 'username' and return as 
//document.cookie = "username=Jasd; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";

// use userid and link to the query and SERP results that are input and returned
const userID = getCookie("username");

console.log("UserID is " + userID);
console.log(userID + " QUERY: " + $("#lst-ib").val() );

/*

Reads the page for the query that was submit.
finds all search results and creates an array of the URL's. 

*/
/*
// Are there any g class divs?
if($(".g").length > 0) {

// For each one, extract the link text and send it to the console

$( ".g" ).each( function( index, element ){
    let searchResult = [];
	 
	 var d = new Date();
	 //var d = new Date().toLocaleTimeString();
    //var n = d.toUTCString();

	searchResult.push($( this ).find("h3.r").find("a").attr('href') + " | " + $( this ).find("h3.r").find("a").text()); 
	// console.log(userID + " RESULT: " + $( this ).find("h3.r").find("a").attr('href') + " | " + $( this ).find("h3.r").find("a").text() );
	//console.log(searchResult)

});
}

 window.onpopstate = function(event) {
  console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
};
 /*window.onhashchange = function() { 
    console.log("Currently URL is " + window.location.href);
 }
 setInterval(function(){ 
 
 console.log("Currently URL is " + window.location.href); }, 5000);
 */

 // SERP link click log
// listens for SERP link click
// AIM IS TO COMPARE AGAINST All SERP links in array (above) to get SERP rank
/*
function handleWindowClick(event) {
            var origEl = event.target;
            if(origEl.tagName == 'A') {
                // do some things with event link: origEl.toString();
                console.log("Event Link: " + origEl.toString());
            } else if(origEl.parentNode.tagName == 'A') {   
                console.log("SERP click:" + origEl.parentNode.toString());
            } else if(origEl.tagName == 'SPAN') {
                console.log("Span  is clicked"); 
            }
    }

window.addEventListener('click', handleWindowClick, false);

// tracks when URL hash changes, however not all URLS use hash....
// how else to track URL changes?

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
// NOTHING HAPPENS ON THE CONSOLE OR FOR bookmark manager CONSOLE EITHER....
/*
chrome.bookmarks.onCreated.addListener(function(id, bookmark) {
       console.log("Bookmark Created"); 
    });
	
chrome.bookmarks.create({'parentId': bookmarkBar.id,
                               'title': 'Study Bookmarks'},
                              function(newFolder) {
        console.log("added folder: " + newFolder.title);
      });	
	
	
	

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

