chrome.devtools.panels.create("Gravel", "gravel.png", "panel.html", function(panel) { 
	console.log("hello from callback"); 
});

var tabId = chrome.devtools.inspectedWindow.tabId;
var panelPort = chrome.extension.connect({name: "panel"});
panelPort.postMessage({
  name: "init",
  data: tabId
});

panelPort.onMessage.addListener(function(msg) {
	console.log('tab data ' + msg);
});