$(document).ready(function () {
    logCurrentUrl();
});

function logCurrentUrl() {

    console.log("I started up!");
    // chrome.storage.local.set({"startedUp": true}); 
    /*
    Checks location of URL every 5 seconds, this will be reduced to every 1/2 second once live, this is in order to track user navigation
    */
    window.onpopstate = function (event) {
        console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
    };
    window.onhashchange = function () {
        console.log("The URL is " + window.location.href);
    }
    setInterval(function () {

        console.log("Currently URL is " + window.location.href);
    }, 1000);
};