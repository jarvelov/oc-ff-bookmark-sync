var { ToggleButton } = require('sdk/ui/button/toggle');
var data = require("sdk/self").data;
var prefs = require("sdk/simple-prefs");
var panels = require("sdk/panel");
var self = require("sdk/self");
var tabs = require('sdk/tabs');

function handleChange(state) {
  if (state.checked) {
    buildPanel();
    panel.show({
      position: button
    });
  }
}

function handleHide() {
  button.state('window', {checked: false});
}

function serverPrefs() {
  var ocPrefs = { 
    "serverURL" : prefs.prefs.serverURL,
    "serverPath" : prefs.prefs.serverPath,
    "serverArgs" : '?url=' + tabs.activeTab.url + '&title=' + tabs.activeTab.title
  };

  return ocPrefs;
}

function createPanel() {

  var panel = panels.Panel({
    width: 550,
    height: 380,
    contentURL: prefs.prefs.serverURL + prefs.prefs.serverPath + '?&url=' + tabs.activeTab.url + '&title=' + tabs.activeTab.title,
    contentScriptFile: data.url("oc-ff-bookmark-sync-listener.js"),
    contentScriptWhen: "ready",
    contentScript: submitListener,
    onHide: handleHide
  });

  return panel;

}

var submitListener = 
  "window.addEventListener('click', function(event) {" +
  "  if(event.target.type.toString() == 'submit') { ;" +
  "    self.port.emit('getPrefs', '');" +
  "  };" +
  "}, false);"

var button = ToggleButton({
  id: "oc-ff-bookmark-sync",
  label: "Owncloud Firefox Bookmark Sync",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onChange: handleChange
});

function buildPanel() {
  panel = createPanel();

  panel.on("show", function() {
    console.log('showing');
  });

  panel.port.on('closePanel', function closePanel(data) {
    console.log(data);
    panel.hide();
    buildPanel(); //rebuild panel
  });

  panel.port.on('getPrefs', function sendPrefs() {
    console.log('getPrefs');
    var ocPrefs = serverPrefs();
    panel.port.emit('prefs', ocPrefs);
  });
}