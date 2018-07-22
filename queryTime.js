var queryTime = {
    queryText: null,
    start: null,
    end: null
};

var queryTimes = [];

function captureSearch(start, queryText) {
    queryTime.queryText = queryText;
    queryTime.end = start;
    if (queryTime.start == null) {
        queryTime.start = start;
    }
}

function addToTimeArray(item) {
    queryTimes.push(item);
}

$("#lst-ib").on('input', function () {
    var searchText = $(this).val();
    if (searchText != null) {
        
        captureSearch(new Date().getTime(), searchText);

        chrome.storage.local.get('iir_querytime', function (result) {
            var existingQueryTimes = result.iir_querytime;
            if (typeof existingQueryTimes != 'undefined') {
                queryTimes = existingQueryTimes;
            }
    
            addToTimeArray(queryTime);
    
            var obj = {};
            obj['iir_querytime'] = queryTimes
            chrome.storage.local.set(obj, function () {
                //Call array from local storage and display in console for reference.
                chrome.storage.local.get('iir_querytime', function (result) {
                    console.log(result);
                });
            });
        });
    }
});