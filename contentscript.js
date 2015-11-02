chrome.extension.onMessage.addListener(function (message, sender) {
    console.log("In content Script Message Recieved is " + message);
    //Send needed information to background page
    chrome.extension.sendMessage({
    	from: 'content',
    	subject: 'showPageAction',
    	name: 'init'
    });
});