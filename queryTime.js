var queryTime = {
    task: null,
    queryText: null,
    start: null,
    end: null
};

var queryTimes = [];

function captureSearch(task, start, queryText) {
    queryTime.queryText = queryText;
    queryTime.end = start;
    if (queryTime.start == null) {
        queryTime.start = start;
    }
    if (queryTime.task = null) {
        queryTime.task = task;
    }
}

function addToTimeArray(item) {
    queryTimes.push(item);
}

$("#lst-ib").on('input', function () {
    var searchText = $(this).val();
    if (searchText != null) {

        chrome.storage.local.get('iir_tasks', function (result) {
            var existingTasks = result.iir_tasks;
            if (typeof existingTasks != 'undefined') {
                tasks = existingTasks;
            }

            var currentTask = 'Unknown';
            var nextTask = tasks.find(x => x.complete == false);
            if (nextTask != null) {
                currentTask = nextTask.task;
            }

            captureSearch(currentTask, new Date().getTime(), searchText);

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
        });
    }
});

