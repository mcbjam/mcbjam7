$(document).ready(function () {
    //$('.smallipop').smallipop();

    //-----  Load facebook for like buttoon and comment at least --->
    $(document).ready(function () {
        var fbAppId = '445930615488341';
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

   

})

