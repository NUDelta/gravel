$(document).ready(function() {
  chrome.runtime.sendMessage({
      from:    'content',
      subject: 'showPageAction',
      name: 'init'
    });
});