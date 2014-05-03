var url = "http://steel-lacing-568.appspot.com/";

function readMessage(request, sender, sendResponse){
	console.log("BG receives message from " + sender);

	if(request.code === "search"){
		console.log("BG executes search");
		$.post(url + "search", {user_id: request.user_id, post_id: request.post_id},
			function(data){
				var x = JSON.parse(data);
				chrome.tabs.query({active: true, currentWindow: true},
					function(tabs) {
				            chrome.tabs.sendMessage(tabs[0].id, {status: x.status, post_id: x.post_id, code: 'update'});
				    });
			});

	} else if(request.code === "insert"){
		console.log("BG executes insert");
		$.post(url + "insert", {user_id: request.user_id, post_id: request.post_id},
		function(data) {
			chrome.tabs.query({url: '*://www.facebook.com/*'},
				function(tabs) {
			        for (var i = 0; i < tabs.length; i++) {
			            chrome.tabs.sendMessage(tabs[i].id, {status: 'true', post_id: x.post_id, code: 'update'});
			        }
			    });
		});

	} else if(request.code === "delete"){
		console.log("BG executes delete");
		$.post(url + "delete", {user_id: request.user_id, post_id: request.post_id},
		function(data) {
			chrome.tabs.query({url: '*://www.facebook.com/*'},
				function(tabs) {
			        for (var i = 0; i < tabs.length; i++) {
			            chrome.tabs.sendMessage(tabs[i].id, {status: 'false', post_id: x.post_id, code: 'update'});
			        }
			    });
		});

	}

}

chrome.runtime.onMessage.addListener(readMessage);