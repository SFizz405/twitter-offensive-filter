const script = document.createElement("script");
script.src = chrome.runtime.getURL("patch.js");
(document.head || document.documentElement).appendChild(script);