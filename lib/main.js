const widget = require('widget');
const data = require('self').data;


var panel = require("sdk/panel").Panel({
  width: 180,
  height: 180,
  contentURL: "https://en.wikipedia.org/w/index.php?title=Jetpack&useformat=mobile"
});

panel.show();
