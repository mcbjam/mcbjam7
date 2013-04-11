$(document).ready(function () {
   //first set the org / app path (must be orgname / appname or org id / app id - can't mix names and uuids!!)
   var client = new Usergrid.Client({
       orgName: 'mcbjam',
       appName: 'sandbox',
    logging: true, //optional - turn on logging, off by default
    buildCurl: true //optional - turn on curl commands, off by default
  });

  //make a new "dogs" Collection
  var options = {
    type:'dogs',
    qs:{ql:'order by created DESC'}
  }

  var dogs;

  client.createCollection(options, function (err, dogs) {
    if (err) {
      $('#error').html('could not load dogs');
    } else {

      //bind the next button to the proper method in the collection object
      $('#next-button').bind('click', function() {
        $('#message').html('');
        dogs.getNextPage(function(err, data){
            if (err) {
                alert('could not get next page');
            } else {
            drawDogs();
          }
        });
      });

      //bind the previous button to the proper method in the collection object
      $('#previous-button').bind('click', function() {
        $('#message').html('');
        dogs.getPreviousPage(function(err, data){
          if (err) {
            alert('could not get previous page of dogs');
          } else {
            drawDogs();
          }
        });
      });

        //bind the create new dog button
      $('#create-dog').bind('click', function () {
          newdog();
      });



      function drawDogs() {
        dogs.fetch(function(err, data) {
          if(err) {
            alert('there was an error getting the dogs');
          } else {
            //first empty out all the current dogs in the list
            $('#mydoglist').empty();
            //then hide the next / previous buttons
            $('#next-button').hide();
            $('#previous-button').hide();
            //iterate through all the items in this "page" of data
            //make sure we reset the pointer so we start at the beginning
            dogs.resetEntityPointer();
            while(dogs.hasNextEntity()) {
               var dog = dogs.getNextEntity();
               $('#mydoglist').append('<li>'+ dog.get('name') + '</li>');
            }
            //if there is more data, display a "next" button
            if (dogs.hasNextPage()) {
               //show the button
               $('#next-button').show();
            }
            //if there are previous pages, show a "previous" button
            if (dogs.hasPreviousPage()) {
               //show the button
               $('#previous-button').show();
            }
          }
        });
      }

      function newdog() {
          $('#create-dog').addClass("disabled");
       
          var name = $("#name").val();

          //make sure the input was valid
          if (Usergrid.validation.validateName(name, function () {
            $("#error").focus();
            $("#error").html(Usergrid.validation.getNameAllowedChars());
            $('#create-dog').removeClass("disabled");
          })
          ) {
              //all is well, so make the new dog
              //create a new dog and add it to the collection
              var options = {
                  name: name
              }
              //just pass the options to the addEntity method
              //to the collection and it is saved automatically
              dogs.addEntity(options, function (err, dog, data) {
                  if (err) {
                      $("#error").html('Oops! There was an error creating the dog.');
                      $('#create-dog').removeClass("disabled");
                  } else {
                      $('#message').html('New dog created!');
                      drawDogs();
                      $('#create-dog').removeClass("disabled");
                  }
              });
          }
      }
      drawDogs();
    }

  });

});