$(document).ready(function () {
  
   // Assigner le bouton a l'action
    $("#facetookme").click(facetookme);

    $('#tipCSSAnimated').smallipop({
        cssAnimations: {
            enabled: true,
            show: 'animated bounceInDown',
            hide: 'animated hinge'
        }
    });

})


function login() {
    FB.login(function (response) {
        if (response.authResponse) {
            accesstoken = FB.getAuthResponse()['accessToken'];
            //dojob();
        } else {
            alert(response);
        }
    }, { scope: 'email, user_likes, user_birthday, friends_birthday' });
}


function dojob() {
   
    profil();
    friend();
    //post();
}
function post() {
    FB.api('me/freemcbjam:facetook', 'post', { profile: "http://www.facebook.com/pages/Freemcbjam-Community/263502307119653" },
    function (response) {
              }
    );
}


function profil() {
    FB.api('/me?fields=picture,name,name_format,link', function (response) {
        $('#profile').empty();
        $('#profile').show();
        $('#profile').append('<img src="' + response.picture.data.url + '">');
        $('#profile').append('<a href="' + response.link + '">' + response.name + '</a>');

    });
}

function friend() {
    FB.api('/me/friends?fields=name,name_format,link,picture,gender', function (response) {
        showfriend(response);
        //calculfriend(response);
        //getgirl(response);
    });
}

function getgirl(response) {
    $('#girls').empty();
    $('#girls').show();
    var person = ''

    for (var personIndex in response.data) {
        person = response.data[personIndex];
        if (person.gender == "female") {
            $('#girls').append('<img src="' + person.picture.data.url + '">');
        }
    }
}


function calculfriend(response) {
    $('#prenomstat').empty();
    $('#prenomstat').show();
        var person = ''
        var prenomcollection = [];
        var compteur = 0;
        var prenom = "jean";

        for (var personIndex in response.data) {
            person = response.data[personIndex];
            person.prenom = person.name.split(' ')[0];


            if (!(person.prenom in prenomcollection)) {
                prenomcollection[person.prenom] = {
                    compteur: 1,
                    personnes: [person],
                    prenom: person.prenom
                }
            }
            else {
                var p = prenomcollection[person.prenom];
                p.compteur++;
                p.personnes.push(person);
            }

            if (compteur < prenomcollection[person.prenom].compteur) {
                compteur = prenomcollection[person.prenom].compteur;
                prenom = prenomcollection[person.prenom].prenom;
            }
        }

        $('#prenomstat').append('<p>' +
                     prenom + '</p>'
                      +
                     compteur + '</p>')

        for (var index in prenomcollection[prenom].personnes) {
            p = prenomcollection[prenom].personnes[index];
            $('#prenomstat').append('<img src="' + p.picture.data.url + '">');
            $('#prenomstat').append('<a href="' + p.link + '">' + p.name + '</a>');

            ;
        }
  
}

function showfriend(response) {
        $('#friends').empty();
        $('#friends').show();
        var person = ''
        $('#friends').append('<h2> Your Friends </h2><br>');
        for (var personIndex in response.data) {
            person = response.data[personIndex];
            $('#friends').append('  <a href="' + person.link + '"><img src="' + person.picture.data.url + '" border="0"></a>');
        }
}


function facetookme() {
    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            dojob();
        } else if (response.status === 'not_authorized') {
            // not_authorized
            login();
        } else {
            // not_logged_in
            login();
        }
    });
}