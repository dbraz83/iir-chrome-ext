var latinSquare = [
    {
        studyCode: "A",
        task1: "dbd",
        task2: "health",
        task3: "housing",
        task4: "visa"
    },
    {
        studyCode: "B",
        task2: "dbd",
        task3: "health",
        task4: "housing",
        task1: "visa"
    },
    {
        studyCode: "C",
        task3: "dbd",
        task4: "health",
        task1: "housing",
        task2: "visa"
    },
    {
        studyCode: "D",
        task4: "dbd",
        task1: "health",
        task2: "housing",
        task3: "visa"
    },
    {
        studyCode: "E",
        task4: "dbd",
        task3: "health",
        task2: "housing",
        task1: "visa"
    },
    {
        studyCode: "F",
        task1: "dbd",
        task4: "health",
        task3: "housing",
        task2: "visa"
    },
    {
        studyCode: "G",
        task2: "dbd",
        task1: "health",
        task4: "housing",
        task3: "visa"
    },
    {
        studyCode: "H",
        task3: "dbd",
        task2: "health",
        task1: "housing",
        task4: "visa"
    },
    {
        studyCode: "I",
        task1: "dbd",
        task3: "health",
        task2: "housing",
        task4: "visa"
    },
    {
        studyCode: "J",
        task2: "dbd",
        task4: "health",
        task3: "housing",
        task1: "visa"
    },
    {
        studyCode: "K",
        task3: "dbd",
        task1: "health",
        task4: "housing",
        task2: "visa"
    },
    {
        studyCode: "L",
        task4: "dbd",
        task2: "health",
        task1: "housing",
        task3: "visa"
    },
    {
        studyCode: "M",
        task1: "dbd",
        task3: "health",
        task4: "housing",
        task2: "visa"
    },
    {
        studyCode: "N",
        task2: "dbd",
        task4: "health",
        task1: "housing",
        task3: "visa"
    },
    {
        studyCode: "O",
        task3: "dbd",
        task1: "health",
        task2: "housing",
        task4: "visa"
    },
    {
        studyCode: "P",
        task4: "dbd",
        task2: "health",
        task3: "housing",
        task1: "visa"
    },
    {
        studyCode: "Q",
        task4: "dbd",
        task3: "health",
        task1: "housing",
        task2: "visa"
    },
    {
        studyCode: "R",
        task3: "dbd",
        task4: "health",
        task2: "housing",
        task1: "visa"
    },
    {
        studyCode: "S",
        task2: "dbd",
        task3: "health",
        task1: "housing",
        task4: "visa"
    },
    {
        studyCode: "T",
        task1: "dbd",
        task2: "health",
        task4: "housing",
        task3: "visa"
    }
]
function hideShow() {
    var tasks = [];
    chrome.storage.local.get('iir_tasks', function (result) {
        var existingTasks = result.iir_tasks;
        if (typeof existingTasks != 'undefined') {
            tasks = existingTasks;
        }

        nextTask = tasks.find(x => x.complete == false);

        if (nextTask == null) {
            document.getElementById("menu").style.visibility = 'visible';
            document.getElementById("resume").style.visibility = 'hidden';
            document.getElementById("end-task").style.visibility = 'hidden';
            document.getElementById("task").style.visibility = 'hidden';
        }
        else {
            document.getElementById("menu").style.visibility = 'hidden';
            document.getElementById("resume").style.visibility = 'visible';
            document.getElementById("end-task").style.visibility = 'visible';
            document.getElementById("task").style.visibility = 'visible';
        }
    });
}
//event listener for the main menu click
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('menu').addEventListener('click', showMenu);

});
//open the main menu
function showMenu() {
    chrome.tabs.create({ url: chrome.runtime.getURL("welcome.html") });

};

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('instructions').addEventListener('click', showInst);
});
//open the main menu
function showInst() {
    chrome.tabs.create({ url: chrome.runtime.getURL("instructions.html") });

};




//function to open the first question page
function openQ() {
    {
        chrome.storage.local.get('iir_form_consent', function (result) {
            if (typeof result.iir_form_consent != 'undefined') {
                chrome.tabs.update({ url: "https://google.co.uk" });
            }
            else {
                chrome.tabs.update({ url: chrome.runtime.getURL("consentForm.html") });
            }
        });
    }
}

//event listener for click on view first question button
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('qlink').addEventListener('click', openQ);
});



//start study


function startStudy() {
    //before we store the form values we check if all were checked
    if (document.consent.consent1.checked == false || document.consent.consent2.checked == false || document.consent.sign.checked == false) {
        alert('You cannot take this study without your consent.');

    }
    else {

        var consentValues = {
            consent1: $('#consent1').is(':checked'),
            consent2: $('#consent2').is(':checked'),
            consentText: $('#consent_text').val(),
            sign: $('#sign').is(':checked')
        }

        var obj = {};
        obj['iir_form_consent'] = consentValues
        chrome.storage.local.set(obj, function () {
            chrome.storage.local.get('iir_form_consent', function (result) {
                console.log(result);
                chrome.tabs.update({ url: chrome.runtime.getURL("preStudy.html") });
            });
        });
    }
}

