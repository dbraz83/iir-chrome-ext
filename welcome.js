//event listener for the main menu click
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('menu').addEventListener('click', showMenu);
});
//open the main menu
function showMenu(){
  chrome.tabs.create({ url: chrome.runtime.getURL("welcome.html") });
    };

//function to open the first question page
function openQ(){
    { chrome.tabs.update({ url: chrome.runtime.getURL("consentForm.html") });
}}

//event listener for click on view first question button
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('qlink').addEventListener('click', openQ);
});

//start study
function startStudy(){
    { chrome.tabs.update({ url: chrome.runtime.getURL("preStudy.html") });
}
//event listener for submitting consent and starting preStudy questionnaire
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('testStart').addEventListener('click', startStudy);
});
//start pre task
function preTask(){
    { chrome.tabs.update({ url: chrome.runtime.getURL("preTask.html") });
}
//event listener for submitting preStudy questionnaire
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('testStart').addEventListener('click', preTask);
});

