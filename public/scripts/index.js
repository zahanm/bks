(function(global) {
'use strict';

function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  var s = '/snippets/chathead.html';
  FB.api(
    '/me/friends',
    {
      limit: 10,
      fields: [ 'name' ]
    },
    function(response) {
      var sample = document.getElementById('samplePerson');
      console.log(Mustache.render);
      console.log(response);
    }
  );
}

// Facebook API specific
// ---

function authChangeHandler(response) {
  if (response.status === 'connected') {
    return;
  } else if (response.status === 'not_authorized') {
    console.log('Y you no login?');
  } else {
    console.log('Log in to Facebook, yo. <Redirect to facebook.com?>');
  }
}

window.fbAsyncInit = function() {
  // Init the FB JS SDK
  FB.init({
    appId: '463032917109417',
    channelUrl: '//localhost:8080/channel.html',
    status: true, // Check Facebook Login status
    xfbml: true // Look for social plugins on the page
  });
  // Initialization after FB is in namespace
  // ---
  FB.Event.subscribe('auth.authResponseChange', authChangeHandler);
  // Event listeners
  var loginButton = document.querySelector('button.fb-login');
  loginButton.addEventListener('click', function(ev) {
    FB.login(function(response) {
      if (response.status === 'connected') {
        testAPI();
      } else {
        authChangeHandler(response);
      }
    });
  });
};

// Load the FB SDK
(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

}(window));