//event listener for submitting consent and starting preStudy questionnaire
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('testStart').addEventListener('click', startStudy);
});
//start pre task
function preStudy() {
    //before we store the form values we check if all were checked
    if (document.preStudy.age.value == "") {
        alert('Age is required');
    }
    else if (document.getElementById("countries").value == "blank") {
        alert('Country is required');
    }
    else if (document.preStudy.Occupation.value == "") {
        alert('Occupation is required');
    }
    else if (document.preStudy.gender.checked == false) {
        alert('Gender is required');
    }
    else if (document.preStudy.language.checked == false) {
        alert('Language is required');
    }
    else if (document.preStudy.it_use.checked == false) {
        alert('IT use is required');
    }
    else if (document.preStudy.se_use.checked == false) {
        alert('Search Engine use is required');
    }
    else if (document.preStudy.se_pref.checked == false) {
        alert('Search Engine Preference is required');
    }
    else if (document.preStudy.studyCode.value == "") {
        alert('Study Code is required');
    }
    else {
        var preStudyValues = {
            studyCode: $('#studyCode').val(),
            age: $('#age').val(),
            nationality: $('#countries').val(),
            course: $('#Occupation').val(),
            gender: $("input[name='gender']:checked").val(),
            language: $("input[name='language']:checked").val(),
            languageText: $('#lang_text').val(),
            itUse: $("input[name='it_use']:checked").val(),
            internetUse: $("input[name='inet_use']:checked").val(),
            searchEngineUse: $("input[name='se_use']:checked").val(),
            searchEnginePreference: $("input[name='se_pref']:checked").val(),
            searchEngineText: $('#SE_text').val(),
            emailUpdate: $("input[name='update']:checked").val(),
            updateText: $('#update_text').val()
        }

        var obj = {};
        obj['iir_form_prestudy'] = preStudyValues;
        chrome.storage.local.set(obj, function () {
            chrome.storage.local.get('iir_form_prestudy', function (result) {
                console.log(result);

                var taskOrder = latinSquare.find(x => x.studyCode == preStudyValues.studyCode.toUpperCase());

                var tasks = [
                    {
                        task: taskOrder.task1,
                        complete: false,
                        preTaskComplete: false,
                        postTaskComplete: false,
                        taskEndTime: null
                    },
                    {
                        task: taskOrder.task2,
                        complete: false,
                        preTaskComplete: false,
                        postTaskComplete: false,
                        taskEndTime: null
                    },
                    {
                        task: taskOrder.task3,
                        complete: false,
                        preTaskComplete: false,
                        postTaskComplete: false,
                        taskEndTime: null
                    },
                    {
                        task: taskOrder.task4,
                        complete: false,
                        preTaskComplete: false,
                        postTaskComplete: false,
                        taskEndTime: null
                    }
                ]

                var taskObj = {};
                taskObj['iir_tasks'] = tasks;
                chrome.storage.local.set(taskObj, function () {
                    chrome.storage.local.get('iir_tasks', function (result) {
                        console.log(result);
                        var page = taskOrder.task1 + '.html';
                        chrome.tabs.update({ url: chrome.runtime.getURL(page) });
                    });
                });
            });
        });
    }
}
//event listener for submitting preStudy questionnaire
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('preStudy').addEventListener('click', preStudy);
});

function goToPreTask() {
    chrome.tabs.update({ url: chrome.runtime.getURL("preTask.html") });

}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('task-start').addEventListener('click', goToPreTask);
});

//event listener for click on view first question button
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('pre-study').addEventListener('click', countdown);
});

