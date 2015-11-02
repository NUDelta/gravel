chrome.devtools.panels.create("Gravel", "gravel.png", "panel.html", function(panel) { 
	console.log("hello from callback");
});

// Create a connection to the background page
var backgroundPageConnection = chrome.runtime.connect({
    name: "panel"
});

console.log('background');
backgroundPageConnection.postMessage({
    name: 'init',
    tabId: chrome.devtools.inspectedWindow.tabId
});