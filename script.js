var count=0;

$('input[type="radio"]').click(function(){
  count++;

  if(count >= 7)
    displayRadioValue();
});

function displayRadioValue() {
  var ele = document.getElementsByTagName('input');
  var final = 0;
  for (i = 0; i < ele.length; i++) {

    if (ele[i].type == "radio") {

      if (ele[i].checked) {
        if (ele[i].name == "Confidence")
          var Confidence1 = ele[i].value;
        if (ele[i].name == "Integrity")
          var Integrity1 = ele[i].value;
        if (ele[i].name == "Availability")
          var Availability1 = ele[i].value;
        if (ele[i].name == "Privacy")
          var Privacy1 = ele[i].value;
        if (ele[i].name == "Exploitation")
          var Exploitation1 = ele[i].value;
        if (ele[i].name == "UserInteraction")
          var UserInteraction1 = ele[i].value;
        if (ele[i].name == "Privileges")
          var Privileges1 = ele[i].value;
        var final = final + 1;
      }
    }

  }

  if (final >= 7) {
    var TechnicalBaseScore,roundval;
      
    if(Confidence1 == 0 && Integrity1 == 0 && Availability1 == 0){
          TechnicalBaseScore = 0;
          roundval = 0;
    }
    else{
        var TechnicalImpactSubScoreMultiplier = 1 - ((1 - Confidence1) * (1 - Integrity1) * (1 - Availability1) * (1 - Privacy1));     
        var TechnicalImpactSubScore = 6.42 * TechnicalImpactSubScoreMultiplier;
        var Exploitabilty = 8.22 * Exploitation1 * UserInteraction1 * Privileges1;  
        TechnicalBaseScore= Exploitabilty + TechnicalImpactSubScore;
        var minimum = Math.min(TechnicalBaseScore, 10);
        //roundval = Math.round(minimum, 1);
        roundval = minimum.toFixed(1);
      
    }
     
    var severity;
    if (roundval == 0)
        severity = "None";
    else if (roundval >= 0.1 & roundval <= 3.9)
       severity = "Low (P3)";
    else if (roundval >= 4 & roundval <= 6.9)
       severity = "Medium (P2)";
    else if (roundval >= 7 & roundval <= 8.9)
       severity = "High (P1)";
    else
       severity = "Critical (P0)";

    var finalstring = 'Confidence=' + Confidence1 + '&Integrity=' + Integrity1 + '&Availability=' + Availability1 + '&Privacy=' + Privacy1 + '&Exploitation=' + Exploitation1 +
      '&UserInteraction=' + UserInteraction1 + '&Privileges=' + Privileges1;

    var urlfinal = window.location.href + '?' + finalstring;
    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + finalstring;
    window.history.pushState({
      path: newurl
    }, '', newurl);

    var resultElement = document.getElementById("result-row");
    resultElement.classList.add("card");
    resultElement.style.backgroundColor = "#275DC7";
    resultElement.style.color = "white";
    resultElement.innerHTML = "<div class=\"card-body-text\"><p class=\"no-margin\" style=\"text-align:left;\"> Result <span style=\"float:right;\"> Score : " + roundval + "&emsp;&emsp;" + "Severity : " + severity + "</span> </p></div>";
    resultElement.style.display = "block";
    //resultElement.scrollIntoView();
  }
}

function resetAllValues(){
  $("input:radio").each(function(i) {
       this.checked = false;
       $(this).parent('label').removeClass('active');
});

  $("#result-row").css("display","none");
  var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
  window.history.pushState({
    path: newurl
  }, '', newurl);
}

function loadValues() {
  var vars = {},flag=0;
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, x){
    var elementSelector = '[name="' + key + '"][value="' + x + '"]';
    $(elementSelector).prop("checked", true);
    $(elementSelector).parent('label').addClass('active');
    flag=1;
  });

  if(flag == 1)
    displayRadioValue();
}

  $(document).ready(function() {
    loadValues();
    $("a").click(function(){
      debugger
      var url = window.location.href.split('?')[0];
      $("#home-url").attr("href",window.location.href.split('?')[0]);
    });

    $('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
  });
