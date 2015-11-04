var tabId = chrome.devtools.inspectedWindow.tabId;
var panelPort = chrome.extension.connect({name: "gravelpanel"});
panelPort.postMessage({
  name: "identification",
  data: tabId
});

panelPort.onMessage.addListener(function (message) {
  if (message && message.target == "page" && message.name == "JSTrace") {
    console.log("received ", message.data);
  }
});

document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('demo').click(function() {
    console.log('i clicked');

    var foo = function() {
      window.dispatchEvent(new CustomEvent("JSTrace", {"detail": "foobar"}));
    }

    var evalCode = foo.toString();

    var callback = function() {
      console.log('successfully injected into DOM webpage');
    }

    chrome.devtools.inspectedWindow.eval(evalCode, {}, callback);
  });
 });
