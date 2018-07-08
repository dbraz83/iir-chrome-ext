
function openQ(){
    { chrome.tabs.create({ url: chrome.runtime.getURL("Q1.html") });
}}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('qlink').addEventListener('click', openQ);
});

function startStudy(){
    alert("Starting Study");
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('testStart').addEventListener('click', startStudy);
});