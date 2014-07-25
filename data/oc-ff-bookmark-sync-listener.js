self.port.on("prefs", function(e) {
  console.log('setting prefs');
  checkListener(e);
});

function checkListener(serverPrefs) {
  
  serverURL = serverPrefs.serverURL;
  serverPath = serverPrefs.serverPath;
  serverArgs = serverPrefs.serverArgs;

  console.log(serverURL);
  if(typeof serverURL == 'undefined') {
  	self.port.emit('getPrefs', '');	
  } else {
	currentURL = window.location.protocol+"//"+window.location.host;
  	currentURLPath = window.location.pathname;
  	if(currentURL == serverURL && currentURLPath == serverPath) {
  	  console.log('yep');
  	  self.port.emit('closePanel');
    } else {
  	  console.log('nope');
    }
  }
}