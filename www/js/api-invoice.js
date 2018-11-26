function InvoiceApi()
{
 
     debugger
    
      var data = {
        accessToken :  localStorage.getItem("access_token"),
        accountId : localStorage.getItem("account_id"),
        eventId : $('#invoiceId').val(),
      };


    var settings = {
      "async": true,
      "crossDomain": true,
      //"url": "http://localhost:3000/invoice/getInvoices",
      "url": "https://frozen-savannah-60393.herokuapp.com/invoice/getInvoices",
      "method": "POST",
      "headers": {
        "content-type": "application/json"
    
      },
      "processData": false,
      "data": JSON.stringify({data})  
    };
    
    $.ajax(settings).done(function (response) {
        debugger
        $("#invoiceList").text(` ${response}`);     
    });
         
    }





