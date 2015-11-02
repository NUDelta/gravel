var connections = {};

chrome.extension.onConnect.addListener(function (port) {
	console.log(port);
	var extensionListener = function(message, sender, sendResponse) {
		// original connection event doesn't include tab id of dev tools page, need to send it explicitly
		if (message.name == 'init') {
			console.log(message.tabId);
			connections[message.tabId] = port;
			console.log(connections);
			return;
		}
		// other message handling
	}
	
	// listen to message sent from devtools page
	port.onMessage.addListener(extensionListener);
	port.onDisconnect.addListener(function(port) {
		port.onMessage.removeListener(extensionListener);

		var tabs = Object.keys(connections);
		for (var i=0, len=tabs.length; i < len; i++) {
			if (connections[tabs[i]] == port) {
				delete connections[tabs[i]];
				break;
			}
		}
	});
});


// receive message from content script and relay to devtools page for the current tab
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	// messages form content script should ahve sender.tab set
	if (sender.tab) {
		console.log('in sender tab');
		var tabId = sender.tab.id;
		if (tabId in connections) {
			console.log('success');
			connections[tabId].postMessage(request);
		} else {
			console.log(connections);
			console.log(sender.tab);
			console.log('tab not found in connection list');
		}
	} else {
		console.log('sender.tab not defined');
	}
	return true;
});