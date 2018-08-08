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
        chrome.tabs.update({ url: chrome.runtime.getURL("consentForm.html") });
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
        alert('Please check your answers and ensure all are complete if you want to proceed');

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
    if (document.preStudy.age.value == "" || document.getElementById("countries").value == "blank" || document.preStudy.Occupation.value == "" || document.preStudy.gender.checked == false || document.preStudy.language.checked == false || document.preStudy.it_use.checked == false || document.preStudy.se_use.checked == false || document.preStudy.se_pref.checked == false || document.preStudy.studyCode.value == "") {
        alert('Please check your answers and ensure all are complete if you want to proceed');
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
                        postTaskComplete: false
                    },
                    {
                        task: taskOrder.task2,
                        complete: false,
                        preTaskComplete: false,
                        postTaskComplete: false
                    },
                    {
                        task: taskOrder.task3,
                        complete: false,
                        preTaskComplete: false,
                        postTaskComplete: false
                    },
                    {
                        task: taskOrder.task4,
                        complete: false,
                        preTaskComplete: false,
                        postTaskComplete: false
                    }
                ]

                var taskObj = {};
                taskObj['iir_tasks'] = tasks;
                chrome.storage.local.set(taskObj, function () {
                    chrome.storage.local.get('iir_tasks', function (result) {
                        console.log(result);
                        chrome.tabs.update({ url: chrome.runtime.getURL("preTask.html") });
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

//event listener for click on view first question button
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('pre-study').addEventListener('click', countdown);
});

function countdown()//remsec in second
{
    var newURL = "https://www.google.co.uk/";
    chrome.tabs.create({ url: newURL });

    var endTime = new Date().getTime() + 60000

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
                        var page = nextTask.task + '.html';
                        chrome.tabs.update({ url: chrome.runtime.getURL(page) });
                    });
                });
            });
        });
    });
}

function PostTask() {
    {
        chrome.tabs.update({ url: chrome.runtime.getURL("postTask.html") });
    }
}

function postStudy() {
    {
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

                        if (nextTask != null) {
                            chrome.tabs.update({ url: chrome.runtime.getURL("preTask.html") });
                        }
                        else {
                            chrome.tabs.update({ url: chrome.runtime.getURL("endStudy.html") });
                        }
                    });
                });
            });
        });
    }
}

//event listener for click on view first question button
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('post-study').addEventListener('click', postStudy);
});