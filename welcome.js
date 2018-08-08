//event listener for the main menu click
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('menu').addEventListener('click', showMenu);
});
//open the main menu
function showMenu() {
    chrome.tabs.create({ url: chrome.runtime.getURL("welcome.html") });
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
	if(document.consent.consent1.checked == false || document.consent.consent2.checked == false || document.consent.sign.checked == false){
	alert ('Please check your answers and ensure all are complete if you want to proceed');
        
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
	if(document.preStudy.age.value == "" || document.getElementById("countries").value == "blank" || document.preStudy.Occupation.value == "" || document.preStudy.gender.checked == false || document.preStudy.language.checked == false || document.preStudy.lang_text.value == "" || document.preStudy.it_use.checked == false || document.preStudy.se_use.checked == false || document.preStudy.se_pref.checked == false){
	alert ('Please check your answers and ensure all are complete if you want to proceed');
	}
	else {
    var preStudyValues = {
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
    obj['iir_form_prestudy'] = preStudyValues
    chrome.storage.local.set(obj, function () {
        chrome.storage.local.get('iir_form_prestudy', function (result) {
            console.log(result);
            chrome.tabs.update({ url: chrome.runtime.getURL("preTask.html") });
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

  var endTime = new Date().getTime() + 600000
  
  var obj = {};
  obj['iir_timer'] = endTime
  chrome.storage.local.set(obj, function () {
      chrome.storage.local.get('iir_timer', function (result) {
          console.log(result);
      });
  });

}

function PostTask() {
    {
        chrome.tabs.update({ url: chrome.runtime.getURL("postTask.html") });
    }
}