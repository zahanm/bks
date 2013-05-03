(function(global) {
'use strict';

function testAPI() {
  CSS.hide(document.querySelector('.jumbotron'));
  var facepile = document.getElementById('facepile');
  FB.api(
    '/me/friends',
    {
      limit: 3,
      fields: [ 'name' ]
    },
    function(response) {
      var friends = response.data;
      var ii = 0;
      for (ii = 0; ii < friends.length; ii++) {
        var friend = friends[ii];
        Templater.render(
          '/snippets/chathead.html',
          friend,
          function(rendered) {
            var face = document.createElement('div');
            face.innerHTML = rendered;
            face.classList.add('face');
            facepile.appendChild(face);
          }
        );
      }
    }
  );
}

// CSS Helper
// ---

var CSS = (function() {
  var hiddenClass = 'hidden_elem';
  return {
    shown: function(node) {
      return !node.classList.contains(hiddenClass);
    },
    hide: function(node) {
      node.classList.add(hiddenClass);
    },
    show: function(node) {
      node.classList.remove(hiddenClass);
    },
    toggle: function(node) {
      if (CSS.shown(node)) {
        CSS.hide(node);
      } else {
        CSS.show(node);
      }
    }
  };
}());

// Facebook API specific
// ---

function authChangeHandler(response) {
  if (response.status === 'connected') {
    testAPI();
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