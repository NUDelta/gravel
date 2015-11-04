var runInPage = function (fn, callback) {
  var args = Array.prototype.slice.call(arguments, 2);
  var evalCode = "(" + fn.toString() + ").apply(this, " + JSON.stringify(args) + ");";
  chrome.devtools.inspectedWindow.eval(evalCode, {}, callback);
};


$(document).ready(function () {
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

  $("#demo").click(function () {
    console.log('i clicked');

    var foo = function (arg1, arg2) {
      console.log("Gravel: Injected event is being dispatched.");
      window.dispatchEvent(new CustomEvent("JSTrace", {"detail": [arg1, arg2]}));
    };

    var callback = function () {
      console.log('successfully injected into DOM webpage');
    };

    runInPage(foo, callback, "some arg", "some arg 2")
  });
});


