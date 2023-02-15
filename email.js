$(document).ready(function () {
  const APIKEY = "63ec8821478852088da682a2";
   getContacts();
   $("#update-contact-container").hide();
   $("#add-update-msg").hide();
 
   $("#contact-submit").on("click", function (e) {
     //prevent default action of the button 
     e.preventDefault();
 
    
     let updateEmail = $("#email-updates").val();
    
     
     let jsondata = {
      
       "email": updateEmail
       
     };
 
     let settings = {
       "async": true,
       "crossDomain": true,
       "url": "https://retrochic-b302.restdb.io/rest/emailupdates",
       "method": "POST", //[cher] we will use post to send info
       "headers": {
         "content-type": "application/json",
         "x-apikey": APIKEY,
         "cache-control": "no-cache"
       },
       "processData": false,
       "data": JSON.stringify(jsondata),
       "beforeSend": function(){
         //@TODO use loading bar instead
         //disable our button or show loading bar
         $("#contact-submit").prop( "disabled", true);
         //clear our form using the form id and triggering it's reset feature
         $("#add-contact-form").trigger("reset");
       }
     }
     
     $.ajax(settings).done(function (response) {
       console.log(response);
       
       $("#contact-submit").prop( "disabled", false);
       
       //@TODO update frontend UI 
       $("#add-update-msg").show().fadeOut(3000);
 
       //update our table 
       getContacts();
     });
   });//end click 
   function getContacts(limit = 10, all = true) {
 
     
     let settings = {
       "async": true,
       "crossDomain": true,
       "url": "https://retrochic-b302.restdb.io/rest/emailupdates",
       "method": "GET", //[cher] we will use GET to retrieve info
       "headers": {
         "content-type": "application/json",
         "x-apikey": APIKEY,
         "cache-control": "no-cache"
       },
     }
     
     $.ajax(settings).done(function (response) {
       
       let content = "";
 
       for (var i = 0; i < response.length && i < limit; i++) {
         content = `${content}<tr id='${response[i]._id}'>
         <td>${response[i].email}</td>
      
 
         
         <td><a href='#' class='delete' data-id='${response[i]._id}'>Del</a></td><td><a href='#update-contact-container' class='update' data-id='${response[i]._id}' data-msg='${response[i].message}' data-name='${response[i].name}' data-email='${response[i].email}' >Update</a></td></tr>`;
         }
       });
   }
     });
 
 