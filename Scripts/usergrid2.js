$(document).ready(function () {
    var client = new Usergrid.Client({
        orgName: 'mcbjam',
        appName: 'sandbox'
    });

    var options = {
        type: 'information',
        title: 'information test',
        age: '34',
        hauteur: '12'
    };

    client.createEntity(options, function (error, response) {
        if (error) { // Error - the book was not saved properly
            alert("Could not create the book. Did you enter your orgName (username) correctly on line 18 of index.html?");
        } else { // Success - the book was created properly
            document.getElementsByTagName('body')[0].innerHTML
                += "Success! Here is the object we stored; "
                + "notice the timestamps and unique id we created for you:"
                + "<br/><br/>"
                + JSON.stringify(response.get());
        }
    });

    var dog = new Usergrid.Entity("dogs");


})
;