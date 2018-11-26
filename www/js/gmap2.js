 var dateList=[]; 
 var options = {day: 'numeric', month: 'numeric', year: 'numeric'};
 var date = new Date();
 var username = document.getElementById("email_value").innerHTML;
        
   // var today = new Date(); 
   // var dd = today.getDate();
   // var mm = today.getMonth()+1; //January is 0!
   // var yyyy = today.getFullYear();
   // if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = yyyy +'-'+ mm+ '-' +dd;
    $('#datepicker').attr('value', date);

    $(function () {
    $('#datepicker').val(date.toLocaleDateString("en-en"));
    $('#cal-prev').click(function () {
        date.setDate(date.getDate() - 1);
        $('#datepicker').val(date.toLocaleDateString("en-en", options));
        getForDate();
        getDoclog();
    });
    
    $('#cal-next').click(function () {
        date.setDate(date.getDate() + 1);
        $('#datepicker').val(date.toLocaleDateString("en-en", options));
        getForDate();
        getDoclog();
        });
    }); 

    //Start of document ready function
    $(document).ready(function(){
        getForDate();
        getDoclog();


       
        var created_date = new Date();   
          
              //DOC LOG VARIABLES
            var medication = document.getElementById("medicationName").value;
            var dosage = document.getElementById("dosageNum").value;
            var dosageMeasure = document.getElementById("medsDoseSel");
            var dosageMeasureValue = document.getElementById("medsDoseSel").value;
            var comment = document.getElementById("meds-comment").value;
            var complete = document.getElementById("healthtracker_prescription").value;
            var docdata = [{
                "username":"testuser",
                "medication": medication,
                "dosage": dosage,
                "comment": comment,
                "complete": complete,
                "created_date":created_date
             }];  

      //ADD SYMPTOMS
        $("#submitData").click(function() {
   
        var day;
        var pain;
        var stress;
        var stool;
        var bowelm;

        var bowelf;
        var bvisit;

        // var healthTrackerLUDescipt;
        // var healthTrackerLUPain;
        // var healthTrackerDIDescipt;
        // var healthTrackerDIPain;
        // var healthTrackerContentData1;
        // var healthTrackerContentData2;


        if(document.getElementById("good").checked){
            day = document.getElementById("good").value;
        }
        if(document.getElementById("okay").checked){
            day = document.getElementById("okay").value;
        }
        if(document.getElementById("bad").checked){
            day = document.getElementById("bad").value;
        }
        
        if(document.getElementById("pain-low").checked){
            pain = document.getElementById("pain-low").value;
        }
        if(document.getElementById("pain-medium").checked){
            pain = document.getElementById("pain-medium").value;
        }
        if(document.getElementById("pain-high").checked){
            pain = document.getElementById("pain-high").value;
        }

        if(document.getElementById("stress-low").checked){
            stress = document.getElementById("stress-low").value;
        }
        if(document.getElementById("stress-medium").checked){
            stress = document.getElementById("stress-medium").value;
        }
        if(document.getElementById("stress-high").checked){
            stress = document.getElementById("stress-high").value;
        }

        if(document.getElementById("stool-hard").checked){
            stool = document.getElementById("stool-hard").value;
        }
        if(document.getElementById("stool-medium").checked){
            stool = document.getElementById("stool-medium").value;
        }
        if(document.getElementById("stool-soft").checked){
            stool = document.getElementById("stool-soft").value;
        }

        if(document.getElementById("bowel-light").checked){
            bowelm = document.getElementById("bowel-light").value;
        }
        if(document.getElementById("bowel-medium").checked){
            bowelm = document.getElementById("bowel-medium").value;
        }
        if(document.getElementById("bowel-heavy").checked){
            bowelm = document.getElementById("bowel-heavy").value;
        }

        if(document.getElementById("1-4").checked){
            bowelf = document.getElementById("1-4").value;
        }
        if(document.getElementById("5-8").checked){
            bowelf = document.getElementById("5-8").value;
        }
        if(document.getElementById("9OrMore").checked){
            bowelf = document.getElementById("9OrMore").value;
        }

        if(document.getElementById("1-2").checked){
            bvisit = document.getElementById("1-2").value;
        }
        if(document.getElementById("3-4").checked){
            bvisit = document.getElementById("3-4").value;
        }
        if(document.getElementById("5OrMore").checked){
            bvisit = document.getElementById("5OrMore").value;
        }


        var symptomdata = [{
                "username":"testuser", 
                "day":day,
                "date":date, 
                "pain":pain,
                "stress":stress, 
                "stool":stool, 
                "bowelm":bowelm, 
                "bowelf":bowelf, 
                "bvisit":bvisit, 
                "created_date":created_date
            }];

       


    //POST STATEMENT FOR SYMPTOMS
    $.ajax("https://fast-garden-93601.herokuapp.com/api/symptoms", {
            data: JSON.stringify(symptomdata),
            accept: "application/json",
            contentType: "application/json",
            method: "POST",
            success: function () {
                alert("Day added");
                dateList.push(date);
                console.log(symptomdata);
                //if(isInArray(dateList, date))
            {
                document.getElementById("submitData").disabled = true;       
            }
                console.log(dateList);
            },
            error: function(){
                alert("Not added");
            }
        });
    
     });

    //POST STATEMENT FOR DOCDATA
    $("#submitDocData").click(function() {
    $.ajax("https://fast-garden-93601.herokuapp.com/api/doclogs", {
            data: JSON.stringify(docdata),
            accept: "application/json",
            contentType: "application/json",
            method: "POST",
            success: function () {
                alert("Day added");
                dateList.push(date);
                console.log(docdata);
                //if(isInArray(dateList, date))
            {
                document.getElementById("submitDocData").disabled = true;       
            }
                console.log(dateList);
            },
            error: function(){
                alert("Not added");
            }
        });
    });


    //GET ALL SYMPTOM DATA
    $("#getData").click(function() {
        $.ajax("https://fast-garden-93601.herokuapp.com/api/symptoms", {
            data: { get_param: 'value' }, 
            type: 'GET',  
            dataType: 'json',
            success: function (data) { 
                $.each(data, function(index, element) {
                    console.log(element);
                });
            }
        });
    });

    //GET ALL FOOD DATA
    $("#getAllFoodData").click(function() {
        $.ajax("https://fast-garden-93601.herokuapp.com/api/food", {
            data: { get_param: 'value' }, 
            type: 'GET',  
            dataType: 'json',
            success: function (data) { 
                $.each(data, function(index, element) {
                    console.log(element);
                });
            }
        });
    });

    //GET ALL DOCLOG DATA
    $("#getAllDoclogData").click(function() {
        $.ajax("https://fast-garden-93601.herokuapp.com/api/doclog", {
            data: { get_param: 'value' }, 
            type: 'GET',  
            dataType: 'json',
            success: function (data) { 
                $.each(data, function(index, element) {
                    console.log(element);
                });
            }
        });
    });


    //End of Document on load 
   });
    
    //GET HEALTH TRACKER FOR SPECIFIC DATE
    function getForDate(){
        $.ajax("https://fast-garden-93601.herokuapp.com/api/symptoms", {
            data: { get_param: 'value' }, 
            type: 'GET',  
            dataType: 'json',
            success: function (data) { 
                $.each(data, function(index, element) {
                    //change with security 
                    if(element.username == "testuser"){
                    console.log(element.date.toString().substring(0,10));
                    var datadate = element.date.toString().substring(0,10);
                    var pickerDate  = document.getElementById('datepicker').value; 
                    console.log("DATE ARRAY: "+ pickerDate);
                    var splitDate = pickerDate.split("/");
                    var newdate= splitDate[2] + '-' + splitDate[0] + '-' + splitDate[1];
                    console.log(newdate);
                        if (datadate == newdate){
                        //    alert("Data exists");
                            console.log(element);
                            document.getElementById("submitData").disabled = true; 
                            if(element.day = "good"){
                            document.getElementById("good").checked = true;
                            }
                            if(element.day = "okay"){
                            document.getElementById("okay").checked = true;
                            }
                            if(element.day = "bad"){
                            document.getElementById("good").checked = true;
                            }
                            if(element.pain = "low"){
                                document.getElementById("pain-low").checked = true;
                            }
                            if(element.pain = "medium"){
                                document.getElementById("pain-medium").checked = true;
                            }
                            if(element.pain = "high"){
                                document.getElementById("pain-high").checked = true;
                            }
                            if(element.stress = "low"){
                                document.getElementById("stress-low").checked = true;
                            }
                            if(element.stress = "medium"){
                                document.getElementById("stress-medium").checked = true;
                            }
                            if(element.stress = "hard"){
                                document.getElementById("stress-high").checked = true;
                            }
                            if(element.stool = "soft"){
                                document.getElementById("stool-soft").checked = true;
                            }
                            if(element.stool = "medium"){
                                document.getElementById("stool-medium").checked = true;
                            }
                            if(element.stool = "hard"){
                                document.getElementById("stool-hard").checked = true;
                            }
                            if(element.bowelm = "light"){
                                document.getElementById("bowel-light").checked = true;
                            }
                            if(element.bowelm = "medium"){
                                document.getElementById("bowel-medium").checked = true;
                            }
                            if(element.bowelm = "heavy"){
                                document.getElementById("bowel-heavy").checked = true;
                            }
                            if(element.bowelf = "1-4"){
                                document.getElementById("1-4").checked = true;
                            }
                            if(element.bowelf = "5-8"){
                                document.getElementById("5-8").checked = true;
                            }
                            if(element.bowelf = "9OrMore"){
                                document.getElementById("9OrMore").checked = true;
                            }
                            if(element.bvisit = "1-2"){
                                document.getElementById("1-2").checked = true;
                            }
                            if(element.bvisit = "3-4"){
                                document.getElementById("3-4").checked = true;
                            }
                            if(element.bvisit = "5OrMore"){
                                document.getElementById("5OrMore").checked = true;
                            }
                        }
                        else{
                            console.log("No data for this date");
                            document.getElementById("good").checked = false;
                            document.getElementById("submitData").disabled = false; 
                            if(element.pain = "low"){
                                document.getElementById("pain-low").checked = false;
                            }
                            if(element.pain = "medium"){
                                document.getElementById("pain-medium").checked = false;
                            }
                            if(element.pain = "high"){
                                document.getElementById("pain-high").checked = false;
                            }
                            if(element.stress = "low"){
                                document.getElementById("stress-low").checked = false;
                            }
                            if(element.stress = "medium"){
                                document.getElementById("stress-medium").checked = false;
                            }
                            if(element.stress = "hard"){
                                document.getElementById("stress-high").checked = false;
                            }
                            if(element.stool = "soft"){
                                document.getElementById("stool-soft").checked = false;
                            }
                            if(element.stool = "medium"){
                                document.getElementById("stool-medium").checked = false;
                            }
                            if(element.stool = "hard"){
                                document.getElementById("stool-hard").checked = false;
                            }
                            if(element.bowelm = "light"){
                                document.getElementById("bowel-light").checked = false;
                            }
                            if(element.bowelm = "medium"){
                                document.getElementById("bowel-medium").checked = false;
                            }
                            if(element.bowelm = "heavy"){
                                document.getElementById("bowel-heavy").checked = false;
                            }
                            if(element.bowelf = "1-4"){
                                document.getElementById("1-4").checked = false;
                            }
                            if(element.bowelf = "5-8"){
                                document.getElementById("5-8").checked = false;
                            }
                            if(element.bowelf = "9OrMore"){
                                document.getElementById("9OrMore").checked = false;
                            }
                            if(element.bvisit = "1-2"){
                                document.getElementById("1-2").checked = false;
                            }
                            if(element.bvisit = "3-4"){
                                document.getElementById("3-4").checked = false;
                            }
                            if(element.bvisit = "5OrMore"){
                                document.getElementById("5OrMore").checked = false;
                            }
                        }
                    }
                });
            }
        });
    }


    //GET DIET LOG FOR SPECIFIC DAY
    function getDoclog(){
         $.ajax("https://fast-garden-93601.herokuapp.com/api/doclogs", {
            data: { get_param: 'value' },
            type: 'GET',
            dataType: 'json',
            success: function (data){
                $.each(data, function(index, element) {
                if(element.user == "testuser"){
                    // console.log(element.date.toString().substring(0,10));
                    // var datadate = element.date.toString().substring(0,10);
                    // var pickerDate  = document.getElementById('datepicker').value; 
                    // console.log("DATE ARRAY: "+ pickerDate);
                    // var splitDate = pickerDate.split("/");
                    // var newdate= splitDate[2] + '-' + splitDate[0] + '-' + splitDate[1];
                    // console.log(newdate);
                    // if (datadate == newdate){
                    //      alert("Data exists");
                           console.log("Doclog: " + element);
                           document.getElementById("medicationName").value = element.medication;
                           document.getElementById("dosageNum").value = element.dosage;
                           document.getElementById("meds-comment").value = element.comment
                           document.getElementById("healthtracker_prescription").value = element.complete;
             //   }
             
                   }
                });
            }
        });
    }

    function isInArray(array, search)
{
    return array.indexOf(search) >= 0;
}
