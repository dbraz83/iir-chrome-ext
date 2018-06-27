// create a new file on extension startup using userid as file name?
function createFile(){
var data = new FormData();
var file = String(userID);
data.append(file , "New user file created");
var xhr = new XMLHttpRequest();
xhr.open( 'post', '/path/to/php', true );
xhr.send(data);
}

// checks if the file exists
// if it doesn't it calls back the 404 error

function fileExists(url, callback)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url);
    http.onreadystatechange = function() {
        if (this.readyState == this.DONE) {
            callback(this.status != 404);
        }
    };
    http.send();
}

// check if file exists, if it doesn't create a new file
// otherwise append file systematically
// How best to structure file and append file while user is interacting? After each interaction?

function fileAppend(){
var fName = UrlExists(,);
if(fName === "404"){
createFile();
}
else
{
// Append file
var addToFile = new XMLHttpRequest();
var file = NAME OF FILE?;
addToFile.append(file , "CONTENT TO BE APPENDED");
var xhr = new XMLHttpRequest();
xhr.open( 'post', '/path/to/php', true );
xhr.send(data);

};
}