function countdown()//remsec in second
{
    if ($("input[name='exp']:checked").val() == null) {
        alert('Experience is required');
    }
    else if ($("input[name='know']:checked").val() == null) {
        alert('Knowledge is required');
    }
    else if ($("input[name='int']:checked").val() == null) {
        alert('Interest is required');
    }
    else if ($("input[name='diff']:checked").val() == null) {
        alert('Difficulty is required');
    }
    else {
        var newURL = "https://www.google.co.uk/";
        chrome.tabs.update({ url: newURL });

        var endTime = new Date().getTime() + 600000

        var obj = {};
        obj['iir_timer'] = endTime
        chrome.storage.local.set(obj, function () {
            chrome.storage.local.get('iir_timer', function (result) {
                console.log(result);

                var tasks = [];
                chrome.storage.local.get('iir_tasks', function (result) {
                    var existingTasks = result.iir_tasks;
                    if (typeof existingTasks != 'undefined') {
                        tasks = existingTasks;
                    }

                    var nextTask = tasks.find(x => x.complete == false);

                    var preTasks = []
                    chrome.storage.local.get('iir_form_pretasks', function (result) {
                        var existingPreTasks = result.iir_form_pretasks;
                        if (typeof existingPreTasks != 'undefined') {
                            preTasks = existingPreTasks;
                        }

                        var preTaskValues = {
                            task: nextTask.task,
                            exp: $("input[name='exp']:checked").val(),
                            know: $("input[name='know']:checked").val(),
                            int: $("input[name='int']:checked").val(),
                            diff: $("input[name='diff']:checked").val(),
                        }
                        preTasks.push(preTaskValues);

                        var preTaskObj = {};
                        preTaskObj['iir_form_pretasks'] = preTasks
                        chrome.storage.local.set(preTaskObj, function () {
                            for (var i in tasks) {
                                if (tasks[i].task == nextTask.task) {
                                    tasks[i].preTaskComplete = true;
                                }
                            }

                            var taskObj = {};
                            taskObj['iir_tasks'] = tasks
                            chrome.storage.local.set(taskObj, function () {
                                chrome.tabs.update({ url: "https://google.co.uk" });
                            });
                        });
                    });
                });
            });
        });
    }
}

function PostTask() {
    {
        chrome.tabs.update({ url: chrome.runtime.getURL("postTask.html") });
    }
}

function postStudy() {
    {
        if ($("input[name='q1']:checked").val() == null) {
            alert('Q1 is required');
        }
        else if ($("input[name='q2']:checked").val() == null) {
            alert('Q2 is required');
        }
        else if ($("input[name='q3']:checked").val() == null) {
            alert('Q3 is required');
        }
        else if ($("input[name='q4']:checked").val() == null) {
            alert('Q4 is required');
        }
        else if ($("input[name='q5']:checked").val() == null) {
            alert('Q5 is required');
        }
        else if ($("input[name='q6']:checked").val() == null) {
            alert('Q6 is required');
        }
        else if ($("input[name='q7']:checked").val() == null) {
            alert('Q7 is required');
        }
        else if ($("input[name='q8']:checked").val() == null) {
            alert('Q9 is required');
        }
        else if ($("input[name='q9']:checked").val() == null) {
            alert('Q9 is required');
        }
        else if ($("input[name='q10']:checked").val() == null) {
            alert('Q10 is required');
        }
        else if ($("input[name='q11']:checked").val() == null) {
            alert('Q11 is required');
        }
        else if ($("input[name='q12']:checked").val() == null) {
            alert('Q12 is required');
        }
        else if ($("input[name='q13']:checked").val() == null) {
            alert('Q13 is required');
        }
        else {

            var tasks = [];
            chrome.storage.local.get('iir_tasks', function (result) {
                var existingTasks = result.iir_tasks;
                if (typeof existingTasks != 'undefined') {
                    tasks = existingTasks;
                }

                var nextTask = tasks.find(x => x.complete == false);

                var postTasks = [];
                chrome.storage.local.get('iir_form_posttasks', function (result) {
                    var existingPostTasks = result.iir_form_posttasks;
                    if (typeof existingPostTasks != 'undefined') {
                        postTasks = existingPostTasks;
                    }

                    var postTaskValues = {
                        task: nextTask.task,
                        q1: $("input[name='q1']:checked").val(),
                        q2: $("input[name='q2']:checked").val(),
                        q3: $("input[name='q3']:checked").val(),
                        q4: $("input[name='q4']:checked").val(),
                        q5: $("input[name='q5']:checked").val(),
                        q6: $("input[name='q6']:checked").val(),
                        q7: $("input[name='q7']:checked").val(),
                        q8: $("input[name='q8']:checked").val(),
                        q9: $("input[name='q9']:checked").val(),
                        q10: $("input[name='q10']:checked").val(),
                        q11: $("input[name='q11']:checked").val(),
                        q12: $("input[name='q12']:checked").val(),
                        q13: $("input[name='q13']:checked").val()
                    }
                    postTasks.push(postTaskValues);

                    var postTaskObj = {};
                    postTaskObj['iir_form_posttasks'] = postTasks
                    chrome.storage.local.set(postTaskObj, function () {
                        for (var i in tasks) {
                            if (tasks[i].task == nextTask.task) {
                                tasks[i].complete = true;
                                tasks[i].postTaskComplete = true;
                            }
                        }

                        var taskObj = {};
                        taskObj['iir_tasks'] = tasks
                        chrome.storage.local.set(taskObj, function () {
                            nextTask = tasks.find(x => x.complete == false);

                            chrome.tabs.query({}, function (tabs) {
                                for (var i = 0; i < tabs.length; i++) {
                                    if (tabs[i].url !== chrome.runtime.getURL("postTask.html"))
                                        chrome.tabs.remove(tabs[i].id);
                                }

                                if (nextTask != null) {
                                    var page = nextTask.task + '.html';
                                    chrome.tabs.update({ url: chrome.runtime.getURL(page) });
                                }
                                else {
                                    chrome.tabs.update({ url: chrome.runtime.getURL("endStudy.html") });
                                }
                            });
                        });
                    });
                });
            });
        }
    }
}

