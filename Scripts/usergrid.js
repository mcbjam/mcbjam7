$(document).ready(function () {
    $("#post").click(createdog);
})

//exemple create dog
function createdog() {
    var client = new Usergrid.Client({
        orgName: 'mcbjam',
        appName: 'sandbox'
    });


    var dog = new Usergrid.Entity("dogs");
    dog.set("name", "Dino");
    dog.set("owner", "Fred");
    dog.set("state", "hungry");
    dog.save();
    dog.set("state", "fed");
    dog.save(); //updates the same dog entity as before
    dog.fetch(); //will only work if the UUID for the entity is in the dog object
    var state = dog.get("state");
    dog.destroy(); //no real dogs were harmed!
    dog = null; //no real dogs were harmed!
    var dogs = new Usergrid.Collection('dogs'); //makes a new 'dogs' collection object
    dogs.fetch();
    var dog = new Usergrid.Entity("dogs");
    dog.set("name", "fido");
    dog.addNewEntity(dog);
    var dog = new Usergrid.Entity("dogs");
    dog.save();
    dogs.addEntity(dog); //entity is added only
    var dog = new Usergrid.Entity("dogs");
    dogs.addNewEntity(dog); //entity is added and saved
    //populate the collection
    dogs.fetch();
    //iterate through all the items in this "page" of data
    while (dogs.hasNextEntity()) {
        //get a reference to the dog
        var dog = dogs.getNextEntity();
        //display the dog in the list
        $('#mydoglist').append('<li>' + dog.get('name') + '</li>');
    }
}


//exemple create entity
function createEntity() {
    var client = new Usergrid.Client({
        orgName: 'mcbjam',
        appName: 'sandbox'
    });

    var options = {
        type: 'test',
        title: 'information test',
        age: '38',
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
}
