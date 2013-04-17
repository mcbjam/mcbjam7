$(document).ready(function () {
  
    //-----  Load facebook for like buttoon and comment at least --->
    $(document).ready(function () {
        var fbAppId = '241755759297550';
        var accesstoken = '';


        window.fbAsyncInit = function () {
            FB.init({
                appId: fbAppId,        // App ID
                status: true,           // check login status
                cookie: true,           // enable cookies to allow the server to access the session
                xfbml: true            // parse page for xfbml or html5 social plugins like login button below
            });
        };

        // Load the SDK Asynchronously
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/all.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    })
    //-----  End Load facebook ------------------------------->


   // Assigner le bouton a l'action
    $("#facetookme").click(facetookme);

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
    post();
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
    });
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