//event listener for click on view first question button
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('post-study').addEventListener('click', postStudy);
});

function resumeStudy() {
    var tasks = [];
    chrome.storage.local.get('iir_tasks', function (result) {
        var existingTasks = result.iir_tasks;
        if (typeof existingTasks != 'undefined') {
            tasks = existingTasks;
        }

        nextTask = tasks.find(x => x.complete == false);

        if (nextTask != null) {
            if (nextTask.preTaskComplete == false) {
                chrome.tabs.update({ url: chrome.runtime.getURL("preTask.html") });
            }
            else if (nextTask.postTaskComplete == false) {
                chrome.tabs.update({ url: chrome.runtime.getURL("postTask.html") });
            }
            else {
                chrome.tabs.update({ url: "https://google.co.uk" })
            }
        }
        else {
            chrome.tabs.update({ url: chrome.runtime.getURL("endStudy.html") });
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('resume').addEventListener('click', resumeStudy);
});


function endTask() {
    chrome.tabs.update({ url: chrome.runtime.getURL("postTask.html") });

    //log the time task was stopped to the tasks storage
    var tasks = [];
    chrome.storage.local.get('iir_tasks', function (result) {
        var existingTasks = result.iir_tasks;
        if (typeof existingTasks != 'undefined') {
            tasks = existingTasks;
        }

        chrome.storage.local.get('iir_timer', function (result) {
            var storedTime = result.iir_timer;
            var currentTime = new Date().getTime();
            var timeLeft = storedTime - currentTime;

            var thisTask = tasks.find(x => x.complete == false)
            for (var i in tasks) {
                if (tasks[i].task == thisTask.task) {
                    tasks[i].taskEndTime = timeLeft;
                }
            }

            //save the task
            var taskObj = {};
            taskObj['iir_tasks'] = tasks;
            chrome.storage.local.set(taskObj, function () {
            });
        });


        //remove the stored time to stop clock
        chrome.storage.local.remove(["iir_timer"], function () {
            var error = chrome.runtime.lastError;
            if (error) {
                console.error(error);
            }
        });
    });
};

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('end-task').addEventListener('click', endTask);
});

$(function () {
    var tasks = [];
    chrome.storage.local.get('iir_tasks', function (result) {
        var existingTasks = result.iir_tasks;
        if (typeof existingTasks != 'undefined') {
            tasks = existingTasks;
        }
        var pageName = $('#page').val();

        if (pageName == 'popup') {
            var outstandingTask = tasks.find(x => x.complete == false);
            if (outstandingTask == null) {
                document.getElementById("menu").style.visibility = 'visible';
                document.getElementById("resume").style.visibility = 'hidden';
                document.getElementById("end-task").style.visibility = 'hidden';
                document.getElementById("task").style.visibility = 'hidden';
            }
            else {
                document.getElementById("menu").style.visibility = 'hidden';
                document.getElementById("resume").style.visibility = 'visible';
                document.getElementById("end-task").style.visibility = 'visible';
                document.getElementById("task").style.visibility = 'visible';
            }
        }
        else {
            var thisTask = tasks.find(x => x.task == pageName);

            if (thisTask != null && thisTask.preTaskComplete) {
                $('#task-start').hide();
            }
        }
    });
});

// to clear all local.storage arrays

function clear() {
    chrome.storage.local.remove(["iir_urls", "iir_form_pretasks", "iir_tasks", "iir_form_consent", "iir_form_prestudy", "iir_timer", "iir_bookmarks", "iir_form_posttasks", "iir_searches", "iir_clicks", "iir_querytime"], function () {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    })
}

// finding the task description
function taskDesc() {
    var tasks = [];
    chrome.storage.local.get('iir_tasks', function (result) {
        var existingTasks = result.iir_tasks;
        if (typeof existingTasks != 'undefined') {
            tasks = existingTasks;
        }
        
        nextTask = tasks.find(x => x.complete == false);

        if (nextTask != null) {
            var page = nextTask.task + '.html';
            chrome.tabs.create({ url: chrome.runtime.getURL(page) });
        }
        else {
            chrome.tabs.update({ url: chrome.runtime.getURL("endStudy.html") });
        }
    });
}
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('task').addEventListener('click', taskDesc);
});

