//Handler request from background page
// chrome.extension.onMessage.addListener(function (message, sender) {
//     console.log("In content Script Message Recieved is " + message);
//     //Send needed information to background page
//     chrome.extension.sendMessage("My URL is" + window.location.origin);
// });

chrome.extension.sendMessage({
	target: "page",
	name: "init"
});