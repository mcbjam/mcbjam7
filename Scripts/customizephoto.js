$(document).ready(function () {

    var fbAppId = '445930615488341';
    var accesstoken = '';
    var imgsource = 'http://www.w3.org/html/logo/downloads/HTML5_Logo_512.png';
    var scopes = '';
    var albums = '';

    window.fbAsyncInit = function () {
        FB.init({
            appId: fbAppId,        // App ID
            status: true,           // check login status
            cookie: true,           // enable cookies to allow the server to access the session
            xfbml: true            // parse page for xfbml or html5 social plugins like login button below
        });

        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                // connected
                profil();
            } else if (response.status === 'not_authorized') {
                // not_authorized
                profil();
            } else {
                // not_logged_in
                //login();
            }
        });
    };

    // Load the SDK Asynchronously
    (function (d) {
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement('script'); js.id = id; js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        ref.parentNode.insertBefore(js, ref);
    }(document));

   // $("#postonfacebook").click(postphoto);
    $("#postonfacebook").click(uploadphoto);
})


function postphoto() {
    accesstoken = FB.getAuthResponse()['accessToken'];
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var imageObj = new Image();

    imageObj.onload = function () {
        context.drawImage(imageObj, 69, 50);
    };
    imageObj.src = $('#image1').attr('src');

    var dataURL = canvas.toDataURL("image/png");

   //var datafinal= dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  
    var datafinal = dataURL.replace("data:image/png;base64,", "");

   FB.api('/10151170935408614/photos', 'post', {
       source: datafinal,

   }, function (response) {

       if (!response || response.error) {
          alert('Error!');
       } else {
           alert('Upload OK!');
       }
   });


   //var postMSG = "Your message";
   //var url = 'https://graph.facebook.com/10151170935408614/photos?access_token=' + accesstoken + "&message=" + postMSG;
   //var imgURL = "$('#image1').attr('src')";//change with your external photo url
   //var formData = new FormData();
   //formData.append("source", imgURL);

   //$.ajax({
   //    url: url,
   //    data: formData,
   //    cache: false,
   //    contentType: false,
   //    processData: false,
   //    type: 'POST',

   //    success: function (data) {
   //        alert("POST SUCCESSFUL");
   //    }
   //});
}

function uploadphoto() {
    var imgURL = $('#image1').attr('src');

    FB.api('/10151524688338614/photos', 'post', {
        message: 'photo description',
        url: imgURL
    }, function (response) {
        if (!response || response.error) {
            alert('Error occured');
        } else {
            alert('Post ID: ' + response.id);
        }
    });
}



function login() {
    FB.login(function (response) {
        if (response.authResponse) {
            accesstoken = FB.getAuthResponse()['accessToken'];
            profil();
            dojob();
        } else {
            alert(response);
        }
    }, { scope: scopes });
}

function profil() {
    FB.api('/me?fields=picture,name,name_format,link', function (response) {

        $('#profil').attr('src', response.picture.data.url);
    });
}


function dojob() {
   

    FB.api('/me/albums?fields=id,name,link,photos.fields(id,name,link,picture,source)', function (resp) {
        albums = resp.data;
        $('#albumlist').empty();
        if (resp.data.length > 0) {
            var ul = document.getElementById('albumlist');
            for (var i = 0, l = resp.data.length; i < l; i++) {
                var album = resp.data[i];
                $('#albumlist').append('<li><a onclick=choosealbum("' + album.id + '")> ' + album.name + '</a></li>');
            }
            choosealbum(resp.data[0].id);
        }
    });
    $("#postonfacebook").show();
    $("#launcheditor").show();
    $("#loginbutton").hide();
    
}


function choosealbum(id) {

    $('#albums').empty();
       for (var i = 0, n = albums.length; i < n; i++) {
           var album = albums[i];
           if (album.id == id) {
               i = n;
                if (album.photos) {
                    for (var j = 0, l = album.photos.data.length; j < l; j++) {
                        var photo = album.photos.data[j];
                        var urlpicture = photo.picture;
                        var source = photo.source;
                        $('#albums').append('<img src="' + urlpicture + '" onclick=choosephoto("' + source + '") />');
                    }
                    $('#albums').append('</div>');
                }
            }
        }
       choosephoto(album.photos.data[0].source);
}



function choosephoto(picture) {
    $('#image1').attr('src', picture);
}

function post() {
    FB.api('me/freemcbjam:facetook', 'post', { profile: "http://www.facebook.com/pages/Freemcbjam-Community/263502307119653" },
    function (response) {
        alert('post ok');
    }
    );
}

function postToFeed() {

    // calling the API ...
    var obj = {
        method: 'feed',
        redirect_uri: 'www.mcbjam.com',
        link: 'http://mafreemcbjam.zapto.org/mcbjam7/customizephoto.html',
        picture: $('#image1').attr('src'),
        name: 'Customize Your Photo',
        caption: 'Reference Documentation',
        description: 'Using Dialogs to interact with users.',
        source: 'dataimage',
    };
    function callback(response) {
        document.getElementById('msg').innerHTML = "Post ID: " + response['post_id'];
    }
    FB.ui(obj, callback);
}

var featherEditor = new Aviary.Feather({
    apiKey: 'CB1JvWRfI0uf9jumfha2Eg',
    apiVersion: 2,
    tools: 'brightness,draw,effects,enhance,frames,stickers,crop,resize,warmth,orientation,focus,contrast,saturation,warmth,sharpness,splash,text,redeye,whiten,blemish',
    appendTo: 'injection_site',
    onSave: function (imageID, newURL) {
        var img = document.getElementById(imageID);
        img.src = newURL;
    },
    onError: function (errorObj) {
        alert(errorObj.message);
    }
});
function launchEditor(id, src) {
    id = 'image1';
    src = $('#image1').attr('src');
    featherEditor.launch({
        image: id,
        url: src
    });
    return false;
}

